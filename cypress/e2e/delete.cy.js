describe('Delete App', () => {
  const appName = 'test app';

  beforeEach(() => {
    cy.visit('https://v3-lts-eetestsystem.tooljet.com/qa-interview');
    cy.url().should('include', '/qa-interview');
  });

  it('should show confirmation and delete the app when Yes is clicked', () => {
    cy.contains(appName)
      .parents('[class*=sc-]')
      .within(() => {
        cy.get('button').last().click(); // Open 3-dot menu
      });

    cy.contains('Delete app').click();


    cy.contains(`The app ${appName} and the associated data will be permanently deleted,do you want to continue?`).should('be.visible');

    cy.contains('Yes').click();

    cy.contains(appName).should('not.exist');
  });

  it('should cancel deletion when Cancel is clicked', () => {
    cy.contains(appName)
      .parents('[class*=sc-]')
      .within(() => {
        cy.get('button').last().click(); 
      });

    cy.contains('Delete app').click();
    cy.contains(`The app ${appName} and the associated data will be permanently deleted`).should('be.visible');
    cy.contains('Cancel').click();

    cy.contains(appName).should('exist');
  });
});
