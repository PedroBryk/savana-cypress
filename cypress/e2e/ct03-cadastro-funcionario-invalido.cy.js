describe("Cadastro de funcionário", () => {
  it("CT03 - dados inválidos mostram erros e não cadastram", () => {
    const alerta = cy.stub().as("alerta");
    cy.on("window:alert", alerta);

    cy.visit("/cadastro/funcionario");
    cy.dc("cadastro-cpf").type("123");
    cy.dc("cadastro-nome").type("Ab");
    cy.dc("cadastro-email").type("novo@teste.com");
    cy.dc("cadastro-senha").type("123");
    cy.dc("cadastro-confirmar-senha").type("456");
    cy.dc("cadastro-submit").click();

    cy.dc("cadastro-cpf-erro").should("be.visible");
    cy.dc("cadastro-senha-erro").should("be.visible");
    cy.url().should("include", "/cadastro/funcionario");
    cy.get("@alerta").should("not.have.been.called");
  });
});