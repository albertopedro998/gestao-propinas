const { Usuario, Funcionario } = require("../models");
const { Op } = require("sequelize");

const FuncionarioController = {
  async index(req, res) {
    const { query, sort, nome } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 25;
    let where = {};
    let order = [];

    if (sort) {
      order = sort.split(";").split(":");
    }

    if (nome) {
      where = {
        ...where,
        nome: {
          [Op.like]: nome,
        },
      };
    }
    res.json(
      await Funcionario.findAll({
        include: [
          {
            model: Usuario,
            attributes: { exclude: ["enderecoId"] },
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

    const user = await Funcionario.findByPk(id);
    if (user) {
      return res.json(user);
    }
    return res.status(401).json({ erro: "Funcionário não encontrado" });
  },

  async create(req, res) {
    const usuario = req.body;
    try {
      await Funcionario.create(usuario);
      return res.json({ mensagem: "Funcionário criado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível criar" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Funcionario.findByPk(id);
      usuario.update(req.body);
      return res.json({
        mensagem: "Funcionário atualizado com sucesso",
        usuario,
      });
    } catch (error) {
      return res.json({ erro: "Não foi possível atualizar" });
    }
  },

  async destroy(req, res) {
    const { id } = req.params;
    try {
      (await Funcionario.findByPk(id)).destroy();
      return res.json({ mensagem: "Funcionário deletado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível eliminar" });
    }
  },
};

module.exports = FuncionarioController;
