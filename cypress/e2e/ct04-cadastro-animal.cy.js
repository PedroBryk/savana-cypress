describe("Animais", () => {
  beforeEach(() => {
    cy.garantirUsuario();
    cy.login();
  });

  it("CT04 - cadastrar um animal e vê-lo na adoção", () => {
    const nome = `Rex ${Date.now()}`;
    const alerta = cy.stub().as("alerta");
    cy.on("window:alert", alerta);

    cy.visit("/cadastro/animal");
    cy.dc("animal-nome").type(nome);
    cy.dc("animal-especie").type("Cachorro");
    cy.dc("animal-sexo").type("Macho");
    cy.dc("animal-idade").type("3");
    cy.dc("animal-raca").type("SRD");
    cy.dc("animal-historia").type("Resgatado e muito dócil com crianças.");
    cy.dc("animal-submit").click();

    cy.get("@alerta").should("have.been.calledWith", "Animal cadastrado com sucesso!");
    cy.url().should("include", "/adocao");
    cy.contains('[data-cy="pet-item"]', nome).should("be.visible");
  });
});