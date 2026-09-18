const botao = document.querySelector("#consultar");
const resultado = document.querySelector("#resultado");

botao.addEventListener("click", consultarPokemon);

async function consultarPokemon() {

    const nome = document.querySelector("#pokemon").value.toLowerCase();

    if (nome === "") {
        resultado.innerHTML = "<p class='erro'>Digite o nome de um Pokémon.</p>";
        return;
    }

    resultado.innerHTML = "<p>Consultando...</p>";

    try {

        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nome}`
        );

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado.");
        }

        const dados = await resposta.json();

        resultado.innerHTML = `
            <h2>${dados.name.toUpperCase()}</h2>

            <img src="${dados.sprites.front_default}" alt="${dados.name}">

            <p><strong>ID:</strong> ${dados.id}</p>

            <p><strong>Altura:</strong> ${dados.height / 10} m</p>

            <p><strong>Peso:</strong> ${dados.weight / 10} kg</p>

            <p><strong>Tipo:</strong> ${dados.types[0].type.name}</p>
        `;

    } catch (erro) {

        resultado.innerHTML = `
            <p class="erro">
                Erro: ${erro.message}
            </p>
        `;
    }
}