// Page Object: Employee Management
class EmployeePage {
  visitList() {
    cy.visit("/employees");
    return this;
  }

  openCreateForm() {
    cy.getByCy("employee-add").click();
    return this;
  }

  fillForm(emp) {
    cy.getByCy("employee-id").clear().type(emp.employeeId);
    cy.getByCy("employee-name").clear().type(emp.name);
    cy.getByCy("employee-email").clear().type(emp.email);
    cy.getByCy("employee-department").select(emp.department);
    if (emp.supervisor) cy.getByCy("employee-supervisor").select(emp.supervisor);
    return this;
  }

  save() {
    cy.getByCy("employee-save").click();
    return this;
  }

  create(emp) {
    this.openCreateForm().fillForm(emp).save();
    return this;
  }

  search(term) {
    cy.getByCy("employee-search").clear().type(term);
    return this;
  }

  successMessage() {
    return cy.getByCy("toast-success");
  }

  errorMessage() {
    return cy.getByCy("form-error");
  }

  row(email) {
    return cy.getByCy("employee-table").contains("tr", email);
  }
}

export default new EmployeePage();
