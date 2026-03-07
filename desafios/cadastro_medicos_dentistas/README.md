# API de Cadastro de Médicos e Dentistas

Esta é uma mini API desenvolvida em Node.js com Express para cadastros de médicos e dentistas voluntários. Essa API faz parte de um desafio do Vai na Web para montar uma API com Nodejs seguindo algumas regras. 

O servidor principal é o arquivo `server.js`.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- pnpm (gerenciador de pacotes)

## Instalação

1. Certifique-se de que você tem o Node.js e pnpm instalados.
2. Navegue até o diretório raiz do projeto (`back-vnw`).
3. Instale as dependências executando:
   ```
   pnpm install
   ```

## Configuração

1. No diretório `desafios/cadastro_medicos_dentistas/`, crie um arquivo `.env` (se não existir).
2. Defina a variável de ambiente `PORT` no arquivo `.env`. Exemplo:
   ```
   PORT=3001
   ```
   Se não definido, a porta padrão é 3001.

## Como Executar

Para executar a API, você pode usar um dos comandos abaixo. Este repositório faz parte de um curso e está organizado em subpastas para armazenar os desafios passados, por isso existe o diretório `desafios/nome_desafio`.

- Execute o script definido no `package.json`:
  ```
  pnpm run desafio:cadastro_medico
  ```
  Isso irá executar o arquivo `server.js` daquele desafio automaticamente.

- Ou execute diretamente:
  ```
  node desafios/cadastro_medicos_dentistas/server.js
  ```

O servidor será iniciado e você verá a mensagem: `Servidor rodando em: http://localhost:{PORT}`

## Endpoints

### POST /cadastro
Cria um novo cadastro.

**Corpo da requisição (JSON):**
```json
{
  "nome": "Nome Completo",
  "email": "email@exemplo.com",
  "telefone": "11987654321",
  "mensagem": "Mensagem opcional (máximo 500 caracteres)"
}
```

**Validações:**
- `nome`: Obrigatório, mínimo 3 caracteres.
- `email`: Obrigatório, deve ser um email válido.
- `telefone`: Obrigatório, deve conter 10 a 11 dígitos numéricos.
- `mensagem`: Opcional, máximo 500 caracteres.

**Resposta de sucesso (201):**
```json
{
  "id": 1234567,
  "nome": "Nome Completo",
  "email": "email@exemplo.com",
  "telefone": "11987654321",
  "mensagem": "Mensagem opcional"
}
```

**Respostas de erro (400):**
- Nome inválido
- Email inválido
- Telefone inválido
- Mensagem muito longa

### GET /cadastro
Retorna todos os cadastros.

**Resposta (200):**
```json
[
  {
    "id": 1234567,
    "nome": "Nome Completo",
    "email": "email@exemplo.com",
    "telefone": "11987654321",
    "mensagem": "Mensagem opcional"
  }
]
```

## Estrutura dos Arquivos

- `server.js`: Arquivo principal do servidor.
- `configs.js`: Configurações da aplicação (porta).
- `database.js`: Armazenamento em memória (array de cadastros).
- `middlewares.js`: Middleware de validação para cadastros.
- `utils.js`: Utilitários (geração de ID aleatório).
- `validations.js`: Funções de validação para email e telefone.

## Observações

- Os dados são armazenados em memória (array), então serão perdidos ao reiniciar o servidor.
- Esta é uma API simples feita de um desafio.