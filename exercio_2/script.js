class Produto {

    constructor(nome, preco, categoria, desconto) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.desconto = desconto;
    }

    //Métodos

    aplicarDesconto() {
        this.preco = this.preco - (this.preco * this.desconto / 100);
    }

}

class Estoque {

    constructor() {
        this.produtos = [];

        this.carregarProdutos();
    }

    adicionarProduto(produto) {
        this.produtos.push(produto);
    }

    excluirProduto(index) {
        this.produtos.splice(index, 1);
        this.exibirNaTela();
        this.salvarProdutos();
    }

    salvarProdutos() {
        localStorage.setItem("produtos", JSON.stringify(this.produtos));
    }



    //Método para exibir os dados do produto ja com desconto na tela
    exibirNaTela() {
        const resultado = document.querySelector("#resultado");

        resultado.innerHTML = "";

        this.produtos.forEach((produto, index) => {
            resultado.innerHTML += `
                <p>Nome: ${produto.nome}</p>
                <p>Preço: ${produto.preco}</p>
                <p>Categoria: ${produto.categoria}</p>
                <p>Desconto: ${produto.desconto}%</p>
                <button onclick="estoque.excluirProduto(${index})">Excluir Produto</button>
            `;
        })
    }

    carregarProdutos() {
        const dados = localStorage.getItem("produtos");

        if (dados) {
            const produtosSalvos = JSON.parse(dados);

            this.produtos = produtosSalvos;
        };
    };
};

const estoque = new Estoque();


const nome = document.querySelector("#nome");
const preco = document.querySelector("#preco");
const categoria = document.querySelector("#categoria");
const desconto = document.querySelector("#desconto");
const botaoCadastrar = document.querySelector("#botaoCadastrar");


botaoCadastrar.addEventListener("click", function() {

    const produto = new Produto(nome.value, preco.value, categoria.value, desconto.value);

    produto.aplicarDesconto();
    estoque.adicionarProduto(produto);
    estoque.exibirNaTela();
    estoque.salvarProdutos();
});

estoque.exibirNaTela();