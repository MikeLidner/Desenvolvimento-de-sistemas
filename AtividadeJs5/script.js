let imagem = document.getElementById("imagem");

function trocarImagem() {
    // Verifica qual imagem está sendo exibida e troca para a outra
    if (imagem.src.includes("https://pbs.twimg.com/media/Evlvy5vWgAA8o3j.jpg")) {
        imagem.src = "https://i.pinimg.com/1200x/9c/27/03/9c27033b17ef1e60cc30200c82be17d3.jpg";  // Altere para o caminho da segunda imagem
    } else {
        imagem.src = "https://pbs.twimg.com/media/Evlvy5vWgAA8o3j.jpg";  // Altere para o caminho da primeira imagem
    }
}