describe('Check in', function () {

  before(function () {
    cy.login();
  });

  it('Should search for patient and checkin patient into NEW location', function () {
    // Search for a patient
    cy.searchPatientByID('MGT-387');

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

    // Check if form is in edit mode
    cy.get('.form-action-btns > button')
      .first()
      .then(($button) => {
        const text = $button.text();
        // if form is in EDIT mode ...
        if (text !== 'Edit') {

          // Select a check-in location
          cy.get('.form-group label')
            .first()
            .click();
      
          // Save the new check-in location 
          cy.get('.form-action-btns > button')
            .first()
            .click();
  
          // Check that the new location was saved properly
          cy.get('.form-group .button-group-view')
            .first()
            .should('contain', 'SHARC');
        }
      });
  });

  it('Should search already checked-in patient and update the checkin location', function () {
    // Search for a patient
    cy.searchPatientByID('MGT-387');

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

    // Check if form is in edit mode
    cy.get('.form-action-btns > button')
      .first()
      .then(($button) => {
        const text = $button.text();
        // if form is in EDIT mode ...
        if (text === 'Edit') {

          /**
            *  TODO: figure out a way to detect the already checked-in location and choose another option so the
            *  SAVE button becomes enabled, with SEED data and a clearing of all checked in patients after running test
            * this would be unnessary, just Uncomment test.
           */
          // cy.wait(3000);
          // // Put form in EDIT mode
          // cy.get('.form-action-btns > button')
          //   .first()
          //   .click();
          // cy.wait(3000);
            

          // // Select a check-in location
          // cy.get('.form-group label')
          //   .eq(2)
          //   .click();

          // cy.wait(5000);
            
          // // Save the new check-in location 
          // cy.get('.form-action-btns > button')
          //   .first()
          //   .click();
            
          // cy.wait(5000);
          // // Check that the new location was saved properly
          // cy.get('.form-group .button-group-view')
          //   .first()
          //   .should('contain', 'Inpatient');
        }
    
      });
  });

  after(function () {
    cy.logout();
  });
});
