# Abrigo Certo

Este projeto é o trabalho final do curso de Back-end da instituição **Vai na Web**. O objetivo principal é demonstrar pensamento crítico, análise de problemas e organização de dados, propondo uma solução coerente e funcional para um cenário de crise real.

## 1. Apresentação da Ideia
A ideia do **Abrigo Certo** surgiu a partir do desafio sobre enchentes no Brasil. Pensando nesse cenário de calamidade, decidi focar no problema da **gestão e transparência da ocupação de abrigos**. Em momentos de crise climática, a informação precisa é o recurso mais escasso e valioso. Ter um sistema que centralize onde há vagas e quais são as condições de cada abrigo pode salvar vidas ao agilizar o deslocamento de pessoas desabrigadas.

## 2. Problema Escolhido
**Falta de visibilidade em tempo real sobre a disponibilidade de abrigos e suas especificidades.**
Durante crises ambientais, muitas pessoas se deslocam para abrigos que já estão lotados, ou pessoas com necessidades específicas (como PcD ou com animais de estimação) perdem tempo valioso procurando locais adequados. A dispersão das informações em redes sociais e grupos de mensagens dificulta a tomada de decisão tanto para as vítimas quanto para os voluntários e órgãos públicos.

## 3. Solução Proposta
O **Abrigo Certo** é uma plataforma integrada que permite:
- **Consulta Pública:** Visualização ágil de todos os abrigos cadastrados, com filtros por cidade, status (Aberto, Lotado, Fechado) e necessidades especiais (Pets, Acessibilidade).
- **Gestão Reativa:** Painel administrativo para cada abrigo atualizar sua capacidade e status em tempo real, com sincronização imediata na interface global.
- **Histórico de Ocupação:** Registro de logs de todas as alterações para acompanhamento da evolução da situação por voluntários e órgãos gestores.
- **Informação Completa:** Detalhes de contato, endereço, ponto de referência e links diretos para navegação via Google Maps (usando coordenadas ou endereço).

## 4. Estrutura do Sistema
O projeto foi dividido em três frentes principais integradas:

### **Front-end**
- **Tecnologia:** React 18 com TypeScript e Vite.
- **Estilização:** TailwindCSS para uma interface moderna, responsiva e acessível.
- **Gerenciamento de Estado:** Context API para controle de autenticação e sincronização de dados globais do abrigo logado.

### **Back-end**
- **Tecnologia:** Node.js com Framework Express.
- **Arquitetura:** Organizado em camadas (Controllers, Services, Repositories) para facilitar a manutenção e escalabilidade.
- **Segurança:** Autenticação via JWT (JSON Web Token), criptografia de senhas com bcrypt e proteção de cabeçalhos com Helmet.
- **Validação:** Uso rigoroso da biblioteca Zod para validar esquemas de dados em todas as entradas da API.

### **Banco de Dados**
- **Tecnologia:** PostgreSQL 16.
- **Estrutura:** Tabelas de `shelters` (abrigos) e `shelter_updates` (histórico de atualizações), garantindo integridade referencial e histórico auditável.

---

## 🛠️ Como Rodar o Projeto

O projeto utiliza **Docker** para garantir que todo o ambiente (Banco, API e Frontend) suba de forma padronizada.

### 1. Pré-requisitos
- Docker e Docker Compose instalados em sua máquina.

### 2. Configuração
Certifique-se de que o arquivo `.env` na raiz do projeto contenha as configurações necessárias (você pode copiar o `.env.example`).

### 3. Execução
Na raiz do projeto (onde está o arquivo `docker-compose.yml`), execute:
```bash
docker-compose up --build
```
*Este comando irá:*
1. Subir o banco de dados PostgreSQL.
2. Executar os scripts de inicialização (criação de tabelas e dados iniciais/seed).
3. Iniciar a API Node.js (Porta 3000).
4. Iniciar o Frontend React (Porta 8080).

### 4. Acesso
- **Interface Web:** [http://localhost:8080](http://localhost:8080)
- **API Backend:** [http://localhost:3000](http://localhost:3000)

---

## 📝 Documentação da API

A documentação completa dos endpoints pode ser importada no **Postman**.

### **Endpoints Principais (Públicos)**
- `GET /api/shelters` - Lista abrigos com paginação e filtros.
- `GET /api/shelters/summary` - Estatísticas globais (total de vagas, ocupação média, etc).
- `GET /api/shelters/:id` - Detalhes de um abrigo específico.

### **Endpoints de Gestão (Protegidos por Token)**
- `POST /api/auth/register` - Cadastro de novo abrigo.
- `POST /api/auth/login` - Login para acesso ao painel administrativo.
- `PUT /api/shelters/:id` - Atualização total dos dados cadastrais (nome, endereço, senha, acessibilidade, etc).
- `POST /api/shelters/:id/updates` - Registro de nova atualização de vagas e status.

**Desenvolvido por:** LD - Davi
**Curso:** Back-end - Vai na Web
