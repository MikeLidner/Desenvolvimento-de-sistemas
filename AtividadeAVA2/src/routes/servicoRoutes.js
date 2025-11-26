const express = require("express");
const router = express.Router();
const servicoController = require("../controllers/servicoController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, servicoController.listar);
router.post("/", auth, servicoController.criar);
router.put("/:id", auth, servicoController.atualizar);
router.delete("/:id", auth, servicoController.excluir);

module.exports = router;