const pool = require("../config/db");
const { haConflito } = require("../services/conflitoService");

exports.listar = async (req, res) => {
    const [rows] = await pool.query(`
        SELECT a.*, 
               c.nome AS cliente, 
               s.nome AS servico, 
               p.nome AS profissional
        FROM agendamentos a
        JOIN clientes c ON c.id = a.clienteId
        JOIN servicos s ON s.id = a.servicoId
        JOIN profissionais p ON p.id = a.profissionalId
        ORDER BY a.data ASC
    `);
    res.json(rows);
};

exports.criar = async (req, res) => {
    const { clienteId, servicoId, profissionalId, data, duracao } = req.body;

    if (!clienteId || !servicoId || !profissionalId)
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });

    const inicio = new Date(data);

    if (await haConflito(profissionalId, inicio, duracao))
        return res.status(400).json({ erro: "Conflito na agenda do profissional" });

    const [result] = await pool.query(
        `INSERT INTO agendamentos 
        (clienteId, servicoId, profissionalId, data, duracao, status)
        VALUES (?, ?, ?, ?, ?, 'agendado')`,
        [clienteId, servicoId, profissionalId, inicio, duracao]
    );

    res.json({ id: result.insertId });
};

exports.atualizarStatus = async (req, res) => {
    const { status } = req.body;

    const validos = ["agendado", "concluído", "cancelado"];
    if (!validos.includes(status))
        return res.status(400).json({ erro: "Status inválido" });

    await pool.query(
        "UPDATE agendamentos SET status=? WHERE id=?",
        [status, req.params.id]
    );

    res.json({ msg: "Status atualizado" });
};