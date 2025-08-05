describe('Login Page Functionality', () => {
  const validEmail = 'valid@example.com';
  const validPassword = 'ValidPassword123';
  const invalidEmail = 'invalid@example.com';
  const invalidPassword = 'WrongPassword';

  beforeEach(() => {
    cy.visit('https://v3-lts-eetestsystem.tooljet.com/login/qa-interview?redirectTo=/');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('input[type="email"]').type(validEmail);
    cy.get('input[type="password"]').type(validPassword);
    cy.contains('Sign in').click();

    cy.url().should('include', '/qa-interview');
  });

  it('should show an error with invalid credentials', () => {
    cy.get('input[type="email"]').type(invalidEmail);
    cy.get('input[type="password"]').type(invalidPassword);
    cy.contains('Sign in').click();

    cy.contains('Invalid Credentials').should('be.visible');
    cy.url().should('include', '/login'); 
  });

  it('should keep sign in button disabled if fields are empty', () => {
    cy.contains('Sign in').should('be.disabled');
  });

  it('should keep sign in button disabled if only email is filled', () => {
    cy.get('input[type="email"]').type(validEmail);
    cy.contains('Sign in').should('be.disabled');
  });

  it('should keep sign in button disabled if only password is filled', () => {
    cy.get('input[type="password"]').type(validPassword);
    cy.contains('Sign in').should('be.disabled');
  });

  it('should enable sign in button if both email and password are filled', () => {
    cy.get('input[type="email"]').type(validEmail);
    cy.get('input[type="password"]').type(validPassword);
    cy.contains('Sign in').should('not.be.disabled');
  });
});
