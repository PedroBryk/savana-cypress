import { usuario } from "../support/dados";

describe("Autenticação", () => {
  before(() => cy.garantirUsuario());

  it("CT01 - login com credenciais válidas", () => {
    cy.visit("/login");
    cy.dc("login-email").type(usuario.email);
    cy.dc("login-senha").type(usuario.senha, { log: false });
    cy.dc("login-submit").click();

    cy.url().should("include", "/gerenciamento");
    cy.dc("gerenciamento").should("be.visible");
    cy.dc("btn-logout").should("be.visible");
  });
});