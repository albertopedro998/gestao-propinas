const Yup = require("yup");

module.exports = {
  async validateCreate(req, res, next) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      sala: Yup.number().integer().required(),
      classe: Yup.string().required(),
      periodo: Yup.string().required(),
      curso: Yup.string(),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },

  async validateUpdate(req, res, next) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      sala: Yup.number().integer(),
      classe: Yup.string(),
      periodo: Yup.string(),
      curso: Yup.string(),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },
};
