const Yup = require("yup");

module.exports = {
  
  async validateUser(req, res, next) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      bi: Yup.string().length(14).required(),
      email: Yup.string().email().required(),
      genero: Yup.string().length(1),
      telefone: Yup.string().min(9).max(13),
      status: Yup.string().required(),
      dtNascimento: Yup.date().required(),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  },
  
  async validateUpdate(req, res, next) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      bi: Yup.string().length(14),
      email: Yup.string().email(),
      genero: Yup.string().length(1),
      telefone: Yup.string().min(9).max(13),
      status: Yup.string(),
      dtNascimento: Yup.date(),
    });

    if (await schema.isValid(req.body)) {
      return next();
    }

    return res.status(300).json({ erro: "Preencha corretamente os campos" });
  }
};
