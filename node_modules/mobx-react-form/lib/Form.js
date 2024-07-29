'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prototypes = exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = {default: function () {
  var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  }
  return function (d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}()}

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _debounce2 = require('lodash/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _desc2, _value2, _obj;

var _mobx = require('mobx');

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var _Validator = require('./Validator');

var _Validator2 = _interopRequireDefault(_Validator);

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Form = (_class = function (_Base) {
  (0, _inherits3.default)(Form, _Base);

  function Form() {
    var setup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$name = _ref.name,
        name = _ref$name === undefined ? null : _ref$name,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? {} : _ref$options,
        _ref$plugins = _ref.plugins,
        plugins = _ref$plugins === undefined ? {} : _ref$plugins,
        _ref$bindings = _ref.bindings,
        bindings = _ref$bindings === undefined ? {} : _ref$bindings,
        _ref$hooks = _ref.hooks,
        hooks = _ref$hooks === undefined ? {} : _ref$hooks,
        _ref$handlers = _ref.handlers,
        handlers = _ref$handlers === undefined ? {} : _ref$handlers;

    (0, _classCallCheck3.default)(this, Form);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call(this));

    _this.$hooks = {};
    _this.$handlers = {};

    _initDefineProp(_this, '$submitting', _descriptor, _this);

    _initDefineProp(_this, '$validating', _descriptor2, _this);

    _initDefineProp(_this, 'fields', _descriptor3, _this);

    _this.name = name;
    _this.$hooks = hooks;
    _this.$handlers = handlers;

    // load data from initializers methods
    var initial = (0, _each3.default)({
      setup: setup, options: options, plugins: plugins, bindings: bindings
    }, function (val, key) {
      return (0, _isFunction3.default)(_this[key]) ? (0, _merge3.default)(val, _this[key].apply(_this, [_this])) : val;
    });

    _this.state = new _State2.default({
      form: _this,
      initial: initial.setup,
      options: initial.options,
      bindings: initial.bindings
    });

    _this.validator = new _Validator2.default({
      form: _this,
      plugins: initial.plugins,
      schema: initial.setup.schema
    });

    _this.initFields(initial.setup);

    _this.debouncedValidation = (0, _debounce3.default)(_this.validate, _this.state.options.get('validationDebounceWait'), _this.state.options.get('validationDebounceOptions'));

    // execute validation on form initialization
    if (_this.state.options.get('validateOnInit') === true) {
      _this.validator.validate({ showErrors: _this.state.options.get('showErrorsOnInit') });
    }

    _this.execHook('onInit');
    return _this;
  }

  /* ------------------------------------------------------------------ */
  /* COMPUTED */

  (0, _createClass3.default)(Form, [{
    key: 'submitting',
    get: function get() {
      return this.$submitting;
    }
  }, {
    key: 'validating',
    get: function get() {
      return this.$validating;
    }
  }, {
    key: 'clearing',
    get: function get() {
      return this.check('clearing', true);
    }
  }, {
    key: 'resetting',
    get: function get() {
      return this.check('resetting', true);
    }
  }, {
    key: 'error',
    get: function get() {
      return this.validator.error;
    }
  }, {
    key: 'hasError',
    get: function get() {
      return !!this.validator.error || this.check('hasError', true);
    }
  }, {
    key: 'isValid',
    get: function get() {
      return !this.validator.error && this.check('isValid', true);
    }
  }, {
    key: 'isDirty',
    get: function get() {
      return this.check('isDirty', true);
    }
  }, {
    key: 'isPristine',
    get: function get() {
      return this.check('isPristine', true);
    }
  }, {
    key: 'isDefault',
    get: function get() {
      return this.check('isDefault', true);
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      return this.check('isEmpty', true);
    }
  }, {
    key: 'focused',
    get: function get() {
      return this.check('focused', true);
    }
  }, {
    key: 'touched',
    get: function get() {
      return this.check('touched', true);
    }
  }, {
    key: 'changed',
    get: function get() {
      return this.check('changed', true);
    }
  }, {
    key: 'disabled',
    get: function get() {
      return this.check('disabled', true);
    }
  }]);
  return Form;
}(_Base3.default), (_descriptor = _applyDecoratedDescriptor(_class.prototype, '$submitting', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, '$validating', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'fields', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return _mobx.observable.map ? _mobx.observable.map({}) : (0, _mobx.asMap)({});
  }
}), _applyDecoratedDescriptor(_class.prototype, 'submitting', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'submitting'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'validating', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'validating'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearing', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clearing'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'resetting', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'resetting'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'error', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'error'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hasError', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'hasError'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isValid', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isValid'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isDirty', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isDirty'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isPristine', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isPristine'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isDefault', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isDefault'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isEmpty', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isEmpty'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'focused', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'focused'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'touched', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'touched'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changed', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'changed'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'disabled', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'disabled'), _class.prototype)), _class);

/**
  Prototypes
*/

exports.default = Form;
var prototypes = exports.prototypes = (_obj = {
  makeField: function makeField(data) {
    return new _Field2.default(data);
  },
  init: function init() {
    var $fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    (0, _set3.default)(this, 'fields', _mobx.observable.map ? _mobx.observable.map({}) : (0, _mobx.asMap)({}));

    this.state.initial.props.values = $fields; // eslint-disable-line
    this.state.current.props.values = $fields; // eslint-disable-line

    this.initFields({
      fields: $fields || this.state.struct()
    });
  },
  invalidate: function invalidate() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this.validator.error = message || this.state.options.get('defaultGenericError') || true;
  },
  showErrors: function showErrors() {
    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.each(function (field) {
      return field.showErrors(show);
    });
  },
  clear: function clear() {
    this.$touched = false;
    this.$changed = false;
    this.each(function (field) {
      return field.clear(true);
    });
  },
  reset: function reset() {
    this.$touched = false;
    this.$changed = false;
    this.each(function (field) {
      return field.reset(true);
    });
  }
}, (_applyDecoratedDescriptor(_obj, 'init', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_obj, 'init'), _obj), _applyDecoratedDescriptor(_obj, 'invalidate', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_obj, 'invalidate'), _obj), _applyDecoratedDescriptor(_obj, 'clear', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_obj, 'clear'), _obj), _applyDecoratedDescriptor(_obj, 'reset', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_obj, 'reset'), _obj)), _obj);