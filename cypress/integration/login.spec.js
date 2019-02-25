describe('Login Tests', () => {

  it('Should login in and log out', () => {

    // these are custom command I defined into commands.js
    cy.login();
    cy.wait(5000);
    cy.logout();  //TODO get this working
  });
  it('Should not login with invalid username', () => {
    cy.loginWithInvalidInfo();
  });

});
