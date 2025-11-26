const express = require("express");
const router = express.Router();
const profissionalController = require("../controllers/profissionalController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, profissionalController.listar);
router.post("/", auth, profissionalController.criar);
router.put("/:id", auth, profissionalController.atualizar);
router.delete("/:id", auth, profissionalController.excluir);

module.exports = router;