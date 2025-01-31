# Autenticação com refresh token no React

Este projeto demonstra a implementação de autenticação no React utilizando refresh token. Foi desenvolvido com React + Vite, Typescript e estilizado com Tailwind CSS.

---

## Rodando Localmente com Docker Compose

### 1. Clone o Repositório

Clone o repositório para o seu ambiente local:
```bash
  git clone https://github.com/nivaldoandrade/autenticacao-refresh-token-reactjs.git
```

### 2. Iniciar o Docker Compose

No terminal, navegue até o diretório onde está o arquivo docker-compose.yml:

Entre no diretório do projeto:

```bash
  cd autenticacao-refresh-token-reactjs
```

Inicie os containers com o seguinte comando:

```bash
   docker compose up --build
```
### Serviços no Docker Compose

O docker-compose.yml contém os serviços:

 - **app* - O frontend desenvolvido em React, que será buildado e contém a variável `VITE_API_URL` apontando para a URL do backend.
 - **backend** - API desenvolvida com spring security e oauth2 resource server. O código-fonte está disponível no [github](https://github.com/nivaldoandrade/spring-security.git).

---

## Rodando Localmente sem Docker ou Docker Compose

### 1. Clone o Repositório

Clone o repositório para o seu ambiente local:
```bash
  git clone https://github.com/nivaldoandrade/autenticacao-refresh-token-reactjs.git
```

Entre no diretório do projeto:

```bash
  cd autenticacao-refresh-token-reactjs
```

### 2. Instalando as dependências e Executando

1. Instale as dependências:

```bash
  yarn
  ou
  npm install
```

2. Crie o arquivo .env:

```bash
 cp .env.example .env
```

Se o ambiente não for Linux/Mac, basta duplicar o arquivo `.env.example` e renomeá-lo para `.env`.

⚠ Importante: Edite o arquivo `.env` e configure a variável `VITE_API_URL` com a URL do backend.

### 3. Backend Necessário

Você pode utilizar o backend disponível neste repositório:

[Backend com spring boot + spring security + oauth2 ](https://github.com/nivaldoandrade/spring-security.git)

Ou, caso prefira outro backend, ele precisa expor os seguintes endpoints:

- **`Login - (/auth/login)`** - Essa rota realiza o login com email e senha:
  - Corpo da requisição:
  ``` JSON
    {
      "username": "string",
      "password": "string"
    }
  ```
  - Resposta:
  ``` JSON
    {
      "accessToken": "string",
      "refreshToken": "string"
    }
  ```
- **`Refresh Token - (/auth/refresh-token)`** - Essa rota gera um novo par de access token e refresh token a partir do refresh token:
    - Corpo da requisição:
    ``` JSON
      {
        "accessToken": "string"
      }
    ```
    - Resposta:
    ``` JSON
      {
        "accessToken": "string",
        "refreshToken": "string"
      }
    ```
- **`Listagem de Usuários - (/users)`** - Essa rota retorna uma lista(array) de usuários:
    - Resposta:
    ``` JSON
      [{
        "id": "string",
        "name": "string",
        "email": "string"
      }]
    ```




