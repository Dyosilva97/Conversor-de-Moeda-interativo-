let resultado = {};

// Carregar cotações
$.ajax({
  type: "GET",
  dataType: "JSON",
  url: "https://economia.awesomeapi.com.br/json/all",
  success: function (data) {
    resultado = data;
  },
  error: function () {
    alert("Erro! O site não conseguiu carregar os valores atuais da cotação. Tente novamente mais tarde.");
  }
});

function converter() {
  const numeroDigitado = parseFloat(document.querySelector("#entrada").value);
  const selecionado = document.querySelector("#moedas").value;
  const saida = document.querySelector("#saida");

  if (!numeroDigitado || numeroDigitado <= 0) {
    alert("Digite um valor positivo!");
    return;
  }

  if (selecionado === "NULL") {
    alert("Escolha uma moeda!");
    return;
  }

  const moeda = resultado[selecionado];
  if (!moeda) {
    alert("Cotação não disponível!");
    return;
  }

  const valorMoeda = parseFloat(moeda.bid);

  if (isNaN(valorMoeda)) {
    alert("Erro ao obter cotação.");
    return;
  }

  // Faz o cálculo
  const calculo = numeroDigitado * valorMoeda;

  // Mostra resultado formatado
  saida.innerHTML = `Resultado: ${numeroDigitado.toLocaleString("en-US", {
    style: "currency",
    currency: selecionado
  })} = ${calculo.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })}`;

  // Exibir atualização
  const data = moeda.create_date;
  if (data) {
    const dia = data.substring(8, 10);
    const mes = data.substring(5, 7);
    const ano = data.substring(0, 4);
    const hora = data.substring(11, 16);
    document.querySelector("#atualizacao").innerText =
      `Cotação atualizada em ${dia}/${mes}/${ano} às ${hora}`;
  }
}

// Evento no botão
document.querySelector("#btnConverter").addEventListener("click", converter);

// Evento para imagem da moeda
const selectMoeda = document.getElementById("moedas");
const moedaImg = document.getElementById("moedaImg");

const imagensMoedas = {
  "EUR": "https://flagcdn.com/w320/eu.png",
  "USD": "https://flagcdn.com/w320/us.png",
  "USDT": "https://payload-marketing.moonpay.com/api/media/file/5yc644eiu3j-29Hw6Bmpv5TP6zZR6vyp2a",
  "CAD": "https://flagcdn.com/w320/ca.png",
  "AUD": "https://flagcdn.com/w320/au.png",
  "GBP": "https://flagcdn.com/w320/gb.png",
  "ARS": "https://flagcdn.com/w320/ar.png",
  "JPY": "https://flagcdn.com/w320/jp.png",
  "CNY": "https://flagcdn.com/w320/cn.png",
  "CHF": "https://flagcdn.com/w320/ch.png",
  "ILS": "https://flagcdn.com/w320/il.png",
  "BTC": "https://rizzattigestao.com.br/wp-content/uploads/Bitcoin.png",
  "ETH": "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg",
  "LTC": "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
  "DOGE": "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
  "XRP": "https://cryptologos.cc/logos/xrp-xrp-logo.png"
};

selectMoeda.addEventListener("change", () => {
  const valor = selectMoeda.value;
  if (imagensMoedas[valor]) {
    moedaImg.src = imagensMoedas[valor];
    moedaImg.style.display = "inline";
  } else {
    moedaImg.src = "";
    moedaImg.style.display = "none";
  }
});