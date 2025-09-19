const Yup = require("yup");

module.exports = {
  async validateCreate(req, res, next) {
    const schema = Yup.object().shape({
      cargo: Yup.string().required(),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },

  async validateUpdate(req, res, next) {
    const schema = Yup.object().shape({
      cargo: Yup.string(),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },
};
