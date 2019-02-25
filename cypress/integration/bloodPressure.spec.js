describe('Blood Pressure', function () {

  before(function () {
    cy.login();
  });
  beforeEach(() => {
    cy.init();
  });
    
  it('should navigate to the blood pressure form and enter valid values for systolic and diastolic blood pressure', function () {

    cy.searchPatientByID('MGT-0148-CCC');

    // Select the patient
    cy.get('.card-list')
      .first()
      .click();

    // Navigate to blood pressure summary
    cy.get('[href="#/screening/bloodPressure/form"]')
      .first()
      .click();

    // Navigate to blood pressure form
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

          // Input value for systolic BP
          cy.get('#formSystolic')
            .type('170');
          
          // Input value for diastolic BP
          cy.get('#formDiastolic')
            .type('90');
        }


        // assert that required validations is shown when form values are empty
        cy.get('#formSystolic + div.div-error > span.field-error')
          .contains('Required')
          .should('exist');

        cy.get('#formDiastolic + div.div-error > span.field-error')
          .contains('Required')
          .should('exist');


        // Input value for systolic BP
        cy.get('#formSystolic')
          .type('140');

        // Input value for diastolic BP
        cy.get('#formDiastolic')
          .type('90');

        // assert that there are no validations shown when form values are good
        cy.get('#formSystolic + div.div-error > span.field-error')
          .should('not.exist');

        cy.get('#formDiastolic + div.div-error > span.field-error')
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

  it('should navigate to the blood pressure form and enter abnormal values for systolic and diastolic blood pressure', function () {

    cy.searchPatientByID('MGT-0148-CCC');

    // Select the patient
    cy.get('.card-list')
      .first()
      .click();

    // Navigate to blood pressure summary
    cy.get('[href="#/screening/bloodPressure/form"]')
      .first()
      .click();

    // Navigate to blood pressure form
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

          // assert that required validations is shown when form values are empty
          cy.get('#formSystolic + div.div-error > span.field-error')
            .contains('Required')
            .should('exist');

          cy.get('#formDiastolic + div.div-error > span.field-error')
            .contains('Required')
            .should('exist');

          // Input value for systolic BP
          cy.get('#formSystolic')
            .type('190');
          
          // Input value for diastolic BP
          cy.get('#formDiastolic')
            .type('120');

          // Click the save form button
          cy.get('.form-action-btns > button')
            .first()
            .click();

          cy.get('.custom-loader')
            .first()
            .should('be.visible');
        }


        // assert that required validations is shown when form values are empty
        cy.get('#formSystolic + div.div-error > span.field-error')
          .contains('Required')
          .should('exist');

        cy.get('#formDiastolic + div.div-error > span.field-error')
          .contains('Required')
          .should('exist');


        // Input value for systolic BP
        cy.get('#formSystolic')
          .type('190');

        // Input value for diastolic BP
        cy.get('#formDiastolic')
          .type('120');

        // assert that warning validation is shown when form values are at abnormal limit
        cy.get('#formSystolic + div.div-error > span.field-warning')
          .contains('Abnormal value')
          .should('exist');

        cy.get('#formDiastolic + div.div-error > span.field-warning')
          .contains('Abnormal value')
          .should('exist');

        cy.wait(2000);

        
        // Click the save form button
        cy.get('.form-action-btns > button')
          .first()
          .click();

        cy.get('.custom-loader')
          .first()
          .should('be.visible');
      });
  });

  it('should navigate to the blood pressure form and enter critical values for systolic and diastolic blood pressure', function () {

    cy.searchPatientByID('MGT-0148-CCC');

    // Select the patient
    cy.get('.card-list')
      .first()
      .click();

    // Navigate to blood pressure summary
    cy.get('[href="#/screening/bloodPressure/form"]')
      .first()
      .click();

    // Navigate to blood pressure form
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

          // assert that required validations is shown when form values are empty
          cy.get('#formSystolic + div.div-error > span.field-error')
            .contains('Required')
            .should('exist');

          cy.get('#formDiastolic + div.div-error > span.field-error')
            .contains('Required')
            .should('exist');

          // Input value for systolic BP
          cy.get('#formSystolic')
            .type('230');
          
          // Input value for diastolic BP
          cy.get('#formDiastolic')
            .type('140');

          // Click the save form button
          cy.get('.form-action-btns > button')
            .first()
            .click();

          cy.get('.custom-loader')
            .first()
            .should('be.visible');
        }


        // assert that required validations is shown when form values are empty
        cy.get('#formSystolic + div.div-error > span.field-error')
          .contains('Required')
          .should('exist');

        cy.get('#formDiastolic + div.div-error > span.field-error')
          .contains('Required')
          .should('exist');


        // Input value for systolic BP
        cy.get('#formSystolic')
          .type('230');

        // Input value for diastolic BP
        cy.get('#formDiastolic')
          .type('140');

        // assert that warning validation is shown when form values are at critical limit
        cy.get('#formSystolic + div.div-error > span.field-warning')
          .contains('Critical value')
          .should('exist');

        cy.get('#formDiastolic + div.div-error > span.field-warning')
          .contains('Critical value')
          .should('exist');

        cy.wait(2000);

        
        // Click the save form button
        cy.get('.form-action-btns > button')
          .first()
          .click();

        cy.get('.custom-loader')
          .first()
          .should('be.visible');
      });
  });

  it('save button should be disabled when there are validation errors', function () {

    cy.searchPatientByID('MGT-0148-CCC');

    // Select the patient
    cy.get('.card-list')
      .first()
      .click();

    // Navigate to blood pressure summary
    cy.get('[href="#/screening/bloodPressure/form"]')
      .first()
      .click();

    // Navigate to blood pressure form
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

          // assert that required validations is shown when form values are empty
          cy.get('#formSystolic + div.div-error > span.field-error')
            .contains('Required')
            .should('exist');

          cy.get('#formDiastolic + div.div-error > span.field-error')
            .contains('Required')
            .should('exist');

          // Input value for systolic BP
          cy.get('#formSystolic')
            .type('290');
          
          // Input value for diastolic BP
          cy.get('#formDiastolic')
            .type('200');

          // asser that the save buttonn iis disabled
          cy.get('.form-action-btns > button')
            .first()
            .should('be.disabled');

        }


        // assert that required validations is shown when form values are empty
        cy.get('#formSystolic + div.div-error > span.field-error')
          .contains('Required')
          .should('exist');

        cy.get('#formDiastolic + div.div-error > span.field-error')
          .contains('Required')
          .should('exist');


        // Input value for systolic BP
        cy.get('#formSystolic')
          .type('290');

        // Input value for diastolic BP
        cy.get('#formDiastolic')
          .type('200');

        // assert that validation errors are shown when value exceed their limits
        cy.get('#formSystolic + div.div-error > span.field-error')
          .contains('Must be less than 261')
          .should('exist');

        cy.get('#formDiastolic + div.div-error > span.field-error')
          .contains('Must be less than 141')
          .should('exist');

        cy.wait(2000);

        
        // asser that the save buttonn iis disabled
        cy.get('.form-action-btns > button')
          .first()
          .should('be.disabled');

      });
  });

  after(function () {
    cy.logout();
  });
});
