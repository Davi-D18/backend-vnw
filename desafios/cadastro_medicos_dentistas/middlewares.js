import { emailValido, telefoneValido } from "./validations.js";

export function validarCadastro(req, res, next) {
  const { nome, email, telefone, mensagem } = req.body;
  if (!nome || nome.length < 3) {
    return res.status(400).json({
      erro: "Nome é obrigatório e deve conter pelo menos 3 caracteres",
    });
  }
  if (!email || !emailValido(email)) {
    return res.status(400).json({
      erro: "Email inválido",
    });
  }
  if (!telefone || !telefoneValido(telefone)) {
    return res.status(400).json({
      erro: "Telefone deve conter 10 a 11 números",
    });
  }
  if (mensagem && mensagem.lenght > 500) {
    return res.status(400).json({
      erro: "Mensagem pode ter no máximo 500 caracteres",
    });
  }
  next();
}
