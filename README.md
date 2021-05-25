[![Build Status](https://travis-ci.com/magujun/ignite-nodejs-desafio9.svg?branch=main)](https://travis-ci.com/magujun/ignite-nodejs-desafio9)

# 💻 Rocketseat's Ignite - Trilha Node.js

## [Desafio 9](https://www.notion.so/Desafio-01-Transfer-ncias-com-a-FinAPI-5e1dbfc0bd66420f85f6a4948ad727c2) 🚀

## Sobre o desafio

Nesse desafio será implementada uma nova funcionalidade na FinAPI, a aplicação que foi testada durante o desafio **[Testes unitários](https://www.notion.so/Desafio-01-Testes-unit-rios-0321db2af07e4b48a85a1e4e360fcd11)**.

A nova funcionalidade permite a transferência de valores entre contas.
Para isso existem alguns requisitos:

- Não deve ser possível transferir valores superiores ao disponível no saldo de uma conta;
- O balance (obtido através da rota `/api/v1/statements/balance`) considera também todos os valores transferidos ou recebidos através de transferências ao exibir o saldo de um usuário;
- As informações para realizar uma transferência são:

  ```json
  {
    "amount": 100,
    "description": "Descrição da transferência"
  }
  ```

  O `id` do usuário destinatário é passado via parâmetro na rota (exemplo: `/api/v1/statements/transfer/:user_id`) e o id do usuário remetente é obtido através do token JWT enviado no header da requisição;

- Ao mostrar o balance de um usuário, operações do tipo `transfer` possuem os seguintes campos:

  ```json
  {
    "id": "4d04b6ec-2280-4dc2-9432-8a00f64e7930",
    "operator": "cfd06865-11b9-412a-aa78-f47cc3e52905",
    "amount": 100,
    "description": "Transferência de valor",
    "type": "transfer",
    "created_at": "2021-03-26T21:33:11.370Z",
    "updated_at": "2021-03-26T21:33:11.370Z"
  }
  ```

  O campo `operator` é o `id` do usuário que enviou a transferência.
  O campo `type` exibe o tipo da operação, que nesse caso é `transfer`.

---

## Testes

UNIT | INT

[✓] | [✓] Create User

[✓] | [✓] Authenticate User

[✓] | [✓] Show User Profile

[✓] | [✓] Create Statement

[✓] | [✓] Show account balance

[✓] | [✓] Show statement operation

#

<details>

<summary>Rotas da aplicação</summary>

<details>
<summary>POST `/api/v1/users`</summary>

A rota recebe `name`, `email` e `password` dentro do corpo da requisição, salva o usuário criado no banco e retorna uma resposta vazia com status `201`.</details>

<details>
<summary>POST `/api/v1/sessions`</summary>

A rota recebe `email` e `password` no corpo da requisição e retorna os dados do usuário autenticado junto à um token JWT.
Essa aplicação não possui refresh token, ou seja, o token criado dura apenas 1 dia e deve ser recriado após o período mencionado.</details>

<details>
<summary>GET `/api/v1/profile`</summary>

A rota recebe um token JWT pelo header da requisição e retorna as informações do usuário autenticado.</details>

<details>
<summary>GET `/api/v1/statements/balance`</summary>

A rota recebe um token JWT pelo header da requisição e retorna uma lista com todas as operações de depósito, saque e transferência do usuário autenticado e também o saldo total da conta numa propriedade `balance`.</details>

<details>
<summary>POST `/api/v1/statements/deposit`</summary>

A rota recebe um token JWT pelo header e `amount` e `description` no corpo da requisição, registra a operação de depósito do valor e retorna as informações do depósito criado com status `201`.</details>

<details>
<summary>POST `/api/v1/statements/withdraw`</summary>

A rota recebe um token JWT pelo header e `amount` e `description` no corpo da requisição, registra a operação de saque do valor (caso o usuário possua saldo válido) e retorna as informações do saque criado com status `201`.</details>

<details>
<summary>GET `/api/v1/statements/:statement_id`</summary>

A rota recebe um token JWT pelo header e o id de uma operação registrada (saque ou depósito) na URL da rota e retorna as informações da operação encontrada.</details>

<details>
<summary>GET `/api/v1/statements/transfers/:user_id`</summary>

A rota recebe um token JWT pelo header para identificar o remetente e o id de outro usuário na URL da rota como parâmetro para o identificar o destinatário e assim registrar a operação de transferência.</details>

</details>
