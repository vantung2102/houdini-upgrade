'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _desc, _value, _class;

var _mobx = require('mobx');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var Base = (_class = function () {
  function Base() {
    var _this = this;

    (0, _classCallCheck3.default)(this, Base);

    this.noop = function () {};

    this.execHook = function (name) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return (0, _utils.$try)(fallback[name], _this.$hooks[name], _this.hooks && _this.hooks.apply(_this, [_this])[name], _this.noop).apply(_this, [_this]);
    };

    this.execHandler = function (name, args) {
      var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return [(0, _utils.$try)(_this.$handlers[name] && _this.$handlers[name].apply(_this, [_this]), _this.handlers && _this.handlers.apply(_this, [_this])[name].apply(_this, [_this]), fallback, _this.noop).apply(_this, [].concat((0, _toConsumableArray3.default)(args))), _this.execHook(name)];
    };

    this.intercept = function (opt) {
      return _this.MOBXEvent((0, _isFunction3.default)(opt) ? { type: 'interceptor', call: opt } : (0, _extends3.default)({ type: 'interceptor' }, opt));
    };

    this.observe = function (opt) {
      return _this.MOBXEvent((0, _isFunction3.default)(opt) ? { type: 'observer', call: opt } : (0, _extends3.default)({ type: 'observer' }, opt));
    };

    this.onClear = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _this.execHandler('onClear', args, function (e) {
        e.preventDefault();
        _this.clear(true);
      });
    };

    this.onReset = function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _this.execHandler('onReset', args, function (e) {
        e.preventDefault();
        _this.reset(true);
      });
    };

    this.onSubmit = function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _this.execHandler('onSubmit', args, function (e) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        e.preventDefault();
        _this.submit(o);
      });
    };

    this.onAdd = function () {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _this.execHandler('onAdd', args, function (e, val) {
        e.preventDefault();
        _this.add((0, _utils.$isEvent)(val) ? null : val);
      });
    };

    this.onDel = function () {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return _this.execHandler('onDel', args, function (e, path) {
        e.preventDefault();
        _this.del((0, _utils.$isEvent)(path) ? _this.path : path);
      });
    };
  }

  (0, _createClass3.default)(Base, [{
    key: 'hasIncrementalKeys',
    get: function get() {
      return this.fields.size && (0, _utils.hasIntKeys)(this.fields);
    }
  }, {
    key: 'hasNestedFields',
    get: function get() {
      return this.fields.size !== 0;
    }
  }, {
    key: 'size',
    get: function get() {
      return this.fields.size;
    }

    /**
     Interceptor
     */


    /**
     Observer
     */


    /**
      Event Handler: On Clear
    */


    /**
      Event Handler: On Reset
    */


    /**
      Event Handler: On Submit
     */


    /**
      Event Handler: On Add
    */


    /**
      Event Handler: On Del
    */

  }]);
  return Base;
}(), (_applyDecoratedDescriptor(_class.prototype, 'hasIncrementalKeys', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'hasIncrementalKeys'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hasNestedFields', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'hasNestedFields'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'size', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'size'), _class.prototype)), _class);
exports.default = Base;
module.exports = exports['default'];