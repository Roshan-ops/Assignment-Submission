// Page Object: Supervisor approval workflow
class ApprovalPage {
  open() {
    cy.visit("/approvals");
    return this;
  }

  queueRow(moduleName) {
    return cy.getByCy("approvals-queue").contains("tr", moduleName);
  }

  approve(moduleName) {
    this.queueRow(moduleName).within(() => {
      cy.getByCy("approve-btn").click();
    });
    return this;
  }

  reject(moduleName) {
    this.queueRow(moduleName).within(() => {
      cy.getByCy("reject-btn").click();
    });
    return this;
  }

  statusFor(moduleName) {
    return cy.getByCy("training-status").contains(moduleName).siblings("[data-cy=status-value]");
  }
}

export default new ApprovalPage();
