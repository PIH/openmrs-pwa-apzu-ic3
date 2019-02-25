describe('Nutrition form', function () {

  before(function () {
    cy.login();
  });
  beforeEach(() => {
    cy.init();
  });
    
  it.skip('should navigate to the nutrition form and enter valid values for height, weight and muac', function () {
    cy.wait(3000);
    cy.searchPatientByID('MGT-0148-CCC');

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

        cy.get('.custom-loader')
          .first()
          .should('be.visible');
      });
  });

  after(function () {
    cy.logout();
  });
});
