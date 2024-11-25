var engine = {
    "cores" : ['green','purple', 'pink', 'red', 'yellow', 'orange', 'grey', 'black'],
    "hexadecimais" : {
        'green': '#02EF00',
        'purple': '#790093',
        'pink' : '#F02A7E',
        'red' : '#E90808',
        'yellow' : '#E7D703',
        'black' : '#141414',
        'orange' : '#F16529',
        'grey' : '#EBEBEB',
    },
    "moedas": 0
}

const audioMoeda = new Audio('audio/audio_moeda.mp3')
const audioErrou =  new Audio('audio/audio_errou.mp3')

function sortearCor(){
    var indexCorSorteada = Math.floor(Math.random() * engine.cores.length)
    var corDaCaixa = document.getElementById('cor-caixa');
    var nomeCorSorteada = engine.cores[indexCorSorteada];

    corDaCaixa.innerText = nomeCorSorteada;

    return engine.hexadecimais[nomeCorSorteada];
}

function aplicarCorNaCaixa(nomeDaCor){
    var caixaDasCores = document.getElementById('cor-atual');

    caixaDasCores.style.backgroundColor = nomeDaCor;
    caixaDasCores.style.backgroundImage = "url('/img/caixa-fechada.png')";
    caixaDasCores.style.backgroundSize = "100%";
}

function atualizarPontuacao(valor){
    var pontuacao = document.getElementById('potuacao-atual')

    engine.moedas += valor;

    if(valor < 0){
        audioErrou.play();
    }else{
        audioMoeda.play();
    }  

    pontuacao.innerText = engine.moedas;
}

aplicarCorNaCaixa(sortearCor())

// API DE RECONHECIMENTO DE VOZ 

var btnGravador = document.getElementById("btn-responder")
var transcricicaoAudio = "";
var respostaCorreta = "";

if(window.SpeechRecognition || window.webkitSpeechRecognition){

    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition ;
    var gravador =  new SpeechAPI();

    // REGRA DO GRAVADOR

    gravador.continuous = false;
    gravador.lang = "en-US";

    gravador.onstart = function(){
        btnGravador.innerText = "Estou ouvindo";
        btnGravador.style.backgroundColor = "white";
        btnGravador.style.color = "black";
    }

    gravador.onend = function(){
        btnGravador.innerText = "Responder";
        btnGravador.style.backgroundColor = "transparent";
        btnGravador.style.color = "white" ;
    }

    gravador.onresult = function(event){
        transcricicaoAudio = event.results[0][0].transcript.trim().toUpperCase().replace(/[^A-Z]/g, '');
        respostaCorreta = document.getElementById("cor-caixa").innerText.trim().toUpperCase().replace(/[^A-Z]/g, '');

        console.log("Transcrição de Áudio:", transcricicaoAudio);
        console.log("Resposta Correta:", respostaCorreta);


        if(transcricicaoAudio === respostaCorreta){
            console.log("Correta");
            atualizarPontuacao(1);
        } else {
            console.log("Errada");
            atualizarPontuacao(-1);
        }

        aplicarCorNaCaixa(sortearCor());
    }

}else{
    alert("Não tem suporte")
}

btnGravador.addEventListener("click", function(e){
    gravador.start();
})
