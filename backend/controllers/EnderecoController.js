const { Endereco } = require("../models");
const addressMiddle = require("../middlewares/UsuarioMiddleware");

const EnderecoController = {
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
      await Endereco.findAll({
        where,
        order,
        limit,
        offset: (page - 1) * limit,
      })
    );
  },

  async show(req, res) {
    const { id } = req.params;

    const address = await Endereco.findByPk(id);
    if (address) {
      return res.json(address);
    }
    return res.status(401).json({ erro: "Endereco não encontrado" });
  },

  async create(req, res) {
    const { municipio, bairro } = req.body;
    const address = { municipio, bairro };
    try {
      const endereco = { ...address, id: (await Endereco.create(address)).id };
      return res.json({ mensagem: "Endereco criado com sucesso", endereco });
    } catch (error) {
      return res.json({ erro: "Não foi possível criar" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { municipio, bairro } = req.body;
    const address = { municipio, bairro };
    try {
      const endereco = (await Endereco.findByPk(id));
      endereco.update(address)
      return res.json({ mensagem: "Endereco atualizado com sucesso", endereco });
    } catch (error) {
      return res.json({ erro: "Não foi possível atualizar" });
    }
  },
  
  async destroy(req, res) {
    const { id } = req.params;
    try {
      (await Endereco.findByPk(id)).destroy();
      return res.json({ mensagem: "Endereco deletado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível eliminar" });
    }
  },
};

module.exports = EnderecoController;
