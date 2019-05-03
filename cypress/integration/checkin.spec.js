import { RESPONSE } from '../support/constants';
describe('Check in', () => {

  before(() => {
    cy.init(RESPONSE.GET_PATIENT_ENCOUNTER);
    cy.login();
  });
    
  it('Should search for patient and Check-in patient into NEW location', () => {
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
    cy.get('.summary-swiper-button')
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

        // Select a check-in location
        cy.get('.form-group label')
          .eq(1)
          .click();
          
        cy.wait(2000);
        // Save the new check-in location 
        cy.get('.form-action-btns > button')
          .first()
          .click();

        cy.wait(3000);
  
        // Check that the new location was saved properly
        cy.get('.form-group .button-group-view')
          .first()
          .should('not.contain', 'OPD at health center');
      });
  });

  after(() => {
    cy.logout();
  });
});
