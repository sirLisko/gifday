describe('The Web App', function() {
  // it('successfully selected a gif', function() {
  //   cy.visit('http://localhost:3000');
  //   cy.get('[class*="StyledDay"]')
  //     .first()
  //     .click();
  //   cy.get('input[type="text"]').type('pizza');
  //   cy.get('form').submit();
  //   cy.get('[class*="StyledOk"]').click();
  //   cy.get('[class*="StyledMonth"] video');
  // });

  it('successfully show the gif on hover an img', function() {
    cy.visit('http://localhost:3000');
    cy.get('[class*="StyledDay"]')
      .first()
      .click();
    cy.get('input[type="text"]').type('pizza');
    cy.get('form').submit();
    cy.get('[class*="StyledOk"]').click();
    cy.get('[class*="StyledMonth"] video').should('not.be.visible');
    cy.get('[class*="StyledMonth"] img').should('be.visible');
    cy.get('[class*="StyledDay"]')
      .first()
      .trigger('mouseenter');
    cy.get('[class*="StyledMonth"] video').should('be.visible');
    cy.get('[class*="StyledMonth"] img').should('not.be.visible');
  });
});
