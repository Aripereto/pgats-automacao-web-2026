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

module.exports = {
    verificarSePaginaDeTodosOsProdutosFoiExibida,
    verificarSeListaDeProdutosFoiExibida,
    verProduto,
    buscaProduto
}