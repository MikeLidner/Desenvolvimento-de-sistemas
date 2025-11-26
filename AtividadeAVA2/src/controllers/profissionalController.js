const pool = require("../config/db");

exports.listar = async (req, res) => {
    try {
        const busca = req.query.busca ?? "";

        const [rows] = await pool.query(
            "SELECT * FROM profissionais WHERE nome LIKE ? ORDER BY id DESC",
            [`%${busca}%`]
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao listar profissionais" });
    }
};

exports.criar = async (req, res) => {
    try {
        const { nome, especialidade } = req.body;

        if (!nome)
            return res.status(400).json({ erro: "Nome é obrigatório" });

        const [result] = await pool.query(
            "INSERT INTO profissionais (nome, especialidade) VALUES (?, ?)",
            [nome, especialidade]
        );

        res.json({
            id: result.insertId,
            nome,
            especialidade
        });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao cadastrar profissional" });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const { nome, especialidade } = req.body;

        if (!nome)
            return res.status(400).json({ erro: "Nome é obrigatório" });

        await pool.query(
            "UPDATE profissionais SET nome=?, especialidade=? WHERE id=?",
            [nome, especialidade, req.params.id]
        );

        res.json({ msg: "Profissional atualizado com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar profissional" });
    }
};

exports.excluir = async (req, res) => {
    try {
        await pool.query("DELETE FROM profissionais WHERE id=?", [
            req.params.id
        ]);

        res.json({ msg: "Profissional excluído com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao excluir profissional" });
    }
};