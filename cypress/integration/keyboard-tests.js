beforeEach(() => {
  cy.clock();
  cy.visit('https://kelynn23.github.io/cse110-w21-group22/');
});

it('SpaceBar testing',() =>{
  cy.get('body').type(" ");
  cy.tick(5000);
  cy.get('#timerDisplay').should('have.text', '00:05');
});