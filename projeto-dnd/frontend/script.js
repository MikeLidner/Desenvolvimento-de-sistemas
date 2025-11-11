const btnBuscar = document.getElementById("btnBuscar");
const input = document.getElementById("monsterName");
const card = document.getElementById("monsterCard");

btnBuscar.addEventListener("click", async () => {
  const nome = input.value.trim().toLowerCase();
  if (!nome) return alert("Digite o nome de um monstro.");

  try {
    const res = await fetch(`http://localhost:3000/api/monsters/${nome}`);
    if (!res.ok) throw new Error("Monstro não encontrado.");
    const monster = await res.json();

    card.classList.remove("hidden");
    card.innerHTML = `
      <h2>${monster.nome}</h2>
      <img src="${monster.imagem}" alt="${monster.nome}">
      <p><strong>Tipo:</strong> ${monster.tipo}</p>
      <p><strong>AC:</strong> ${monster.classeDeArmadura}</p>
      <p><strong>HP:</strong> ${monster.pontosDeVida}</p>
      <p><strong>Força:</strong> ${monster.força}</p>
      <p><strong>Destreza:</strong> ${monster.destreza}</p>
      <button onclick="favoritar('${monster.nome}')">⭐ Favoritar</button>
    `;
  } catch (err) {
    alert(err.message);
    card.classList.add("hidden");
  }
});

async function favoritar(nome) {
  const res = await fetch("http://localhost:3000/api/monsters/favoritos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome }),
  });
  const data = await res.json();
  alert(data.message);
}