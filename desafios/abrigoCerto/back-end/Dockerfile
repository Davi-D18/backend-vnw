# Estágio 1: Build (Instalação de dependências)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de definição de pacotes primeiro para cache eficiente
COPY package*.json ./

# Instala apenas dependências de produção. 
RUN npm install --omit=dev

# Estágio 2: Runtime (Imagem final leve)
FROM node:20-alpine

LABEL maintainer="Expert Docker Specialist"
LABEL description="Imagem otimizada para a API AbrigoCerto"

# Define o ambiente como produção
ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app

# Segurança: Cria um usuário não-root para evitar execução como root dentro do container
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp

# Copia apenas as dependências de produção do estágio de build
COPY --from=builder /app/node_modules ./node_modules

# Copia o restante do código fonte
COPY . .

# Garante que o usuário nodeapp tenha permissão na pasta da aplicação
RUN chown -R nodeapp:nodeapp /app

# Switch para o usuário não-root
USER nodeapp

# Expõe a porta definida
EXPOSE 3000

# Healthcheck: Permite ao Docker monitorar se a API está realmente respondendo
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

# Comando de inicialização usando o entrypoint definido no package.json
CMD ["node", "src/server.js"]
