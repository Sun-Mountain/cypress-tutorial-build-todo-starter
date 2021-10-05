describe('Footer', () => {
  context('with a single todo', () => {
    it.only('displays a singular todo in count', () => {
      cy.seedAndVisit([{id: 1, name: 'Wake Up', isComplete: false}])
      cy.get('.todo-count')
        .should('contain', '1 todo left')
    })
  })
})