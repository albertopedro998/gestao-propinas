const { Usuario, Turma, Aluno, Pagamento } = require("../models");
const { Op } = require("sequelize");

const AlunoController = {
  async index(req, res) {
    const { query, sort, matricula } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 25;
    let where = {};
    let order = [];

    if (sort) {
      order = sort.split(";").split(":");
    }

    if (matricula) {
      where = {
        ...where,
        num_matricula: {
          [Op.like]: matricula,
        },
      };
    }
    res.json(
      await Aluno.findAll({
        include: [
          {
            model: Usuario,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Turma,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        where,
        order,
        limit,
        offset: (page - 1) * limit,
      })
    );
  },

  async show(req, res) {
    const { id } = req.params;

    const aluno = await Aluno.findByPk(id);
    if (aluno) {
      return res.json(aluno);
    }
    return res.status(401).json({ erro: "Aluno não encontrado" });
  },

  async create(req, res) {
    const aluno = req.body;
    try {
      await Aluno.create(aluno);
      return res.json({ mensagem: "Aluno criado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível criar" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      const aluno = await Aluno.findByPk(id);
      aluno.update(req.body);
      return res.json({
        mensagem: "Aluno atualizado com sucesso",
        aluno,
      });
    } catch (error) {
      return res.json({ erro: "Não foi possível atualizar" });
    }
  },

  async destroy(req, res) {
    const { id } = req.params;
    try {
      (await Aluno.findByPk(id)).destroy();
      return res.json({ mensagem: "Aluno deletado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível eliminar" });
    }
  },
};

module.exports = AlunoController;
