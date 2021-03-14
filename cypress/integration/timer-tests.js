beforeEach(() => {
    cy.clock();
    cy.visit('https://kelynn23.github.io/cse110-w21-group22/');
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
    cy.get('.close').last().click();
    cy.get('#timerDisplay').should('have.text', '00:20');
  });

  it('Timer Ticking Down Display',() =>{
    cy.get('#starttimer').click();
    cy.tick(5000);
    cy.get('#timerDisplay').should('have.text', '00:05');
  });

  it('Browser Name Display', () => {
    cy.get('#starttimer').click();
    cy.get('#pageTitle').should('have.text', '(00:10) Focus');
    cy.tick(1000);
    cy.get('#pageTitle').should('have.text', '(00:09) Focus');
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

  it('Timer Resizes For Smaller Window',() =>{
    cy.viewport(520, 750)
    cy.get('.timer').should('have.css', 'font-size', '52px');
  });


  it('Tests for invalid Input', () => {
    cy.get('#settingsBtn').click();
    cy.get('#focus-time').invoke('val','70').trigger('input');
    cy.get('#short-break').invoke('val','70').trigger('input');
    cy.get('#long-break').invoke('val','70').trigger('input');
    cy.get('input:invalid').should('have.length', 3);
  });


  it('Checks if audio plays when timer ends', () => {
    cy.get('#starttimer').click();
    cy.tick(10000);
    cy.get('audio').should((els)=>{
      let audible = false
      els.each((i, el)=>{
        console.log(el)
        console.log(el.duration, el.paused, el.muted)
        if (el.duration > 0 && !el.paused && !el.muted) {
          audible = true
        }
  
        // expect(el.duration > 0 && !el.paused && !el.muted).to.eq(false)
      })
      expect(audible).to.eq(true)
    })
  });


  it('Checks if audio does not play when timer ends if mute is on', () => {
    cy.get('#settingsBtn').click();
    cy.get('.switch').eq(1).click();
    cy.get('.close').click();
    cy.get('#starttimer').click();
    cy.tick(10000);
    cy.get('audio').should((els)=>{
      let audible = false
      els.each((i, el)=>{
        console.log(el)
        console.log(el.duration, el.paused, el.muted)
        if (el.duration > 0 && !el.paused && !el.muted) {
          audible = true
        }
  
        // expect(el.duration > 0 && !el.paused && !el.muted).to.eq(false)
      })
      expect(audible).to.eq(false)
    })
  });