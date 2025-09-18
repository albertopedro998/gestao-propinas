const { Usuario } = require("../models");

const UsuarioController = {
  async index(req, res) {
    const { query, sort } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 25;
    let where = {};
    let order = [];

    if (sort) {
      order = sort.split(";").split("=");
    }

    res.json(
      await Usuario.findAll({
        where,
        order,
        limit,
        offset: (page - 1) * limit,
      })
    );
  },

  async create(req, res) {
    const usuario = req.body;

    try {
      await Usuario.create(usuario);
      return res.json({ mensagem: "Usuário criado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível criar" });
    }
  },
};

module.exports = UsuarioController;
