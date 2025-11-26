const pool = require("../config/db");

exports.listar = async (req, res) => {
    try {
        const busca = req.query.busca ?? "";

        const [rows] = await pool.query(
            "SELECT * FROM servicos WHERE nome LIKE ? ORDER BY id DESC",
            [`%${busca}%`]
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao listar serviços" });
    }
};

exports.criar = async (req, res) => {
    try {
        const { nome, duracao, valor } = req.body;

        if (!nome)
            return res.status(400).json({ erro: "Nome é obrigatório" });

        if (!duracao || duracao <= 0)
            return res.status(400).json({ erro: "Duração inválida" });

        if (!valor || valor <= 0)
            return res.status(400).json({ erro: "Valor inválido" });

        const [result] = await pool.query(
            "INSERT INTO servicos (nome, duracao, valor) VALUES (?, ?, ?)",
            [nome, duracao, valor]
        );

        res.json({
            id: result.insertId,
            nome,
            duracao,
            valor
        });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao cadastrar serviço" });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const { nome, duracao, valor } = req.body;

        if (!nome)
            return res.status(400).json({ erro: "Nome é obrigatório" });

        if (!duracao || duracao <= 0)
            return res.status(400).json({ erro: "Duração inválida" });

        if (!valor || valor <= 0)
            return res.status(400).json({ erro: "Valor inválido" });

        await pool.query(
            "UPDATE servicos SET nome=?, duracao=?, valor=? WHERE id=?",
            [nome, duracao, valor, req.params.id]
        );

        res.json({ msg: "Serviço atualizado com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar serviço" });
    }
};

exports.excluir = async (req, res) => {
    try {
        await pool.query("DELETE FROM servicos WHERE id=?", [
            req.params.id
        ]);

        res.json({ msg: "Serviço excluído com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao excluir serviço" });
    }
};