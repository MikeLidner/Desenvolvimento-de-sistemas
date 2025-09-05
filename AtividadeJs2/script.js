let troca = document.getElementById("troca")
let trocarCor = document.getElementById("trocarCor")
let box = document.querySelector(".box")

troca.addEventListener("click", () =>{
    if(trocarCor){
        box.style.background= "purple"
        trocarCor = false;
    } else {
    box.style.background= "black"
    trocarCor = true
}
});