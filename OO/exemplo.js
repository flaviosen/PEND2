//classe
class Carro {

    //atributos 
    //marca;
    //modelo;
    //ano;
    //cor;

    //método construtor
    constructor(marca, modelo, ano, cor) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
    }
     
    //
    ligar() {
        console.log("O carro está ligado");
    }
    //
    acelerar() {
        console.log("O carro está acelerando");
    }
    // 
    frear() {
        console.log(`${this.modelo} freiou`);
    }
}

//
const carro1 = new Carro("volkswagen", "gol", 2022, "branco");
console.log("carro1: ", carro1);

//
const carro2 = new Carro("toyota", "corrola", 2020, "preto");
console.log("carro2: ", carro2);

//
const carro3 = new Carro("ford", "ka", 2021, "vermelho");
console.log("carro3: ", carro3);

console.log("---------------------------------");
console.log("atributos do carro1");
console.log("-", carro1.ano);
console.log("-", carro1.cor);
console.log("-", carro1.marca);
console.log("-", carro1.modelo);
console.log("---------------------------------");

console.log("---------------------------------");
console.log("atributos do carro2");
console.log("-", carro2.ano);
console.log("-", carro2.cor);
console.log("-", carro2.marca);
console.log("-", carro2.modelo);
console.log("---------------------------------");

console.log("---------------------------------");
console.log("atributos do carro3");
console.log("-", carro3.ano);
console.log("-", carro3.cor);
console.log("-", carro3.marca);
console.log("-", carro3.modelo);
console.log("---------------------------------");

//
carro1.ligar();
//
carro1.acelerar();
//
carro1.frear();
//
carro2.ligar();
//
carro2.acelerar();
//
carro2.frear();
//
carro3.ligar();
//
carro3.acelerar();
//
carro3.frear();
