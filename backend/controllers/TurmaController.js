const { Turma, Letivo } = require("../models");
const { Op } = require("sequelize");

const TurmaController = {
  async index(req, res) {
    const { query, sort, nome, sala, classe, periodo, curso } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 25;
    let where = {};
    let order = [];

    if (sort) {
      order = sort.split(";").split(":");
    }

    if (sala) {
      where = {
        sala: {
          [Op.eq]: sala,
        },
      };
    }
    if (nome) {
      where = {
        ...where,
        nome: {
          [Op.like]: nome,
        },
      };
    }
    if (classe) {
      where = {
        ...where,
        classe: {
          [Op.like]: classe,
        },
      };
    }
    if (periodo) {
      where = {
        ...where,
        periodo: {
          [Op.like]: periodo,
        },
      };
    }
    if (curso) {
      where = {
        ...where,
        curso: {
          [Op.like]: curso,
        },
      };
    }
    res.json(
      await Turma.findAll({
        include: [{
          model: Letivo,
          attributes: ["dtInicio", "dtFim"]
        }],
        where,
        order,
        limit,
        offset: (page - 1) * limit,
      })
    );
  },

  async show(req, res) {
    const { id } = req.params;

    const user = await Turma.findByPk(id);
    if (user) {
      return res.json(user);
    }
    return res.status(401).json({ erro: "Turma não encontrado" });
  },

  async create(req, res) {
    const turma = req.body;
    try {
      await Turma.create(turma);
      return res.json({ mensagem: "Turma criado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível criar" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Turma.findByPk(id);
      usuario.update(req.body);
      return res.json({
        mensagem: "Turma atualizado com sucesso",
        usuario,
      });
    } catch (error) {
      return res.json({ erro: "Não foi possível atualizar" });
    }
  },

  async destroy(req, res) {
    const { id } = req.params;
    try {
      (await Turma.findByPk(id)).destroy();
      return res.json({ mensagem: "Turma deletado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível eliminar" });
    }
  },
};

module.exports = TurmaController;
