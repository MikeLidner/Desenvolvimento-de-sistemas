const pool = require("../config/db");

exports.listar = async (req, res) => {
    const busca = req.query.busca ?? "";
    const [rows] = await pool.query(
        "SELECT * FROM clientes WHERE nome LIKE ? ORDER BY id DESC",
        [`%${busca}%`]
    );
    res.json(rows);
};

exports.criar = async (req, res) => {
    const { nome, telefone, endereco } = req.body;

    if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });

    const [result] = await pool.query(
        "INSERT INTO clientes (nome, telefone, endereco) VALUES (?, ?, ?)",
        [nome, telefone, endereco]
    );

    res.json({ id: result.insertId, nome, telefone, endereco });
};

exports.atualizar = async (req, res) => {
    const { nome, telefone, endereco } = req.body;

    if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });

    await pool.query(
        "UPDATE clientes SET nome=?, telefone=?, endereco=? WHERE id=?",
        [nome, telefone, endereco, req.params.id]
    );

    res.json({ msg: "Atualizado com sucesso" });
};

exports.excluir = async (req, res) => {
    await pool.query("DELETE FROM clientes WHERE id=?", [req.params.id]);
    res.json({ msg: "Excluído com sucesso" });
};