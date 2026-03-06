import express from "express";
const app = express();

const PORT = process.env.PORT || 3001;

// Middleware de exemplo
const myLogger = (req, res, next) => {
  console.log("Log de teste");
  // Chama a próxima função de middleware na pilha
  next();
};

const verify = (req, res, next) => {
  const { name } = req.body;
  console.log(req.body);
  if (!name) {
    return res.status(400).send("Name é obrigatório");
  }

  next();
};

// Uso do middleware em todas as rotas
app.use(myLogger);
// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware específico para esta rota
// O middleware 'verify' será executado primeiro, se passar, a função de callback será executada
app.post("/test", verify, (req, res) => {
  res.send("Passou com sucesso na verificação!");
});

// Rota com parâmetro de rota
app.get("/user/:id", (req, res) => {
  const { id } = req.params; // Acessa o parâmetro de rota 'id' usando req.params
  res.send(`O ID do usuário é: ${id}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
