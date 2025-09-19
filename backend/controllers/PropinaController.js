const { Propina } = require("../models");
const { Op } = require("sequelize");

const PropinaController = {
  async index(req, res) {
    const { query, sort, classe, periodo, mensalidade } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 25;
    let where = {};
    let order = [];

    if (sort) {
      order = sort.split(";").split(":");
    }

    if (mensalidade) {
      where = {
        mensalidade: {
          [Op.eq]: mensalidade,
        },
      };
    }
    if (classe) {
      where = {
        ...where,
        classe: {
          [Op.eq]: classe,
        },
      };
    }
    if (periodo) {
      where = {
        ...where,
        periodo: {
          [Op.eq]: periodo,
        },
      };
    }
    res.json(
      await Propina.findAll({
        where,
        order,
        limit,
        offset: (page - 1) * limit,
      })
    );
  },

  async show(req, res) {
    const { id } = req.params;

    const propina = await Propina.findByPk(id);
    if (propina) {
      return res.json(propina);
    }
    return res.status(401).json({ erro: "Propina não encontrado" });
  },

  async create(req, res) {
    const propina = req.body;
    try {
      await Propina.create(propina);
      return res.json({ mensagem: "Propina criado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível criar" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      const propina = await Propina.findByPk(id);
      propina.update(req.body);
      return res.json({
        mensagem: "Propina atualizado com sucesso",
        propina,
      });
    } catch (error) {
      return res.json({ erro: "Não foi possível atualizar" });
    }
  },

  async destroy(req, res) {
    const { id } = req.params;
    try {
      (await Propina.findByPk(id)).destroy();
      return res.json({ mensagem: "deletado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível eliminar" });
    }
  },
};

module.exports = PropinaController;
