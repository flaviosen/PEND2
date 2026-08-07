// classe Aluno
class Aluno {

    // atributos:
    // nome;
    // idade;
    // curso;
    // matricula;

    // método construtor
    constructor(nome, idade, curso, matricula) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.matricula = matricula;
    }

    // métodos
    estudar() {
        console.log(`${this.nome} está estudando para as provas.`);
    }

    aprender() {
        console.log(`${this.nome} aprendeu um novo conteúdo em ${this.curso}!`);
    }
}

// Exporta a classe para ser utilizada em outros arquivos (Node.js)
module.exports = Aluno;