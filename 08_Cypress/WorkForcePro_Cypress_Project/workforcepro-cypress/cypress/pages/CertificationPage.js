// Page Object: Certification tracking
class CertificationPage {
  openExpiringReport() {
    cy.visit("/certifications/expiring");
    cy.getByCy("expiry-window").select("30");
    return this;
  }

  row(label) {
    return cy.getByCy("expiring-table").contains("tr", label);
  }
}

export default new CertificationPage();
