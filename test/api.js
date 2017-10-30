var app = require("../app");
var supertest = require("supertest");
var chai = require("chai");
var expect = chai.expect;
var cheerio = require("cheerio");

describe("RESTful API", function() {

   var request;
   beforeEach(function() {
      request = supertest(app)
          .get("/")
          .set("User-Agent", "a cool browser")
          .set("Accept", "text/html")
   });

   it("returns an HTML response", function(done) {
       request
           .expect("Content-Type", /html/)
           .expect(200)
           .end(done);
   });

   it("returns your User Agent", function(done) {
       request
           .expect(function(response) {
              var htmlResponse = response.text;
              var $ = cheerio.load(htmlResponse);
              var userAgent = $(".user-agent").html().trim();
              if (userAgent !== "a cool browser") {
                  throw new Error("User Agent not found");
              }
           })
           .end(done);
   });

});