describe("The Web App", function () {
  it("successfully selected a gif", function () {
    cy.visit("http://localhost:3000");
    cy.get('[role="button"]').first().click();
    cy.get('input[type="text"]').type("pizza");
    cy.get("form").submit();
    cy.get('[class*="modal"] video');
  });
});
