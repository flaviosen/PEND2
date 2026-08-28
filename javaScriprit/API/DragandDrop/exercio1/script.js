// Produto que está sendo arrastado
let produtoArrastado = null;


// Seleciona os produtos
const produtos = document.querySelectorAll(".produto");


// Seleciona o carrinho
const carrinho = document.getElementById("carrinho");


// Área onde os produtos serão adicionados
const itensCarrinho = document.getElementById("itensCarrinho");


// Área da mensagem
const mensagem = document.getElementById("mensagem");


// ------------------------------------
// DRAGSTART
// ------------------------------------

produtos.forEach(function(produto) {

    produto.addEventListener("dragstart", function(event) {

        // Guarda o produto que está sendo arrastado
        produtoArrastado = produto;

        // Deixa o produto transparente
        produto.style.opacity = "0.5";

        // Guarda o nome do produto
        event.dataTransfer.setData(
            "text/plain",
            produto.dataset.produto
        );

    });


    // ------------------------------------
    // DRAGEND
    // ------------------------------------

    produto.addEventListener("dragend", function() {

        // Volta a aparência normal
        produto.style.opacity = "1";

        // Remove o destaque do carrinho
        carrinho.classList.remove("drag-over");

    });

});


// ------------------------------------
// DRAGOVER
// ------------------------------------

carrinho.addEventListener("dragover", function(event) {

    // Permite que o produto seja solto
    event.preventDefault();

    // Feedback visual
    carrinho.classList.add("drag-over");

});


// ------------------------------------
// DRAGLEAVE
// ------------------------------------

carrinho.addEventListener("dragleave", function() {

    // Remove o feedback visual
    carrinho.classList.remove("drag-over");

});


// ------------------------------------
// DROP
// ------------------------------------

carrinho.addEventListener("drop", function(event) {

    // Impede o comportamento padrão
    event.preventDefault();

    // Remove o destaque
    carrinho.classList.remove("drag-over");


    // Verifica se existe um produto sendo arrastado
    if (produtoArrastado !== null) {

        // Pega o nome do produto
        const nomeProduto =
            produtoArrastado.dataset.produto;


        // Remove a mensagem "Arraste um produto para cá"
        const vazio =
            document.querySelector(".vazio");

        if (vazio) {
            vazio.remove();
        }


        // Cria um novo elemento
        const novoItem =
            document.createElement("div");


        // Adiciona a classe CSS
        novoItem.classList.add("item-carrinho");


        // Coloca o nome do produto
        novoItem.textContent =
            "✅ " + nomeProduto;


        // Adiciona o produto ao carrinho
        itensCarrinho.appendChild(novoItem);


        // Remove o produto da lista
        produtoArrastado.remove();


        // Mostra mensagem
        mensagem.textContent =
            nomeProduto +
            " foi adicionado ao carrinho!";


        // Limpa a variável
        produtoArrastado = null;


        // Remove a mensagem depois de 3 segundos
        setTimeout(function() {

            mensagem.textContent = "";

        }, 3000);

    }

});
