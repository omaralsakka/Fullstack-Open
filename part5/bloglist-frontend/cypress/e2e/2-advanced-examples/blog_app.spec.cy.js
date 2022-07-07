describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "omar abdelfattah",
      username: "oabdelfa",
      password: "123456",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("login form is showen", function () {
    cy.visit("http://localhost:3000/");
    cy.contains("Blogs");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("oabdelfa");
      cy.get("#password").type("123456");
      cy.get("#login-button").click();

      cy.contains("omar abdelfattah logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("oabd");
      cy.get("#password").type("123456");
      cy.get("#login-button").click();

      cy.contains("Wrong credentials");
    });
  });
});
