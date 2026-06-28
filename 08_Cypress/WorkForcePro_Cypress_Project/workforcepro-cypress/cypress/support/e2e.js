// Global support file - loaded before every spec.
import "./commands";

// Keep tests resilient to unrelated app-level uncaught exceptions.
Cypress.on("uncaught:exception", () => false);
