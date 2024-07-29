'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _merge5 = require('lodash/merge');

var _merge6 = _interopRequireDefault(_merge5);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bindings = function () {
  function Bindings() {
    (0, _classCallCheck3.default)(this, Bindings);
    this.templates = {
      // default: ({ field, props, keys, $try }) => ({
      //   [keys.id]: $try(props.id, field.id),
      // }),
    };
    this.rewriters = {
      default: {
        id: 'id',
        name: 'name',
        type: 'type',
        value: 'value',
        checked: 'checked',
        label: 'label',
        placeholder: 'placeholder',
        disabled: 'disabled',
        onChange: 'onChange',
        onBlur: 'onBlur',
        onFocus: 'onFocus',
        autoFocus: 'autoFocus'
      }
    };
  }

  (0, _createClass3.default)(Bindings, [{
    key: 'load',
    value: function load(field) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
      var props = arguments[2];

      if ((0, _has3.default)(this.rewriters, name)) {
        var $bindings = {};

        (0, _each3.default)(this.rewriters[name], function ($v, $k) {
          return (0, _merge6.default)($bindings, (0, _defineProperty3.default)({}, $v, (0, _utils.$try)(props[$k], field[$k])));
        });

        return $bindings;
      }

      return this.templates[name]({
        keys: this.rewriters[name],
        $try: _utils.$try,
        field: field,
        props: props
      });
    }
  }, {
    key: 'register',
    value: function register(bindings) {
      var _this = this;

      (0, _each3.default)(bindings, function (val, key) {
        if ((0, _isFunction3.default)(val)) (0, _merge6.default)(_this.templates, (0, _defineProperty3.default)({}, key, val));
        if ((0, _isPlainObject3.default)(val)) (0, _merge6.default)(_this.rewriters, (0, _defineProperty3.default)({}, key, val));
      });

      return this;
    }
  }]);
  return Bindings;
}();

exports.default = Bindings;
module.exports = exports['default'];