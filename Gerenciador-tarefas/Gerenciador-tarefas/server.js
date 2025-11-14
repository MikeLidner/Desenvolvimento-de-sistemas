import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const sessios = new Map();

function generateSessionsId(){
  return crypto.randomBytes(24).toString("hex");
}

const { Pool } = pg;
const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

function authenticate(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Sessão não informada");
  const session = sessions.get(token);
  if (!session) return res.status(401).send("Sessão invalida");
  req.user = { id: session.userId, email: session.email};
  next();
}

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha)
    return res.status(400).send("Email e senha são obrigatorios");
  try{
    const [rows] = await db.query(
      "SELECT id, nome, email, senha FROM usuarios Where email = ?" ,
      [email]
    );
    if (rows.length === 0 || rows[0].senha !== senha)
      return res.status(401).send("Credenciais invalidas");
    const user = rows[0];
    const sessionId = generateSessionsId();
    sessions.set(sessionId, { userId: user.id, email: user.email});
    return res.send({
      sessionId,
      user: {id: user.id, nome: user.nome, email: user.email},
    });
  } catch (err) {
    return res.status(500).send("Erro interno do servidor");
  }
});

app.post("/logout", authenticate, (req, res) =>{
  const token = req.headers["authorization"];
  if (token && sessions.has(token)) sessios.delete(token);
  return res.sendStatus(204);
})

app.get("/usuarios", async (req, res) => {
  try{
    const { rows } = await pool.query("SELECT * FROM usuarios");
  res.json(rows);
  } catch(err){
    console.error('Erro ao buscar interno do servidor.');
    res.status(500).send('Erro interno do servidor.');
  }
});

app.post("/usuarios", async (req, res) => {
  const { nome, email } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *",
    [nome, email]
  );
  res.status(201).json(rows[0]);
});

app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  await pool.query("UPDATE usuarios SET nome=$1, email=$2 WHERE id=$3", [
    nome,
    email,
    id,
  ]);
  res.json({ mensagem: "Usuário atualizado com sucesso!" });
});

app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM usuarios WHERE id=$1", [id]);
  res.json({ mensagem: "Usuário excluído!" });
});

app.get("/usuarios/:id/tarefas", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT * FROM tarefas WHERE usuario_id=$1", [id]);
  res.json(rows);
});

app.get("/tarefas/:id/categorias", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(`
    SELECT c.* FROM categorias c
    JOIN tarefas_categorias tc ON tc.categoria_id = c.id
    WHERE tc.tarefa_id = $1
  `, [id]);
  res.json(rows);
});

app.get("/categorias/:id/tarefas", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(`
    SELECT t.* FROM tarefas t
    JOIN tarefas_categorias tc ON tc.tarefa_id = t.id
    WHERE tc.categoria_id = $1
  `, [id]);
  res.json(rows);
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});