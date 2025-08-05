describe('Rename App Functionality', () => {
  const originalAppName = 'test app';
  const newAppName = 'test new app';

  beforeEach(() => {
    cy.visit('https://v3-lts-eetestsystem.tooljet.com/qa-interview');
  });

  it('should rename the app from "test app" to "test new app"', () => {
    cy.contains(originalAppName)
      .parents('[data-testid="app-card"]')
      .within(() => {
        cy.get('button').contains('⋮').click({ force: true });
      });

    cy.contains('Rename app').click();

    cy.get('input[placeholder="App name"]').clear().type(newAppName);

    cy.contains('Rename').click();

    cy.contains(newAppName, { timeout: 10000 }).should('be.visible');
  });

  it('should disable Rename button when trying to rename to the same name', () => {
    cy.contains(newAppName)
      .parents('[data-testid="app-card"]')
      .within(() => {
        cy.get('button').contains('⋮').click({ force: true });
      });

    cy.contains('Rename app').click();

    cy.get('input[placeholder="App name"]').clear().type(newAppName);

    cy.contains('Rename').should('be.disabled');
  });
});
