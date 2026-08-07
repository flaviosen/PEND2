// Importa a classe Aluno do arquivo Aluno.js
const Aluno = require('./Aluno.js');

// 1. Criar os 3 objetos (instâncias da classe Aluno)
const aluno1 = new Aluno("Ana Silva", 20, "Engenharia de Software", "2024001");
const aluno2 = new Aluno("Lucas Souza", 22, "Ciência da Computação", "2024002");
const aluno3 = new Aluno("Mariana Costa", 19, "Sistemas de Informação", "2024003");

// 2. Testar os métodos para o aluno1
console.log("--- Testando métodos para aluno1 ---");
aluno1.estudar();
aluno1.aprender();

// 3. Testar os métodos para o aluno2
console.log("\n--- Testando métodos para aluno2 ---");
aluno2.estudar();
aluno2.aprender();

// 4. Testar os métodos para o aluno3
console.log("\n--- Testando métodos para aluno3 ---");
aluno3.estudar();
aluno3.aprender();