beforeEach(() => {
    cy.clock();
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Initial Display', () =>{
    cy.get('#timerDisplay').should('have.text', '00:10');
    cy.get('#complete').should('have.text', '0 Pomos Finished');
  });

  it('Setting Changes Display Time', () =>{
    cy.get('#settingsBtn').click();
    cy.get('#focus-time').invoke('val','20').trigger('input');
    cy.get('.close').click();
    cy.get('#timerDisplay').should('have.text', '00:20');
  });

  it('Timer Ticking Down Display',() =>{
    cy.get('#starttimer').click();
    cy.tick(5000);
    cy.get('#timerDisplay').should('have.text', '00:05');
  });


  it('Timer Run Enable Reset Button',() =>{
    cy.get('#starttimer').click();
    cy.tick(1000);
    cy.get('#resettimer').should('be.enabled');
  });

  it('Reset Timer During Work Session',() =>{
    cy.get('#starttimer').click();
    cy.tick(1000);
    cy.get('#resettimer').click();
    cy.get('#timerDisplay').should('have.text', '00:10');
    cy.get('#settingsBtn').should('be.enabled');
  });


  it('Timer End Send Alert',() =>{
    cy.get('#starttimer').click();
    cy.tick(10500);    //extra 500ms
    cy.on('window:alert', (str) => {
        expect(str).to.contains('Work Session Ended');
      })
  });

  it('Timer Stop When Autostart Off',() =>{
    cy.get('#starttimer').click();
    cy.tick(12000); 
    cy.get('#timerDisplay').should('have.text', '00:05');
  });

  it('Reset Timer During Break',() =>{
    cy.get('#starttimer').click();
    cy.tick(10000);
    cy.get('#starttimer').click();
    cy.tick(1000);
    cy.get('#resettimer').click();
    cy.get('#timerDisplay').should('have.text', '00:10');
    cy.get('#settingsBtn').should('be.enabled');
  });