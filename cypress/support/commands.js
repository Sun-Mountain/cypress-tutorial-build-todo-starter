Cypress.Commands.add('seedAndVisit', () => {
  cy.server()
  cy.route('GET', '/api/todos', 'fixture:todos')
  cy.visit('/')
})