const { Turma, Letivo } = require("../models");
const { Op } = require("sequelize");

const LetivoController = {
  async index(req, res) {
    const { query, sort, dtInicio, dtFim } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 25;
    let where = {};
    let order = [];

    if (sort) {
      order = sort.split(";").split(":");
    }

    if (dtInicio && dtFim) {
      where = {
        ...where,
        dtInicio: {
          [Op.between]: [dtInicio, dtFim],
        },
      };
    }
    res.json(
      await Letivo.findAll({
        include: [
          {
            model: Turma,
            required: false,
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

    const user = await Letivo.findByPk(id);
    if (user) {
      return res.json(user);
    }
    return res.status(401).json({ erro: "Ano-letivo não encontrado" });
  },

  async create(req, res) {
    const usuario = req.body;
    try {
      await Letivo.create(usuario);
      return res.json({ mensagem: "Ano-letivo criado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível criar" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Letivo.findByPk(id);
      usuario.update(req.body);
      return res.json({
        mensagem: "Ano-letivo atualizado com sucesso",
        usuario,
      });
    } catch (error) {
      return res.json({ erro: "Não foi possível atualizar" });
    }
  },

  async destroy(req, res) {
    const { id } = req.params;
    try {
      (await Letivo.findByPk(id)).destroy();
      return res.json({ mensagem: "Ano-letivo deletado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível eliminar" });
    }
  },
};

module.exports = LetivoController;
