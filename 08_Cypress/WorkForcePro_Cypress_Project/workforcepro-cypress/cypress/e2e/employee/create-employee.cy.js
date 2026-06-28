import EmployeePage from "../../pages/EmployeePage";

// Automates TC-EMP-001 (Priority: High, Severity: Critical)
describe("Employee Management - Create Employee [TC-EMP-001]", () => {
  beforeEach(() => cy.login("admin"));

  it("creates a new employee with all valid mandatory fields", () => {
    cy.fixture("employee").then(({ valid }) => {
      const ts = Date.now();
      const employee = {
        ...valid,
        employeeId: `EMP-${ts}`,
        email: `ravi.sharma+${ts}@workforcepro.com`,
      };

      EmployeePage.visitList().create(employee);

      EmployeePage.successMessage().should("contain", "Employee created");
      EmployeePage.search(employee.email);
      EmployeePage.row(employee.email).should("be.visible").and("contain", employee.name);
    });
  });
});
