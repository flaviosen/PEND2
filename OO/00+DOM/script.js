class Produto {
    constructor(nome, preco, categoria, desconto) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.desconto = desconto;
    }

    aplicarDesconto() {
        return this.preco - (this.preco * this.desconto / 100);
    }

    exibir(index) {
        const precoFinal = this.aplicarDesconto();

        return `
            <div>
                <h2>Produto cadastrado:</h2>

                <p><strong>Nome:</strong> ${this.nome}</p>

                <p><strong>Preço original:</strong> R$ ${this.preco.toFixed(2)}</p>

                <p><strong>Categoria:</strong> ${this.categoria}</p>

                <p><strong>Desconto:</strong> ${this.desconto}%</p>

                <p><strong>Preço com desconto:</strong> R$ ${precoFinal.toFixed(2)}</p>

                <button type="button" onclick="excluirProduto(${index})">
                    Excluir
                </button>

                <hr>
            </div>
        `;
    }
}

const formulario = document.getElementById("formProduto");
const resultado = document.getElementById("resultado");

const produtos = [];

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = Number(document.getElementById("preco").value);
    const categoria = document.getElementById("categoria").value;
    const desconto = Number(document.getElementById("desconto").value);

    const produto = new Produto(
        nome,
        preco,
        categoria,
        desconto
    );

    produtos.push(produto);

    mostrarProdutos();

    formulario.reset();
});

function mostrarProdutos() {
    resultado.innerHTML = "";

    produtos.forEach(function(produto, index) {
        resultado.innerHTML += produto.exibir(index);
    });
}

function excluirProduto(index) {
    produtos.splice(index, 1);

    mostrarProdutos();
}
