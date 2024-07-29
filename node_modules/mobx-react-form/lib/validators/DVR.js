'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _intersection2 = require('lodash/intersection');

var _intersection3 = _interopRequireDefault(_intersection2);

var _difference2 = require('lodash/difference');

var _difference3 = _interopRequireDefault(_difference2);

var _split2 = require('lodash/split');

var _split3 = _interopRequireDefault(_split2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _first2 = require('lodash/first');

var _first3 = _interopRequireDefault(_first2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _extend2 = require('lodash/extend');

var _extend3 = _interopRequireDefault(_extend2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  Declarative Validation Rules

    const plugins = {
      dvr: {
        package: validatorjs,
        extend: callback,
      },
    };

*/
var DVR = function () {
  function DVR(plugin) {
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, DVR);
    this.promises = [];
    this.asyncRules = [];
    this.validators = {};
    this.validator = null;
    this.extend = null;

    this.assignInitData(plugin, obj);
    this.extendValidator();
  }

  (0, _createClass3.default)(DVR, [{
    key: 'assignInitData',
    value: function assignInitData(plugin, _ref) {
      var _ref$options = _ref.options,
          options = _ref$options === undefined ? {} : _ref$options,
          _ref$promises = _ref.promises,
          promises = _ref$promises === undefined ? [] : _ref$promises;

      this.options = options;
      this.promises = promises;
      this.extend = plugin.extend;
      this.validator = plugin.package || plugin;
    }
  }, {
    key: 'extendValidator',
    value: function extendValidator() {
      var _this = this;

      // extend the validator with custom "registerAsyncRule" method
      (0, _extend3.default)(this.validator, {
        registerAsyncRule: function registerAsyncRule(key, callback) {
          return _this.registerAsyncRule(key, callback);
        }
      });
      // extend using "extend" callback
      if ((0, _isFunction3.default)(this.extend)) this.extend(this.validator);
    }
  }, {
    key: 'validateField',
    value: function validateField(field, form) {
      // get form fields data
      var data = {}; // eslint-disable-next-line
      form.each(function ($field) {
        return data[$field.path] = $field.validatedValue;
      });
      this.validateFieldAsync(field, form, data);
      this.validateFieldSync(field, form, data);
    }
  }, {
    key: 'validateFieldSync',
    value: function validateFieldSync(field, form, data) {
      var $rules = this.rules(field.rules, 'sync');
      // exit if no rules found
      if ((0, _isEmpty3.default)($rules[0])) return;
      // get field rules
      var rules = (0, _defineProperty3.default)({}, field.path, $rules);
      // create the validator instance
      var Validator = this.validator;
      var validation = new Validator(data, rules);
      // set label into errors messages instead key
      validation.setAttributeNames((0, _defineProperty3.default)({}, field.path, field.label));
      // check validation
      if (validation.passes()) return;
      // the validation is failed, set the field error
      field.invalidate((0, _first3.default)(validation.errors.get(field.path)));
    }
  }, {
    key: 'validateFieldAsync',
    value: function validateFieldAsync(field, form, data) {
      var _this2 = this;

      var $rules = this.rules(field.rules, 'async');
      // exit if no rules found
      if ((0, _isEmpty3.default)($rules[0])) return;
      // get field rules
      var rules = (0, _defineProperty3.default)({}, field.path, $rules);
      // create the validator instance
      var Validator = this.validator;
      var validation = new Validator(data, rules);
      // set label into errors messages instead key
      validation.setAttributeNames((0, _defineProperty3.default)({}, field.path, field.label));

      var $p = new _promise2.default(function (resolve) {
        return validation.checkAsync(function () {
          return _this2.handleAsyncPasses(field, resolve);
        }, function () {
          return _this2.handleAsyncFails(field, validation, resolve);
        });
      });

      this.promises.push($p);
    }
  }, {
    key: 'handleAsyncPasses',
    value: function handleAsyncPasses(field, resolve) {
      field.setValidationAsyncData(true);
      field.showAsyncErrors();
      resolve();
    }
  }, {
    key: 'handleAsyncFails',
    value: function handleAsyncFails(field, validation, resolve) {
      field.setValidationAsyncData(false, (0, _first3.default)(validation.errors.get(field.path)));
      this.executeAsyncValidation(field);
      field.showAsyncErrors();
      resolve();
    }
  }, {
    key: 'executeAsyncValidation',
    value: function executeAsyncValidation(field) {
      if (field.validationAsyncData.valid === false) {
        field.invalidate(field.validationAsyncData.message, true);
      }
    }
  }, {
    key: 'registerAsyncRule',
    value: function registerAsyncRule(key, callback) {
      this.asyncRules.push(key);
      this.validator.registerAsync(key, callback);
    }
  }, {
    key: 'rules',
    value: function rules(_rules, type) {
      var $rules = (0, _isString3.default)(_rules) ? (0, _split3.default)(_rules, '|') : _rules;
      if (type === 'sync') return (0, _difference3.default)($rules, this.asyncRules);
      if (type === 'async') return (0, _intersection3.default)($rules, this.asyncRules);
      return [];
    }
  }]);
  return DVR;
}();

exports.default = DVR;
module.exports = exports['default'];