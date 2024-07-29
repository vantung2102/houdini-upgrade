'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _mobx = require('mobx');

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

var _Bindings = require('./Bindings');

var _Bindings2 = _interopRequireDefault(_Bindings);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var State = function () {
  function State(_ref) {
    var form = _ref.form,
        initial = _ref.initial,
        options = _ref.options,
        bindings = _ref.bindings;
    (0, _classCallCheck3.default)(this, State);
    this.strict = false;
    this.disposers = {
      interceptor: {},
      observer: {}
    };
    this.$struct = [];
    this.initial = {
      props: {},
      fields: {}
    };
    this.current = {
      props: {},
      fields: {}
    };

    this.set('form', form);
    this.initProps(initial);
    this.options = new _Options2.default();
    this.options.set(options);
    this.bindings = new _Bindings2.default();
    this.bindings.register(bindings);
    this.observeOptions();
  }

  (0, _createClass3.default)(State, [{
    key: 'initProps',
    value: function initProps(initial) {
      var initialProps = (0, _pick3.default)(initial, [].concat((0, _toConsumableArray3.default)(_utils2.default.props.separated), (0, _toConsumableArray3.default)(_utils2.default.props.validation), (0, _toConsumableArray3.default)(_utils2.default.props.function), (0, _toConsumableArray3.default)(_utils2.default.props.handlers)));

      this.set('initial', 'props', initialProps);

      var $unified = _utils2.default.hasUnifiedProps(initial);
      var $separated = _utils2.default.hasSeparatedProps(initial);

      if ($unified && $separated) {
        console.warn( // eslint-disable-line
        'WARNING: Your mobx-react-form instance ', this.form.name, ' is running in MIXED Mode (Unified + Separated) as fields properties definition.', 'This mode is experimental, use it at your own risk, or use only one mode.');
      }

      if (($separated || _utils2.default.isStruct(initial.fields)) && !$unified) {
        var struct = _utils2.default.$try(initial.struct || initial.fields);
        this.struct(struct);
        this.strict = true;
        this.mode = 'separated';
        return;
      }

      this.struct(initial.struct);
      this.mode = 'unified';
    }

    /**
      Get/Set Fields Structure
    */

  }, {
    key: 'struct',
    value: function struct() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (data) this.$struct = data;
      return this.$struct;
    }

    /**
      Get Props/Fields
    */

  }, {
    key: 'get',
    value: function get(type, subtype) {
      return this[type][subtype];
    }

    /**
      Set Props/Fields
    */

  }, {
    key: 'set',
    value: function set(type, subtype) {
      var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (type === 'form') {
        // subtype is the form here
        this.form = subtype;
      }

      if (type === 'initial') {
        (0, _assign2.default)(this.initial[subtype], state);
        (0, _assign2.default)(this.current[subtype], state);
      }

      if (type === 'current') {
        (0, _assign2.default)(this.current[subtype], state);
      }
    }
  }, {
    key: 'extra',
    value: function extra() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if ((0, _isString3.default)(data)) return (0, _get3.default)(this.$extra, data);
      if (data === null) return this.$extra;
      this.$extra = data;
      return null;
    }
  }, {
    key: 'observeOptions',
    value: function observeOptions() {
      var _this = this;

      // Fix Issue #201
      (0, _mobx.observe)(this.options.options, _utils2.default.checkObserve([{
        // start observing fields validateOnChange
        type: 'update',
        key: 'validateOnChange',
        to: true,
        exec: function exec() {
          return _this.form.each(function (field) {
            return field.observeValidationOnChange();
          });
        }
      }, {
        // stop observing fields validateOnChange
        type: 'update',
        key: 'validateOnChange',
        to: false,
        exec: function exec() {
          return _this.form.each(function (field) {
            return field.disposeValidationOnChange();
          });
        }
      }, {
        // start observing fields validateOnBlur
        type: 'update',
        key: 'validateOnBlur',
        to: true,
        exec: function exec() {
          return _this.form.each(function (field) {
            return field.observeValidationOnBlur();
          });
        }
      }, {
        // stop observing fields validateOnBlur
        type: 'update',
        key: 'validateOnBlur',
        to: false,
        exec: function exec() {
          return _this.form.each(function (field) {
            return field.disposeValidationOnBlur();
          });
        }
      }]));
    }
  }]);
  return State;
}();

exports.default = State;
module.exports = exports['default'];