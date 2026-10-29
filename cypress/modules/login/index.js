
function preencherLogin(email, password) {

    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password)
    cy.get('[data-qa="login-button"]').click()

}

function verificarSeLoginFoiRealizadoComSucesso() {

    cy.get('a > b').should('contain', 'PERETTO')
}

module.exports = {
    preencherLogin,
    verificarSeLoginFoiRealizadoComSucesso
}