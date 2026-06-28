// Page Object: Login
class LoginPage {
  visit() {
    cy.visit("/login");
    return this;
  }

  fillCredentials(email, password) {
    cy.getByCy("login-email").clear().type(email);
    cy.getByCy("login-password").clear().type(password, { log: false });
    return this;
  }

  submit() {
    cy.getByCy("login-submit").click();
    return this;
  }
}

export default new LoginPage();
