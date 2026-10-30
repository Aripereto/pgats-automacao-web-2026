function verificarInscricao() {
    cy.get('.single-widget > h2').should('contain', 'Subscription')
    cy.get('#susbscribe_email').type('peretto@example.com')
    cy.get('#subscribe').click()
}

function verificarMensagemDeEmail() {
    cy.get('.alert-success').should('contain', 'You have been successfully subscribed!')
}

module.exports = {
    verificarInscricao,
    verificarMensagemDeEmail
}