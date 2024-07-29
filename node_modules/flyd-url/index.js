'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _flyd = require('flyd');

var _flyd2 = _interopRequireDefault(_flyd);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var href = location.href;
var stream = _flyd2['default'].stream(_url2['default'].parse(href));
var target = Date.now();
var dur = 50;

var poll = function poll() {
  if (stream.end()) return;
  var now = Date.now();
  target += dur;
  if (href !== location.href) {
    stream(_url2['default'].parse(location.href));
    href = location.href;
  }
  setTimeout(poll, target - now);
};
poll();

module.exports = stream;

