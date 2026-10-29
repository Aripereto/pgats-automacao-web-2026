function fazerLogout() {

    cy.get('[data-qa="login-email"]').type('peretto@example.com')
    cy.get('[data-qa="login-password"]').type('12345')
    cy.get('[data-qa="login-button"]').click()
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
}

function verificarSeLogoutFoiRealizadoComSucesso() {
    cy.get('.login-form > h2').should('be.visible')

}

function verificarSeMensagemDeErroFoiExibida() {

    cy.get('form[action*="login"] > p').should('contain', 'Your email or password is incorrect!')
}

module.exports = {
    fazerLogout,
    verificarSeLogoutFoiRealizadoComSucesso
}
