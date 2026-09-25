const formBusca = document.getElementById("formBusca");
const campoCidade = document.getElementById("cidade");
const btnLocalizacao = document.getElementById("btnLocalizacao");
const btnBuscar = document.getElementById("btnBuscar");

const mensagem = document.getElementById("mensagem");
const nomeCidade = document.getElementById("nomeCidade");
const dataAtual = document.getElementById("dataAtual");

const climaAtual = document.getElementById("climaAtual");
const listaPrevisao = document.getElementById("listaPrevisao");


formBusca.addEventListener("submit", function(event) {

    event.preventDefault();

    const cidade = campoCidade.value.trim();

    if (cidade === "") {
        mostrarMensagem("Digite o nome de uma cidade.", "erro");
        return;
    }

    buscarCidade(cidade);
});


btnLocalizacao.addEventListener("click", function() {

    if (!navigator.geolocation) {
        mostrarMensagem(
            "Seu navegador não suporta localização.",
            "erro"
        );

        return;
    }

    btnLocalizacao.disabled = true;
    btnLocalizacao.textContent = "Localizando...";

    mostrarMensagem(
        "Buscando sua localização...",
        "carregando"
    );

    navigator.geolocation.getCurrentPosition(

        function(posicao) {

            const latitude = posicao.coords.latitude;
            const longitude = posicao.coords.longitude;

            buscarClima(
                latitude,
                longitude,
                "Sua localização"
            );

        },

        function(erro) {

            btnLocalizacao.disabled = false;

            btnLocalizacao.textContent =
                "📍 Usar minha localização";

            if (erro.code === 1) {

                mostrarMensagem(
                    "Permita o acesso à localização no navegador.",
                    "erro"
                );

            } else if (erro.code === 2) {

                mostrarMensagem(
                    "Não foi possível encontrar sua localização.",
                    "erro"
                );

            } else if (erro.code === 3) {

                mostrarMensagem(
                    "A localização demorou muito para responder.",
                    "erro"
                );

            } else {

                mostrarMensagem(
                    "Erro ao obter localização.",
                    "erro"
                );

            }

        },

        {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
        }
    );

});


async function buscarCidade(cidade) {

    btnBuscar.disabled = true;
    btnBuscar.textContent = "Buscando...";

    mostrarMensagem(
        "Procurando cidade...",
        "carregando"
    );

    try {

        const url =
            "https://geocoding-api.open-meteo.com/v1/search" +
            "?name=" + encodeURIComponent(cidade) +
            "&count=1" +
            "&language=pt" +
            "&format=json";

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a cidade.");
        }

        const dados = await resposta.json();

        if (!dados.results || dados.results.length === 0) {

            mostrarMensagem(
                "Cidade não encontrada. Tente outro nome.",
                "erro"
            );

            return;
        }

        const local = dados.results[0];

        const nome = local.name;
        const estado = local.admin1 || "";
        const pais = local.country || "";

        const nomeCompleto = [
            nome,
            estado,
            pais
        ]
        .filter(Boolean)
        .join(", ");

        await buscarClima(
            local.latitude,
            local.longitude,
            nomeCompleto
        );

    } catch (erro) {

        console.error(erro);

        mostrarMensagem(
            "Erro ao pesquisar a cidade.",
            "erro"
        );

    } finally {

        btnBuscar.disabled = false;
        btnBuscar.textContent = "🔎 Buscar";
    }
}


async function buscarClima(latitude, longitude, local) {

    mostrarMensagem(
        "Carregando informações do clima...",
        "carregando"
    );

    climaAtual.innerHTML =
        '<div class="inicio">' +
        '<div class="icone">🌤️</div>' +
        '<h3>Carregando clima...</h3>' +
        '<p>Aguarde um momento.</p>' +
        '</div>';

    listaPrevisao.innerHTML =
        '<p class="aviso">Buscando previsão...</p>';

    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" + latitude +
            "&longitude=" + longitude +
            "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
            "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
            "&timezone=auto" +
            "&forecast_days=5";

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a previsão.");
        }

        const dados = await resposta.json();

        if (!dados.current || !dados.daily) {
            throw new Error("Dados do clima não encontrados.");
        }

        mostrarClima(dados, local);

        mostrarMensagem(
            "Clima atualizado com sucesso!",
            "sucesso"
        );

    } catch (erro) {

        console.error(erro);

        climaAtual.innerHTML =
            '<div class="inicio">' +
            '<div class="icone">⚠️</div>' +
            '<h3>Erro ao carregar o clima</h3>' +
            '<p>Tente novamente mais tarde.</p>' +
            '</div>';

        listaPrevisao.innerHTML =
            '<p class="aviso">' +
            'Não foi possível carregar a previsão.' +
            '</p>';

        mostrarMensagem(
            "Erro ao consultar a API do clima.",
            "erro"
        );

    } finally {

        btnLocalizacao.disabled = false;

        btnLocalizacao.textContent =
            "📍 Usar minha localização";
    }
}


function mostrarClima(dados, local) {

    const atual = dados.current;

    const temperatura =
        Math.round(atual.temperature_2m);

    const sensacao =
        Math.round(atual.apparent_temperature);

    const umidade =
        atual.relative_humidity_2m;

    const vento =
        atual.wind_speed_10m;

    const codigo =
        atual.weather_code;

    const clima =
        interpretarClima(codigo);

    nomeCidade.textContent = local;

    dataAtual.textContent =
        "Atualizado em " +
        formatarData(atual.time);

    climaAtual.innerHTML = "";

    const principal =
        document.createElement("div");

    principal.className =
        "clima-principal";

    const informacoes =
        document.createElement("div");

    const temperaturaElemento =
        document.createElement("div");

    temperaturaElemento.className =
        "temperatura";

    temperaturaElemento.textContent =
        temperatura + "°C";

    const descricao =
        document.createElement("p");

    descricao.className =
        "descricao";

    descricao.textContent =
        clima.descricao;

    informacoes.appendChild(
        temperaturaElemento
    );

    informacoes.appendChild(
        descricao
    );

    const icone =
        document.createElement("div");

    icone.className =
        "icone-clima";

    icone.textContent =
        clima.icone;

    principal.appendChild(
        informacoes
    );

    principal.appendChild(
        icone
    );

    const detalhes =
        document.createElement("div");

    detalhes.className =
        "detalhes";

    adicionarDetalhe(
        detalhes,
        "🌡️ Sensação térmica",
        sensacao + "°C"
    );

    adicionarDetalhe(
        detalhes,
        "💧 Umidade",
        umidade + "%"
    );

    adicionarDetalhe(
        detalhes,
        "💨 Vento",
        vento + " km/h"
    );

    climaAtual.appendChild(
        principal
    );

    climaAtual.appendChild(
        detalhes
    );

    mostrarPrevisao(
        dados.daily
    );
}


function adicionarDetalhe(
    container,
    titulo,
    valor
) {

    const detalhe =
        document.createElement("div");

    detalhe.className =
        "detalhe";

    const texto =
        document.createElement("p");

    texto.textContent =
        titulo;

    const valorElemento =
        document.createElement("strong");

    valorElemento.textContent =
        valor;

    detalhe.appendChild(
        texto
    );

    detalhe.appendChild(
        valorElemento
    );

    container.appendChild(
        detalhe
    );
}


function mostrarPrevisao(dados) {

    listaPrevisao.innerHTML = "";

    for (
        let i = 0;
        i < dados.time.length;
        i++
    ) {

        const data =
            dados.time[i];

        const maxima =
            Math.round(
                dados.temperature_2m_max[i]
            );

        const minima =
            Math.round(
                dados.temperature_2m_min[i]
            );

        const clima =
            interpretarClima(
                dados.weather_code[i]
            );

        const card =
            document.createElement("div");

        card.className =
            "card-dia";

        const dia =
            document.createElement("h3");

        dia.textContent =
            formatarDia(data);

        const icone =
            document.createElement("div");

        icone.className =
            "icone-dia";

        icone.textContent =
            clima.icone;

        const descricao =
            document.createElement("p");

        descricao.className =
            "descricao-dia";

        descricao.textContent =
            clima.descricao;

        const temperaturas =
            document.createElement("div");

        temperaturas.className =
            "temperaturas-dia";

        const max =
            document.createElement("p");

        max.className =
            "maxima";

        max.textContent =
            "Máx: " + maxima + "°C";

        const min =
            document.createElement("p");

        min.className =
            "minima";

        min.textContent =
            "Mín: " + minima + "°C";

        temperaturas.appendChild(max);
        temperaturas.appendChild(min);

        card.appendChild(dia);
        card.appendChild(icone);
        card.appendChild(descricao);
        card.appendChild(temperaturas);

        listaPrevisao.appendChild(card);
    }
}


function interpretarClima(codigo) {

    if (codigo === 0) {

        return {
            descricao: "Céu limpo",
            icone: "☀️"
        };

    }

    if (codigo === 1) {

        return {
            descricao: "Predominantemente limpo",
            icone: "🌤️"
        };

    }

    if (codigo === 2) {

        return {
            descricao: "Parcialmente nublado",
            icone: "⛅"
        };

    }

    if (codigo === 3) {

        return {
            descricao: "Nublado",
            icone: "☁️"
        };

    }

    if ([45, 48].includes(codigo)) {

        return {
            descricao: "Neblina",
            icone: "🌫️"
        };

    }

    if ([51, 53, 55, 56, 57].includes(codigo)) {

        return {
            descricao: "Garoa",
            icone: "🌦️"
        };

    }

    if ([61, 63, 65, 66, 67].includes(codigo)) {

        return {
            descricao: "Chuva",
            icone: "🌧️"
        };

    }

    if ([71, 73, 75, 77].includes(codigo)) {

        return {
            descricao: "Neve",
            icone: "❄️"
        };

    }

    if ([80, 81, 82].includes(codigo)) {

        return {
            descricao: "Pancadas de chuva",
            icone: "🌧️"
        };

    }

    if ([85, 86].includes(codigo)) {

        return {
            descricao: "Pancadas de neve",
            icone: "🌨️"
        };

    }

    if ([95, 96, 99].includes(codigo)) {

        return {
            descricao: "Tempestade",
            icone: "⛈️"
        };

    }

    return {
        descricao: "Condição não identificada",
        icone: "🌤️"
    };
}


function formatarData(data) {

    const partes =
        data.split("T")[0].split("-");

    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );
}


function formatarDia(data) {

    const partes =
        data.split("-");

    const dataObjeto =
        new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            Number(partes[2])
        );

    const hoje =
        new Date();

    if (
        dataObjeto.getDate() === hoje.getDate() &&
        dataObjeto.getMonth() === hoje.getMonth() &&
        dataObjeto.getFullYear() === hoje.getFullYear()
    ) {

        return "Hoje";
    }

    const dia =
        dataObjeto.toLocaleDateString(
            "pt-BR",
            {
                weekday: "short"
            }
        );

    return (
        dia.charAt(0).toUpperCase() +
        dia.slice(1)
    );
}


function mostrarMensagem(texto, tipo) {

    mensagem.textContent =
        texto;

    mensagem.className =
        "mensagem " + tipo;
}