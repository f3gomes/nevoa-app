
# ☁️ Nevoa App - Frontend Next.js

Aplicativo fullstack para gerenciamento de cursos, com frontend desenvolvido em Next.js, React e Tailwind CSS, e backend em Node.js.
A aplicação permite o cadastro, listagem, edição e remoção de cursos (CRUD), incluindo informações básicas como título, descrição, status e data de publicação.

🔍 Também oferece funcionalidade de busca por título e filtro por status (ativo/inativo), facilitando a navegação entre os cursos cadastrados.

🛠️ Um painel administrativo dedicado permite a gestão eficiente dos cursos, com uma interface moderna e responsiva construída com Tailwind CSS. A aplicação foi projetada com boas práticas de organização de código, tipagem com TypeScript e padronização com ESLint e Prettier.

---

## 🧑‍💻 Rodando o projeto localmente

### Clone o repositório:

```bash
git clone https://github.com/f3gomes/nevoa-app.git

cd nevoa-app
```

### Instale dependências:

```bash
npm install
```

---

## 🐳 Executando com Docker Compose

Para executar via Docker (aplicativo frontend em um contêiner):

### Para iniciar:

```bash
docker compose up
```

Isso iniciará o aplicativo frontend na porta 3000: [http://localhost:3000](http://localhost:3000)

> **Nota:** Certifique-se de que sua API de backend (`http://localhost:3333/api/v1`) esteja em execução para que o aplicativo funcione corretamente.

---

## 🧑‍💻 Executando (sem Docker)

Crie um arquivo `.env.local` na raiz com a seguinte variável (exemplo):

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3333/api/v1
```

### Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em: [http://localhost:3000](http://localhost:3000)

### Ou, para produção simulada:

```bash
npm run build

npm start
```

---

## 🔍 Estrutura típica do projeto

```
.
├── public/
│   └── ... (arquivos estáticos)
├── src/
│   ├── app/
│   │   └── page.tsx
│   ├── components/
│   │   └── ...
│   ├── styles/
│   │   └── globals.css
│   └── lib/
│       └── ...
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── docker-compose.yml
└── Dockerfile
```

---

## 🚀 Tecnologias utilizadas

- **Next.js** (versão 14+ recomendada)
- **React** para construção da interface do usuário
- **TypeScript** para tipagem estática e segurança no código
- **Tailwind CSS** para estilização utilitária
- **ESLint** e **Prettier** para padronização de código

---

## 🌐 Acessando a aplicação hospedada

Se o aplicativo estiver hospedado, a URL será listada aqui. (Exemplo: https://nevoa01.vercel.app/)

---

## ❓ Problemas comuns

- **Porta 3000 ocupada ao tentar iniciar o aplicativo** — ajuste a porta no `docker-compose.yml` (ex. `"3001:3000"`) ou encerre qualquer processo que esteja usando a porta 3000.

- **API de backend não está respondendo** — verifique se o serviço de backend está em execução na URL configurada em `NEXT_PUBLIC_API_BASE_URL`.

- **Erro de CORS** — certifique-se de que sua API de backend está configurada para permitir requisições do domínio do seu aplicativo frontend (geralmente `http://localhost:3000` em desenvolvimento).

---

## ✅ Resumo

| Ambiente         | Comando para rodar           | Endpoint local                        |
|------------------|------------------------------|----------------------------------------|
| Local (host)     | `npm install`, `npm run dev` | [http://localhost:3000](http://localhost:3000) |
| Docker Compose   | `docker compose up --build`  | [http://localhost:3000](http://localhost:3000) |
| Produção (Vercel)| —                            | https://nevoa01.vercel.app/                     |
