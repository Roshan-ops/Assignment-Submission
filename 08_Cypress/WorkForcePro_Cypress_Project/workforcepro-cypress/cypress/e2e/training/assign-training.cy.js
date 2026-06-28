import TrainingPage from "../../pages/TrainingPage";

// Automates TC-OJT-001 and TC-OJT-002 (assignment + verification in employee record)
describe("Training Workflow - Assign Training [TC-OJT-001, TC-OJT-002]", () => {
  beforeEach(() => cy.login("supervisor"));

  it("assigns an OJT module to an employee with a due date", () => {
    cy.fixture("training").then((t) => {
      TrainingPage.assign(t.employee, t.module, t.dueDate);
      TrainingPage.assignSuccess().should("contain", "Training assigned");
    });
  });

  it('shows the assigned training in the employee record with status "Assigned"', () => {
    cy.fixture("training").then((t) => {
      TrainingPage.openEmployeeTrainings(t.employee);
      TrainingPage.trainingRow(t.module).should("be.visible").and("contain", "Assigned");
    });
  });
});
