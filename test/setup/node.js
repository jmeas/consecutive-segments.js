// Create our JSDom document
global.jsdom = require('jsdom').jsdom;
global.document = jsdom('<html><head><script></script></head><body></body></html>');
global.window = global.document.parentWindow;
global.navigator = window.navigator = {
  userAgent: 'NodeJS JSDom',
  appVersion: ''
};

var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');

global._ = require('underscore');
global.moment = require('moment');

chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = sinon;

global.fixtures = require('../fixtures/segments');

// Load the library
global.ConsecutiveSegments = require('../../tmp/consecutive-segments');
