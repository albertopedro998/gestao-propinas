const { Router } = require("express");
const router = new Router();

const Pagamento = require("./backend/controllers/PagamentoController.js");
const PagamentoMiddleware = require("./backend/middlewares/PagamentoMiddleware.js");

const Aluno = require("./backend/controllers/AlunoController.js");
const AlunoMiddleware = require("./backend/middlewares/AlunoMiddleware.js");

const Turma = require("./backend/controllers/TurmaController.js");
const TurmaMiddleware = require("./backend/middlewares/TurmaMiddleware.js");

const Propina = require("./backend/controllers/PropinaController.js");
const PropinaMiddleware = require("./backend/middlewares/PropinaMiddleware.js");

const Letivo = require("./backend/controllers/LetivoController.js");
const LetivoMiddleware = require("./backend/middlewares/LetivoMiddleware.js");

const Funcionario = require("./backend/controllers/FuncionarioController.js");
const FuncionarioMiddleware = require("./backend/middlewares/FuncionarioMiddleware.js");

const Usuario = require("./backend/controllers/UsuarioController.js");
const UsuarioMiddleware = require("./backend/middlewares/UsuarioMiddleware.js");

const Endereco = require("./backend/controllers/EnderecoController.js");
const enderecoMiddle = require("./backend/middlewares/EnderecoMiddleware.js");

//ROTAS ENDERECOS
router.get("/address", Endereco.index);
router.get("/address/:id", Endereco.show);
router.post("/address", enderecoMiddle.validateEndereco, Endereco.create);
router.put("/address/:id", enderecoMiddle.validateUpdate, Endereco.update);
router.delete("/address/:id", Endereco.destroy);

//ROTAS PARA USUÁRIOS
router.get("/usuarios", Usuario.index);
router.get("/usuarios/:id", Usuario.show);
router.post("/usuarios", UsuarioMiddleware.validateUser, Usuario.create);
router.put("/usuarios/:id", UsuarioMiddleware.validateUpdate, Usuario.update);
router.delete("/usuarios/:id", Usuario.destroy);

//ROTAS PARA FUNCIONARIOS
router.get("/funcionarios", Funcionario.index);
router.get("/funcionarios/:id", Funcionario.show);
router.post(
  "/funcionarios",
  FuncionarioMiddleware.validateCreate,
  Funcionario.create
);
router.put(
  "/funcionarios/:id",
  FuncionarioMiddleware.validateUpdate,
  Funcionario.update
);
router.delete("/funcionarios/:id", Funcionario.destroy);

//ROTAS PARA ALUNOS
router.get("/alunos", Aluno.index);
router.get("/alunos/:id", Aluno.show);
router.post("/alunos", AlunoMiddleware.validateCreate, Aluno.create);
router.put("/alunos/:id", AlunoMiddleware.validateUpdate, Aluno.update);
router.delete("/alunos/:id", Aluno.destroy);

//ROTAS PARA ANO-LETIVO
router.get("/ano-letivo", Letivo.index);
router.get("/ano-letivo/:id", Letivo.show);
router.post("/ano-letivo", LetivoMiddleware.validateCreate, Letivo.create);
router.put("/ano-letivo/:id", LetivoMiddleware.validateUpdate, Letivo.update);
router.delete("/ano-letivo/:id", Letivo.destroy);

//ROTAS PARA PROPINAS
router.get("/propinas", Propina.index);
router.get("/propinas/:id", Propina.show);
router.post("/propinas", PropinaMiddleware.validateCreate, Propina.create);
router.put("/propinas/:id", PropinaMiddleware.validateUpdate, Propina.update);
router.delete("/propinas/:id", Propina.destroy);

//ROTAS PARA PAGAMENTOS
router.get("/pagamentos", Pagamento.index);
router.get("/pagamentos/:id", Pagamento.show);
router.post(
  "/pagamentos",
  PagamentoMiddleware.validateCreate,
  Pagamento.create
);
router.put(
  "/pagamentos/:id",
  PagamentoMiddleware.validateUpdate,
  Pagamento.update
);
router.delete("/pagamentos/:id", Pagamento.destroy);

//ROTAS PARA TURMAS
router.get("/turmas", Turma.index);
router.get("/turmas/:id", Turma.show);
router.post("/turmas", TurmaMiddleware.validateCreate, Turma.create);
router.put("/turmas/:id", TurmaMiddleware.validateUpdate, Turma.update);
router.delete("/turmas/:id", Turma.destroy);

module.exports = router;
