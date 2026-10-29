const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
         // baseUrl:'https://www.automationexercise.com/',
    //watchForFileChanges: false, serve para não executar o teste a cada salvamento
    watchForFileChanges: false,
    
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
