///<reference types="cypress" />

describe('Automation Exercise', () => {

    //Cadastro de usuário
    //cy.get() - elementos baseados em css selector
    //cy.contains() - elementos baseados em texto

    it('Cadastrar usuário com e-mail já existente', () => {
        cy.visit('https://automationexercise.com');
        cy.get('a[href*=login]').click();

        cy.get('[data-qa="signup-name"]').type('PERETTO')
        cy.get('[data-qa="signup-email"]').type(`peretto@example.com`)

        cy.get('[data-qa="signup-button"]').click()

        //cy.get('.signup-form > form > p').should('be.visible')

        cy.get('.signup-form > form > p').should('contain','Email Address already exist!')

    });


    it('Cadastro um novo usuário com sucesso', () => {
        cy.visit('https://automationexercise.com');
        cy.get('a[href*=login]').click();

        const timestamp = Date.now()

        cy.get('[data-qa="signup-name"]').type('PERETTO')
        cy.get('[data-qa="signup-email"]').type(`peretto-${timestamp}@example.com`)

        cy.get('[data-qa="signup-button"]').click()

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

        cy.get('[data-qa="create-account"]').click()

    });

    it('Fazer login com e-mail e senha incorretos', () => {

        cy.visit('https://automationexercise.com');
        cy.get('a[href*=login]').click();

        cy.get('[data-qa="login-email"]').type('peeretto@example.com')
        cy.get('[data-qa="login-password"]').type('1234')
        cy.get('[data-qa="login-button"]').click()

        //assert (valida se realmente fez login identificando um elemento na pagina)
        cy.get('form[action*="login"] > p').should('contain','Your email or password is incorrect!')

    });

    it('Fazer login com e-mail e senha corretos', () => {
        cy.visit('https://automationexercise.com');
        cy.get('a[href*=login]').click();

        cy.get('[data-qa="login-email"]').type('peretto@example.com')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()

        //assert (valida se realmente fez login identificando um elemento na pagina)
        cy.get('a > b').should('contain','PERETTO')

    });

    it('Fazer logout do usuário', () => {
        cy.visit('https://automationexercise.com');
        cy.get('a[href*=login]').click();

        cy.get('[data-qa="login-email"]').type('peretto@example.com')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()

        //assert (valida se realmente fez login identificando um elemento na pagina. Aqui pegou o login to your account)
        cy.get('.login-form > h2').should('be.visible')

    });

});