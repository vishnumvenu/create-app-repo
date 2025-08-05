describe('Create App Functionality', () => {
  const AppName = 'test new app()'; 
  const existingAppName = 'test app'; 
  beforeEach(() => {
    cy.visit('https://v3-lts-eetestsystem.tooljet.com/qa-interview');
  });

  it('should allow user to create a new app ', () => {
    cy.contains('Create an app').click();
    cy.get('input[placeholder="Enter app name"]').type(AppName);

    cy.contains('Create app').should('not.be.disabled').click();

 
    cy.contains(AppName).should('exist');
  });

  it(' should disable Create App button when input is empty', () => {
    cy.contains('Create an app').click();

    cy.get('input[placeholder="Enter app name"]').should('have.value');

    cy.contains('Create app').should('be.disabled');
  });

  it(' should disable Create App button for duplicate app name', () => {
    cy.contains('Create an app').click();
    cy.get('input[placeholder="Enter app name"]').type(existingAppName);

    cy.contains('Create app').should('be.disabled');
  });

  it('should disable Create App button if app name exceeds 50 characters', () => {
    const longAppName = 'a'.repeat(51);

    cy.contains('Create an app').click();
    cy.get('input[placeholder="Enter app name"]').type(longAppName);

    cy.contains('Create app').should('be.disabled');
  });
});
