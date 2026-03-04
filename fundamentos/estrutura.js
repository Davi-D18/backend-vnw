// Importação do módulo Express para criar o servidor web
import express from "express";

// Criação de uma instância do aplicativo Express
const app = express();
const PORT = process.env.PORT || 3001;

// Definição de uma rota para a raiz do site
app.get("/", (req, res) => {
  // Envio de uma resposta "Hello, World!" para o cliente
  res.send("Hello, World!");
});

// Início do servidor, ouvindo na porta definida
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
