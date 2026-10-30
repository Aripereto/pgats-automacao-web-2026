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

module.exports = {
       adicionarProdutoAoCarrinho
}