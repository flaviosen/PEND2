// ==========================
// GEOLOCATION
// ==========================

function obterLocalizacao() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            function (posicao) {

                const latitude = posicao.coords.latitude;
                const longitude = posicao.coords.longitude;
                const precisao = posicao.coords.accuracy;

                document.getElementById("latitude").innerText =
                    "Latitude: " + latitude;

                document.getElementById("longitude").innerText =
                    "Longitude: " + longitude;

                document.getElementById("precisao").innerText =
                    "Precisão: " + precisao + " metros";
            },

            function () {
                alert("Não foi possível obter a localização.");
            }
        );

    } else {
        alert("Geolocation não é suportada pelo navegador.");
    }
}


// ==========================
// CÂMERA
// ==========================

navigator.mediaDevices.getUserMedia({
    video: true
})

.then(function (stream) {

    const video = document.getElementById("camera");

    video.srcObject = stream;

})

.catch(function (erro) {

    console.log("Não foi possível acessar a câmera:", erro);

});


// ==========================
// TIRAR FOTO
// ==========================

function tirarFoto() {

    const video = document.getElementById("camera");
    const canvas = document.getElementById("foto");

    const contexto = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    contexto.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );
}