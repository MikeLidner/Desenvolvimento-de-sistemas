const express = require("express");
const router = express.Router();

const agendamentoController = require("../controllers/agendamentoController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, agendamentoController.listar);

router.post("/", auth, agendamentoController.criar);


router.patch("/:id/status", auth, agendamentoController.atualizarStatus);

module.exports = router;