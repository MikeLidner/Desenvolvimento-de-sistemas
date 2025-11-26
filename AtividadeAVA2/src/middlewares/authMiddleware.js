const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ erro: "Token não informado" });

    try {
        req.user = jwt.verify(token, "segredo");
        next();
    } catch {
        return res.status(401).json({ erro: "Token inválido" });
    }
};