var Aftership = require("../dist/index.js").AfterShip;
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
var chai = require("chai");

var expect = chai.expect;
var aftership = new Aftership("SOME_API_KEY");