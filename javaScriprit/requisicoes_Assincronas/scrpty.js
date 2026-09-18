// 
fetch("https://jsonplaceholder.typicode.com/users")
    .then(resposta) => resposta.json())
    .then(dados => {
        console.log(dados);
    })
.catch(erro => {
    console.log("Ocorreu um erro: " , erro);
})