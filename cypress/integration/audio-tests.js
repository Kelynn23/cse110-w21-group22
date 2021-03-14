beforeEach(() => {
    cy.clock();
    cy.visit('https://kelynn23.github.io/cse110-w21-group22/');
  });

  /**
   * source: https://github.com/cypress-io/cypress/issues/1750
   */
  const expectPlayingAudio = () => {
    cy.get('audio,video').should((els)=>{
      let audible = false
      els.each((i, el)=>{
        console.log(el)
        console.log(el.duration, el.paused, el.muted)
        if (el.duration > 0 && !el.paused && !el.muted) {
          audible = true
        }
      })
      expect(audible).to.eq(true)
    })
  }

  const expectMuted = () => {
    cy.get('audio,video').should((els)=>{
      let isMuted = true
      els.each((i, el)=>{
        console.log(el)
        console.log(el.duration, el.paused, el.muted)
        if (el.duration > 0 && !el.paused && !el.muted) {
          isMuted = false
        }
      })
      expect(isMuted).to.eq(true)
    })
  }

it('Plays Audio At Pomo End', ()=>{
    cy.get('#starttimer').click();
    cy.tick(10000);
    expectPlayingAudio();
});

it('Not Play Audio If Muted', ()=>{
    cy.get('#settingsBtn').click();
    cy.get('.switch').last().click();
    cy.get('.close').last().click();

    cy.get('#starttimer').click();
    cy.tick(25000);
    expectMuted();
});