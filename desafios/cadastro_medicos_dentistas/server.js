import express from 'express';
import { cadastros } from './database.js';
import { settings } from './configs.js';
import { gerarIdAleatorio } from './utils.js';
import { validarCadastro } from './middlewares.js';

const { PORT } = settings;

const app = express();
app.use(express.json());

app.post('/cadastro', validarCadastro, (req, res) => {
    const { nome, email, telefone, mensagem } = req.body

    const novoCadastro = {
        id: gerarIdAleatorio(),
        nome,
        email,
        telefone,
        mensagem
    }
    cadastros.push(novoCadastro);
    res.status(201).json(novoCadastro);
});

app.get('/cadastro', (req, res) => {
    res.json(cadastros);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});