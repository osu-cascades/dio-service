const app = require("../app");
const supertest = require("supertest");
const cheerio = require("cheerio");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

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
	it("saves new reading in dataabse", function(done) {
		let reading = { reading: 5.55, location: "tank 1", type: 0 };
		let request = supertest(app)
			.post("/api/v1/do/readings")
			.send(reading)
			.expect(200)
			.end(done);
	});

	it("fetches all readings", function(done) {
		let request = supertest(app)
			.get("/api/v1/do/readings")
			.expect(200)
			.expect("Content-Type", /json/)
			.end(done);
	});

	it("fetches the last reading ", function(done) {
		let request = supertest(app)
			.get("/api/v1/do/readings/last")
			.expect(200)
			.expect("Content-Type", /json/)
			.end(done);
	});

	it("fetches the last ten readings", function(done) {
		let request = supertest(app)
			.get("/api/v1/do/readings/recent")
			.expect(200)
			.expect("Content-Type", /json/)
			.end(done);
	});

	it("fetches readings between start and end dates", function(done) {
		let request = supertest(app)
			.get("/api/v1/do/readings/query?start=2018-05-25T07:00:00.000Z&end=2018-05-27T06:59:59.999Z")
			.expect(200)
			.expect("Content-Type", /json/)
			.end(done);
	});
});
