describe('Login Tests', function () {

  it('Should login in and log out', function () {

    // these are custom command I defined into commands.js
    cy.login();
    cy.wait(5000);
    cy.logout();  //TODO get this working
  });
  it('Should not login with invalid username', function () {
    cy.loginWithInvalidInfo();
  });

});
