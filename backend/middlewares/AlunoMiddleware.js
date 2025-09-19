const Yup = require("yup");

module.exports = {
  async validateCreate(req, res, next) {
    const schema = Yup.object().shape({
      num_matricula: Yup.number().integer().moreThan(1000).required(),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },

  async validateUpdate(req, res, next) {
    const schema = Yup.object().shape({
      num_matricula: Yup.number().integer().moreThan(1000),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },
};
