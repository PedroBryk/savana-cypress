# Savana Pet Café - Testes E2E com Cypress

Repositório do projeto Savana (frontend Next.js + backend NestJS) com testes automatizados end-to-end em Cypress. A descrição original do projeto está em [README-savana.md](README-savana.md).

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação

Na raiz do repositório, instale as dependências de cada parte:

```bash
npm install
cd backend_savana_oficial
npm install
cd ../savana
npm install
cd ..
```

## Banco de dados (primeira vez)

O banco SQLite não vai para o repositório, então é preciso criá-lo:

```bash
cd backend_savana_oficial
npx prisma generate
npx prisma migrate deploy
cd ..
```

## Subindo o sistema

São necessários dois terminais abertos, um para cada parte:

```bash
# Terminal 1 - backend (porta 3000)
cd backend_savana_oficial
npm run start:dev

# Terminal 2 - frontend (porta 3001)
cd savana
npx next dev -p 3001
```

O backend precisa rodar na porta 3000 e o frontend na 3001, porque o CORS do backend só aceita a origem `http://localhost:3001`.

## Executando os testes

Com o backend e o frontend no ar, em um terceiro terminal, na raiz do repositório:

```bash
# Modo interativo (abre a interface do Cypress)
npx cypress open

# Modo headless (executa tudo no terminal e grava vídeos)
npx cypress run
```

Para rodar um teste específico:

```bash
npx cypress run --spec cypress/e2e/ct01-login-valido.cy.js
```

Os vídeos e screenshots gerados ficam em `cypress/videos` e `cypress/screenshots`. Os testes criam automaticamente um usuário de teste pela API, então não é preciso cadastrar nada antes.

## Testes implementados

| ID | Caso |
|----|------|
| CT01 | Login com credenciais válidas |
| CT02 | Login com senha incorreta |
| CT03 | Cadastro de funcionário com dados inválidos |
| CT04 | Cadastro de animal |
| CT05 | Cadastro de produto no cardápio |

A descrição completa de cada caso está em [docs/casos-de-teste.md](docs/casos-de-teste.md).

## Seletores

Todos os testes usam exclusivamente seletores `data-cy` (comando `cy.dc("nome")`, definido em `cypress/support/commands.js`).

## Estrutura

```
cypress/
  e2e/              # os 5 testes
  support/          # comandos e dados de teste
docs/               # casos de teste
evidencias/         # vídeos e print da execução do npx cypress run
backend_savana_oficial/   # API NestJS
savana/                   # frontend Next.js
cypress.config.js
```