import express from "express";
import fetch from "node-fetch";
import fs from "fs";

const router = express.Router();
const DND_API = "https://www.dnd5eapi.co/api/monsters";

router.get("/", async (req, res) => {
  try {
    const response = await fetch(DND_API);
    const data = await response.json();

    const limited = data.results.slice(0, 10);
    res.json(limited);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar monstros." });
  }
});


router.get("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const response = await fetch(`${DND_API}/${name.toLowerCase()}`);
    if (!response.ok) throw new Error("Monstro não encontrado.");

    const monster = await response.json();
    const result = {
      nome: monster.name,
      tipo: monster.type,
      classeDeArmadura: monster.armor_class?.[0]?.value,
      pontosDeVida: monster.hit_points,
      velocidade: monster.speed.walk,
      força: monster.strength,
      destreza: monster.dexterity,
      inteligência: monster.intelligence,
      imagem: `https://www.dnd5eapi.co${monster.image}`,
    };
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.post("/favoritos", (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ error: "Nome é obrigatório." });

  const filePath = "./backend/data/favorites.json";
  const data = JSON.parse(fs.readFileSync(filePath));
  if (!data.includes(nome)) {
    data.push(nome);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
  res.json({ message: "Favorito adicionado com sucesso!", favoritos: data });
});

export default router;