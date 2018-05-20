var app = require("../app");
var supertest = require("supertest");
var cheerio = require("cheerio");

describe("RESTful API", function() {
	var request;
	beforeEach(function() {
		request = supertest(app)
			.get("/")
			.set("User-Agent", "a cool browser")
			.set("Accept", "text/html");
	});
});
