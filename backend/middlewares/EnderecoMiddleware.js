const Yup = require("yup");

module.exports = {
  async validateEndereco(req, res, next) {
    const schema = Yup.object().shape({
      bairro: Yup.string().required("Preencha este campo"),
      municipio: Yup.string().required("Preencha este campo")
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(300).json({ erro: "Preencha corretamente os campos" });
    }
    
    return next();
  },
  async validateUpdate(req, res, next) {
    const schema = Yup.object().shape({
      bairro: Yup.string(),
      municipio: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(300).json({ erro: "Preencha corretamente os campos" });
    }
    
    return next();
  },
};
