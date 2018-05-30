const app = require("../app");
const supertest = require("supertest");
const chai = require("chai");
const expect = chai.expect;

describe("Simple API landing page", function() {

	it("returns an HTML response", function(done) {
		request = supertest(app)
			.get("/")
			.set("Accept", "text/html");
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

describe("Harvest Routes", function() {

	let testHarvestId = 0;

	it("creates a new harvest", function(done) {
		let harvest = { name: "New Harvest", startDate: new Date(), endDate: new Date() };
		let request = supertest(app)
			.post("/api/v1/harvests")
			.send(harvest)
			.expect("Content-Type", /json/)
			.expect(200)
			.end(function(err, res) {
				testHarvestId = res.body.id;
				done();
			});
	});

	it("fetches all harvests", function(done) {
		let request = supertest(app)
			.get("/api/v1/harvests")
			.expect(200)
			.expect("Content-Type", /json/)
			.end(done);
	});

	it("fetches harvest by id", function(done) {
		let request = supertest(app)
			.get("/api/v1/harvests/" + testHarvestId)
			.expect(200)
			.expect("Content-Type", /json/)
			.end(done);
	});

	it("updates harvest by id", function(done) {
		let harvest = { name: "Test", startDate: new Date(), endDate: new Date() };
		let request = supertest(app)
			.post("/api/v1/harvests/" + testHarvestId)
			.send(harvest)
			.expect(200)
			.end(done);
	});

	it("deletes harvest by id", function(done) {
		let request = supertest(app)
			.del("/api/v1/harvests/" + testHarvestId)
			.expect(200)
			.end(done);
	});

});
