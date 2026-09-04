// ==========================================
// CHECK-IN DE EVENTO
// ==========================================


// ==========================================
// GEOLOCATION
// ==========================================

const btnLocalizacao =
    document.getElementById("btnLocalizacao");

btnLocalizacao.addEventListener(
    "click",
    obterLocalizacao
);


function obterLocalizacao() {

    const mensagem =
        document.getElementById(
            "mensagemLocalizacao"
        );


    if (!navigator.geolocation) {

        mensagem.textContent =
            "Seu navegador não suporta Geolocation.";

        mensagem.className = "erro";

        return;
    }


    mensagem.textContent =
        "Obtendo sua localização...";


    navigator.geolocation.getCurrentPosition(

        function (posicao) {

            const latitude =
                posicao.coords.latitude;

            const longitude =
                posicao.coords.longitude;

            const precisao =
                posicao.coords.accuracy;


            document.getElementById(
                "latitude"
            ).textContent =
                latitude.toFixed(6);


            document.getElementById(
                "longitude"
            ).textContent =
                longitude.toFixed(6);


            document.getElementById(
                "precisao"
            ).textContent =
                precisao.toFixed(2) + " m";


            mensagem.textContent =
                "✓ Localização confirmada.";

            mensagem.className =
                "sucesso";
        },


        function (erro) {

            mensagem.className = "erro";


            if (
                erro.code ===
                erro.PERMISSION_DENIED
            ) {

                mensagem.textContent =
                    "Permissão de localização recusada.";

            } else if (
                erro.code ===
                erro.POSITION_UNAVAILABLE
            ) {

                mensagem.textContent =
                    "Localização indisponível.";

            } else if (
                erro.code ===
                erro.TIMEOUT
            ) {

                mensagem.textContent =
                    "Tempo limite excedido.";

            } else {

                mensagem.textContent =
                    "Erro ao obter localização.";

            }

        }

    );

}


// ==========================================
// CÂMERA
// ==========================================

const btnCamera =
    document.getElementById("btnCamera");

btnCamera.addEventListener(
    "click",
    abrirCamera
);


async function abrirCamera() {

    const video =
        document.getElementById("camera");

    const mensagem =
        document.getElementById(
            "mensagemCamera"
        );


    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({

                video: true,

                audio: false

            });


        video.srcObject = stream;


        mensagem.textContent =
            "✓ Câmera ativada.";

        mensagem.className =
            "sucesso";

    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            "Não foi possível acessar a câmera.";

        mensagem.className =
            "erro";
    }

}
