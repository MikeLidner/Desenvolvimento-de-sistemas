const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

bcrypt.hash("1234", 10, (err, hash) => {
    if (err) throw err;
    console.log(hash);
  });

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        const user = rows[0];

        if (!user) return res.status(400).json({ erro: "Usuário não encontrado" });

        const ok = await bcrypt.compare(senha, user.senha);
        if (!ok) return res.status(400).json({ erro: "Senha incorreta" });

        const token = jwt.sign(
            { id: user.id, nome: user.nome },
            "segredo",
            { expiresIn: "8h" }
        );

        res.json({ token, nome: user.nome });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: "Erro interno no servidor" });
    }
}