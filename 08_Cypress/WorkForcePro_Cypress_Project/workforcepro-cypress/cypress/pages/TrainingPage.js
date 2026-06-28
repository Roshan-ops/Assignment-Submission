// Page Object: Training assignment & completion
class TrainingPage {
  assign(employeeName, moduleName, dueDate) {
    cy.visit("/trainings/assign");
    cy.getByCy("assign-employee").select(employeeName);
    cy.getByCy("assign-module").select(moduleName);
    cy.getByCy("assign-due-date").clear().type(dueDate);
    cy.getByCy("assign-submit").click();
    return this;
  }

  assignSuccess() {
    return cy.getByCy("toast-success");
  }

  openEmployeeTrainings(employeeName) {
    cy.visit("/employees");
    cy.getByCy("employee-search").clear().type(employeeName);
    cy.getByCy("employee-table").contains("tr", employeeName).click();
    cy.getByCy("tab-trainings").click();
    return this;
  }

  openMyTrainings() {
    cy.visit("/my-trainings");
    return this;
  }

  markComplete(moduleName, completionDate, notes) {
    cy.getByCy("training-list").contains("tr", moduleName).within(() => {
      cy.getByCy("training-open").click();
    });
    cy.getByCy("completion-date").clear().type(completionDate);
    cy.getByCy("employee-notes").clear().type(notes);
    cy.getByCy("mark-complete").click();
    return this;
  }

  trainingRow(moduleName) {
    return cy.getByCy("training-list").contains("tr", moduleName);
  }
}

export default new TrainingPage();
