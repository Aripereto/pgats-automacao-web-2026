function iniciarCadastro(name, email) {

    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()

}

function verificarMensagemDeEmailExistente() {
    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
}

function preenchercadastro() {
    //radio buttons = checkboxes
    cy.get('#id_gender2').check()

    cy.get('[data-qa="password"]').type('12345')

    //Selects e ComboBox - select
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('3')
    cy.get('[data-qa="years"]').select('1988')

    //checkboxes - check
    cy.get('#newsletter').check()
    cy.get('#optin').check()

    cy.get('[data-qa="first_name"]').type('PERETTO')
    cy.get('[data-qa="last_name"]').type('GUILHERME')
    cy.get('[data-qa="company"]').type('PERETO LTDA')
    cy.get('[data-qa="address"]').type('Rua dos Bobos, 0')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type('SP')
    cy.get('[data-qa="city"]').type('São Paulo')
    cy.get('[data-qa="zipcode"]').type('05787-000')
    cy.get('[data-qa="mobile_number"]').type('+55 11 99999-9989')

}

function verificarSeCadastroFoiRealizadoComSucesso() {
    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain', 'Account Created!')

}

module.exports = {
    iniciarCadastro,
    verificarMensagemDeEmailExistente,
    preenchercadastro,
    verificarSeCadastroFoiRealizadoComSucesso
}