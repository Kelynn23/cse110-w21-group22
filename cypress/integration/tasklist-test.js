beforeEach(() => {
    cy.clock();
    cy.visit('https://kelynn23.github.io/cse110-w21-group22/');
  });


  it('Adds a item to the tasklist', () => {
    cy.get('#task').invoke('val','this is a task').trigger('input');
    cy.get('#addtask').click();
    cy.get('ul > li').should('have.length', 1);
  });


  it('Checks that you can not add more than 20 task', () => {
    for(let i = 0; i < 25; i++) {
        cy.get('#task').invoke('val','this is a task').trigger('input');
        cy.get('#addtask').click();
    }

    cy.get('ul > li').should('have.length', 20);
  });
