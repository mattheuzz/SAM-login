# 🛡️SAM-login

API serverless com autenticação JWT, MongoDB e AWS Lambda, construída com TypeScript e AWS SAM.

---

## ⚙️ Pré-requisitos

* [Node.js](https://nodejs.org) instalado
* [AWS CLI](https://aws.amazon.com/cli/) configurado (`aws configure`)
* [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) instalado
* [Docker](https://www.docker.com/) para rodar o SAM localmente
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) ou MongoDB local

---

## 🚀 Iniciando o projeto

Instale as dependências:

```bash
npm install
# ou
yarn
# ou
pnpm install
```

Crie um arquivo `.env` com as variáveis necessárias:

```env
MONGODB_URI="mongodb+srv://..."
JWT_SECRET="sua-chave-super-secreta"
```

---

## 🛠️ Build e execução local

```bash
sam build --use-container --beta-features
sam local start-api --env-vars .env
```

Com isso, a API estará disponível em `http://127.0.0.1:3000`.

---

## 🧪 Rotas disponíveis

### `POST /users` - Criar novo usuário

```json
{
  "name": "Matheus",
  "email": "matheus@example.com",
  "password": "123456"
}
```

### `POST /login` - Autenticação do usuário

```json
{
  "email": "matheus@example.com",
  "password": "123456"
}
```

🔐 Retorna um JWT:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### `GET /users` - Obter dados do usuário autenticado

Requer header `Authorization` com token JWT:

```
Authorization: Bearer <seu-token>
```

---

## ☁️ Deploy para AWS

Antes do deploy, suba as secrets para o SSM:

```bash
aws ssm put-parameter --name "/back-dnd/mongodb-uri" --type "String" --value "sua-URI-do-mongo"
aws ssm put-parameter --name "/back-dnd/jwt-secret" --type "String" --value "sua-chave-secreta"
```

Depois execute:

```bash
sam deploy --guided
```

---

## 📁 Estrutura do projeto

```
src/
├── db/                # Conexão com MongoDB
├── models/            # Modelos do Mongoose
├── handlers/
│   ├── users/         # Rotas relacionadas a usuários
│   └── auth/          # Login e autenticação
├── middleware/        # Validador JWT
```

---

## 📟 Licença

Projeto desenvolvido com foco em arquitetura serverless usando AWS Lambda.
