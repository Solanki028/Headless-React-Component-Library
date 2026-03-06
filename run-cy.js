const cypress = require("cypress");
const fs = require("fs");

cypress.run({
    component: {
        specPattern: "cypress/component/accordion.cy.tsx",
    }
}).then(results => {
    fs.writeFileSync("cypress_out.json", JSON.stringify(results.runs[0].tests, null, 2));
}).catch(err => {
    console.error(err);
});
