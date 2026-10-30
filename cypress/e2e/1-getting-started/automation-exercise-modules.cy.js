///<reference types="cypress" />

const cadastro = require('../../modules/cadastro/index.js')
const login = require('../../modules/login/index.js')
const logout = require('../../modules/logout/index.js')
const produtos = require('../../modules/produtos/index.js')
const carrinho = require('../../modules/carrinho/index.js')
const deletarConta = require('../../modules/deletarConta/index.js')
const inscricao = require('../../modules/inscricao/index.js')


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

    it('Verificar a página de todos os produtos e a página de detalhes do produto', () => {
        cy.visit('https://automationexercise.com');
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click();

        produtos.verificarSePaginaDeTodosOsProdutosFoiExibida()
        produtos.verificarSeListaDeProdutosFoiExibida()
        produtos.verProduto()

    });

    it('Pesquisar Produto', () => {
        cy.visit('https://automationexercise.com');
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
        produtos.buscaProduto()
    });

    it('Verificar inscrição na página inicial', () => {
        cy.visit('https://automationexercise.com');
        inscricao.verificarInscricao()
        inscricao.verificarMensagemDeEmail()
    });

    it('Realizar Pedido: Cadastrar-se antes de finalizar a compra', () => {
        cy.visit('https://automationexercise.com');
        cy.get('a[href*=login]').click();

        const timestamp = Date.now()

        cadastro.iniciarCadastro('PERETTO', `peretto-${timestamp}@example.com`)
        cadastro.preenchercadastro()
        cadastro.verificarSeCadastroFoiRealizadoComSucesso()
        carrinho.adicionarProdutoAoCarrinho()
        deletarConta.deletaConta()
    });

    it('Realizar Pedido: Fazer login antes de finalizar a compra', () => {
        cy.visit('https://automationexercise.com');
        cy.get('a[href*=login]').click();

        login.preencherLogin('peretto@example.com', '12345')
        login.verificarSeLoginFoiRealizadoComSucesso()
        carrinho.adicionarProdutoAoCarrinho()

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
    cy.get('[data-qa="continue-button"]').click()

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


//PRODUTOS

function verificarSePaginaDeTodosOsProdutosFoiExibida() {
    cy.get('.title').should('contain', 'All Products')
}

function verificarSeListaDeProdutosFoiExibida() {
    cy.get('.features_items').should('be.visible')
}
function verProduto() {
    cy.get('.features_items a[href="/product_details/1"]').click()
    cy.get('.product-information').should('be.visible')
}
function buscaProduto() {
    cy.get('#search_product').type('Blue Top');
    cy.get('#submit_search > .fa').click();
    cy.get('.productinfo').should('contain', 'Blue Top')
}

//INSCRIÇÃO
function verificarInscricao() {
    cy.get('.single-widget > h2').should('contain', 'Subscription')
    cy.get('#susbscribe_email').type('peretto@example.com')
    cy.get('#subscribe').click()
}

function verificarMensagemDeEmail() {
    cy.get('.alert-success').should('contain', 'You have been successfully subscribed!')
}

//CARRINHO DE COMPRAS
function adicionarProdutoAoCarrinho() {

    cy.get('.shop-menu > .nav > li > a[href="/products"]').click()
    cy.get('.features_items a[href="/product_details/1"]').click()
    cy.contains('button', 'Add to cart').click()
    cy.get('.modal-body').contains('a', 'View Cart').click()
    cy.get('#cart_info_table tbody tr').should('contain', 'Blue Top')
    cy.contains('a', 'Proceed To Checkout').click()
    cy.get('textarea[name="message"]').type('Deve ser entregue em 3 dias úteis')
    cy.contains('a', 'Place Order').click()
    cy.get('[data-qa="name-on-card"]').type('PERETTO')
    cy.get('[data-qa="card-number"]').type('1234 5678 9012 3456')
    cy.get('[data-qa="cvc"]').type('123')
    cy.get('[data-qa="expiry-month"]').type('12')
    cy.get('[data-qa="expiry-year"]').type('2028')
    cy.get('#submit').click()
    cy.get('[data-qa="order-placed"]').should('be.visible')
}

//DELETAR CONTA
function deletaConta() {

    cy.get(':nth-child(5) > a').click()
    cy.get('b').should('be.visible')
}