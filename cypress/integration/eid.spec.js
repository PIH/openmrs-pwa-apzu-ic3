describe('EID form', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.init();
  });
  
  it(`Should not display any other question when "Breastfeeding" answer is not "stopped over 6 weeks ago"`, () => {
    cy.searchPatientByID('MGT-0148-CCC');
  
    // Select the patient
    cy.get('.card-list')
      .first()
      .click();
  
    // Navigate to eid summary
    cy.get('[href="#/screening/eid/form"]')
      .first()
      .click();
  
    // Navigate to eid form
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
  
        // Select "Brestfed Exclusively"

        cy.get('#breastfed_exclusively')
          .click();
        // Assert that the test type question is not asked
        cy.get('[for=formHivTestType]')
          .should('not.be.visible');
        cy.wait(2000);


        // Select "Mixed Feeding"

        cy.get('#mixed_feeding')
          .click();
        // Assert that the test type question is not asked
        cy.get('[for=formHivTestType]')
          .should('not.be.visible');
        cy.wait(2000);


        // Select "Brestfeeding Complimentary"

        cy.get('#breastfeeding_complimentary')
          .click();
        // Assert that the test type question is not asked
        cy.get('[for=formHivTestType]')
          .should('not.be.visible');
        cy.wait(2000);


        // Select "Breastfeeding stopped in last 6 weeks"

        cy.get('#breastfeeding_stopped_in_last_6_weeks')
          .click();
        // Assert that the test type question is not asked
        cy.get('[for=formHivTestType]')
          .should('not.be.visible');
        cy.wait(2000);   
      });
  });

  it(`Should display "Test-Type" question when "Breastfeeding" answer is "stopped over 6 weeks ago"`, () => {
    cy.searchPatientByID('MGT-0148-CCC');
  
    // Select the patient
    cy.get('.card-list')
      .first()
      .click();
  
    // Navigate to eid summary
    cy.get('[href="#/screening/eid/form"]')
      .first()
      .click();
  
    // Navigate to eid form
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
  
        // Select "Breastfeeding stopped over 6 weeks ago"

        cy.get('#breastfeeding_stopped_over_6_weeks_ago')
          .click();
        // Assert that the test type question is asked
        cy.get('[for=formHivTestType]')
          .should('be.visible');
      });
  });

  it(`Should display "Rapid Test Results" question when "Test-Type" answer is "HIV Rapid Test"`, () => {
    cy.searchPatientByID('MGT-0148-CCC');
  
    // Select the patient
    cy.get('.card-list')
      .first()
      .click();
  
    // Navigate to eid summary
    cy.get('[href="#/screening/eid/form"]')
      .first()
      .click();
  
    // Navigate to eid form
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
  
        // Select "Breastfeeding stopped over 6 weeks ago"

        cy.get('#breastfeeding_stopped_over_6_weeks_ago')
          .click();
        // Assert that the test type question is asked
        cy.get('[for=formHivTestType]')
          .should('be.visible');

        // Select "HIV Rapid Test"

        cy.get('#hiv_rapid_test')
          .click();
        // Assert that the Rapid Test Results question is asked
        cy.get('[for=formRapidTest]')
          .should('be.visible');
      });
  });

  it(`Should display "Bled" question when "Test-Type" answer is "DNA PCR"`, () => {
    cy.searchPatientByID('MGT-0148-CCC');
  
    // Select the patient
    cy.get('.card-list')
      .first()
      .click();
  
    // Navigate to eid summary
    cy.get('[href="#/screening/eid/form"]')
      .first()
      .click();
  
    // Navigate to eid form
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
  
        // Select "Breastfeeding stopped over 6 weeks ago"

        cy.get('#breastfeeding_stopped_over_6_weeks_ago')
          .click();
        // Assert that the test type question is asked
        cy.get('[for=formHivTestType]')
          .should('be.visible');

        // Select "DNA PCR"

        cy.get('#dna_pcr')
          .click();
        // Assert that the Bled question is asked
        cy.get('[for=formBled]')
          .should('be.visible');
      });
  });

  after(() => {
    cy.logout();
  });
});
