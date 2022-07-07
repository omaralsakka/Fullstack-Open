describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("login form is showen", function () {
    cy.visit("http://localhost:3000/");
    cy.contains("Blogs");
  });
});
