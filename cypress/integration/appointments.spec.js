describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });


  it("Should Book an appointment", () => {

  cy.get(':nth-child(2) > .appointment__add > .appointment__add-button').click()
  cy.get('[data-testid=student-name-input]').type("Lydia Miller-Jones")

  cy.get(':nth-child(1) > .interviewers__item-image').click()

  cy.get('.button--confirm').click()


  cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  
  it("Edit an appointment", () => {
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true });  


    cy.get('[data-testid=student-name-input]').clear().type("Lydia Miller-Jones")
    cy.get(':nth-child(2) > .interviewers__item-image').click()
    cy.get('.button--confirm').click()

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  
  });


  it("Delete an appointment", () => {
    cy.get("[alt=Delete]")
    .first()
    .click({ force: true });  
    cy.get('.appointment__actions > :nth-child(2)').click()

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });
});