# Casos de Teste - Savana Pet Café

Testes automatizados end-to-end com Cypress. Todos os seletores usam exclusivamente o atributo `data-cy`.

## Ambiente

- Frontend (Next.js): http://localhost:3001
- Backend (NestJS): http://localhost:3000
- Usuário de teste: criado automaticamente pelos testes via API (`cypress/support/dados.js`)

## Resumo

| ID | Área | Caso | Arquivo |
|----|------|------|---------|
| CT01 | Autenticação | Login com credenciais válidas | `cypress/e2e/ct01-login-valido.cy.js` |
| CT02 | Autenticação | Login com senha incorreta | `cypress/e2e/ct02-login-invalido.cy.js` |
| CT03 | Cadastro de funcionário | Dados inválidos não cadastram | `cypress/e2e/ct03-cadastro-funcionario-invalido.cy.js` |
| CT04 | Animais | Cadastrar animal e vê-lo na adoção | `cypress/e2e/ct04-cadastro-animal.cy.js` |
| CT05 | Cardápio | Cadastrar produto e vê-lo no cardápio | `cypress/e2e/ct05-cadastro-produto.cy.js` |

## CT01 - Login com credenciais válidas

- **Objetivo:** verificar que um funcionário cadastrado consegue entrar no sistema.
- **Pré-condição:** usuário de teste existente.
- **Passos:**
  1. Acessar `/login`.
  2. Preencher e-mail e senha corretos.
  3. Clicar em "Entrar".
- **Resultado esperado:** o sistema redireciona para `/gerenciamento`, exibe o painel administrativo e o botão "Sair" no cabeçalho.
- **Asserções:** URL contém `/gerenciamento`; `gerenciamento` visível; `btn-logout` visível.
- **Seletores `data-cy`:** `login-email`, `login-senha`, `login-submit`, `gerenciamento`, `btn-logout`.

## CT02 - Login com senha incorreta

- **Objetivo:** verificar que credenciais inválidas são rejeitadas.
- **Pré-condição:** usuário de teste existente.
- **Passos:**
  1. Acessar `/login`.
  2. Preencher o e-mail correto e uma senha errada.
  3. Clicar em "Entrar".
- **Resultado esperado:** o sistema avisa o erro, permanece em `/login` e não autentica o usuário.
- **Asserções:** alerta de erro exibido; URL contém `/login`; `login-form` visível; `btn-logout` não existe.
- **Seletores `data-cy`:** `login-email`, `login-senha`, `login-submit`, `login-form`, `btn-logout`.

## CT03 - Cadastro de funcionário com dados inválidos

- **Objetivo:** verificar que a validação do formulário impede o cadastro com dados incorretos.
- **Pré-condição:** nenhuma (página pública).
- **Passos:**
  1. Acessar `/cadastro/funcionario`.
  2. Preencher CPF curto, nome curto, e-mail válido, senha curta e confirmação diferente da senha.
  3. Clicar em "Cadastrar".
- **Resultado esperado:** mensagens de validação aparecem, o usuário permanece na página e nenhum cadastro é realizado.
- **Asserções:** `cadastro-cpf-erro` visível; `cadastro-senha-erro` visível; URL contém `/cadastro/funcionario`; alerta de sucesso não foi exibido.
- **Seletores `data-cy`:** `cadastro-cpf`, `cadastro-nome`, `cadastro-email`, `cadastro-senha`, `cadastro-confirmar-senha`, `cadastro-submit`, `cadastro-cpf-erro`, `cadastro-senha-erro`.

## CT04 - Cadastro de animal

- **Objetivo:** verificar que um funcionário logado cadastra um animal e ele aparece na página de adoção.
- **Pré-condição:** usuário logado.
- **Passos:**
  1. Acessar `/cadastro/animal`.
  2. Preencher nome (único), espécie, sexo, idade, raça e história.
  3. Clicar em "Cadastrar".
- **Resultado esperado:** mensagem de sucesso, redirecionamento para `/adocao` e o novo animal na listagem.
- **Asserções:** alerta "Animal cadastrado com sucesso!"; URL contém `/adocao`; `pet-item` com o nome do animal visível.
- **Seletores `data-cy`:** `animal-nome`, `animal-especie`, `animal-sexo`, `animal-idade`, `animal-raca`, `animal-historia`, `animal-submit`, `pet-item`.

## CT05 - Cadastro de produto no cardápio

- **Objetivo:** verificar que um funcionário logado cadastra um produto e ele aparece no cardápio.
- **Pré-condição:** usuário logado.
- **Passos:**
  1. Acessar `/cadastro/produto`.
  2. Preencher nome (único), descrição, preço e categoria.
  3. Clicar em "Cadastrar".
- **Resultado esperado:** mensagem de sucesso, redirecionamento para `/cardapio` e o novo produto na listagem.
- **Asserções:** alerta "Produto cadastrado com sucesso!"; URL contém `/cardapio`; `menu-item` com o nome do produto visível.
- **Seletores `data-cy`:** `produto-nome`, `produto-descricao`, `produto-preco`, `produto-categoria`, `produto-submit`, `menu-item`.