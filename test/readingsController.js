const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const Controller = require("../controllers/ReadingsController");

describe("readingsController Tests", function() {
	let controller = new Controller();
	let save;
	beforeEach(function() {
		save = sinon.stub(controller, "saveReading");
	});
	it("saves the new reading", function() {
		let spy = sinon.spy(controller, "handleReading");

		controller.handleReading(4.44, "home", 0);

		sinon.assert.calledOnce(spy);
		sinon.assert.calledWith(save, 4.44, "home", 0);
	});

	it("throws an error if reading is non-numeric", function() {
		let spy = sinon.spy(controller, "ensureReadingDataIsNumeric");

		controller.handleReading(4.44, "home", 0);

		sinon.assert.calledOnce(spy);
	});

	afterEach(function() {
		save.restore();
	});
});

const fakeData = [
	{
		id: 37,
		reading: 6.66,
		location: "home",
		type: 1,
		createdAt: "2018-05-21T01:13:44.000Z",
		updatedAt: "2018-05-21T01:13:44.000Z"
	},
	{
		id: 38,
		reading: 6.23,
		location: "home",
		type: 1,
		createdAt: "2018-05-21T01:18:44.000Z",
		updatedAt: "2018-05-21T01:18:44.000Z"
	},
	{
		id: 39,
		reading: 5.95,
		location: "home",
		type: 1,
		createdAt: "2018-05-21T01:23:44.000Z",
		updatedAt: "2018-05-21T01:23:44.000Z"
	},
	{
		id: 40,
		reading: 5.67,
		location: "home",
		type: 1,
		createdAt: "2018-05-21T01:28:44.000Z",
		updatedAt: "2018-05-21T01:28:44.000Z"
	},
	{
		id: 41,
		reading: 4.44,
		location: "home",
		type: 0,
		createdAt: "2018-05-21T01:28:44.000Z",
		updatedAt: "2018-05-21T01:28:44.000Z"
	}
];
