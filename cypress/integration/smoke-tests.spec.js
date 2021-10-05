describe('smoke tests', () => {
  beforeEach(() => {
    cy.request('GET', '/api/todos')
      .its('body')
      .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`))
  })

  context('with no todos', () => {
    it('saves new todos', () => {
      const items = [
        {text: 'Wake up', expectedLength: 1},
        {text: 'Feed cats', expectedLength: 2},
        {text: 'Eat breakfast', expectedLength: 3}
      ]

      cy.visit('/')
      cy.server()
      cy.route('POST', '/api/todos')
        .as('create')

      cy.wrap(items)
        .each(todo => {
          cy.focused()
            .type(todo.text)
            .type('{enter}')

          cy.wait('@create')

          cy.get('.todo-list li')
            .should('have.length', todo.expectedLength)
        })
    })
  })

  context('with active todos', () => {
    beforeEach(() => {
      cy.fixture('todos')
        .each(todo => {
          const newTodo = Cypress._.merge(todo, {isComplete: false})
          cy.request('POST', '/api/todos', newTodo)
        })
      cy.visit('/')
    })

    it.only('loads existing data from the db', () => {
      cy.get('.todo-list li')
        .should('have.length', 4)
    })
  })
})