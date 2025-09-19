const {
  Usuario,
  Propina,
  Funcionario,
  Aluno,
  Pagamento,
} = require("../models");
const { Op } = require("sequelize");

const PagamentoController = {
  async index(req, res) {
    const {
      query,
      sort,
      metodo,
      dt_pagamento,
      status,
      alunoId,
      funcionarioId,
      propinaId,
    } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 25;
    let where = {};
    let order = [];

    if (sort) {
      order = sort.split(";").split(":");
    }

    if (metodo) {
      where = {
        ...where,
        metodo: {
          [Op.like]: metodo,
        },
      };
    }
    if (metodo) {
      where = {
        ...where,
        metodo: {
          [Op.like]: metodo,
        },
      };
    }
    if (dt_pagamento) {
      where = {
        ...where,
        dt_pagamento: {
          [Op.like]: dt_pagamento,
        },
      };
    }
    if (status) {
      where = {
        ...where,
        status: {
          [Op.like]: status,
        },
      };
    }
    if (alunoId) {
      where = {
        ...where,
        alunoId: {
          [Op.like]: alunoId,
        },
      };
    }
    if (funcionarioId) {
      where = {
        ...where,
        funcionarioId: {
          [Op.like]: funcionarioId,
        },
      };
    }
    if (propinaId) {
      where = {
        ...where,
        propinaId: {
          [Op.like]: propinaId,
        },
      };
    }
    res.json(
      await Pagamento.findAll({
        include: [
          {
            model: Aluno,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [Usuario],
          },
          {
            model: Funcionario,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [Usuario],
          },
          {
            model: Propina,
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

    const pagamento = await Pagamento.findByPk(id);
    if (pagamento) {
      return res.json(pagamento);
    }
    return res.status(401).json({ erro: "Pagamento não encontrado" });
  },

  async create(req, res) {
    const pagamento = req.body;
    try {
      await Pagamento.create(pagamento);
      return res.json({ mensagem: "Pagamento criado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível criar" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      const pagamento = await Pagamento.findByPk(id);
      pagamento.update(req.body);
      return res.json({
        mensagem: "Pagamento atualizado com sucesso",
        pagamento,
      });
    } catch (error) {
      return res.json({ erro: "Não foi possível atualizar" });
    }
  },

  async destroy(req, res) {
    const { id } = req.params;
    try {
      (await Pagamento.findByPk(id)).destroy();
      return res.json({ mensagem: "Pagamento deletado com sucesso" });
    } catch (error) {
      return res.json({ erro: "Não foi possível eliminar" });
    }
  },
};

module.exports = PagamentoController;
