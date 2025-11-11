import express from "express";
import cors from "cors";
import monsterRoutes from "./routes/monsters.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/monsters", monsterRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
