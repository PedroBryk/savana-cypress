import { apiUrl, usuario } from "./dados";

// Seletor exclusivo por data-cy
Cypress.Commands.add("dc", (nome) => cy.get(`[data-cy="${nome}"]`));

// Garante que o usuário de teste existe (se já existir, ignora o erro)
Cypress.Commands.add("garantirUsuario", () => {
  cy.request({
    method: "POST",
    url: `${apiUrl}/users`,
    body: {
      name: usuario.nome,
      cpf: usuario.cpf,
      email: usuario.email,
      password: usuario.senha,
    },
    failOnStatusCode: false,
  });
});

// Login pela interface, guardado em sessão para não repetir em todo teste
Cypress.Commands.add("login", () => {
  cy.session(usuario.email, () => {
    cy.visit("/login");
    cy.dc("login-email").type(usuario.email);
    cy.dc("login-senha").type(usuario.senha, { log: false });
    cy.dc("login-submit").click();
    cy.url().should("include", "/gerenciamento");
  });
});