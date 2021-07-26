# User API
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

API REST de usuários.

## 🧪 Stack

Esse projeto foi desenvolvido com:

- [Node](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Knex](https://knexjs.org/)

## 🚀 Setup
Instalar [node / npm](https://nodejs.org/en/)

Dentro da pasta do projeto, rodar esse comando no terminal:
```shell
$ npm install && npm run db:migrate && npm run dev
```

## 📖 API

Cadastrar usuário:
```json
POST: http://localhost:3333/user

{
  "nome": "",
  "email": "",
  "senha": "",
}
```

Consultar usuário (auth required):
```json
GET: http://localhost:3333/user
```

Realizar login:
```json
POST: http://localhost:3333/signin

{
  "email": "",
  "senha": "",
}
```

Listar usuarios:
```json
GET: http://localhost:3333/users
```
## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
