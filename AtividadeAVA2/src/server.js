const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const servicoRoutes = require("./routes/servicoRoutes");
const profissionalRoutes = require("./routes/profissionalRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/clientes", clienteRoutes);
app.use("/servicos", servicoRoutes);
app.use("/profissionais", profissionalRoutes);
app.use("/agendamentos", agendamentoRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));