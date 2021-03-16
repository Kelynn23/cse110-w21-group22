beforeEach(() => {
    cy.clock();
    cy.visit('https://kelynn23.github.io/cse110-w21-group22/');
  });

it('Starts in "light" focus mode', () => {
	cy.get('body').then($el => expect($el).to.have.prop('id', 'Focus'));
});

it('Switches to dark-focus', () => {
	cy.get('#settingsBtn').click();
	cy.get('.switch').eq(1).click();
	cy.get('.close').last().click();
	cy.get('body').then($el => expect($el).to.have.prop('id', 'dark-Focus'));
});

it('Switch from break to dark break', () => {
	cy.get('#starttimer').click();
	cy.tick();
});

it('Header, timercontainer, complete, and tasklist start in light mode', () => {
	cy.get('header').then($el => expect($el).to.have.prop('id', ''));
	cy.get('.timercontainer').then($el => expect($el).to.have.prop('id', ''));
	cy.get('.complete').then($el => expect($el).to.have.prop('id', ''));
	cy.get('.tasklist').then($el => expect($el).to.have.prop('id',''));
});

it('Header, timercontainer, complete, and tasklist dark mode', () => {
	cy.get('#settingsBtn').click();
	cy.get('.switch').eq(1).click();
	cy.get('.close').last().click();

	cy.get('header').then($el => expect($el).to.have.prop('id', 'dark'));
	cy.get('.timercontainer').then($el => expect($el).to.have.prop('id', 'dark'));
	cy.get('.complete').then($el => expect($el).to.have.prop('id', 'dark'));
	cy.get('.tasklist').then($el => expect($el).to.have.prop('id','dark'));
});

it('Header, timercontainer, comlete, and tasklist back to light mode', () => {
	cy.get('#settingsBtn').click();
	cy.get('.switch').eq(1).click();
	cy.get('.close').last().click();

	cy.get('#settingsBtn').click();
	cy.get('.switch').eq(1).click();
	cy.get('.close').last().click();

	cy.get('header').then($el => expect($el).to.have.prop('id', ''));
	cy.get('.timercontainer').then($el => expect($el).to.have.prop('id', ''));
	cy.get('.complete').then($el => expect($el).to.have.prop('id', ''));
	cy.get('.tasklist').then($el => expect($el).to.have.prop('id',''));
});

it('Check the style with dark mode disabled', ()=>{

    cy.get('#starttimer').click();
    //in focus time
    cy.get('body').then($el => expect($el).to.have.prop('id', 'Focus'));
    cy.tick(1501000);
    //in short break
    cy.get('body').then($el => expect($el).to.have.prop('id', 'Break'));
    cy.tick(1801000*3);
    //in long break
    cy.get('body').then($el => expect($el).to.have.prop('id', 'Break'));
});


it('Check the style with dark mode enabled', ()=>{
    cy.get('#settingsBtn').click();
    cy.get('.switch').eq(1).click();
    cy.get('.close').last().click();

    cy.get('#starttimer').click();
    //in focus time
    cy.get('body').then($el => expect($el).to.have.prop('id', 'dark-Focus'));
    cy.tick(1501000);
    //in short break
    cy.get('body').then($el => expect($el).to.have.prop('id', 'dark-Break'));
    cy.tick(1801000*3);
    //in long break
    cy.get('body').then($el => expect($el).to.have.prop('id', 'dark-Break'));
    
});
