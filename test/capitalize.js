function capitalize(str) {
    var firstLetter = str[0].toUpperCase();
    var rest = str.slice(1).toLowerCase();
    return firstLetter + rest;
}

var chai = require("chai");
var expect = chai.expect;

describe("capitalize", function() {

    it("capitalizes single words", function () {
       expect(capitalize("express")).to.equal("Express");
       expect(capitalize("cats")).to.equal("Cats");
    });

});