function deletaConta() {

    cy.get(':nth-child(5) > a').click()
    cy.get('b').should('be.visible')
}

module.exports = {

    deletaConta
}