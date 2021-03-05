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