describe('Login Tests', function () {

  it('Should login in and log out', function () {

    // these are custom command I defined into commands.js
    cy.login();
    cy.logout();  //TODO get this working
  });

});
