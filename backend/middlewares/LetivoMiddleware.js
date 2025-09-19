const Yup = require("yup");

module.exports = {
  async validateCreate(req, res, next) {
    const schema = Yup.object().shape({
      dtInicio: Yup.date().required(),
      dtFim: Yup.date().required(),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },

  async validateUpdate(req, res, next) {
    const schema = Yup.object().shape({
      dtFim: Yup.date(),
      dtInicio: Yup.date(),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },
};
