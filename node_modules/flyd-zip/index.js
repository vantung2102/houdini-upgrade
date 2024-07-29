'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _flyd = require('flyd');

var _flyd2 = _interopRequireDefault(_flyd);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _ramdaSrcRange = require('ramda/src/range');

var _ramdaSrcRange2 = _interopRequireDefault(_ramdaSrcRange);

// We need to index each stream and build up a buffer of changes to track whether all streams have changed
module.exports = function (sources) {
  var withIdxs = _ramda2['default'].addIndex(_ramda2['default'].map)(function (s, i) {
    return _flyd2['default'].map(function (v) {
      return [v, i];
    }, s);
  }, sources);
  var buffer = [];
  return _flyd2['default'].combine(function () {
    var changes = _ramda2['default'].last(arguments);
    _ramda2['default'].map(_ramda2['default'].apply(function (val, idx) {
      buffer[idx] = val;
    }), _ramda2['default'].map(_ramda2['default'].call, changes));
    if (_ramda2['default'].filter(function (n) {
      return n !== undefined;
    }, buffer).length === sources.length) {
      var _self = arguments[arguments.length - 2];
      _self(buffer);
      buffer = [];
    }
  }, withIdxs);
};

