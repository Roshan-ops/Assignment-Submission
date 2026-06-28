# WorkForcePro - Cypress E2E Automation

Automated end-to-end tests for **WorkForcePro** (Workforce Management & OJT Platform).
The suite automates the high-priority manual test cases defined earlier in the QA
submission, using the Page Object Model, reusable custom commands and fixtures.

## Project Structure

```
workforcepro-cypress/
├── cypress.config.js          # Cypress config (baseUrl, reporter, retries)
├── package.json               # Dependencies and scripts
├── cypress/
│   ├── e2e/                    # Specs, grouped by module
│   │   ├── employee/
│   │   │   ├── create-employee.cy.js          # TC-EMP-001
│   │   │   └── duplicate-email.cy.js          # TC-EMP-013, TC-EMP-014
│   │   ├── training/
│   │   │   ├── assign-training.cy.js          # TC-OJT-001, TC-OJT-002
│   │   │   └── complete-approve-training.cy.js# TC-OJT-012, TC-OJT-020
│   │   └── certification/
│   │       └── expiring-certifications.cy.js  # TC-CERT-008, TC-CERT-011
│   ├── pages/                  # Page Object Model classes
│   │   ├── LoginPage.js
│   │   ├── EmployeePage.js
│   │   ├── TrainingPage.js
│   │   ├── ApprovalPage.js
│   │   └── CertificationPage.js
│   ├── support/
│   │   ├── commands.js         # Reusable commands: login, getByCy, createEmployee
│   │   └── e2e.js
│   └── fixtures/               # Test data
│       ├── users.json
│       ├── employee.json
│       └── training.json
```

## Prerequisites

- Node.js 18+
- A running WorkForcePro instance reachable at the configured `baseUrl`

## Setup

```bash
npm install
```

## Configuration

Set the target environment in `cypress.config.js` (`baseUrl`) or via
`CYPRESS_baseUrl`. Update credentials in `cypress/fixtures/users.json`.

## Selector Strategy

Tests locate elements via stable `data-cy` attributes (e.g. `data-cy="employee-save"`),
resolved through the reusable `cy.getByCy()` command. This decouples tests from CSS/text.

## Running

```bash
npm run cypress:open     # interactive runner
npm run cypress:run      # headless run (CI)
```

## Reporting

Mochawesome JSON is written to `cypress/reports/`. To build the HTML report:

```bash
npm run report:merge
npm run report:html
```

Screenshots are captured automatically on failure (`cypress/screenshots/`) and
video of each run is saved to `cypress/videos/`.


