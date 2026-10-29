///<reference types="cypress" />

const cadastro = require('../../modules/cadastro/index.js')
const login = require('../../modules/login/index.js')
const logout = require('../../modules/logout/index.js')

describe('Automation Exercise', () => {

    //Cadastro de usuário
    //cy.get() - elementos baseados em css selector
    //cy.contains() - elementos baseados em texto

    it('Cadastrar usuário com e-mail já existente', () => {
        cy.visit('https://automationexercise.com');
        cy.get('a[href*=login]').click();

        cadastro.iniciarCadastro('PERETTO', 'peretto@example.com')

        cadastro.verificarMensagemDeEmailExistente()

    });

    it('Cadastro um novo usuário com sucesso', () => {
        cy.visit('https://automationexercise.com');
        cy.get('a[href*=login]').click();

        const timestamp = Date.now()

        cadastro.iniciarCadastro('PERETTO', `peretto-${timestamp}@example.com`)

        cadastro.preenchercadastro()

        cadastro.verificarSeCadastroFoiRealizadoComSucesso()

    });

    it('Fazer login com e-mail e senha incorretos', () => {

        cy.visit('https://automationexercise.com');
        cy.get('a[href*=login]').click();

        login.preencherLogin('peeretto@example.com', '1234')

        verificarSeMensagemDeErroFoiExibida()

    });

    it('Fazer login com e-mail e senha corretos', () => {
        cy.visit('https://automationexercise.com');
        cy.get('a[href*=login]').click();

        login.preencherLogin('peretto@example.com', '12345')

        login.verificarSeLoginFoiRealizadoComSucesso()


    });

    it('Fazer logout do usuário', () => {
        cy.visit('https://automationexercise.com');
        cy.get('a[href*=login]').click();

        logout.fazerLogout()

        logout.verificarSeLogoutFoiRealizadoComSucesso()

    });

});

//CADASTRO

function iniciarCadastro(nome, email) {

    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()

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

//LOGIN

function preencherLogin(email, password) {

    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password)
    cy.get('[data-qa="login-button"]').click()

}

function verificarSeLoginFoiRealizadoComSucesso() {

    cy.get('a > b').should('contain', 'PERETTO')
}

//LOGOUT

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
