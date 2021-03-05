beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Initial Display', () =>{
    cy.get('#timerDisplay').then( () => function($el) {
        expect($el).to.have.attr('text','00:10');
      })
  });

  it('Setting Changes Display Time', () =>{
    cy.get('#settingsBtn').click();
    cy.get('#focus-time').invoke('val','20').trigger('input');
    cy.get('#timerDisplay').then( () => function($el) {
        expect($el).to.have.attr('text','00:20');
      })
  });

  it('Timer Run Update Display',() =>{
    cy.get('#starttimer').click();
    cy.wait(5000);
    cy.get('#timerDisplay').then( () => function($el) {
        expect($el).to.have.attr('text','00:05');
      })
  });

  it('Timer End Send Alert',() =>{
    cy.get('#starttimer').click();
    cy.wait(10000);
    cy.on('window:alert', (str) => {
        expect(str).to.equal('Work Session Ended');
      })
  });

  it('Timer Run Enable Reset Button',() =>{
    cy.get('#starttimer').click();
    cy.wait(1000);
    cy.get('#resettimer').should('be.enabled');
  });