import EmployeePage from "../../pages/EmployeePage";

// Automates TC-EMP-013 and TC-EMP-014 (duplicate email restriction, EMP-002)
describe("Employee Management - Duplicate Email Restriction [TC-EMP-013, TC-EMP-014]", () => {
  beforeEach(() => cy.login("admin"));

  it("rejects creation when the email already exists (exact match) [TC-EMP-013]", () => {
    cy.fixture("employee").then(({ existing }) => {
      EmployeePage.visitList().create({
        ...existing,
        employeeId: `EMP-DUP-${Date.now()}`,
      });
      EmployeePage.errorMessage().should("contain", "email already exists");
    });
  });

  it("rejects an existing email that differs only by letter case [TC-EMP-014 / DEF-001]", () => {
    cy.fixture("employee").then(({ existing }) => {
      EmployeePage.visitList().create({
        ...existing,
        email: existing.email.toUpperCase(),
        employeeId: `EMP-CASE-${Date.now()}`,
      });
      // EMP-002 requires case-insensitive uniqueness. Expected to fail on the
      // current build, evidencing DEF-001.
      EmployeePage.errorMessage().should("contain", "email already exists");
    });
  });
});
