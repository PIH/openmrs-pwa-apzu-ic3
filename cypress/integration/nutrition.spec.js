describe('Nutrition form', function () {

  before(function () {
    cy.login();
  });
  beforeEach(() => {
    cy.init();
  });
    
  it.skip('should navigate to the nutrition form and enter valid values for height, weight and muac', function () {
    cy.wait(3000);
    cy.searchPatientByID('MGT 148 CCC');

    // Select the patient
    cy.get('.card-list')
      .first()
      .click();

    // Navigate to nutrition  summary
    cy.get('[href="#/screening/nutrition/form"]')
      .first()
      .click();

    // Navigate to nutrition form
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

          // Input value for height
          cy.get('#formWeight')
            .type('76');
          
          // Input value for height
          cy.get('#formHeight')
            .type('50');

          // Input value for MUAC
          cy.get('#formMuac')
            .type('12.5');
        }


        // Input value for height
        cy.get('#formWeight')
          .type('76');
        
        // Input value for height
        cy.get('#formHeight')
          .type('50');

        // Input value for MUAC
        cy.get('#formMuac')
          .type('12.5');

        // assert that there are no validations shown when form values are good
        cy.get('#formWeight + div.div-error > span.field-error')
          .should('not.exist');

        cy.get('#formHeight + div.div-error > span.field-error')
          .should('not.exist');
        
        cy.get('#formMuac + div.div-error > span.field-error')
          .should('not.exist');

        
        // Click the save form button
        cy.get('.form-action-btns > button')
          .first()
          .click();
      });
  });

  it('save button should be disabled for invalid values for height and weight', function () {
    cy.wait(3000);
    cy.searchPatientByID('MGT 148 CCC');

    // Select the patient
    cy.get('.card-list')
      .first()
      .click();

    // Navigate to nutrition  summary
    cy.get('[href="#/screening/nutrition/form"]')
      .first()
      .click();

    // Navigate to nutrition form
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

          // Input value for height
          cy.get('#formWeight')
            .type('120');
          
          // Input value for height
          cy.get('#formHeight')
            .type('220');

          // Input value for MUAC
          cy.get('#formMuac')
            .type('12.5');
        }


        // Input value for height
        cy.get('#formWeight')
          .type('120');
        
        // Input value for height
        cy.get('#formHeight')
          .type('220');

        // Input value for MUAC
        cy.get('#formMuac')
          .type('12.5');

        // assert that validations are shown when form values exceed valid limits
        cy.get('#formWeight + div.div-error > span.field-error')
          .contains('Must be less than 101')
          .should('exist');

        cy.get('#formHeight + div.div-error > span.field-error')
          .contains('Must be less than 216')
          .should('exist');

        // asser that the save buttonn is disabled
        cy.get('.form-action-btns > button')
          .first()
          .should('be.disabled');
      });
  });

  after(function () {
    cy.logout();
  });
});
