beforeEach(() => {
    cy.visit("/");
})

//Check that start elements can be found
it("should find input", () => {
cy.get("input").should("exist");
});

it("should find button", () => {
    cy.get("button").contains("Sök").should("exist");
    });

//check that interactive elements work
it("should be possible to type in the input field", () => {
    cy.get("input").type("banan").should("have.value", "banan");
})

//check different outcomes when typing in input and clicking button
it("should add .movie div element", () => {
    cy.get("input").type("banan");
    cy.get("button").click();
    cy.get(".movie").should("have.length", 7); 
})

it("should add p element", () => {
    cy.get("button").click();
    cy.get("p").should("contain", "Inga sökresultat att visa"); 
})

//check that .movie div contains correct info from real API
it("should generate .movie divs containing H3 with movie title and img element", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("banan");
    cy.get("button").click();
    cy.get(".movie > h3").first().should("contain", "Banan");  
    cy.get(".movie").first().should("contain.html", "img"); 

}) 

//get mockdata when sending API calls
it("should intercept and get mockdata with correct url", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {fixture: "mockData",}).as("omdbCall");
    cy.get("input").type("Banan");
    cy.get("button").click();
    cy.wait("@omdbCall").its("request.url").should("contain", "Banan");
})

it("should intercept and create correct html with mockdata", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {fixture: "mockData",});
    cy.get("input").type("Banan");
    cy.get("button").click();
    cy.get(".movie > h3").first().should("contain", "fejkBanan");
})

it("should intercept and create correct html with mockdata even if writing something else in input", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {fixture: "mockData",});
    cy.get("input").type("Melon");
    cy.get("button").click();
    cy.get(".movie > h3").first().should("contain", "fejkBanan");
})

//test with the real API

it("should create correct html based on search with real API", () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=/*");
    cy.get("input").type("Banan");
    cy.get("button").click();
    cy.get(".movie > h3").first().should("contain", "Banan");
})


