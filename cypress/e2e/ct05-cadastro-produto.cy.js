describe("Cardápio", () => {
  beforeEach(() => {
    cy.garantirUsuario();
    cy.login();
  });

  it("CT05 - cadastrar um produto e vê-lo no cardápio", () => {
    const nome = `Capuccino ${Date.now()}`;
    const alerta = cy.stub().as("alerta");
    cy.on("window:alert", alerta);

    cy.visit("/cadastro/produto");
    cy.dc("produto-nome").type(nome);
    cy.dc("produto-descricao").type("Café com leite vaporizado");
    cy.dc("produto-preco").type("12.90");
    cy.dc("produto-categoria").type("Bebidas");
    cy.dc("produto-submit").click();

    cy.get("@alerta").should("have.been.calledWith", "Produto cadastrado com sucesso!");
    cy.url().should("include", "/cardapio");
    cy.contains('[data-cy="menu-item"]', nome).should("be.visible");
  });
});