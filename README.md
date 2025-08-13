# 🌱 SementeiraBack

Backend desenvolvido em **Node.js + TypeScript** para gerenciar um sistema de vendas de plantas.  
Inclui autenticação de usuários, gerenciamento de carrinho de compras, pedidos e catálogo de plantas.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript
- **TypeScript** — Tipagem estática para maior segurança
- **Express.js** — Framework para criação de APIs
- **Prisma ORM** — Acesso e manipulação do banco de dados
- **SQLite/PostgreSQL** — Banco de dados (definido no `.env`)
- **dotenv** — Configuração de variáveis de ambiente

---

## 📂 Estrutura do Projeto

SementeiraBack/
├── prisma/ # Configurações do Prisma e migrações
│ ├── schema.prisma
│ └── migrations/
├── src/
│ ├── app.ts # Ponto de entrada da aplicação
│ ├── database/ # Conexão com o banco de dados
│ ├── repositories/ # Camada de acesso aos dados
│ ├── routes/ # Definição das rotas da API
│ └── useCases/ # Casos de uso (lógica de negócio)
├── .env # Variáveis de ambiente
├── package.json
├── tsconfig.json
└── README.md


---

## ⚙️ Configuração e Instalação

### 1️⃣ Clonar o repositório
```
git clone https://github.com/seu-usuario/SementeiraBack.git
cd SementeiraBack
```

### 2️⃣ Instalar dependências
```
npm install
```

### 3️⃣ Configurar variáveis de ambiente
```
DATABASE_URL="file:./dev.db"  # Ou URL de conexão do PostgreSQL
PORT=3000
JWT_SECRET="sua_chave_secreta"
```

### 4️⃣ Executar migrações do banco
```
npx prisma migrate dev
```

### 5️⃣ Rodar o servidor
```
npm run dev
```

### 📌 Funcionalidades

### Usuários

- Cadastro

- Login com JWT

### Plantas

- Cadastro de novas plantas

- Listagem de plantas

- Remoção

### Carrinho

- Criar carrinho

- Adicionar itens

- Remover itens

- Limpar carrinho

### Pedidos

- Criar pedido

- Listar pedidos por usuário

### 📬 Rotas da API (Resumo)

| Método | Rota                   | Descrição                    |
| ------ | ---------------------- | ---------------------------- |
| POST   | `/usuarios`            | Cadastrar usuário            |
| POST   | `/login`               | Login de usuário             |
| GET    | `/plantas`             | Listar plantas               |
| POST   | `/plantas`             | Cadastrar planta             |
| DELETE | `/plantas/:id`         | Remover planta               |
| POST   | `/carrinho`            | Criar carrinho               |
| POST   | `/carrinho/item`       | Adicionar item ao carrinho   |
| DELETE | `/carrinho/item/:id`   | Remover item do carrinho     |
| DELETE | `/carrinho/limpar/:id` | Limpar carrinho              |
| POST   | `/pedido`              | Criar pedido                 |
| GET    | `/pedido/usuario/:id`  | Listar pedidos de um usuário |
