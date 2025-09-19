const Yup = require("yup");

module.exports = {
  async validateCreate(req, res, next) {
    const schema = Yup.object().shape({
      parcela: Yup.number().integer().required(),
      metodo: Yup.string().required(),
      comprovativo: Yup.string().required(),
      dt_pagamento: Yup.date().default(new Date()).required(),
      status: Yup.string(),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },

  async validateUpdate(req, res, next) {
    const schema = Yup.object().shape({
      parcela: Yup.number().integer(),
      metodo: Yup.string(),
      comprovativo: Yup.string(),
      dt_pagamento: Yup.date().default(new Date()),
      status: Yup.string()
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },
};
