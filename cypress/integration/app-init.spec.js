const todos = [
  {
    "id": 1,
    "name": "Wake Up",
    "isComplete": false
  },
  {
    "id": 2,
    "name": "Feed Cats",
    "isComplete": false
  },
  {
    "id": 3,
    "name": "Eat Breakfast",
    "isComplete": false
  },
  {
    "id": 4,
    "name": "Brush Teeth",
    "isComplete": false
  }
]

describe('App initialization', () => {
  it.only('Loads todos on page load', () => {
    cy.server()
    cy.route('GET', '/api/todos', todos)
    cy.visit('/')

    cy.get('.todo-list li')
      .should('have.length', 4)
  })
})