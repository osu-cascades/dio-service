const app = require("../app");
const supertest = require("supertest");
const cheerio = require("cheerio");
const chai = require("chai");
const expect = chai.expect;

describe("Simple API landing page", function() {
	let request;
	beforeEach(function() {
		request = supertest(app)
			.get("/")
			.set("Accept", "text/html");
	});

	it("returns an HTML response", function(done) {
		request
			.expect("Content-Type", /html/)
			.expect(200)
			.end(done);
	});
});

describe("Dissolved Oxygen Routes", function() {
	it("fetches all readings", function(done) {
		let request = supertest(app)
			.get("/api/v1/do/readings")
			.expect(200)
			.expect([
				{
					id: 37,
					reading: 6.66,
					location: "home",
					type: 1,
					createdAt: "2018-05-21T01:13:44.000Z",
					updatedAt: "2018-05-21T01:13:44.000Z"
				}
			])
			.end(done);
	});
});
