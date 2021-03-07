beforeEach(() => {
    cy.clock();
    cy.visit('http://127.0.0.1:5500/index.html');

    cy.get('#settingsBtn').click();
    cy.get('.switch').click();
    cy.get('.close').click();
  });

  it('Autostart Tick Down', () => {
    cy.get('#starttimer').click();
    cy.tick(27000);
    cy.get('#timerDisplay').should('have.text', '00:03');
  });

  it('Autostart Mode Transition', () => {
    cy.get('#starttimer').click();
    cy.tick(27000);
    cy.get('#modeDisplay').should('have.text', 'Short Break');
    cy.tick(90000);
    cy.get('#modeDisplay').should('have.text', 'Long Break');
  });

  it('Correct Number of Pomos', () => {
    cy.get('#starttimer').click();
    cy.tick(30000);
    cy.get('#complete').should('have.text', '1 Pomos Finished');
    cy.tick(100000);
    cy.get('#complete').should('have.text', '4 Pomos Finished');
  });