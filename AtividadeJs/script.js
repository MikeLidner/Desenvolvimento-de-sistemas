let troca = document.getElementById("troca");
let titulo = document.getElementById("titulo");
let trocarTitulo = true;
let paragrafo = document.getElementById("paragrafo")
let mudanca = document.getElementById("mudanca")

troca.addEventListener("click", () =>{
    if(trocarTitulo){
        titulo.innerText= "Abertura xadrez"
        trocarTitulo = false;
    } else {
    titulo.innerText= "Abertura Francesa"
    trocarTitulo = true
}
});

mudanca.addEventListener("click", () =>{
    if(mudanca){
        paragrafo.innerText = "O Gambito da Dama (ou Rainha) é uma abertura de xadrez clássica que começa com os lances 1. d4 d5 2. c4. As brancas oferecem o peão c4 como um gambito para obter vantagem no centro do tabuleiro, buscando controlar a casa central e abrir o jogo para um desenvolvimento mais agressivo. As pretas podem aceitar o gambito (Gambito da Dama Aceito) ou recusá-lo, sendo a recusa mais comum."
        mudanca=false;
    } else{
        paragrafo.innerText = "A Defesa Francesa é uma abertura de xadrez sólida e estratégica para as Pretas, iniciada com os lances 1. e4 e6 e geralmente seguindo com 2. d4 d5. A abertura cria uma cadeia de peões forte no centro, mas o peão em e6 pode bloquear o bispo das Pretas, resultando em uma posição inicial apertadaAs estratégias comuns para as Pretas incluem contra-ataques com ...c5 e ...f6 para desafiar o centro das Brancas, além de buscar o desenvolvimento das peças no lado da dama e contra-atacar na ala do rei"
        mudanca= true
    }
});