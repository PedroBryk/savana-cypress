import { usuario } from "../support/dados";

describe("Autenticação", () => {
  before(() => cy.garantirUsuario());

  it("CT02 - login com senha incorreta", () => {
    const alerta = cy.stub().as("alerta");
    cy.on("window:alert", alerta);

    cy.visit("/login");
    cy.dc("login-email").type(usuario.email);
    cy.dc("login-senha").type("senhaerrada1", { log: false });
    cy.dc("login-submit").click();

    cy.get("@alerta").should("have.been.called");
    cy.url().should("include", "/login");
    cy.dc("login-form").should("be.visible");
    cy.dc("btn-logout").should("not.exist");
  });
});