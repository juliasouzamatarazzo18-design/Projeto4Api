//DECLARAÇÕES DOS ELEMENTOS HTML PARA O DOM
const videoElemento = document.getElementById("video");
const botaoScanear= document.getElementById("btn-texto");
const resultado = document.getElementById("saida");
const canvas = document.getElementById("canvas");

//MÉTODO LIGAR CÂMERA
async function configurarCamera(){
    try{
        //solicita a permissão para acessar a câmera do usuário
        const midia= await navigator.midiaDevices.getUserMedia({
            //habilita a camera traseira do celular
            video:{facingMode:"environment"},
            audio:false
        });
        //atribui o fluxo da camera ao elemento de video para visualizar
        videoElemento.srcObject = midia;
        videoElemento.play();
    }catch(erro){
        resultado.innerText="Erro ao acessar a câmera" + erro.message;
    }
}
//executa a função para habilitar camera
configurarCamera();

//CAPTURAR E LER O TEXTO

botaoScanear.onclick = async()=>{
    //DESATIVA O BOTÃO PARA EVITAR MULTIPLOS CLIQUES
    botaoScanear.disabled = true;
    resultadi.innerText="fazendo a leitura...aguarde";

    //captura a imagem(foto)
    const contexto = canvas.getContext("2d");

    //Ajusta o tamanho do canvas interno para ser igual a do video
    canvas.widht = videoElemento.videoWidht;
    canvas.height = videoElemento.videoHeight;

    contexto.setTransform(1,0,0,1,0,0);

    contexto.filter='contrast(1.2) grayscale(1)';

    //desenha o frame atual do video dentreo do canvas(tira a foto)
    contexto.drawImage(videoElemento,0,0,canvas,canvas.height);

     //processando com a api Tesseract
    try{
        //função do tesserect
        const {data:{text}}= await Tesseract.recognize(
            canvas, //a imagem que acabou de capturar
            'por' // idioma em portugues
            
        );
         resultado.innerText = textoFinal.length > 0 ? textoFinal : "Não foi possível identificar o texto";

    }catch(erro){
        //resultado caso apresente um erro
        resultado.innerText="Erro no processamento" + erro.message;
    }
    finally{
        //habilita o botão para uma nova leitura
        botaoScanear.disabled=false;
    }
};