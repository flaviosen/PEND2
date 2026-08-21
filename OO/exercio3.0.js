// classe Produto
class Produto {

    // atributos:
    // nome;
    // preco;
    // estoque;

    // método construtor
    constructor(nome, preco, estoque) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    // métodos
    vender(quantidade) {
        if (this.estoque >= quantidade) {
            this.estoque -= quantidade;
            console.log(`Venda realizada: ${quantidade} unidade(s) de ${this.nome}. Estoque atual: ${this.estoque}`);
        } else {
            console.log(`Estoque insuficiente de ${this.nome}! Estoque atual: ${this.estoque}`);
        }
    }

    repor(quantidade) {
        this.estoque += quantidade;
        console.log(`Reposição efetuada: +${quantidade} unidade(s) de ${this.nome}. Estoque atual: ${this.estoque}`);
    }

    alterarPreco(novoPreco) {
        this.preco = novoPreco;
        console.log(`Preço do produto ${this.nome} alterado para: R$ ${this.preco.toFixed(2)}`);
    }
}

// Exporta a classe para ser utilizada em outros arquivos
module.exports = Produto