const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "black";
ctx.lineWidth = 5;

// Cabeça
ctx.beginPath();
ctx.arc(250, 100, 30, 0, Math.PI * 2);
ctx.stroke();

// Corpo
ctx.beginPath();
ctx.moveTo(250, 130);
ctx.lineTo(250, 270);
ctx.stroke();

// Braço esquerdo flexionado
ctx.beginPath();

ctx.moveTo(250, 170); // Ombro
ctx.lineTo(190, 220); // Cotovelo
ctx.lineTo(290, 280); // Mão

ctx.stroke();
// Braço direito
ctx.beginPath();
ctx.moveTo(250, 170);
ctx.lineTo(320, 220);
ctx.lineTo(340, 110);
ctx.stroke();

// Perna esquerda flexionada
ctx.beginPath();

ctx.moveTo(250, 270); // Começa no centro do corpo
ctx.lineTo(210, 320); // Joelho vai para a esquerda
ctx.lineTo(210, 370); // Pé volta para o centro

ctx.stroke();

// Perna direita flexionada
ctx.beginPath();

ctx.moveTo(250, 270); // Começa no centro do corpo
ctx.lineTo(290, 320); // Joelho vai para a direita
ctx.lineTo(290, 370); // Pé volta para o centro

ctx.stroke();