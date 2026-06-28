import LoginPage from "../pages/LoginPage";
import EmployeePage from "../pages/EmployeePage";

// Reusable, low-level helper: select elements by data-cy attribute.
Cypress.Commands.add("getByCy", (selector, options) =>
  cy.get(`[data-cy="${selector}"]`, options)
);

// Reusable command: log in as a named role using the users fixture.
Cypress.Commands.add("login", (role) => {
  cy.session(role, () => {
    cy.fixture("users").then((users) => {
      const user = users[role];
      expect(user, `fixture user for role "${role}"`).to.exist;
      LoginPage.visit().fillCredentials(user.email, user.password).submit();
      cy.getByCy("app-dashboard").should("be.visible");
    });
  });
});

// Reusable command: create an employee through the UI.
Cypress.Commands.add("createEmployee", (employee) => {
  EmployeePage.visitList().create(employee);
});
