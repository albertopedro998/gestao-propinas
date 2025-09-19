const Yup = require("yup");

module.exports = {
  async validateCreate(req, res, next) {
    const schema = Yup.object().shape({
      classe: Yup.number().integer().required(),
      periodo: Yup.string().required(),
      mensalidade: Yup.number().integer().required(),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },

  async validateUpdate(req, res, next) {
    const schema = Yup.object().shape({
      classe: Yup.number().integer(),
      periodo: Yup.string(),
      mensalidade: Yup.number().integer(),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },
};
