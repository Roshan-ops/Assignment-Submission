import TrainingPage from "../../pages/TrainingPage";
import ApprovalPage from "../../pages/ApprovalPage";

// Automates TC-OJT-012 and TC-OJT-020 (OJT completion + supervisor approval)
describe("OJT Completion - Complete & Approve [TC-OJT-012, TC-OJT-020]", () => {
  it('routes a completed training to "Pending Approval" [TC-OJT-012 / DEF-002]', () => {
    cy.login("employee");
    cy.fixture("training").then((t) => {
      TrainingPage.openMyTrainings();
      TrainingPage.markComplete(t.module, "2026-06-23", "Completed all required floor hours.");
      // OJT-003: completion must await supervisor approval, not auto-complete.
      // Expected to fail on the current build, evidencing DEF-002.
      TrainingPage.trainingRow(t.module).should("contain", "Pending Approval");
    });
  });

  it("lets a supervisor approve a pending training and marks it Completed [TC-OJT-020]", () => {
    cy.login("supervisor");
    cy.fixture("training").then((t) => {
      ApprovalPage.open();
      // Blocked by DEF-002: no item reaches the approval queue, so this assertion fails.
      ApprovalPage.queueRow(t.module).should("be.visible");
      ApprovalPage.approve(t.module);
      ApprovalPage.statusFor(t.module).should("contain", "Completed");
    });
  });
});
