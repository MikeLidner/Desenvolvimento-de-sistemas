let texto = document.getElementById("texto")

function toggleTexto(){
    if (texto.style.display === "none"){
        texto.style.display = "block";
        texto.innerHTML = "Agora o texto que aparece é outro";
    }  else{
        texto.style.display = "none";
    }
}