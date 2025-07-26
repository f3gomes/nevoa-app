FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json (ou yarn.lock)
# Isso permite que o Docker utilize o cache de camadas para as dependências
COPY package*.json ./

# Instala as dependências do projeto
# O comando 'ci' é preferido em ambientes de CI/CD para instalações limpas
RUN npm ci

# Copia todo o restante do código da aplicação para o diretório de trabalho
COPY . .

# Constrói o aplicativo Next.js para produção
# Isso gera os arquivos otimizados na pasta .next
RUN npm run build

# Estágio de produção
# Usa uma imagem menor para o ambiente de produção
FROM node:20-alpine AS runner

# Define o diretório de trabalho
WORKDIR /app

# Define o usuário 'nextjs' para maior segurança
# Este usuário será usado para executar o aplicativo
RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs

# Copia os arquivos de ambiente e o package.json para o runner
# Isso é necessário para que o Next.js possa iniciar o servidor
COPY --from=builder /app/package*.json ./

# Copia os arquivos de cache e o build do Next.js do estágio de construção
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Define a porta que o aplicativo Next.js irá expor
EXPOSE 3000

# Define a variável de ambiente para a URL base da API
# Esta variável será acessível no lado do cliente do Next.js
ENV NEXT_PUBLIC_API_BASE_URL=http://localhost:3333/api/v1

# Define o usuário que irá executar o aplicativo
USER nextjs

# Comando para iniciar o aplicativo Next.js em modo de produção
CMD ["npm", "run", "start"]
