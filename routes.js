const {Router} = require("express")
const Usuario = require("./backend/controllers/UsuarioController.js")
const router = new Router()

router.get("/", Usuario.index)
router.post("/usuarios", Usuario.create)

module.exports = router