it('connect to DApp with Metamask extension', () => {
  // посещаем сайт
  cy.visit('https://metamask.github.io/test-dapp/')
  // кликаем на кнопку Connect
  cy.get('#connectButton').click()
  // после клика должна появиться нотификация
  cy.acceptMetamaskAccess().should('be.true')
  // подключаемся к DApp
  cy.get('#connectButton').should('have.text', 'Connected')
  // убеждаемся, что UI изменился
})
