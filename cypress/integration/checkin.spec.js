import { RESPONSE } from '../support/constants';
describe('Check in', () => {

  before(() => {
    cy.init(RESPONSE.GET_PATIENT_ENCOUNTER);
    cy.login();
  });

  it('Should search for patient and Check-in patient into NEW location, and check if perso present at visit', () => {
    cy.searchPatientByID('MGT 148 CCC');

    // Select the patient
    cy.get('.card-list')
      .first()
      .click();

    // Navigate to check-in summary
    cy.get('[href="#/checkin/checkInPage"]')
      .first()
      .click();

    // Navigate to check-in form
    cy.get('u')
      .first()
      .click();

    cy.wait(3000);
    // Check if form is in edit mode
    cy.get('.form-action-btns > button')
      .first()
      .then(($button) => {
        const text = $button.text();
        // if form is in EDIT mode ...
        if (text === 'Edit') {

          // Put form in EDIT mode
          cy.get('.form-action-btns > button')
            .first()
            .click();
          cy.wait(2000);
        }

        // hack to try to fix stupid Cypress scrolling issue
        // cy.get('.swiper-container').scrollTo(0, 0);

        // Select a check-in reason
        cy.get('#sharc')
          .scrollIntoView()
          .click({ force: true });

        // Select a person present at visit answer?
        cy.get('#guardian')
          .click();
          
        cy.wait(2000);
        // Save the new check-in location 
        cy.get('.form-action-btns > button')
          .first()
          .click();

        cy.wait(3000);
  
        // Check that the form is in edit mode
        cy.get('.form-action-btns > button')
          .first()
          .should('contain', 'Edit');
      });
  });

  after(() => {
    cy.logout();
  });
});
