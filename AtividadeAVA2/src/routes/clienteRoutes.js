const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, clienteController.listar);
router.post("/", auth, clienteController.criar);
router.put("/:id", auth, clienteController.atualizar);
router.delete("/:id", auth, clienteController.excluir);

module.exports = router;