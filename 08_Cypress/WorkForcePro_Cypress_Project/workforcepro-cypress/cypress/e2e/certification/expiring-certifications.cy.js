import CertificationPage from "../../pages/CertificationPage";

// Automates TC-CERT-008 and TC-CERT-011 (expiring certification alerts, CERT-003)
describe("Certification Tracking - Expiring Alerts [TC-CERT-008, TC-CERT-011]", () => {
  beforeEach(() => cy.login("admin"));

  it("lists a certification expiring within 30 days (15 days out) [TC-CERT-008]", () => {
    CertificationPage.openExpiringReport();
    CertificationPage.row("First Aid").should("be.visible");
  });

  it("includes a certification expiring in exactly 30 days [TC-CERT-011 / DEF-004]", () => {
    CertificationPage.openExpiringReport();
    // 30-day boundary is inclusive (CERT-003). Expected to fail on the current
    // build, evidencing DEF-004 (exclusive '< 30' comparison).
    CertificationPage.row("Forklift License").should("be.visible");
  });
});
