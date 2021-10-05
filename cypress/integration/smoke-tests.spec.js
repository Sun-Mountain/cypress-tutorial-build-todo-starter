describe('smoke tests', () => {
  beforeEach(() => {
    cy.request('GET', '/api/todos')
      .its('body')
      .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`))
  })

  context('with no todos', () => {
    it.only('saves new todos', () => {
      cy.visit('/')
      cy.server()
      cy.route('POST', '/api/todos')
        .as('create')

      cy.focused()
        .type('Wake up{enter}')

      cy.wait('@create')

      cy.get('.todo-list li')
        .should('have.length', 1)
    })
  })
})