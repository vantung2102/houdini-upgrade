webpackJsonp([2],{

/***/ 1:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 100:
/***/ (function(module, exports) {

module.exports = I18n;

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//MIT based on https://github.com/davidtheclark/react-aria-tabpanel/blob/master/lib/specialAssign.js
function specialAssign(a, b, reserved) {
    for (var x in b) {
        if (!b.hasOwnProperty(x))
            continue;
        if (a[x])
            continue;
        if (reserved[x])
            continue;
        a[x] = b[x];
    }
}
exports.default = specialAssign;


/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var React = __webpack_require__(1);
var _ = __webpack_require__(17);
function arrayify(items) {
    return items instanceof Array ? items : [items];
}
exports.TwoColumnFields = function (props) {
    var children = arrayify(props.children);
    return React.createElement(exports.Row, null, children.map(function (i) {
        var className = "";
        if (_.last(children) !== i) {
            className += " u-paddingRight--10";
        }
        if (i.props.className) {
            className += i.props.className;
        }
        return React.createElement(exports.Column, { colSpan: 6, breakSize: 'sm' }, React.cloneElement(i, { className: className }));
    }));
};
exports.TwoColumnFields.displayName = 'TwoColumnFields';
exports.ThreeColumnFields = function (props) {
    var children = arrayify(props.children);
    return React.createElement(exports.Row, null, children.map(function (i) {
        var className = "";
        if (_.last(children) !== i) {
            className += " u-paddingRight--10";
        }
        if (i.props.className) {
            className += i.props.className;
        }
        return React.createElement(exports.Column, { colSpan: 4, breakSize: 'sm' }, React.cloneElement(i, { className: className }));
    }));
};
exports.ThreeColumnFields.displayName = 'ThreeColumnFields';
exports.Row = function (props) {
    return React.createElement("div", { className: "row" }, props.children);
};
exports.Row.displayName = 'Row';
exports.Column = function (props) {
    var className = "col-" + props.breakSize + "-" + props.colSpan + " ";
    props.children.props;
    if (props.children.props.className) {
        className += props.children.props['className'];
    }
    return React.cloneElement(props.children, { className: className });
};
exports.Column.displayName = 'Column';


/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var React = __webpack_require__(1);
var mobx_react_1 = __webpack_require__(3);
var mobx_1 = __webpack_require__(4);
var _ = __webpack_require__(17);
var TabPanel_1 = __webpack_require__(791);
var WizardPanel = /** @class */ (function (_super) {
    __extends(WizardPanel, _super);
    function WizardPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WizardPanel.prototype, "tab", {
        get: function () {
            return this.props.tab;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPanel.prototype, "isActive", {
        get: function () {
            return this.tab.active;
        },
        enumerable: true,
        configurable: true
    });
    WizardPanel.prototype.render = function () {
        var props = _.omit(this.props, ['tab']);
        return React.createElement(TabPanel_1.TabPanel, __assign({}, props, { tabId: this.tab.id, active: this.isActive, className: "wizard-step" }), this.props.children);
    };
    __decorate([
        mobx_1.computed
    ], WizardPanel.prototype, "tab", null);
    __decorate([
        mobx_1.computed
    ], WizardPanel.prototype, "isActive", null);
    WizardPanel = __decorate([
        mobx_react_1.observer
    ], WizardPanel);
    return WizardPanel;
}(React.Component));
exports.WizardPanel = WizardPanel;


/***/ }),

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var React = __webpack_require__(1);
var mobx_react_1 = __webpack_require__(3);
var react_intl_1 = __webpack_require__(16);
var fields_1 = __webpack_require__(94);
var layout_1 = __webpack_require__(44);
var vjf_rules_1 = __webpack_require__(97);
var ProgressableButton_1 = __webpack_require__(96);
exports.FieldDefinitions = [
    {
        name: 'organization_name',
        validators: [vjf_rules_1.Validations.isFilled]
    },
    {
        name: 'website',
        validators: [vjf_rules_1.Validations.optional(vjf_rules_1.Validations.isUrl)]
    },
    {
        name: 'org_email',
        validators: [vjf_rules_1.Validations.optional(vjf_rules_1.Validations.isEmail)]
    },
    {
        name: 'org_phone',
        type: "tel"
    },
    {
        name: 'city',
        validators: [vjf_rules_1.Validations.isFilled]
    },
    {
        name: 'state',
        validators: [vjf_rules_1.Validations.isFilled]
    },
    {
        name: 'zip',
        validators: [vjf_rules_1.Validations.isFilled]
    }
];
var NonprofitInfoForm = /** @class */ (function (_super) {
    __extends(NonprofitInfoForm, _super);
    function NonprofitInfoForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NonprofitInfoForm.prototype.render = function () {
        return React.createElement("fieldset", null,
            React.createElement(fields_1.BasicField, { field: this.props.form.$("organization_name"), label: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.name.label' }), placeholder: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.name.placeholder' }), inputClassNames: "input-lg" }),
            React.createElement(fields_1.BasicField, { field: this.props.form.$('website'), label: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.website.label' }), placeholder: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.website.placeholder' }), inputClassNames: "input-lg" }),
            React.createElement(layout_1.TwoColumnFields, null,
                React.createElement(fields_1.BasicField, { field: this.props.form.$('org_email'), label: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.email.label' }), placeholder: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.email.placeholder' }), inputClassNames: "input-lg" }),
                React.createElement(fields_1.BasicField, { field: this.props.form.$('org_phone'), label: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.phone.label' }), placeholder: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.phone.placeholder' }), inputClassNames: "input-lg" })),
            React.createElement(layout_1.ThreeColumnFields, null,
                React.createElement(fields_1.BasicField, { field: this.props.form.$('city'), label: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.city.label' }), placeholder: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.city.placeholder' }), inputClassNames: "input-lg" }),
                React.createElement(fields_1.BasicField, { field: this.props.form.$('state'), label: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.state.label' }), placeholder: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.state.placeholder' }), inputClassNames: "input-lg" }),
                React.createElement(fields_1.BasicField, { field: this.props.form.$('zip'), label: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.zip.label' }), placeholder: this.props.intl.formatMessage({ id: 'registration.wizard.nonprofit.zip.placeholder' }), inputClassNames: "input-lg" })),
            React.createElement(ProgressableButton_1.default, { onClick: this.props.form.onSubmit, className: "button", disabled: !this.props.form.isValid, buttonText: this.props.intl.formatMessage({ id: this.props.buttonText }), inProgress: this.props.form.submitting || this.props.form.container().submitting, disableOnProgress: true }));
    };
    return NonprofitInfoForm;
}(React.Component));
exports.default = react_intl_1.injectIntl(mobx_react_1.observer(NonprofitInfoForm));


/***/ }),

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var React = __webpack_require__(1);
var mobx_react_1 = __webpack_require__(3);
var react_intl_1 = __webpack_require__(16);
var vjf_rules_1 = __webpack_require__(97);
var layout_1 = __webpack_require__(44);
var fields_1 = __webpack_require__(94);
var ProgressableButton_1 = __webpack_require__(96);
var houdini_form_1 = __webpack_require__(86);
exports.FieldDefinitions = [
    {
        name: 'name',
        validators: [vjf_rules_1.Validations.isFilled]
    },
    {
        name: 'email',
        validators: [vjf_rules_1.Validations.isEmail]
    },
    {
        name: 'password',
        type: 'password',
        validators: [vjf_rules_1.Validations.isFilled],
        related: ['userTab.password_confirmation']
    },
    {
        name: 'password_confirmation',
        type: 'password',
        validators: [vjf_rules_1.Validations.shouldBeEqualTo("userTab.password")]
    }
];
var UserInfoForm = /** @class */ (function (_super) {
    __extends(UserInfoForm, _super);
    function UserInfoForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserInfoForm.prototype.render = function () {
        return React.createElement("fieldset", null,
            React.createElement(layout_1.TwoColumnFields, null,
                React.createElement(fields_1.BasicField, { field: this.props.form.$("name"), label: this.props.intl.formatMessage({ id: "registration.wizard.contact.name.label" }), placeholder: this.props.intl.formatMessage({ id: "registration.wizard.contact.name.placeholder" }), inputClassNames: "input-lg" }),
                React.createElement(fields_1.BasicField, { field: this.props.form.$('email'), label: this.props.intl.formatMessage({ id: "registration.wizard.contact.email.label" }), placeholder: this.props.intl.formatMessage({ id: "registration.wizard.contact.email.placeholder" }), inputClassNames: "input-lg" })),
            React.createElement(fields_1.BasicField, { field: this.props.form.$('password'), label: this.props.intl.formatMessage({ id: 'registration.wizard.contact.password.label' }), inputClassNames: "input-lg" }),
            React.createElement(fields_1.BasicField, { field: this.props.form.$('password_confirmation'), label: this.props.intl.formatMessage({ id: 'registration.wizard.contact.password_confirmation.label' }), inputClassNames: "input-lg" }),
            React.createElement(ProgressableButton_1.default, { onClick: this.props.form.onSubmit, className: "button", disabled: !this.props.form.isValid, buttonText: this.props.intl.formatMessage({ id: this.props.buttonText }), inProgress: houdini_form_1.areWeOrAnyParentSubmitting(this.props.form), buttonTextOnProgress: this.props.intl.formatMessage({ id: this.props.buttonTextOnProgress }), disableOnProgress: true }));
    };
    return UserInfoForm;
}(React.Component));
exports.default = react_intl_1.injectIntl(mobx_react_1.observer(UserInfoForm));


/***/ }),

/***/ 787:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// License: LGPL-3.0-or-later
Object.defineProperty(exports, "__esModule", { value: true });
// require a root component here. This will be treated as the root of a webpack package
var Root_1 = __webpack_require__(98);
var RegistrationPage_1 = __webpack_require__(788);
var ReactDOM = __webpack_require__(8);
var React = __webpack_require__(1);
function LoadReactPage(element) {
    ReactDOM.render(React.createElement(Root_1.default, null,
        React.createElement(RegistrationPage_1.default, null)), element);
}
window.LoadReactPage = LoadReactPage;


/***/ }),

/***/ 788:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var React = __webpack_require__(1);
var RegistrationWizard_1 = __webpack_require__(789);
var mobx_react_1 = __webpack_require__(3);
var react_intl_1 = __webpack_require__(16);
var RegistrationPage = /** @class */ (function (_super) {
    __extends(RegistrationPage, _super);
    function RegistrationPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RegistrationPage.prototype.render = function () {
        return React.createElement("div", { className: "tw-bs" },
            React.createElement("div", { className: "container" },
                React.createElement("h1", null,
                    React.createElement(react_intl_1.FormattedMessage, { id: "registration.get_started.header" })),
                React.createElement("p", null,
                    React.createElement(react_intl_1.FormattedMessage, { id: "registration.get_started.description" })),
                React.createElement(RegistrationWizard_1.default, null)));
    };
    return RegistrationPage;
}(React.Component));
exports.default = react_intl_1.injectIntl(mobx_react_1.observer(RegistrationPage));


/***/ }),

/***/ 789:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var React = __webpack_require__(1);
var mobx_react_1 = __webpack_require__(3);
var NonprofitInfoPanel_1 = __webpack_require__(790);
var mobx_1 = __webpack_require__(4);
var Wizard_1 = __webpack_require__(792);
var react_intl_1 = __webpack_require__(16);
var wizard_state_1 = __webpack_require__(798);
var UserInfoPanel_1 = __webpack_require__(802);
var api_1 = __webpack_require__(241);
var houdini_form_1 = __webpack_require__(86);
var sign_in_1 = __webpack_require__(141);
var NonprofitInfoForm = __webpack_require__(464);
var UserInfoForm = __webpack_require__(465);
var setTourCookies = function (nonprofit) {
    document.cookie = "tour_dashboard=" + nonprofit.id + ";path=/";
    document.cookie = "tour_campaign=" + nonprofit.id + ";path=/";
    document.cookie = "tour_event=" + nonprofit.id + ";path=/";
    document.cookie = "tour_profile=" + nonprofit.id + ";path=/";
    document.cookie = "tour_transactions=" + nonprofit.id + ";path=/";
    document.cookie = "tour_supporters=" + nonprofit.id + ";path=/";
    document.cookie = "tour_subscribers=" + nonprofit.id + ";path=/";
};
var RegistrationPageForm = /** @class */ (function (_super) {
    __extends(RegistrationPageForm, _super);
    function RegistrationPageForm(definition, options) {
        var _this = _super.call(this, definition, options) || this;
        _this.inputToForm = {
            'nonprofit[name]': 'nonprofitTab.organization_name',
            'nonprofit[website]': 'nonprofitTab.website',
            'nonprofit[email]': 'nonprofitTab.org_email',
            'nonprofit[phone]': 'nonprofitTab.org_phone',
            'nonprofit[city]': 'nonprofitTab.city',
            'nonprofit[state_code]': 'nonprofitTab.state',
            'nonprofit[zip_code]': 'nonprofitTab.zip',
            'user[name]': 'userTab.name',
            'user[email]': 'userTab.email',
            'user[password]': 'userTab.password',
            'user[password_confirmation]': 'userTab.password_confirmation'
        };
        _this.converter = new houdini_form_1.StaticFormToErrorAndBackConverter(_this.inputToForm);
        return _this;
    }
    RegistrationPageForm.prototype.options = function () {
        return {
            validateOnInit: true,
            validateOnChange: true,
            retrieveOnlyDirtyValues: true,
            retrieveOnlyEnabledFields: true
        };
    };
    RegistrationPageForm.prototype.hooks = function () {
        var _this = this;
        return {
            onSuccess: function (f) { return __awaiter(_this, void 0, void 0, function () {
                var input, r, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = this.converter.convertFormToObject(f);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.nonprofitApi.postNonprofit(input)];
                        case 2:
                            r = _a.sent();
                            setTourCookies(r);
                            return [4 /*yield*/, this.signinApi.postLogin({ email: input.user.email, password: input.user.password })];
                        case 3:
                            _a.sent();
                            window.location.href = "/nonprofits/" + r.id + "/dashboard";
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            console.log(e_1);
                            if (e_1 instanceof api_1.ValidationErrorsException) {
                                this.converter.convertErrorToForm(e_1, f);
                            }
                            this.invalidateFromServer(e_1['error']);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); }
        };
    };
    return RegistrationPageForm;
}(houdini_form_1.HoudiniForm));
exports.RegistrationPageForm = RegistrationPageForm;
var RegistrationWizardState = /** @class */ (function (_super) {
    __extends(RegistrationWizardState, _super);
    function RegistrationWizardState() {
        return _super.call(this, wizard_state_1.WizardTabPanelState) || this;
    }
    RegistrationWizardState.prototype.createForm = function (i) {
        return new RegistrationPageForm(i);
    };
    __decorate([
        mobx_1.action.bound
    ], RegistrationWizardState.prototype, "createForm", null);
    return RegistrationWizardState;
}(wizard_state_1.WizardState));
var InnerRegistrationWizard = /** @class */ (function (_super) {
    __extends(InnerRegistrationWizard, _super);
    function InnerRegistrationWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.setRegistrationWizardState();
        _this.createForm();
        return _this;
    }
    Object.defineProperty(InnerRegistrationWizard.prototype, "form", {
        get: function () {
            return (this.registrationWizardState && this.registrationWizardState.form);
        },
        enumerable: true,
        configurable: true
    });
    InnerRegistrationWizard.prototype.setRegistrationWizardState = function () {
        this.registrationWizardState = new RegistrationWizardState();
    };
    InnerRegistrationWizard.prototype.createForm = function () {
        this.registrationWizardState.addTab({ tabName: "nonprofitTab", label: 'registration.wizard.tabs.nonprofit', tabFieldDefinition: {
                fields: NonprofitInfoForm.FieldDefinitions
            } });
        this.registrationWizardState.addTab({ tabName: "userTab", label: 'registration.wizard.tabs.contact', tabFieldDefinition: {
                fields: UserInfoForm.FieldDefinitions
            }
        });
        this.registrationWizardState.initialize();
    };
    InnerRegistrationWizard.prototype.componentWillMount = function () {
        var _this = this;
        mobx_1.runInAction(function () {
            _this.form.nonprofitApi = _this.props.ApiManager.get(api_1.NonprofitApi);
            _this.form.signinApi = _this.props.ApiManager.get(sign_in_1.WebUserSignInOut);
        });
    };
    InnerRegistrationWizard.prototype.render = function () {
        return React.createElement(Wizard_1.Wizard, { wizardState: this.registrationWizardState, disableTabs: this.form.submitting },
            React.createElement(NonprofitInfoPanel_1.default, { tab: this.registrationWizardState.tabsByName['nonprofitTab'], buttonText: "registration.wizard.next" }),
            React.createElement(UserInfoPanel_1.default, { tab: this.registrationWizardState.tabsByName['userTab'], buttonText: "registration.wizard.save_and_finish", buttonTextOnProgress: "registration.wizard.saving" }));
    };
    __decorate([
        mobx_1.observable
    ], InnerRegistrationWizard.prototype, "registrationWizardState", void 0);
    __decorate([
        mobx_1.computed
    ], InnerRegistrationWizard.prototype, "form", null);
    __decorate([
        mobx_1.action.bound
    ], InnerRegistrationWizard.prototype, "setRegistrationWizardState", null);
    __decorate([
        mobx_1.action.bound
    ], InnerRegistrationWizard.prototype, "createForm", null);
    return InnerRegistrationWizard;
}(React.Component));
exports.InnerRegistrationWizard = InnerRegistrationWizard;
exports.default = react_intl_1.injectIntl(mobx_react_1.inject('ApiManager')(mobx_react_1.observer(InnerRegistrationWizard)));


/***/ }),

/***/ 790:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var React = __webpack_require__(1);
var WizardPanel_1 = __webpack_require__(463);
var mobx_react_1 = __webpack_require__(3);
var mobx_1 = __webpack_require__(4);
var react_intl_1 = __webpack_require__(16);
var NonprofitInfoForm_1 = __webpack_require__(464);
var NonprofitInfoPanel = /** @class */ (function (_super) {
    __extends(NonprofitInfoPanel, _super);
    function NonprofitInfoPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NonprofitInfoPanel.prototype, "wizardTab", {
        get: function () {
            return this.props.tab;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NonprofitInfoPanel.prototype, "form", {
        get: function () {
            return this.wizardTab.form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NonprofitInfoPanel.prototype, "submit", {
        get: function () {
            return this.form.onSubmit;
        },
        enumerable: true,
        configurable: true
    });
    NonprofitInfoPanel.prototype.render = function () {
        var self = this;
        return React.createElement(WizardPanel_1.WizardPanel, { tab: this.wizardTab, key: this.wizardTab.tabName },
            React.createElement(NonprofitInfoForm_1.default, { form: this.form, buttonText: this.props.buttonText }));
    };
    __decorate([
        mobx_1.computed
    ], NonprofitInfoPanel.prototype, "wizardTab", null);
    __decorate([
        mobx_1.computed
    ], NonprofitInfoPanel.prototype, "form", null);
    __decorate([
        mobx_1.computed
    ], NonprofitInfoPanel.prototype, "submit", null);
    return NonprofitInfoPanel;
}(React.Component));
exports.default = react_intl_1.injectIntl(mobx_react_1.observer(NonprofitInfoPanel));


/***/ }),

/***/ 791:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//MIT based on https://github.com/davidtheclark/react-aria-tabpanel/blob/master/lib/TabPanel.js
var React = __webpack_require__(1);
var specialAssign_1 = __webpack_require__(133);
var mobx_react_1 = __webpack_require__(3);
var PropTypes = __webpack_require__(26);
var checkedProps = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
    ]).isRequired,
    tabId: PropTypes.string.isRequired,
    tag: PropTypes.string,
    active: PropTypes.bool,
};
var TabPanel = /** @class */ (function (_super) {
    __extends(TabPanel, _super);
    function TabPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabPanel.prototype.handleKeyDown = function (event) {
        if (event.ctrlKey && event.key === 'ArrowUp') {
            event.preventDefault();
            this.context.atpManager.focusTab(this.props.tabId);
        }
    };
    TabPanel.prototype.registerWithManager = function (el) {
        this.context.atpManager.registerTabPanelElement({
            node: el,
            tabId: this.props.tabId,
        });
    };
    TabPanel.prototype.render = function () {
        var props = this.props;
        var isActive = props.active;
        var kids = props.children;
        var style = props.style || {};
        if (!isActive) {
            style.display = 'none';
        }
        var elProps = {
            className: props.className,
            id: this.context.atpManager.getTabPanelId(props.tabId),
            onKeyDown: this.handleKeyDown.bind(this),
            role: 'tabpanel',
            style: style,
            'aria-hidden': !isActive,
            'aria-describedby': props.tabId,
            ref: this.registerWithManager.bind(this)
        };
        specialAssign_1.default(elProps, props, checkedProps);
        return React.createElement(props.tag, elProps, kids);
    };
    TabPanel.defaultProps = { tag: 'div' };
    TabPanel.contextTypes = {
        atpManager: PropTypes.object.isRequired
    };
    TabPanel = __decorate([
        mobx_react_1.observer
    ], TabPanel);
    return TabPanel;
}(React.Component));
exports.TabPanel = TabPanel;


/***/ }),

/***/ 792:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var React = __webpack_require__(1);
var mobx_react_1 = __webpack_require__(3);
var WizardTabList_1 = __webpack_require__(793);
var Wrapper_1 = __webpack_require__(797);
var Wizard = /** @class */ (function (_super) {
    __extends(Wizard, _super);
    function Wizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wizard.prototype.render = function () {
        return React.createElement(Wrapper_1.Wrapper, { manager: this.props.wizardState, tag: "section", style: { display: 'table' }, className: "wizard-steps" },
            React.createElement(WizardTabList_1.default, { wizardState: this.props.wizardState, disableTabs: this.props.disableTabs }),
            React.createElement("div", { className: "modal-body" },
                React.createElement("form", { onSubmit: this.props.wizardState.form.onSubmit }, this.props.children)));
    };
    Wizard = __decorate([
        mobx_react_1.observer
    ], Wizard);
    return Wizard;
}(React.Component));
exports.Wizard = Wizard;


/***/ }),

/***/ 793:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var React = __webpack_require__(1);
var WizardTab_1 = __webpack_require__(794);
var mobx_react_1 = __webpack_require__(3);
var TabList_1 = __webpack_require__(796);
var WizardTabList = /** @class */ (function (_super) {
    __extends(WizardTabList, _super);
    function WizardTabList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WizardTabList.prototype.render = function () {
        var _this = this;
        var widthOfTab = 100 / this.props.wizardState.panels.length;
        var output = this.props.wizardState.panels.map(function (i) {
            return React.createElement(WizardTab_1.default, { tab: i, widthPercentage: widthOfTab, key: i.id + "key", disableTabs: _this.props.disableTabs });
        });
        return React.createElement(TabList_1.TabList, { tag: "div", className: "wizard-index" }, output);
    };
    WizardTabList = __decorate([
        mobx_react_1.observer
    ], WizardTabList);
    return WizardTabList;
}(React.Component));
exports.default = WizardTabList;


/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var React = __webpack_require__(1);
var react_intl_1 = __webpack_require__(16);
var mobx_react_1 = __webpack_require__(3);
var Tab_1 = __webpack_require__(795);
var WizardTab = /** @class */ (function (_super) {
    __extends(WizardTab, _super);
    function WizardTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WizardTab.prototype.render = function () {
        var percentageToString = this.props.widthPercentage.toString() + "%";
        var style = { width: percentageToString };
        var className = "wizard-index-label";
        if (this.props.tab.active) {
            className += " is-current";
        }
        var disableOverrideTab = this.props.disableTabs;
        if (this.props.tab.enabled || disableOverrideTab) {
            className += " is-accessible";
        }
        return React.createElement(Tab_1.Tab, { tag: 'span', active: this.props.tab.active, className: className, style: style, id: this.props.tab.id }, this.props.intl.formatMessage({ id: this.props.tab.label }));
    };
    return WizardTab;
}(React.Component));
exports.default = react_intl_1.injectIntl(mobx_react_1.observer(WizardTab));


/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//MIT based on https://github.com/davidtheclark/react-aria-tabpanel/blob/master/lib/Tab.js
var React = __webpack_require__(1);
var specialAssign_1 = __webpack_require__(133);
var mobx_react_1 = __webpack_require__(3);
var PropTypes = __webpack_require__(26);
var checkedProps = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
    ]).isRequired,
    id: PropTypes.string.isRequired,
    tag: PropTypes.string,
    role: PropTypes.string,
    index: PropTypes.number,
    active: PropTypes.bool,
    letterNavigationText: PropTypes.string,
};
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tab.prototype.handleRef = function (el) {
        if (el) {
            this.elRef = el;
            this.registerWithManager(this.elRef);
        }
    };
    Tab.prototype.registerWithManager = function (elRef) {
        this.context.atpManager.registerTabElement({
            id: this.props.id,
            node: elRef
        });
    };
    Tab.prototype.handleFocus = function () {
        this.context.atpManager.handleTabFocus(this.props.id);
    };
    Tab.prototype.render = function () {
        var props = this.props;
        var isActive = props.active;
        var kids = props.children;
        var elProps = {
            id: props.id,
            tabIndex: (isActive) ? 0 : -1,
            onFocus: this.handleFocus.bind(this),
            role: props.role,
            'aria-selected': isActive,
            'aria-controls': this.context.atpManager.getTabPanelId(props.id),
            ref: this.handleRef.bind(this)
        };
        specialAssign_1.default(elProps, props, checkedProps);
        return React.createElement(props.tag, elProps, kids);
    };
    Tab.prototype.componentWillUnmount = function () {
        this.context.atpManager.unregisterTabElement({ id: this.props.id });
    };
    Tab.defaultProps = { tag: 'div', role: 'tab' };
    Tab.contextTypes = {
        atpManager: PropTypes.object.isRequired
    };
    Tab = __decorate([
        mobx_react_1.observer
    ], Tab);
    return Tab;
}(React.Component));
exports.Tab = Tab;


/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//MIT based on https://github.com/davidtheclark/react-aria-tabpanel/blob/master/lib/TabList.js
var React = __webpack_require__(1);
var specialAssign_1 = __webpack_require__(133);
var mobx_react_1 = __webpack_require__(3);
var PropTypes = __webpack_require__(26);
var checkedProps = {
    children: PropTypes.node.isRequired,
    tag: PropTypes.string,
};
var TabList = /** @class */ (function (_super) {
    __extends(TabList, _super);
    function TabList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabList.prototype.render = function () {
        var props = this.props;
        var elProps = {
            role: 'tablist',
        };
        specialAssign_1.default(elProps, props, checkedProps);
        return React.createElement(props.tag, elProps, props.children);
    };
    TabList.defaultProps = { tag: 'div' };
    TabList.contextTypes = {
        atpManager: PropTypes.object.isRequired
    };
    TabList = __decorate([
        mobx_react_1.observer
    ], TabList);
    return TabList;
}(React.Component));
exports.TabList = TabList;


/***/ }),

/***/ 797:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var React = __webpack_require__(1);
var mobx_react_1 = __webpack_require__(3);
var specialAssign_1 = __webpack_require__(133);
var PropTypes = __webpack_require__(26);
var checkedProps = {
    children: PropTypes.node.isRequired,
    tag: PropTypes.string,
    manager: PropTypes.object.isRequired
};
/**
 * Works just like the normal Wrapper but supports our own tab manager
 */
var Wrapper = /** @class */ (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'AriaTabPanel-Wrapper';
        return _this;
    }
    Wrapper.prototype.getChildContext = function () {
        return { atpManager: this.props.manager };
    };
    Wrapper.prototype.componentWillUnmount = function () {
        this.props.manager.destroy();
    };
    Wrapper.prototype.componentDidMount = function () {
        this.props.manager.activate();
    };
    Wrapper.prototype.render = function () {
        var props = this.props;
        var elProps = {};
        specialAssign_1.default(elProps, props, checkedProps);
        return React.createElement(props.tag, elProps, props.children);
    };
    Wrapper.defaultProps = {
        tag: 'div'
    };
    Wrapper.childContextTypes = {
        atpManager: PropTypes.object.isRequired,
    };
    Wrapper = __decorate([
        mobx_react_1.observer
    ], Wrapper);
    return Wrapper;
}(React.Component));
exports.Wrapper = Wrapper;


/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var mobx_1 = __webpack_require__(4);
var _ = __webpack_require__(17);
var abstract_wizard_state_1 = __webpack_require__(799);
var WizardState = /** @class */ (function (_super) {
    __extends(WizardState, _super);
    function WizardState(panelType) {
        return _super.call(this, panelType) || this;
    }
    WizardState.prototype.addTab = function (tab) {
        var ret = _super.prototype.addTab.call(this, tab);
        mobx_1.runInAction(function () {
            ret.panelFormDefinition = tab.tabFieldDefinition;
        });
        return ret;
    };
    WizardState.prototype.initialize = function () {
        var _this = this;
        if (this.panels.length > 0) {
            //let's create the forms
            var lastIndex = this.panels.length;
            for (var i = 0; i < lastIndex; i++) {
                var ourPanel = this.panels[i];
                if (!ourPanel.panelFormDefinition.hooks)
                    ourPanel.panelFormDefinition.hooks = {};
                //ourPanel.originalOnSuccessHook = toJS(ourPanel.panelFormDefinition.hooks['onSuccess'])
                ourPanel.panelFormDefinition.hooks['onSuccess'] = this.onSuccessForPanel;
                /// this won't work because the hook is already replaced
                // if (ourPanel.panelFormDefinition.hooks)
                //   ourPanel.originalOnErrorHook = ourPanel.panelFormDefinition.hooks['onError']
                ourPanel.panelFormDefinition.hooks['onError'] = this.onErrorForPanel;
                ourPanel.panelFormDefinition.name = ourPanel.tabName;
            }
            //we need to change these back to JS objects because they're likely observable and fieldDefinitions
            // can't handle that
            var fieldDefinition = mobx_1.toJS(this.panels.map(function (i) { return mobx_1.toJS(i.panelFormDefinition); }));
            this.form = this.createForm({ fields: fieldDefinition });
            _.forEach(this.panels, function (i) {
                //add the form to each panel
                i.parentForm = _this.form;
                i.form = _this.form.$(i.tabName);
            });
        }
    };
    WizardState.prototype.onSuccessForPanel = function (a) {
        // if (this.activeTab.originalOnSuccessHook) {
        //   this.activeTab.originalOnSuccessHook(a)
        // }
        if (a.submitting) {
            if (this.nextTab)
                this.moveToNextTab();
            else
                this.form.submit();
        }
    };
    WizardState.prototype.onErrorForPanel = function (a) {
        // if (this.activeTab.originalOnErrorHook) {
        //   this.activeTab.originalOnErrorHook(a)
        // }
    };
    __decorate([
        mobx_1.observable
    ], WizardState.prototype, "form", void 0);
    __decorate([
        mobx_1.action.bound
    ], WizardState.prototype, "initialize", null);
    __decorate([
        mobx_1.action.bound
    ], WizardState.prototype, "onSuccessForPanel", null);
    __decorate([
        mobx_1.action.bound
    ], WizardState.prototype, "onErrorForPanel", null);
    return WizardState;
}(abstract_wizard_state_1.AbstractWizardState));
exports.WizardState = WizardState;
var WizardTabPanelState = /** @class */ (function (_super) {
    __extends(WizardTabPanelState, _super);
    function WizardTabPanelState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WizardTabPanelState.prototype, "isValid", {
        /**
         * Whether this tab's form is valid. We override this in a mock so we can manually set the validity
         * via a simple function call
         * @returns {boolean} true if this tab's form is valid, otherwise false
         */
        get: function () {
            return this.form.isValid;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], WizardTabPanelState.prototype, "parentForm", void 0);
    __decorate([
        mobx_1.observable
    ], WizardTabPanelState.prototype, "form", void 0);
    __decorate([
        mobx_1.computed
    ], WizardTabPanelState.prototype, "isValid", null);
    return WizardTabPanelState;
}(abstract_wizard_state_1.AbstractWizardTabPanelState));
exports.WizardTabPanelState = WizardTabPanelState;


/***/ }),

/***/ 799:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var mobx_1 = __webpack_require__(4);
var abstract_tabcomponent_state_1 = __webpack_require__(800);
var _ = __webpack_require__(17);
var AbstractWizardState = /** @class */ (function (_super) {
    __extends(AbstractWizardState, _super);
    function AbstractWizardState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractWizardState.prototype.addTab = function (tab) {
        var _this = this;
        var ret = _super.prototype.addTab.call(this, tab);
        mobx_1.reaction(function () { return _this.lastConsistentlyEnabledTab; }, function (data, react) {
            _this.strategy(_this);
        });
        return ret;
    };
    Object.defineProperty(AbstractWizardState.prototype, "firstDisabledTab", {
        get: function () {
            return _.find(this.panels, function (i) { return !i.enabled; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractWizardState.prototype, "lastConsistentlyEnabledTab", {
        get: function () {
            return this.firstDisabledTab ? this.firstDisabledTab.previous : _.last(this.panels);
        },
        enumerable: true,
        configurable: true
    });
    AbstractWizardState.prototype.strategy = function (state) {
        if (this.lastConsistentlyEnabledTab.before(this.activeTab)) {
            this.activateTab(this.lastConsistentlyEnabledTab);
        }
    };
    __decorate([
        mobx_1.computed
    ], AbstractWizardState.prototype, "firstDisabledTab", null);
    __decorate([
        mobx_1.computed
    ], AbstractWizardState.prototype, "lastConsistentlyEnabledTab", null);
    return AbstractWizardState;
}(abstract_tabcomponent_state_1.AbstractTabComponentState));
exports.AbstractWizardState = AbstractWizardState;
var AbstractWizardTabPanelState = /** @class */ (function (_super) {
    __extends(AbstractWizardTabPanelState, _super);
    function AbstractWizardTabPanelState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AbstractWizardTabPanelState.prototype, "enabled", {
        get: function () {
            var previous = this.previous;
            if (previous) {
                var enabled = previous.enabled;
                var valid = previous.isValid;
                return enabled && valid;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], AbstractWizardTabPanelState.prototype, "enabled", null);
    return AbstractWizardTabPanelState;
}(abstract_tabcomponent_state_1.AbstractTabPanelState));
exports.AbstractWizardTabPanelState = AbstractWizardTabPanelState;


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var mobx_1 = __webpack_require__(4);
var _ = __webpack_require__(17);
var createFocusGroup = __webpack_require__(801);
var AbstractTabComponentState = /** @class */ (function () {
    function AbstractTabComponentState(panelType) {
        var _this = this;
        this.panelType = panelType;
        this.panels = [];
        var focusGroupOptions = {
            wrap: true,
            forwardArrows: ['down', 'right'],
            backArrows: ['up', 'left'],
            stringSearch: true,
        };
        this.focusGroup = createFocusGroup(focusGroupOptions);
        mobx_1.reaction(function () { return _this.activeTab && _this.activeTab.enabled; }, function () {
            if (!_this.activeTab.enabled) {
                _this.strategy(_this);
            }
        });
    }
    Object.defineProperty(AbstractTabComponentState.prototype, "tabsByName", {
        get: function () {
            return _.fromPairs(this.panels.map(function (i) { return [i.tabName, i]; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractTabComponentState.prototype, "nextTab", {
        get: function () {
            return this.activeTab.next;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractTabComponentState.prototype, "previousTab", {
        get: function () {
            return this.activeTab.previous;
        },
        enumerable: true,
        configurable: true
    });
    AbstractTabComponentState.prototype.addTab = function (tab) {
        var _this = this;
        var newTab;
        mobx_1.runInAction(function () {
            newTab = _this.createChildState();
            newTab.id = _this.uniqueIdFunction('tab');
            newTab.tabName = tab.tabName;
            newTab.label = tab.label;
            if (_this.panels.length == 0) {
                _this.activeTab = newTab;
            }
            newTab.parent = _this;
            _this.panels.push(newTab);
        });
        return newTab;
    };
    AbstractTabComponentState.prototype.moveToTab = function (tab) {
        var tabState = null;
        if (tab instanceof AbstractTabPanelState) {
            tabState = tab;
        }
        else {
            tabState = _.find(this.panels, function (i) { return i.id == tab; });
        }
        this.focusTab(tabState.id);
    };
    AbstractTabComponentState.prototype.activateTab = function (tab) {
        var tabState = null;
        if (tab instanceof AbstractTabPanelState) {
            tabState = tab;
        }
        else {
            tabState = _.find(this.panels, function (i) { return i.id == tab; });
        }
        if (this.canChangeTo(tabState.id)) {
            this.activeTab = tabState;
        }
    };
    AbstractTabComponentState.prototype.moveToNextTab = function () {
        var self = this;
        if (this.nextTab) {
            self.focusTab(this.nextTab.id);
        }
    };
    AbstractTabComponentState.prototype.moveToPreviousTab = function () {
        var self = this;
        if (this.previousTab) {
            self.focusTab(this.previousTab.id);
        }
    };
    AbstractTabComponentState.prototype.canChangeTo = function (tabId) {
        var tab = _.find(this.panels, function (i) { return i.id == tabId; });
        return tab && tab.enabled;
    };
    AbstractTabComponentState.prototype.focusTab = function (id) {
        var _this = this;
        mobx_1.runInAction(function () {
            var tabMemberToFocus = _.find(_this.panels, function (panel) { return panel.id === id; });
            if (!tabMemberToFocus)
                return;
            _this.focusFunction(tabMemberToFocus);
        });
    };
    AbstractTabComponentState.prototype.getTabPanelId = function (id) {
        return id + '-panel';
    };
    AbstractTabComponentState.prototype.handleTabFocus = function (tabId) {
        this.activateTab(tabId);
    };
    AbstractTabComponentState.prototype.unregisterTabPanelElement = function (tabPanel) {
    };
    AbstractTabComponentState.prototype.unregisterTabElement = function (tab) {
        //throw new Error("Method not implemented.");
    };
    AbstractTabComponentState.prototype.registerTabPanelElement = function (tabPanel) {
    };
    AbstractTabComponentState.prototype.registerTabElement = function (tabMember) {
        var tabMemberToRegister = _.find(this.panels, function (panel) { return panel.id === tabMember.id; });
        var focusGroupMember = (tabMemberToRegister.letterNavigationText) ? {
            node: tabMember.node,
            text: tabMemberToRegister.letterNavigationText,
        } : tabMember.node;
        tabMemberToRegister.node = tabMember.node;
        this.focusGroup.addMember(focusGroupMember, tabMember);
    };
    AbstractTabComponentState.prototype.activate = function () {
        this.focusGroup.activate();
    };
    AbstractTabComponentState.prototype.destroy = function () {
        this.focusGroup.destroy();
    };
    AbstractTabComponentState.prototype.createChildState = function () {
        return new this.panelType();
    };
    /**
     * TESTING ONLY: The function used to focus on a particular tab. We override in Enzyme tests
     * @param {PanelStateType} panel
     */
    AbstractTabComponentState.prototype.focusFunction = function (panel) {
        panel.node.focus();
    };
    /**
     * TESTING ONLY: The function used for getting unique id. We override in tests to get consistent ids.
     * @param {string} prefix
     * @returns {string}
     */
    AbstractTabComponentState.prototype.uniqueIdFunction = function (prefix) {
        return _.uniqueId(prefix);
    };
    AbstractTabComponentState.prototype.strategy = function (state) {
        var testTab = state.activeTab ? state.activeTab.previous : null;
        while (testTab) {
            if (testTab.enabled) {
                state.activeTab = testTab;
                return;
            }
            testTab = testTab.previous;
        }
        state.activeTab = _.first(state.panels);
    };
    ;
    __decorate([
        mobx_1.observable
    ], AbstractTabComponentState.prototype, "focusGroup", void 0);
    __decorate([
        mobx_1.observable
    ], AbstractTabComponentState.prototype, "panels", void 0);
    __decorate([
        mobx_1.observable
    ], AbstractTabComponentState.prototype, "activeTab", void 0);
    __decorate([
        mobx_1.computed
    ], AbstractTabComponentState.prototype, "tabsByName", null);
    __decorate([
        mobx_1.computed
    ], AbstractTabComponentState.prototype, "nextTab", null);
    __decorate([
        mobx_1.computed
    ], AbstractTabComponentState.prototype, "previousTab", null);
    __decorate([
        mobx_1.action.bound
    ], AbstractTabComponentState.prototype, "activateTab", null);
    __decorate([
        mobx_1.action.bound
    ], AbstractTabComponentState.prototype, "moveToNextTab", null);
    __decorate([
        mobx_1.action.bound
    ], AbstractTabComponentState.prototype, "moveToPreviousTab", null);
    __decorate([
        mobx_1.action.bound
    ], AbstractTabComponentState.prototype, "canChangeTo", null);
    __decorate([
        mobx_1.action.bound
    ], AbstractTabComponentState.prototype, "handleTabFocus", null);
    __decorate([
        mobx_1.action.bound
    ], AbstractTabComponentState.prototype, "unregisterTabPanelElement", null);
    __decorate([
        mobx_1.action.bound
    ], AbstractTabComponentState.prototype, "unregisterTabElement", null);
    __decorate([
        mobx_1.action.bound
    ], AbstractTabComponentState.prototype, "registerTabPanelElement", null);
    __decorate([
        mobx_1.action.bound
    ], AbstractTabComponentState.prototype, "registerTabElement", null);
    __decorate([
        mobx_1.action.bound
    ], AbstractTabComponentState.prototype, "activate", null);
    __decorate([
        mobx_1.action.bound
    ], AbstractTabComponentState.prototype, "destroy", null);
    __decorate([
        mobx_1.action.bound
    ], AbstractTabComponentState.prototype, "createChildState", null);
    return AbstractTabComponentState;
}());
exports.AbstractTabComponentState = AbstractTabComponentState;
var AbstractTabPanelState = /** @class */ (function () {
    function AbstractTabPanelState() {
    }
    Object.defineProperty(AbstractTabPanelState.prototype, "active", {
        get: function () {
            return this.parent.activeTab === this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractTabPanelState.prototype, "previous", {
        get: function () {
            var _this = this;
            if (!this.parent || !this.parent.panels)
                return null;
            var index = _.findIndex(this.parent.panels, function (i) { return i == _this; });
            if (index === null) {
                // return null but we have a problem here
                return null;
            }
            if (index === 0) {
                // there is no previous one because we're first!
                return null;
            }
            return this.parent.panels[index - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractTabPanelState.prototype, "next", {
        get: function () {
            var _this = this;
            if (!this.parent || !this.parent.panels)
                return null;
            var index = _.findIndex(this.parent.panels, function (i) { return i == _this; });
            var panelLength = this.parent.panels.length;
            if (index === null) {
                // return null but we have a problem here
                return null;
            }
            if (index + 1 >= panelLength) {
                //we have no advanced
                return null;
            }
            return this.parent.panels[index + 1];
        },
        enumerable: true,
        configurable: true
    });
    AbstractTabPanelState.prototype.before = function (tab) {
        var testItem = this;
        while (testItem.next != tab) {
            if (!testItem.next)
                return false;
            testItem = testItem.next;
        }
        return true;
    };
    AbstractTabPanelState.prototype.after = function (tab) {
        var testItem = this;
        while (testItem.previous != tab) {
            if (!testItem.previous)
                return false;
            testItem = testItem.previous;
        }
        return true;
    };
    __decorate([
        mobx_1.observable
    ], AbstractTabPanelState.prototype, "parent", void 0);
    __decorate([
        mobx_1.observable
    ], AbstractTabPanelState.prototype, "id", void 0);
    __decorate([
        mobx_1.observable
    ], AbstractTabPanelState.prototype, "tabName", void 0);
    __decorate([
        mobx_1.observable
    ], AbstractTabPanelState.prototype, "label", void 0);
    __decorate([
        mobx_1.observable
    ], AbstractTabPanelState.prototype, "letterNavigationText", void 0);
    __decorate([
        mobx_1.observable
    ], AbstractTabPanelState.prototype, "node", void 0);
    __decorate([
        mobx_1.computed
    ], AbstractTabPanelState.prototype, "active", null);
    __decorate([
        mobx_1.computed
    ], AbstractTabPanelState.prototype, "previous", null);
    __decorate([
        mobx_1.computed
    ], AbstractTabPanelState.prototype, "next", null);
    return AbstractTabPanelState;
}());
exports.AbstractTabPanelState = AbstractTabPanelState;


/***/ }),

/***/ 801:
/***/ (function(module, exports) {

function FocusGroup(options) {
  options = options || {};
  var userKeybindings = options.keybindings || {};
  this._settings = {
    keybindings: {
      next: (userKeybindings.next) || { keyCode: 40 },
      prev: (userKeybindings.prev) || { keyCode: 38 },
      first: userKeybindings.first,
      last: userKeybindings.last,
    },
    wrap: options.wrap,
    stringSearch: options.stringSearch,
    stringSearchDelay: 800
  };

  // Construct a keybinding lookup that will be more useful later
  this._keybindingsLookup = [];
  var action;
  var eventMatchers
  for (action in this._settings.keybindings) {
    eventMatchers = this._settings.keybindings[action];
    if (!eventMatchers) continue;
    [].concat(eventMatchers).forEach(function(eventMatcher) {
      eventMatcher.metaKey = eventMatcher.metaKey || false;
      eventMatcher.ctrlKey = eventMatcher.ctrlKey || false;
      eventMatcher.altKey = eventMatcher.altKey || false;
      eventMatcher.shiftKey = eventMatcher.shiftKey || false;
      this._keybindingsLookup.push({
        action: action,
        eventMatcher: eventMatcher
      });
    }.bind(this));
  }

  this._searchString = '';
  this._members = [];
  if (options.members) this.setMembers(options.members);
  this._boundHandleKeydownEvent = this._handleKeydownEvent.bind(this);
}

FocusGroup.prototype.activate = function() {
  // Use capture in case other libraries might grab it first -- i.e. React
  document.addEventListener('keydown', this._boundHandleKeydownEvent, true);
  return this;
};

FocusGroup.prototype.deactivate = function() {
  document.removeEventListener('keydown', this._boundHandleKeydownEvent, true);
  this._clearSearchStringRefreshTimer();
  return this;
};

FocusGroup.prototype._handleKeydownEvent = function(event) {
  // Only respond to keyboard events when
  // focus is already within the focus-group
  var activeElementIndex = this._getActiveElementIndex();
  if (activeElementIndex === -1) return;

  // See if the event matches any registered keybinds
  var eventBound = false;
  this._keybindingsLookup.forEach(function(keybinding) {
    if (!matchesEvent(keybinding.eventMatcher, event)) return;
    eventBound = true;
    event.preventDefault();
    switch (keybinding.action) {
      case 'next':
        this.moveFocusForward();
        break;
      case 'prev':
        this.moveFocusBack();
        break;
      case 'first':
        this.moveFocusToFirst();
        break;
      case 'last':
        this.moveFocusToLast();
        break;
      default: return;
    }
  }.bind(this));

  if (!eventBound) {
    this._handleUnboundKey(event);
  }
};

FocusGroup.prototype.moveFocusForward = function() {
  var activeElementIndex = this._getActiveElementIndex();
  var targetIndex;
  if (activeElementIndex < this._members.length - 1) {
    targetIndex = activeElementIndex + 1;
  } else if (this._settings.wrap) {
    targetIndex = 0;
  } else {
    targetIndex = activeElementIndex;
  }
  this.focusNodeAtIndex(targetIndex);
  return targetIndex;
};

FocusGroup.prototype.moveFocusBack = function() {
  var activeElementIndex = this._getActiveElementIndex();
  var targetIndex;
  if (activeElementIndex > 0) {
    targetIndex = activeElementIndex - 1;
  } else if (this._settings.wrap) {
    targetIndex = this._members.length - 1;
  } else {
    targetIndex = activeElementIndex;
  }
  this.focusNodeAtIndex(targetIndex);
  return targetIndex;
};

FocusGroup.prototype.moveFocusToFirst = function() {
  this.focusNodeAtIndex(0);
};

FocusGroup.prototype.moveFocusToLast = function() {
  this.focusNodeAtIndex(this._members.length - 1);
};

FocusGroup.prototype._handleUnboundKey = function(event) {
  if (!this._settings.stringSearch) return;

  // While a string search is underway, ignore spaces
  // and prevent the default space-key behavior
  if (this._searchString !== '' && (event.key === ' ' || event.keyCode === 32)) {
    event.preventDefault();
    return -1;
  }

  // Only respond to letter keys
  if (!isLetterKeyCode(event.keyCode)) return -1;

  // If the letter key is part of a key combo,
  // let it do whatever it was going to do
  if (event.ctrlKey || event.metaKey || event.altKey) return -1;

  event.preventDefault();

  this._addToSearchString(String.fromCharCode(event.keyCode));
  this._runStringSearch();
};

FocusGroup.prototype._clearSearchString = function() {
  this._searchString = '';
};

FocusGroup.prototype._addToSearchString = function(letter) {
  // Always store the lowercase version of the letter
  this._searchString += letter.toLowerCase();
};

FocusGroup.prototype._startSearchStringRefreshTimer = function() {
  var self = this;
  this._clearSearchStringRefreshTimer();
  this._stringSearchTimer = setTimeout(function() {
    self._clearSearchString();
  }, this._settings.stringSearchDelay);
};

FocusGroup.prototype._clearSearchStringRefreshTimer = function() {
  clearTimeout(this._stringSearchTimer);
};

FocusGroup.prototype._runStringSearch = function() {
  this._startSearchStringRefreshTimer();
  this.moveFocusByString(this._searchString);
};

FocusGroup.prototype.moveFocusByString = function(str) {
  var member;
  for (var i = 0, l = this._members.length; i < l; i++) {
    member = this._members[i];
    if (!member.text) continue;

    if (member.text.indexOf(str) === 0) {
      return focusNode(member.node);
    }
  }
};

FocusGroup.prototype._findIndexOfNode = function(searchNode) {
  for (var i = 0, l = this._members.length; i < l; i++) {
    if (this._members[i].node === searchNode) {
      return i;
    }
  }
  return -1;
};

FocusGroup.prototype._getActiveElementIndex = function() {
  return this._findIndexOfNode(document.activeElement);
};

FocusGroup.prototype.focusNodeAtIndex = function(index) {
  var member = this._members[index];
  if (member) focusNode(member.node);
  return this;
};

FocusGroup.prototype.addMember = function(memberData, index) {
  var node = memberData.node || memberData;
  var nodeText = memberData.text || node.getAttribute('data-focus-group-text') || node.textContent || '';

  this._checkNode(node);

  var cleanedNodeText = nodeText.replace(/[\W_]/g, '').toLowerCase();
  var member = {
    node: node,
    text: cleanedNodeText,
  };

  if (index !== null && index !== undefined) {
    this._members.splice(index, 0, member);
  } else {
    this._members.push(member);
  }
  return this;
};

FocusGroup.prototype.removeMember = function(member) {
  var removalIndex = (typeof member === 'number')
    ? member
    : this._findIndexOfNode(member);
  if (removalIndex === -1) return;
  this._members.splice(removalIndex, 1);
  return this;
};

FocusGroup.prototype.clearMembers = function() {
  this._members = [];
  return this;
};

FocusGroup.prototype.setMembers = function(nextMembers) {
  this.clearMembers();
  for (var i = 0, l = nextMembers.length; i < l; i++) {
    this.addMember(nextMembers[i]);
  }
  return this;
};

FocusGroup.prototype.getMembers = function() {
  return this._members;
};

FocusGroup.prototype._checkNode = function(node) {
  if (!node.nodeType || node.nodeType !== window.Node.ELEMENT_NODE) {
    throw new Error('focus-group: only DOM nodes allowed');
  }
  return node;
};

function matchesEvent(matcher, event) {
  for (var key in matcher) {
    if (event[key] !== undefined && matcher[key] !== event[key]) return false;
  }
  return true;
}

function isLetterKeyCode(keyCode) {
  return keyCode >= 65 && keyCode <= 90;
}

function focusNode(node) {
  if (!node || !node.focus) return;
  node.focus();
  if (node.tagName.toLowerCase() === 'input') node.select();
}

module.exports = function createFocusGroup(options) {
  return new FocusGroup(options);
};


/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
var React = __webpack_require__(1);
var mobx_react_1 = __webpack_require__(3);
var react_intl_1 = __webpack_require__(16);
var mobx_1 = __webpack_require__(4);
var WizardPanel_1 = __webpack_require__(463);
var UserInfoForm_1 = __webpack_require__(465);
var UserInfoPanel = /** @class */ (function (_super) {
    __extends(UserInfoPanel, _super);
    function UserInfoPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UserInfoPanel.prototype, "wizardTab", {
        get: function () {
            return this.props.tab;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfoPanel.prototype, "form", {
        get: function () {
            return this.wizardTab.form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfoPanel.prototype, "submit", {
        get: function () {
            return this.form.onSubmit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfoPanel.prototype, "tabName", {
        get: function () {
            return this.wizardTab.tabName;
        },
        enumerable: true,
        configurable: true
    });
    UserInfoPanel.prototype.render = function () {
        return React.createElement(WizardPanel_1.WizardPanel, { tab: this.wizardTab, key: this.tabName },
            React.createElement(UserInfoForm_1.default, { form: this.form, buttonText: this.props.buttonText, buttonTextOnProgress: this.props.buttonTextOnProgress }));
    };
    __decorate([
        mobx_1.computed
    ], UserInfoPanel.prototype, "wizardTab", null);
    __decorate([
        mobx_1.computed
    ], UserInfoPanel.prototype, "form", null);
    __decorate([
        mobx_1.computed
    ], UserInfoPanel.prototype, "submit", null);
    __decorate([
        mobx_1.computed
    ], UserInfoPanel.prototype, "tabName", null);
    return UserInfoPanel;
}(React.Component));
exports.default = react_intl_1.injectIntl(mobx_react_1.observer(UserInfoPanel));


/***/ })

},[787]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkkxOG5cIiIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9jb21tb24vd2l6YXJkL1JBVC9zcGVjaWFsQXNzaWduLnRzIiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQudHN4Iiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL2NvbW1vbi93aXphcmQvV2l6YXJkUGFuZWwudHN4Iiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbl9wYWdlL05vbnByb2ZpdEluZm9Gb3JtLnRzeCIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9yZWdpc3RyYXRpb25fcGFnZS9Vc2VySW5mb0Zvcm0udHN4Iiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL2FwcC9yZWdpc3RyYXRpb25fcGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdHMvc3JjL2NvbXBvbmVudHMvcmVnaXN0cmF0aW9uX3BhZ2UvUmVnaXN0cmF0aW9uUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdHMvc3JjL2NvbXBvbmVudHMvcmVnaXN0cmF0aW9uX3BhZ2UvUmVnaXN0cmF0aW9uV2l6YXJkLnRzeCIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9yZWdpc3RyYXRpb25fcGFnZS9Ob25wcm9maXRJbmZvUGFuZWwudHN4Iiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL2NvbW1vbi93aXphcmQvUkFUL1RhYlBhbmVsLnRzIiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL2NvbW1vbi93aXphcmQvV2l6YXJkLnRzeCIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9jb21tb24vd2l6YXJkL1dpemFyZFRhYkxpc3QudHN4Iiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL2NvbW1vbi93aXphcmQvV2l6YXJkVGFiLnRzeCIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9jb21tb24vd2l6YXJkL1JBVC9UYWIudHMiLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdHMvc3JjL2NvbXBvbmVudHMvY29tbW9uL3dpemFyZC9SQVQvVGFiTGlzdC50cyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9jb21tb24vd2l6YXJkL1JBVC9XcmFwcGVyLnRzIiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL2NvbW1vbi93aXphcmQvd2l6YXJkX3N0YXRlLnRzIiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL2NvbW1vbi93aXphcmQvYWJzdHJhY3Rfd2l6YXJkX3N0YXRlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCIiLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdHMvc3JjL2NvbXBvbmVudHMvY29tbW9uL3dpemFyZC9SQVQvYWJzdHJhY3RfdGFiY29tcG9uZW50X3N0YXRlLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb2N1cy1ncm91cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9yZWdpc3RyYXRpb25fcGFnZS9Vc2VySW5mb1BhbmVsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVCOzs7Ozs7O0FDQUEsc0I7Ozs7Ozs7Ozs7QUNBQSxvR0FBb0c7QUFDcEcsdUJBQXNDLENBQUssRUFBRSxDQUFLLEVBQUUsUUFBWTtJQUM5RCxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtR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R0FBRztRQUN2QixDQUFDOzs7T0FBQTtJQUdELHNCQUFJLCtCQUFJO2FBQVI7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtRQUM1QixDQUFDOzs7T0FBQTtJQUdELHNCQUFJLGlDQUFNO2FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtRQUMzQixDQUFDOzs7T0FBQTtJQUdELHNCQUFJLGtDQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQsOEJBQU0sR0FBTjtRQUNFLE9BQU8sb0JBQUMseUJBQVcsSUFDQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFFeEQsb0JBQUMsc0JBQVksSUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxDQUU5RyxDQUFDO0lBQ2pCLENBQUM7SUExQkQ7UUFEQyxlQUFRO2tEQUdSO0lBR0Q7UUFEQyxlQUFROzZDQUdSO0lBR0Q7UUFEQyxlQUFROytDQUdSO0lBR0Q7UUFEQyxlQUFRO2dEQUdSO0lBWUgsb0JBQUM7Q0FBQSxDQWhDMkIsS0FBSyxDQUFDLFNBQVMsR0FnQzFDO0FBRUQsa0JBQWUsdUJBQVUsQ0FBQyxxQkFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDIiwiZmlsZSI6InJlZ2lzdHJhdGlvbl9wYWdleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyIsIm1vZHVsZS5leHBvcnRzID0gSTE4bjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkkxOG5cIlxuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyIsIi8vTUlUIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZHRoZWNsYXJrL3JlYWN0LWFyaWEtdGFicGFuZWwvYmxvYi9tYXN0ZXIvbGliL3NwZWNpYWxBc3NpZ24uanNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwZWNpYWxBc3NpZ24oYTphbnksIGI6YW55LCByZXNlcnZlZDphbnkpIHtcbiAgZm9yICh2YXIgeCBpbiBiKSB7XG4gICAgaWYgKCFiLmhhc093blByb3BlcnR5KHgpKSBjb250aW51ZTtcbiAgICBpZiAoYVt4XSkgY29udGludWU7XG4gICAgaWYgKHJlc2VydmVkW3hdKSBjb250aW51ZTtcbiAgICBhW3hdID0gYlt4XTtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL2NvbW1vbi93aXphcmQvUkFUL3NwZWNpYWxBc3NpZ24udHMiLCIvLyBMaWNlbnNlOiBMR1BMLTMuMC1vci1sYXRlclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtvYnNlcnZlcn0gZnJvbSBcIm1vYngtcmVhY3RcIjtcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHsgQ2xhc3NOYW1lYWJsZSB9IGZyb20gJy4vZmllbGRzJztcblxuZnVuY3Rpb24gYXJyYXlpZnk8VD4oaXRlbXM6IFRbXXxUKXtcbiAgcmV0dXJuIGl0ZW1zIGluc3RhbmNlb2YgQXJyYXkgPyBpdGVtcyA6IFtpdGVtc11cbn1cblxudHlwZSBDbGFzc05hbWVhYmxlQ2hpbGRyZW4gPSBSZWFjdC5SZWFjdEVsZW1lbnQ8Q2xhc3NOYW1lYWJsZT5bXXxSZWFjdC5SZWFjdEVsZW1lbnQ8Q2xhc3NOYW1lYWJsZT5cblxuZXhwb3J0IGNvbnN0IFR3b0NvbHVtbkZpZWxkczogUmVhY3QuU3RhdGVsZXNzQ29tcG9uZW50PHtjaGlsZHJlbjpDbGFzc05hbWVhYmxlQ2hpbGRyZW59PiA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gYXJyYXlpZnkocHJvcHMuY2hpbGRyZW4pXG4gICAgcmV0dXJuIDxSb3c+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLm1hcCgoaTpSZWFjdC5SZWFjdEVsZW1lbnQ8Q2xhc3NOYW1lYWJsZT4pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCJcIlxuICAgICAgICAgICAgICAgIGlmIChfLmxhc3QoY2hpbGRyZW4pICE9PSBpKXtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9IFwiIHUtcGFkZGluZ1JpZ2h0LS0xMFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpLnByb3BzLmNsYXNzTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSBpLnByb3BzLmNsYXNzTmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gPENvbHVtbiBjb2xTcGFuPXs2fSBicmVha1NpemU9eydzbSd9PlxuICAgICAgICAgICAgICAgICB7UmVhY3QuY2xvbmVFbGVtZW50KGksIHtjbGFzc05hbWU6IGNsYXNzTmFtZX0pfVxuICAgICAgICAgICAgICAgIDwvQ29sdW1uPlxuICAgICAgICB9KX1cbiAgICA8L1Jvdz5cbn1cblxuVHdvQ29sdW1uRmllbGRzLmRpc3BsYXlOYW1lID0gJ1R3b0NvbHVtbkZpZWxkcydcblxuZXhwb3J0IGNvbnN0IFRocmVlQ29sdW1uRmllbGRzOiBSZWFjdC5TdGF0ZWxlc3NDb21wb25lbnQ8e2NoaWxkcmVuOkNsYXNzTmFtZWFibGVDaGlsZHJlbn0+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IGNoaWxkcmVuID0gYXJyYXlpZnkocHJvcHMuY2hpbGRyZW4pXG4gICAgcmV0dXJuIDxSb3c+XG4gICAgICAgIHtcbiAgICAgICAgICBjaGlsZHJlbi5tYXAoKGk6UmVhY3QuUmVhY3RFbGVtZW50PENsYXNzTmFtZWFibGU+KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwiXCJcbiAgICAgICAgICAgICAgICBpZiAoXy5sYXN0KGNoaWxkcmVuKSAhPT0gaSl7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSBcIiB1LXBhZGRpbmdSaWdodC0tMTBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaS5wcm9wcy5jbGFzc05hbWUpe1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gaS5wcm9wcy5jbGFzc05hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxDb2x1bW4gY29sU3Bhbj17NH0gYnJlYWtTaXplPXsnc20nfT5cbiAgICAgICAgICAgICAgICAgICAge1JlYWN0LmNsb25lRWxlbWVudChpLCB7Y2xhc3NOYW1lOiBjbGFzc05hbWV9KX1cbiAgICAgICAgICAgICAgICA8L0NvbHVtbj5cbiAgICAgICAgICAgIH0pfVxuICAgIDwvUm93PlxufVxuXG5UaHJlZUNvbHVtbkZpZWxkcy5kaXNwbGF5TmFtZSA9ICdUaHJlZUNvbHVtbkZpZWxkcydcblxuXG5leHBvcnQgY29uc3QgUm93OiBSZWFjdC5TdGF0ZWxlc3NDb21wb25lbnQ8e30+ID0gKHByb3BzOntjaGlsZHJlbjpSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PltdfFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+fSkgPT4ge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgPC9kaXY+XG59XG5cblJvdy5kaXNwbGF5TmFtZSA9ICdSb3cnXG5cbnR5cGUgQ29sdW1uQnJlYWtTaXplID0gJ3hzJ3wgJ3NtJ3wnbWQnfCdsZydcbnR5cGUgQ29sdW1uU3BhbiA9IDF8MnwzfDR8NXw2fDd8OHw5fDEwfDExfDEyXG5cbmludGVyZmFjZSBDb2x1bW5Qcm9wcyB7XG4gICAgY2hpbGRyZW46UmVhY3QuUmVhY3RFbGVtZW50PGFueT5cbiAgICBjb2xTcGFuOkNvbHVtblNwYW4sXG4gICAgYnJlYWtTaXplOkNvbHVtbkJyZWFrU2l6ZVxufVxuXG5leHBvcnQgY29uc3QgQ29sdW1uOiBSZWFjdC5TdGF0ZWxlc3NDb21wb25lbnQ8Q29sdW1uUHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gICAgbGV0IGNsYXNzTmFtZSA9IGBjb2wtJHtwcm9wcy5icmVha1NpemV9LSR7cHJvcHMuY29sU3Bhbn0gYFxuICAgIHByb3BzLmNoaWxkcmVuLnByb3BzXG4gICAgaWYgKHByb3BzLmNoaWxkcmVuLnByb3BzLmNsYXNzTmFtZSl7XG4gICAgICAgIGNsYXNzTmFtZSArPSBwcm9wcy5jaGlsZHJlbi5wcm9wc1snY2xhc3NOYW1lJ11cbiAgICB9XG5cbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHByb3BzLmNoaWxkcmVuLCB7Y2xhc3NOYW1lOiBjbGFzc05hbWV9KVxufVxuXG5Db2x1bW4uZGlzcGxheU5hbWUgPSAnQ29sdW1uJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vamF2YXNjcmlwdHMvc3JjL2NvbXBvbmVudHMvY29tbW9uL2xheW91dC50c3giLCIvLyBMaWNlbnNlOiBMR1BMLTMuMC1vci1sYXRlclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgb2JzZXJ2ZXIgfSBmcm9tICdtb2J4LXJlYWN0J1xuaW1wb3J0IHsgV2l6YXJkVGFiUGFuZWxTdGF0ZX0gZnJvbSAnLi93aXphcmRfc3RhdGUnO1xuaW1wb3J0IHtjb21wdXRlZH0gZnJvbSAnbW9ieCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gXCIuL1JBVC9UYWJQYW5lbFwiO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgV2l6YXJkVGFiUGFuZWxQcm9wcyB7XG4gIHRhYjogV2l6YXJkVGFiUGFuZWxTdGF0ZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdpemFyZFBhbmVsUHJvcHMgZXh0ZW5kcyBXaXphcmRUYWJQYW5lbFByb3BzIHtcbiAgICBbcHJvcHM6c3RyaW5nXTphbnlcbn1cblxuQG9ic2VydmVyXG5leHBvcnQgY2xhc3MgV2l6YXJkUGFuZWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8V2l6YXJkUGFuZWxQcm9wcywge30+IHtcbiAgICBAY29tcHV0ZWRcbiAgICBnZXQgdGFiKCk6V2l6YXJkVGFiUGFuZWxTdGF0ZXtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGFiXG4gICAgfVxuICAgIEBjb21wdXRlZFxuICAgIGdldCBpc0FjdGl2ZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy50YWIuYWN0aXZlXG4gICAgfVxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgcHJvcHMgPSBfLm9taXQodGhpcy5wcm9wcywgWyd0YWInXSlcbiAgICAgICAgcmV0dXJuIDxUYWJQYW5lbCB7Li4ucHJvcHN9IHRhYklkPXt0aGlzLnRhYi5pZH0gYWN0aXZlPXt0aGlzLmlzQWN0aXZlfVxuICAgICAgICAgY2xhc3NOYW1lPVwid2l6YXJkLXN0ZXBcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9UYWJQYW5lbD5cbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL2NvbW1vbi93aXphcmQvV2l6YXJkUGFuZWwudHN4IiwiLy8gTGljZW5zZTogTEdQTC0zLjAtb3ItbGF0ZXJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG9ic2VydmVyIH0gZnJvbSAnbW9ieC1yZWFjdCc7XG5pbXBvcnQge0luamVjdGVkSW50bFByb3BzLCBpbmplY3RJbnRsfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7RmllbGQsIEZpZWxkRGVmaW5pdGlvbn0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzL21vYngtcmVhY3QtZm9ybVwiO1xuaW1wb3J0IHtCYXNpY0ZpZWxkfSBmcm9tIFwiLi4vY29tbW9uL2ZpZWxkc1wiO1xuaW1wb3J0IHtUaHJlZUNvbHVtbkZpZWxkcywgVHdvQ29sdW1uRmllbGRzfSBmcm9tIFwiLi4vY29tbW9uL2xheW91dFwiO1xuaW1wb3J0IHtWYWxpZGF0aW9uc30gZnJvbSBcIi4uLy4uL2xpYi92amZfcnVsZXNcIjtcbmltcG9ydCBQcm9ncmVzc2FibGVCdXR0b24gZnJvbSBcIi4uL2NvbW1vbi9Qcm9ncmVzc2FibGVCdXR0b25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBOb25wcm9maXRJbmZvRm9ybVByb3BzXG57XG4gIGZvcm06RmllbGRcbiAgYnV0dG9uVGV4dDpzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IEZpZWxkRGVmaW5pdGlvbnMgOiBBcnJheTxGaWVsZERlZmluaXRpb24+ID0gW1xuICB7XG4gICAgbmFtZTogJ29yZ2FuaXphdGlvbl9uYW1lJyxcbiAgICB2YWxpZGF0b3JzOiBbVmFsaWRhdGlvbnMuaXNGaWxsZWRdXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnd2Vic2l0ZScsXG4gICAgdmFsaWRhdG9yczogW1ZhbGlkYXRpb25zLm9wdGlvbmFsKFZhbGlkYXRpb25zLmlzVXJsKV1cbiAgfSxcbiAge1xuICAgIG5hbWU6ICdvcmdfZW1haWwnLFxuICAgIHZhbGlkYXRvcnM6IFtWYWxpZGF0aW9ucy5vcHRpb25hbChWYWxpZGF0aW9ucy5pc0VtYWlsKV1cbiAgfSxcbiAge1xuICAgIG5hbWU6ICdvcmdfcGhvbmUnLFxuICAgIHR5cGU6IFwidGVsXCJcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdjaXR5JyxcbiAgICB2YWxpZGF0b3JzOiBbVmFsaWRhdGlvbnMuaXNGaWxsZWRdXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnc3RhdGUnLFxuICAgIHZhbGlkYXRvcnM6IFtWYWxpZGF0aW9ucy5pc0ZpbGxlZF1cblxuICB9LFxuICB7XG4gICAgbmFtZTogJ3ppcCcsXG4gICAgdmFsaWRhdG9yczogW1ZhbGlkYXRpb25zLmlzRmlsbGVkXVxuICB9XG5dXG5cbmNsYXNzIE5vbnByb2ZpdEluZm9Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PE5vbnByb2ZpdEluZm9Gb3JtUHJvcHMgJiBJbmplY3RlZEludGxQcm9wcywge30+IHtcblxuXG4gIHJlbmRlcigpIHtcbiAgICAgcmV0dXJuIDxmaWVsZHNldCA+XG5cbiAgICAgICA8QmFzaWNGaWVsZCBmaWVsZD17dGhpcy5wcm9wcy5mb3JtLiQoXCJvcmdhbml6YXRpb25fbmFtZVwiKX1cbiAgICAgICAgICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2Uoe2lkOidyZWdpc3RyYXRpb24ud2l6YXJkLm5vbnByb2ZpdC5uYW1lLmxhYmVsJyB9KX1cbiAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2Uoe2lkOiAncmVnaXN0cmF0aW9uLndpemFyZC5ub25wcm9maXQubmFtZS5wbGFjZWhvbGRlcid9KX1cbiAgICAgICAgICAgICAgICAgICBpbnB1dENsYXNzTmFtZXM9e1wiaW5wdXQtbGdcIn1cbiAgICAgICAvPlxuXG4gICAgICAgPEJhc2ljRmllbGQgZmllbGQ9e3RoaXMucHJvcHMuZm9ybS4kKCd3ZWJzaXRlJyl9XG4gICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHtpZDogJ3JlZ2lzdHJhdGlvbi53aXphcmQubm9ucHJvZml0LndlYnNpdGUubGFiZWwnfSl9XG4gICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHtpZDogJ3JlZ2lzdHJhdGlvbi53aXphcmQubm9ucHJvZml0LndlYnNpdGUucGxhY2Vob2xkZXInfSl9XG4gICAgICAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWVzPXtcImlucHV0LWxnXCJ9Lz5cblxuICAgICAgIDxUd29Db2x1bW5GaWVsZHM+XG4gICAgICAgICA8QmFzaWNGaWVsZCBmaWVsZD17dGhpcy5wcm9wcy5mb3JtLiQoJ29yZ19lbWFpbCcpfVxuICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHtpZDogJ3JlZ2lzdHJhdGlvbi53aXphcmQubm9ucHJvZml0LmVtYWlsLmxhYmVsJ30pfVxuICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHtpZDogJ3JlZ2lzdHJhdGlvbi53aXphcmQubm9ucHJvZml0LmVtYWlsLnBsYWNlaG9sZGVyJ30pfVxuICAgICAgICAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWVzPXtcImlucHV0LWxnXCJ9Lz5cbiAgICAgICAgIDxCYXNpY0ZpZWxkIGZpZWxkPXt0aGlzLnByb3BzLmZvcm0uJCgnb3JnX3Bob25lJyl9XG4gICAgICAgICAgICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2Uoe2lkOiAncmVnaXN0cmF0aW9uLndpemFyZC5ub25wcm9maXQucGhvbmUubGFiZWwnfSl9XG4gICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2Uoe2lkOiAncmVnaXN0cmF0aW9uLndpemFyZC5ub25wcm9maXQucGhvbmUucGxhY2Vob2xkZXInfSl9XG4gICAgICAgICAgICAgICAgICAgICBpbnB1dENsYXNzTmFtZXM9e1wiaW5wdXQtbGdcIn0vPlxuICAgICAgIDwvVHdvQ29sdW1uRmllbGRzPlxuXG4gICAgICAgPFRocmVlQ29sdW1uRmllbGRzPlxuICAgICAgICAgPEJhc2ljRmllbGQgZmllbGQ9e3RoaXMucHJvcHMuZm9ybS4kKCdjaXR5Jyl9XG4gICAgICAgICAgICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2Uoe2lkOiAncmVnaXN0cmF0aW9uLndpemFyZC5ub25wcm9maXQuY2l0eS5sYWJlbCd9KX1cbiAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7aWQ6ICdyZWdpc3RyYXRpb24ud2l6YXJkLm5vbnByb2ZpdC5jaXR5LnBsYWNlaG9sZGVyJ30pfVxuICAgICAgICAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWVzPXtcImlucHV0LWxnXCJ9Lz5cbiAgICAgICAgIDxCYXNpY0ZpZWxkIGZpZWxkPXt0aGlzLnByb3BzLmZvcm0uJCgnc3RhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7aWQ6ICdyZWdpc3RyYXRpb24ud2l6YXJkLm5vbnByb2ZpdC5zdGF0ZS5sYWJlbCd9KX1cbiAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7aWQ6ICdyZWdpc3RyYXRpb24ud2l6YXJkLm5vbnByb2ZpdC5zdGF0ZS5wbGFjZWhvbGRlcid9KX1cbiAgICAgICAgICAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lcz17XCJpbnB1dC1sZ1wifS8+XG4gICAgICAgICA8QmFzaWNGaWVsZCBmaWVsZD17dGhpcy5wcm9wcy5mb3JtLiQoJ3ppcCcpfVxuICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHtpZDogJ3JlZ2lzdHJhdGlvbi53aXphcmQubm9ucHJvZml0LnppcC5sYWJlbCcgfSl9XG4gICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2Uoe2lkOiAncmVnaXN0cmF0aW9uLndpemFyZC5ub25wcm9maXQuemlwLnBsYWNlaG9sZGVyJ30pfVxuICAgICAgICAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWVzPXtcImlucHV0LWxnXCJ9Lz5cbiAgICAgICA8L1RocmVlQ29sdW1uRmllbGRzPlxuXG4gICAgICAgPFByb2dyZXNzYWJsZUJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLmZvcm0ub25TdWJtaXR9IGNsYXNzTmFtZT1cImJ1dHRvblwiIGRpc2FibGVkPXshdGhpcy5wcm9wcy5mb3JtLmlzVmFsaWR9IGJ1dHRvblRleHQ9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHtpZDogdGhpcy5wcm9wcy5idXR0b25UZXh0fSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpblByb2dyZXNzPXt0aGlzLnByb3BzLmZvcm0uc3VibWl0dGluZyB8fCB0aGlzLnByb3BzLmZvcm0uY29udGFpbmVyKCkuc3VibWl0dGluZ30gZGlzYWJsZU9uUHJvZ3Jlc3M9e3RydWV9Lz5cbiAgICAgPC9maWVsZHNldD5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBpbmplY3RJbnRsKG9ic2VydmVyKE5vbnByb2ZpdEluZm9Gb3JtKSlcblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbl9wYWdlL05vbnByb2ZpdEluZm9Gb3JtLnRzeCIsIi8vIExpY2Vuc2U6IExHUEwtMy4wLW9yLWxhdGVyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBvYnNlcnZlciB9IGZyb20gJ21vYngtcmVhY3QnO1xuaW1wb3J0IHtJbmplY3RlZEludGxQcm9wcywgaW5qZWN0SW50bH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQge1ZhbGlkYXRpb25zfSBmcm9tIFwiLi4vLi4vbGliL3ZqZl9ydWxlc1wiO1xuaW1wb3J0IHtGaWVsZCwgRmllbGREZWZpbml0aW9ufSBmcm9tIFwibW9ieC1yZWFjdC1mb3JtXCI7XG5pbXBvcnQge1R3b0NvbHVtbkZpZWxkc30gZnJvbSBcIi4uL2NvbW1vbi9sYXlvdXRcIjtcbmltcG9ydCB7QmFzaWNGaWVsZH0gZnJvbSBcIi4uL2NvbW1vbi9maWVsZHNcIjtcbmltcG9ydCBQcm9ncmVzc2FibGVCdXR0b24gZnJvbSBcIi4uL2NvbW1vbi9Qcm9ncmVzc2FibGVCdXR0b25cIjtcbmltcG9ydCB7YXJlV2VPckFueVBhcmVudFN1Ym1pdHRpbmd9IGZyb20gXCIuLi8uLi9saWIvaG91ZGluaV9mb3JtXCI7XG5cbmV4cG9ydCBjb25zdCBGaWVsZERlZmluaXRpb25zIDogQXJyYXk8RmllbGREZWZpbml0aW9uPiA9IFtcbiAge1xuICAgIG5hbWU6ICduYW1lJyxcbiAgICB2YWxpZGF0b3JzOiBbVmFsaWRhdGlvbnMuaXNGaWxsZWRdXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnZW1haWwnLFxuICAgIHZhbGlkYXRvcnM6IFtWYWxpZGF0aW9ucy5pc0VtYWlsXVxuICB9LFxuICB7XG4gICAgbmFtZTogJ3Bhc3N3b3JkJyxcbiAgICB0eXBlOiAncGFzc3dvcmQnLFxuICAgIHZhbGlkYXRvcnM6IFtWYWxpZGF0aW9ucy5pc0ZpbGxlZF0sXG4gICAgcmVsYXRlZDogWyd1c2VyVGFiLnBhc3N3b3JkX2NvbmZpcm1hdGlvbiddXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAncGFzc3dvcmRfY29uZmlybWF0aW9uJyxcbiAgICB0eXBlOiAncGFzc3dvcmQnLFxuICAgIHZhbGlkYXRvcnM6IFtWYWxpZGF0aW9ucy5zaG91bGRCZUVxdWFsVG8oXCJ1c2VyVGFiLnBhc3N3b3JkXCIpXVxuICB9XG5dXG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckluZm9Gb3JtUHJvcHNcbntcbiAgZm9ybTogRmllbGRcbiAgYnV0dG9uVGV4dDpzdHJpbmdcbiAgYnV0dG9uVGV4dE9uUHJvZ3Jlc3M/OnN0cmluZ1xufVxuXG5cblxuY2xhc3MgVXNlckluZm9Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFVzZXJJbmZvRm9ybVByb3BzICYgSW5qZWN0ZWRJbnRsUHJvcHMsIHt9PiB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPGZpZWxkc2V0PlxuICAgICAgPFR3b0NvbHVtbkZpZWxkcz5cbiAgICAgICAgPEJhc2ljRmllbGQgZmllbGQ9e3RoaXMucHJvcHMuZm9ybS4kKFwibmFtZVwiKX1cbiAgICAgICAgICAgIGxhYmVsPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2Uoe2lkOiBcInJlZ2lzdHJhdGlvbi53aXphcmQuY29udGFjdC5uYW1lLmxhYmVsXCJ9KX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7aWQ6IFwicmVnaXN0cmF0aW9uLndpemFyZC5jb250YWN0Lm5hbWUucGxhY2Vob2xkZXJcIn0pfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dENsYXNzTmFtZXM9e1wiaW5wdXQtbGdcIn0vPlxuICAgICAgICA8QmFzaWNGaWVsZCBmaWVsZD17dGhpcy5wcm9wcy5mb3JtLiQoJ2VtYWlsJyl9XG4gICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHtpZDogXCJyZWdpc3RyYXRpb24ud2l6YXJkLmNvbnRhY3QuZW1haWwubGFiZWxcIn0pfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7aWQ6IFwicmVnaXN0cmF0aW9uLndpemFyZC5jb250YWN0LmVtYWlsLnBsYWNlaG9sZGVyXCJ9KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWVzPXtcImlucHV0LWxnXCJ9XG4gICAgICAgIC8+XG4gICAgICA8L1R3b0NvbHVtbkZpZWxkcz5cblxuICAgICAgPEJhc2ljRmllbGQgZmllbGQ9e3RoaXMucHJvcHMuZm9ybS4kKCdwYXNzd29yZCcpfVxuICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHtpZDoncmVnaXN0cmF0aW9uLndpemFyZC5jb250YWN0LnBhc3N3b3JkLmxhYmVsJ30pfVxuICAgICAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWVzPXtcImlucHV0LWxnXCJ9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgPEJhc2ljRmllbGQgZmllbGQ9e3RoaXMucHJvcHMuZm9ybS4kKCdwYXNzd29yZF9jb25maXJtYXRpb24nKX1cbiAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7aWQ6J3JlZ2lzdHJhdGlvbi53aXphcmQuY29udGFjdC5wYXNzd29yZF9jb25maXJtYXRpb24ubGFiZWwnfSl9XG4gICAgICAgICAgICAgICAgICBpbnB1dENsYXNzTmFtZXM9e1wiaW5wdXQtbGdcIn1cbiAgICAgIC8+XG5cblxuICAgICAgPFByb2dyZXNzYWJsZUJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLmZvcm0ub25TdWJtaXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshdGhpcy5wcm9wcy5mb3JtLmlzVmFsaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvblRleHQ9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHtpZDogdGhpcy5wcm9wcy5idXR0b25UZXh0fSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluUHJvZ3Jlc3M9e2FyZVdlT3JBbnlQYXJlbnRTdWJtaXR0aW5nKHRoaXMucHJvcHMuZm9ybSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvblRleHRPblByb2dyZXNzPXt0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7aWQ6IHRoaXMucHJvcHMuYnV0dG9uVGV4dE9uUHJvZ3Jlc3N9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZU9uUHJvZ3Jlc3M9e3RydWV9Lz5cbiAgICA8L2ZpZWxkc2V0PjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBpbmplY3RJbnRsKG9ic2VydmVyKFVzZXJJbmZvRm9ybSkpXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9yZWdpc3RyYXRpb25fcGFnZS9Vc2VySW5mb0Zvcm0udHN4IiwiLy8gTGljZW5zZTogTEdQTC0zLjAtb3ItbGF0ZXJcblxuLy8gcmVxdWlyZSBhIHJvb3QgY29tcG9uZW50IGhlcmUuIFRoaXMgd2lsbCBiZSB0cmVhdGVkIGFzIHRoZSByb290IG9mIGEgd2VicGFjayBwYWNrYWdlXG5pbXBvcnQgUm9vdCBmcm9tIFwiLi4vc3JjL2NvbXBvbmVudHMvY29tbW9uL1Jvb3RcIjtcbmltcG9ydCBSZWdpc3RyYXRpb25QYWdlIGZyb20gXCIuLi9zcmMvY29tcG9uZW50cy9yZWdpc3RyYXRpb25fcGFnZS9SZWdpc3RyYXRpb25QYWdlXCI7XG5cbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5mdW5jdGlvbiBMb2FkUmVhY3RQYWdlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gIFJlYWN0RE9NLnJlbmRlcihcbiAgICA8Um9vdD5cbiAgICAgIDxSZWdpc3RyYXRpb25QYWdlIC8+XG4gICAgPC9Sb290PixcbiAgICBlbGVtZW50XG4gICk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5Mb2FkUmVhY3RQYWdlID0gTG9hZFJlYWN0UGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2phdmFzY3JpcHRzL2FwcC9yZWdpc3RyYXRpb25fcGFnZS50c3giLCIvLyBMaWNlbnNlOiBMR1BMLTMuMC1vci1sYXRlclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlZ2lzdHJhdGlvbldpemFyZCBmcm9tIFwiLi9SZWdpc3RyYXRpb25XaXphcmRcIjtcblxuaW1wb3J0IHtvYnNlcnZlcn0gZnJvbSAnbW9ieC1yZWFjdCc7XG5pbXBvcnQge0luamVjdGVkSW50bFByb3BzLCBpbmplY3RJbnRsLCBJbmplY3RlZEludGwsIEZvcm1hdHRlZE1lc3NhZ2V9IGZyb20gJ3JlYWN0LWludGwnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVnaXN0cmF0aW9uUGFnZVByb3BzXG57XG5cbn1cblxuY2xhc3MgUmVnaXN0cmF0aW9uUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSZWdpc3RyYXRpb25QYWdlUHJvcHMgJiBJbmplY3RlZEludGxQcm9wcywge30+IHtcblxuXG5cbiAgcmVuZGVyKCkge1xuICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidHctYnNcIj48ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPjxoMT48Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInJlZ2lzdHJhdGlvbi5nZXRfc3RhcnRlZC5oZWFkZXJcIi8+PC9oMT48cD48Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInJlZ2lzdHJhdGlvbi5nZXRfc3RhcnRlZC5kZXNjcmlwdGlvblwiLz48L3A+PFJlZ2lzdHJhdGlvbldpemFyZC8+PC9kaXY+PC9kaXY+XG5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBpbmplY3RJbnRsKG9ic2VydmVyKFJlZ2lzdHJhdGlvblBhZ2UpKVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9yZWdpc3RyYXRpb25fcGFnZS9SZWdpc3RyYXRpb25QYWdlLnRzeCIsIi8vIExpY2Vuc2U6IExHUEwtMy4wLW9yLWxhdGVyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7b2JzZXJ2ZXIsIGluamVjdH0gZnJvbSAnbW9ieC1yZWFjdCdcbmltcG9ydCBOb25wcm9maXRJbmZvUGFuZWwgZnJvbSAnLi9Ob25wcm9maXRJbmZvUGFuZWwnXG5pbXBvcnQge2FjdGlvbiwgIG9ic2VydmFibGUsIGNvbXB1dGVkLCBydW5JbkFjdGlvbn0gZnJvbSAnbW9ieCc7XG5pbXBvcnQge1dpemFyZH0gZnJvbSAnLi4vY29tbW9uL3dpemFyZC9XaXphcmQnXG5cbmltcG9ydCB7Rm9ybX0gZnJvbSAnbW9ieC1yZWFjdC1mb3JtJztcbmltcG9ydCB7Rm9ybWF0dGVkTWVzc2FnZSwgaW5qZWN0SW50bCwgSW5qZWN0ZWRJbnRsUHJvcHN9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHtXaXphcmRTdGF0ZSwgV2l6YXJkVGFiUGFuZWxTdGF0ZX0gZnJvbSBcIi4uL2NvbW1vbi93aXphcmQvd2l6YXJkX3N0YXRlXCI7XG5pbXBvcnQgVXNlckluZm9QYW5lbCwgKiBhcyBVc2VySW5mbyBmcm9tIFwiLi9Vc2VySW5mb1BhbmVsXCI7XG5pbXBvcnQge1xuICBOb25wcm9maXQsXG4gIE5vbnByb2ZpdEFwaSxcbiAgUG9zdE5vbnByb2ZpdCxcbiAgVmFsaWRhdGlvbkVycm9yc0V4Y2VwdGlvblxufSBmcm9tIFwiLi4vLi4vLi4vYXBpXCI7XG5cbmltcG9ydCB7aW5pdGlhbGl6YXRpb25EZWZpbml0aW9ufSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXMvbW9ieC1yZWFjdC1mb3JtXCI7XG5pbXBvcnQge0FwaU1hbmFnZXJ9IGZyb20gXCIuLi8uLi9saWIvYXBpX21hbmFnZXJcIjtcbmltcG9ydCB7SG91ZGluaUZvcm0sIFN0YXRpY0Zvcm1Ub0Vycm9yQW5kQmFja0NvbnZlcnRlcn0gZnJvbSBcIi4uLy4uL2xpYi9ob3VkaW5pX2Zvcm1cIjtcbmltcG9ydCB7V2ViVXNlclNpZ25Jbk91dH0gZnJvbSBcIi4uLy4uL2xpYi9hcGkvc2lnbl9pblwiO1xuaW1wb3J0ICogYXMgTm9ucHJvZml0SW5mb0Zvcm0gZnJvbSBcIi4vTm9ucHJvZml0SW5mb0Zvcm1cIjtcbmltcG9ydCAqIGFzIFVzZXJJbmZvRm9ybSBmcm9tIFwiLi9Vc2VySW5mb0Zvcm1cIjtcblxuZXhwb3J0IGludGVyZmFjZSBSZWdpc3RyYXRpb25XaXphcmRQcm9wcyB7XG4gIEFwaU1hbmFnZXI/OiBBcGlNYW5hZ2VyXG59XG5jb25zdCBzZXRUb3VyQ29va2llcyA9IChub25wcm9maXQ6Tm9ucHJvZml0KSA9PiB7XG4gIGRvY3VtZW50LmNvb2tpZSA9IGB0b3VyX2Rhc2hib2FyZD0ke25vbnByb2ZpdC5pZH07cGF0aD0vYFxuICBkb2N1bWVudC5jb29raWUgPSBgdG91cl9jYW1wYWlnbj0ke25vbnByb2ZpdC5pZH07cGF0aD0vYFxuICBkb2N1bWVudC5jb29raWUgPSBgdG91cl9ldmVudD0ke25vbnByb2ZpdC5pZH07cGF0aD0vYFxuICBkb2N1bWVudC5jb29raWUgPSBgdG91cl9wcm9maWxlPSR7bm9ucHJvZml0LmlkfTtwYXRoPS9gXG4gIGRvY3VtZW50LmNvb2tpZSA9IGB0b3VyX3RyYW5zYWN0aW9ucz0ke25vbnByb2ZpdC5pZH07cGF0aD0vYFxuICBkb2N1bWVudC5jb29raWUgPSBgdG91cl9zdXBwb3J0ZXJzPSR7bm9ucHJvZml0LmlkfTtwYXRoPS9gXG4gIGRvY3VtZW50LmNvb2tpZSA9IGB0b3VyX3N1YnNjcmliZXJzPSR7bm9ucHJvZml0LmlkfTtwYXRoPS9gXG59XG5cbmV4cG9ydCBjbGFzcyBSZWdpc3RyYXRpb25QYWdlRm9ybSBleHRlbmRzIEhvdWRpbmlGb3JtIHtcbiAgY29udmVydGVyOiBTdGF0aWNGb3JtVG9FcnJvckFuZEJhY2tDb252ZXJ0ZXI8UG9zdE5vbnByb2ZpdD5cblxuICBjb25zdHJ1Y3RvcihkZWZpbml0aW9uOiBpbml0aWFsaXphdGlvbkRlZmluaXRpb24sIG9wdGlvbnM/OiBhbnkpIHtcbiAgICBzdXBlcihkZWZpbml0aW9uLCBvcHRpb25zKVxuICAgIHRoaXMuY29udmVydGVyID0gbmV3IFN0YXRpY0Zvcm1Ub0Vycm9yQW5kQmFja0NvbnZlcnRlcjxQb3N0Tm9ucHJvZml0Pih0aGlzLmlucHV0VG9Gb3JtKVxuICB9XG5cbiAgbm9ucHJvZml0QXBpOiBOb25wcm9maXRBcGlcbiAgc2lnbmluQXBpOiBXZWJVc2VyU2lnbkluT3V0XG5cbiAgb3B0aW9ucygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsaWRhdGVPbkluaXQ6IHRydWUsXG4gICAgICB2YWxpZGF0ZU9uQ2hhbmdlOiB0cnVlLFxuICAgICAgcmV0cmlldmVPbmx5RGlydHlWYWx1ZXM6IHRydWUsXG4gICAgICByZXRyaWV2ZU9ubHlFbmFibGVkRmllbGRzOiB0cnVlXG4gICAgfVxuICB9XG5cbiAgaW5wdXRUb0Zvcm0gPSB7XG4gICAgJ25vbnByb2ZpdFtuYW1lXSc6ICdub25wcm9maXRUYWIub3JnYW5pemF0aW9uX25hbWUnLFxuICAgICdub25wcm9maXRbd2Vic2l0ZV0nOiAnbm9ucHJvZml0VGFiLndlYnNpdGUnLFxuICAgICdub25wcm9maXRbZW1haWxdJzogJ25vbnByb2ZpdFRhYi5vcmdfZW1haWwnLFxuICAgICdub25wcm9maXRbcGhvbmVdJzogJ25vbnByb2ZpdFRhYi5vcmdfcGhvbmUnLFxuICAgICdub25wcm9maXRbY2l0eV0nOiAnbm9ucHJvZml0VGFiLmNpdHknLFxuICAgICdub25wcm9maXRbc3RhdGVfY29kZV0nOiAnbm9ucHJvZml0VGFiLnN0YXRlJyxcbiAgICAnbm9ucHJvZml0W3ppcF9jb2RlXSc6ICdub25wcm9maXRUYWIuemlwJyxcbiAgICAndXNlcltuYW1lXSc6ICd1c2VyVGFiLm5hbWUnLFxuICAgICd1c2VyW2VtYWlsXSc6ICd1c2VyVGFiLmVtYWlsJyxcbiAgICAndXNlcltwYXNzd29yZF0nOiAndXNlclRhYi5wYXNzd29yZCcsXG4gICAgJ3VzZXJbcGFzc3dvcmRfY29uZmlybWF0aW9uXSc6ICd1c2VyVGFiLnBhc3N3b3JkX2NvbmZpcm1hdGlvbidcbiAgfVxuXG4gIGhvb2tzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvblN1Y2Nlc3M6IGFzeW5jIChmOiBGb3JtKSA9PiB7XG4gICAgICAgIGxldCBpbnB1dCA9IHRoaXMuY29udmVydGVyLmNvbnZlcnRGb3JtVG9PYmplY3QoZilcblxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IHIgPSBhd2FpdCB0aGlzLm5vbnByb2ZpdEFwaS5wb3N0Tm9ucHJvZml0KGlucHV0KVxuICAgICAgICAgIHNldFRvdXJDb29raWVzKHIpXG4gICAgICAgICAgYXdhaXQgdGhpcy5zaWduaW5BcGkucG9zdExvZ2luKHtlbWFpbDogaW5wdXQudXNlci5lbWFpbCwgcGFzc3dvcmQ6IGlucHV0LnVzZXIucGFzc3dvcmR9KVxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9ub25wcm9maXRzLyR7ci5pZH0vZGFzaGJvYXJkYFxuXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgVmFsaWRhdGlvbkVycm9yc0V4Y2VwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jb252ZXJ0ZXIuY29udmVydEVycm9yVG9Gb3JtKGUsIGYpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5pbnZhbGlkYXRlRnJvbVNlcnZlcihlWydlcnJvciddKVxuICAgICAgICAgIC8vc2V0IGVycm9yIHRvIHRoZSBmb3JtXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuXG5jbGFzcyBSZWdpc3RyYXRpb25XaXphcmRTdGF0ZSBleHRlbmRzIFdpemFyZFN0YXRlIHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcihXaXphcmRUYWJQYW5lbFN0YXRlKVxuICB9XG4gIEBhY3Rpb24uYm91bmRcbiAgY3JlYXRlRm9ybShpOiBhbnkpOiBGb3JtIHtcbiAgICByZXR1cm4gbmV3IFJlZ2lzdHJhdGlvblBhZ2VGb3JtKGkpXG4gIH1cblxuXG59XG5cbmV4cG9ydCBjbGFzcyBJbm5lclJlZ2lzdHJhdGlvbldpemFyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSZWdpc3RyYXRpb25XaXphcmRQcm9wcyAmIEluamVjdGVkSW50bFByb3BzLCB7fT4ge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWdpc3RyYXRpb25XaXphcmRQcm9wcyAmIEluamVjdGVkSW50bFByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnNldFJlZ2lzdHJhdGlvbldpemFyZFN0YXRlKClcbiAgICB0aGlzLmNyZWF0ZUZvcm0oKVxuICB9XG5cblxuICBAb2JzZXJ2YWJsZSByZWdpc3RyYXRpb25XaXphcmRTdGF0ZTogUmVnaXN0cmF0aW9uV2l6YXJkU3RhdGVcblxuICBAY29tcHV0ZWRcbiAgZ2V0IGZvcm0oKTogUmVnaXN0cmF0aW9uUGFnZUZvcm0ge1xuICAgIHJldHVybiAodGhpcy5yZWdpc3RyYXRpb25XaXphcmRTdGF0ZSAmJiB0aGlzLnJlZ2lzdHJhdGlvbldpemFyZFN0YXRlLmZvcm0pYXMgUmVnaXN0cmF0aW9uUGFnZUZvcm1cbiAgfVxuXG5cbiAgQGFjdGlvbi5ib3VuZFxuICBzZXRSZWdpc3RyYXRpb25XaXphcmRTdGF0ZSgpIHtcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbldpemFyZFN0YXRlID0gbmV3IFJlZ2lzdHJhdGlvbldpemFyZFN0YXRlKClcbiAgfVxuXG5cbiAgQGFjdGlvbi5ib3VuZFxuICBjcmVhdGVGb3JtKCkge1xuICAgIHRoaXMucmVnaXN0cmF0aW9uV2l6YXJkU3RhdGUuYWRkVGFiKHt0YWJOYW1lOlwibm9ucHJvZml0VGFiXCIsIGxhYmVsOidyZWdpc3RyYXRpb24ud2l6YXJkLnRhYnMubm9ucHJvZml0JywgdGFiRmllbGREZWZpbml0aW9uOntcbiAgICAgIGZpZWxkczpcbiAgICAgICAgTm9ucHJvZml0SW5mb0Zvcm0uRmllbGREZWZpbml0aW9uc1xuICAgIH19XG4gICAgKVxuXG4gICAgdGhpcy5yZWdpc3RyYXRpb25XaXphcmRTdGF0ZS5hZGRUYWIoe3RhYk5hbWU6IFwidXNlclRhYlwiLCBsYWJlbDogJ3JlZ2lzdHJhdGlvbi53aXphcmQudGFicy5jb250YWN0JywgdGFiRmllbGREZWZpbml0aW9uOntcbiAgICAgIGZpZWxkczpcbiAgICAgICAgVXNlckluZm9Gb3JtLkZpZWxkRGVmaW5pdGlvbnNcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5yZWdpc3RyYXRpb25XaXphcmRTdGF0ZS5pbml0aWFsaXplKClcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpXG4gIHtcbiAgICBydW5JbkFjdGlvbigoKSA9PiB7XG4gICAgICB0aGlzLmZvcm0ubm9ucHJvZml0QXBpID0gdGhpcy5wcm9wcy5BcGlNYW5hZ2VyLmdldChOb25wcm9maXRBcGkpXG4gICAgICB0aGlzLmZvcm0uc2lnbmluQXBpID0gdGhpcy5wcm9wcy5BcGlNYW5hZ2VyLmdldChXZWJVc2VyU2lnbkluT3V0KVxuICAgIH0pXG4gIH1cblxuXG4gIHJlbmRlcigpIHtcblxuICAgIHJldHVybiA8V2l6YXJkIHdpemFyZFN0YXRlPXt0aGlzLnJlZ2lzdHJhdGlvbldpemFyZFN0YXRlfSBkaXNhYmxlVGFicz17dGhpcy5mb3JtLnN1Ym1pdHRpbmd9PlxuICAgICAgPE5vbnByb2ZpdEluZm9QYW5lbCB0YWI9e3RoaXMucmVnaXN0cmF0aW9uV2l6YXJkU3RhdGUudGFic0J5TmFtZVsnbm9ucHJvZml0VGFiJ119XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25UZXh0PVwicmVnaXN0cmF0aW9uLndpemFyZC5uZXh0XCIvPlxuXG4gICAgICA8VXNlckluZm9QYW5lbCB0YWI9e3RoaXMucmVnaXN0cmF0aW9uV2l6YXJkU3RhdGUudGFic0J5TmFtZVsndXNlclRhYiddfVxuICAgICAgICAgICAgICAgICAgICAgYnV0dG9uVGV4dD1cInJlZ2lzdHJhdGlvbi53aXphcmQuc2F2ZV9hbmRfZmluaXNoXCIgYnV0dG9uVGV4dE9uUHJvZ3Jlc3M9XCJyZWdpc3RyYXRpb24ud2l6YXJkLnNhdmluZ1wiLz5cbiAgICA8L1dpemFyZD5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBpbmplY3RJbnRsKFxuICBpbmplY3QoJ0FwaU1hbmFnZXInKVxuICAgIChvYnNlcnZlciggSW5uZXJSZWdpc3RyYXRpb25XaXphcmQpXG4gIClcbilcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9yZWdpc3RyYXRpb25fcGFnZS9SZWdpc3RyYXRpb25XaXphcmQudHN4IiwiLy8gTGljZW5zZTogTEdQTC0zLjAtb3ItbGF0ZXJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7V2l6YXJkUGFuZWwsIFdpemFyZFRhYlBhbmVsUHJvcHN9IGZyb20gXCIuLi9jb21tb24vd2l6YXJkL1dpemFyZFBhbmVsXCI7XG5cbmltcG9ydCB7IEZpZWxkfSBmcm9tICdtb2J4LXJlYWN0LWZvcm0nXG5cbmltcG9ydCB7IG9ic2VydmVyIH0gZnJvbSAnbW9ieC1yZWFjdCc7XG5pbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ21vYngnO1xuaW1wb3J0IHsgV2l6YXJkVGFiUGFuZWxTdGF0ZX0gZnJvbSBcIi4uL2NvbW1vbi93aXphcmQvd2l6YXJkX3N0YXRlXCI7XG5pbXBvcnQge0luamVjdGVkSW50bFByb3BzLCBpbmplY3RJbnRsLCBJbmplY3RlZEludGx9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IE5vbnByb2ZpdEluZm9Gb3JtIGZyb20gXCIuL05vbnByb2ZpdEluZm9Gb3JtXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9ucHJvZml0SW5mb1BhbmVsUHJvcHMgZXh0ZW5kcyBXaXphcmRUYWJQYW5lbFByb3BzXG57XG4gICAgYnV0dG9uVGV4dDpzdHJpbmdcbn1cblxuY2xhc3MgTm9ucHJvZml0SW5mb1BhbmVsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PE5vbnByb2ZpdEluZm9QYW5lbFByb3BzICYgSW5qZWN0ZWRJbnRsUHJvcHMsIHt9PiAge1xuXG4gIEBjb21wdXRlZFxuICBnZXQgd2l6YXJkVGFiKCk6IFdpemFyZFRhYlBhbmVsU3RhdGUge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnRhYlxuICB9XG5cbiAgQGNvbXB1dGVkXG4gIGdldCBmb3JtKCk6RmllbGR7XG4gICAgICByZXR1cm4gdGhpcy53aXphcmRUYWIuZm9ybVxuICB9XG4gIEBjb21wdXRlZFxuICBnZXQgc3VibWl0KCl7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtLm9uU3VibWl0XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgcmV0dXJuIDxXaXphcmRQYW5lbFxuICAgICAgIHRhYj17dGhpcy53aXphcmRUYWJ9IGtleT17dGhpcy53aXphcmRUYWIudGFiTmFtZX1cbiAgICAgID5cbiAgICAgICAgPE5vbnByb2ZpdEluZm9Gb3JtIGZvcm09e3RoaXMuZm9ybX0gYnV0dG9uVGV4dD17dGhpcy5wcm9wcy5idXR0b25UZXh0fS8+XG4gICAgICA8L1dpemFyZFBhbmVsPlxuICAgICAgXG4gIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluamVjdEludGwob2JzZXJ2ZXIoTm9ucHJvZml0SW5mb1BhbmVsKSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbl9wYWdlL05vbnByb2ZpdEluZm9QYW5lbC50c3giLCIvL01JVCBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vZGF2aWR0aGVjbGFyay9yZWFjdC1hcmlhLXRhYnBhbmVsL2Jsb2IvbWFzdGVyL2xpYi9UYWJQYW5lbC5qc1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgc3BlY2lhbEFzc2lnbiBmcm9tIFwiLi9zcGVjaWFsQXNzaWduXCI7XG5pbXBvcnQge1RhYk1hbmFnZXJQYXJlbnR9IGZyb20gXCIuL2Fic3RyYWN0X3RhYmNvbXBvbmVudF9zdGF0ZVwiO1xuaW1wb3J0IHtvYnNlcnZlcn0gZnJvbSAnbW9ieC1yZWFjdCc7XG5cbmNvbnN0IFByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxuY29uc3QgY2hlY2tlZFByb3BzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgUHJvcFR5cGVzLmZ1bmMsXG4gIF0pLmlzUmVxdWlyZWQsXG4gIHRhYklkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRhZzogUHJvcFR5cGVzLnN0cmluZyxcbiAgYWN0aXZlOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbmludGVyZmFjZSBUYWJQYW5lbFByb3BzIHtcbiAgdGFiSWQ6IHN0cmluZ1xuICBhY3RpdmU6IGJvb2xlYW5cbiAgdGFnPzogc3RyaW5nXG5cbiAgW3Byb3A6IHN0cmluZ106IGFueVxufVxuXG5Ab2JzZXJ2ZXJcbmV4cG9ydCBjbGFzcyBUYWJQYW5lbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxUYWJQYW5lbFByb3BzPiB7XG4gIGRpc3BsYXlOYW1lOiAnQXJpYVRhYlBhbmVsLVRhYlBhbmVsJztcblxuICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHt0YWc6ICdkaXYnfTtcblxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIGF0cE1hbmFnZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9O1xuXG4gIGNvbnRleHQ6IHsgYXRwTWFuYWdlcjogVGFiTWFuYWdlclBhcmVudCB9O1xuXG4gIGhhbmRsZUtleURvd24oZXZlbnQ6IGFueSkge1xuICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LmtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmF0cE1hbmFnZXIuZm9jdXNUYWIodGhpcy5wcm9wcy50YWJJZCk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJXaXRoTWFuYWdlcihlbDogYW55KSB7XG5cbiAgICB0aGlzLmNvbnRleHQuYXRwTWFuYWdlci5yZWdpc3RlclRhYlBhbmVsRWxlbWVudCh7XG4gICAgICBub2RlOiBlbCxcbiAgICAgIHRhYklkOiB0aGlzLnByb3BzLnRhYklkLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpc0FjdGl2ZSA9IHByb3BzLmFjdGl2ZTtcblxuICAgIGNvbnN0IGtpZHMgPSBwcm9wcy5jaGlsZHJlbjtcblxuICAgIGxldCBzdHlsZSA9IHByb3BzLnN0eWxlIHx8IHt9O1xuICAgIGlmICghaXNBY3RpdmUpIHtcbiAgICAgIHN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgbGV0IGVsUHJvcHMgPSB7XG4gICAgICBjbGFzc05hbWU6IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGlkOiB0aGlzLmNvbnRleHQuYXRwTWFuYWdlci5nZXRUYWJQYW5lbElkKHByb3BzLnRhYklkKSxcbiAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyksXG4gICAgICByb2xlOiAndGFicGFuZWwnLFxuICAgICAgc3R5bGU6IHN0eWxlLFxuICAgICAgJ2FyaWEtaGlkZGVuJzogIWlzQWN0aXZlLFxuICAgICAgJ2FyaWEtZGVzY3JpYmVkYnknOiBwcm9wcy50YWJJZCxcbiAgICAgIHJlZjogdGhpcy5yZWdpc3RlcldpdGhNYW5hZ2VyLmJpbmQodGhpcylcbiAgICB9O1xuICAgIHNwZWNpYWxBc3NpZ24oZWxQcm9wcywgcHJvcHMsIGNoZWNrZWRQcm9wcyk7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChwcm9wcy50YWcsIGVsUHJvcHMsIGtpZHMpO1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vamF2YXNjcmlwdHMvc3JjL2NvbXBvbmVudHMvY29tbW9uL3dpemFyZC9SQVQvVGFiUGFuZWwudHMiLCIvLyBMaWNlbnNlOiBMR1BMLTMuMC1vci1sYXRlclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtvYnNlcnZlcn0gZnJvbSBcIm1vYngtcmVhY3RcIlxuaW1wb3J0IFdpemFyZFRhYkxpc3QgZnJvbSBcIi4vV2l6YXJkVGFiTGlzdFwiO1xuaW1wb3J0IHtXaXphcmRTdGF0ZX0gZnJvbSAnLi93aXphcmRfc3RhdGUnO1xuaW1wb3J0IHtXaXphcmRUYWJQYW5lbFByb3BzfSBmcm9tIFwiLi9XaXphcmRQYW5lbFwiO1xuaW1wb3J0IHtXcmFwcGVyfSBmcm9tIFwiLi9SQVQvV3JhcHBlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdpemFyZFByb3BzXG57XG5cbiAgICB3aXphcmRTdGF0ZTogV2l6YXJkU3RhdGVcbiAgICBkaXNhYmxlVGFiczogYm9vbGVhblxuICAgIGNoaWxkcmVuOiBBcnJheTxSZWFjdC5SZWFjdEVsZW1lbnQ8V2l6YXJkVGFiUGFuZWxQcm9wcz4+XG59XG5cbkBvYnNlcnZlclxuZXhwb3J0IGNsYXNzIFdpemFyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxXaXphcmRQcm9wcywge30+IHtcblxuICByZW5kZXIoKSB7XG4gICAgIHJldHVybiA8V3JhcHBlciBtYW5hZ2VyPXt0aGlzLnByb3BzLndpemFyZFN0YXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgIHRhZz1cInNlY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogJ3RhYmxlJ319IGNsYXNzTmFtZT1cIndpemFyZC1zdGVwc1wiPlxuICAgICAgICAgPFdpemFyZFRhYkxpc3Qgd2l6YXJkU3RhdGU9e3RoaXMucHJvcHMud2l6YXJkU3RhdGV9IGRpc2FibGVUYWJzPXt0aGlzLnByb3BzLmRpc2FibGVUYWJzfT5cbiAgICAgICAgIDwvV2l6YXJkVGFiTGlzdD5cbiAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuXG4gICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5wcm9wcy53aXphcmRTdGF0ZS5mb3JtLm9uU3VibWl0fSA+XG5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG5cbiAgICAgICAgICAgIDwvZm9ybT5cblxuICAgICAgICAgPC9kaXY+XG4gICAgICAgICBcbiAgICAgPC9XcmFwcGVyPjtcbiAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9jb21tb24vd2l6YXJkL1dpemFyZC50c3giLCIvLyBMaWNlbnNlOiBMR1BMLTMuMC1vci1sYXRlclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFdpemFyZFRhYiBmcm9tICcuL1dpemFyZFRhYic7XG5pbXBvcnQge29ic2VydmVyfSBmcm9tICdtb2J4LXJlYWN0JztcbmltcG9ydCB7V2l6YXJkU3RhdGV9IGZyb20gXCIuL3dpemFyZF9zdGF0ZVwiO1xuaW1wb3J0IHtUYWJMaXN0fSBmcm9tIFwiLi9SQVQvVGFiTGlzdFwiO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgV2l6YXJkVGFiTGlzdFByb3BzXG57XG4gIHdpemFyZFN0YXRlOiBXaXphcmRTdGF0ZVxuICBkaXNhYmxlVGFicz86IGJvb2xlYW5cbn1cblxuQG9ic2VydmVyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaXphcmRUYWJMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFdpemFyZFRhYkxpc3RQcm9wcywge30+IHtcbiAgcmVuZGVyKCkge1xuICAgIGxldCB3aWR0aE9mVGFiID0gIDEwMCAvIHRoaXMucHJvcHMud2l6YXJkU3RhdGUucGFuZWxzLmxlbmd0aFxuICAgIGxldCBvdXRwdXQgPSAgdGhpcy5wcm9wcy53aXphcmRTdGF0ZS5wYW5lbHMubWFwKChpKSA9PiB7XG4gICAgICByZXR1cm4gPFdpemFyZFRhYiB0YWI9e2l9IHdpZHRoUGVyY2VudGFnZT17d2lkdGhPZlRhYn0gIGtleT17aS5pZCArIFwia2V5XCJ9IGRpc2FibGVUYWJzPXt0aGlzLnByb3BzLmRpc2FibGVUYWJzfT48L1dpemFyZFRhYj59KVxuICAgIHJldHVybiA8VGFiTGlzdCB0YWc9e1wiZGl2XCJ9IGNsYXNzTmFtZT1cIndpemFyZC1pbmRleFwiPlxuICAgICAge291dHB1dH0gICAgICAgXG4gICAgPC9UYWJMaXN0PjtcbiAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9jb21tb24vd2l6YXJkL1dpemFyZFRhYkxpc3QudHN4IiwiLy8gTGljZW5zZTogTEdQTC0zLjAtb3ItbGF0ZXJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Rm9ybWF0dGVkTWVzc2FnZSwgaW5qZWN0SW50bCwgSW5qZWN0ZWRJbnRsUHJvcHN9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHtvYnNlcnZlcn0gZnJvbSAnbW9ieC1yZWFjdCc7XG5pbXBvcnQge1dpemFyZFRhYlBhbmVsU3RhdGV9IGZyb20gXCIuL3dpemFyZF9zdGF0ZVwiO1xuaW1wb3J0IHtUYWJ9IGZyb20gXCIuL1JBVC9UYWJcIjtcblxuaW50ZXJmYWNlIE1pbmlUYWJJbmZve1xuICBhY3RpdmU6Ym9vbGVhblxuICBlbmFibGVkOmJvb2xlYW5cbiAgbGFiZWw6c3RyaW5nXG4gIGlkOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXaXphcmRUYWJQcm9wc1xue1xuICB0YWI6IE1pbmlUYWJJbmZvXG4gIHdpZHRoUGVyY2VudGFnZTpudW1iZXJcbiAgc3R5bGU/OiBhbnlcbiAgZGlzYWJsZVRhYnM/OiBib29sZWFuXG59XG5cblxuY2xhc3MgV2l6YXJkVGFiIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFdpemFyZFRhYlByb3BzICYgSW5qZWN0ZWRJbnRsUHJvcHMsIHt9PiB7XG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcGVyY2VudGFnZVRvU3RyaW5nID0gdGhpcy5wcm9wcy53aWR0aFBlcmNlbnRhZ2UudG9TdHJpbmcoKSArIFwiJVwiXG4gICAgbGV0IHN0eWxlPSAge3dpZHRoOiBwZXJjZW50YWdlVG9TdHJpbmd9XG4gICAgXG4gICAgXG4gICAgbGV0IGNsYXNzTmFtZSA9IFwid2l6YXJkLWluZGV4LWxhYmVsXCJcbiAgICBpZiAodGhpcy5wcm9wcy50YWIuYWN0aXZlKXtcbiAgICAgIGNsYXNzTmFtZSArPSBcIiBpcy1jdXJyZW50XCJcbiAgICB9XG4gICAgbGV0IGRpc2FibGVPdmVycmlkZVRhYiA9IHRoaXMucHJvcHMuZGlzYWJsZVRhYnNcblxuICAgIGlmICh0aGlzLnByb3BzLnRhYi5lbmFibGVkIHx8IGRpc2FibGVPdmVycmlkZVRhYil7XG4gICAgICBjbGFzc05hbWUgKz0gXCIgaXMtYWNjZXNzaWJsZVwiXG4gICAgfVxuICAgIFxuICAgIHJldHVybiA8VGFiIHRhZz17J3NwYW4nfSBhY3RpdmU9e3RoaXMucHJvcHMudGFiLmFjdGl2ZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHN0eWxlPXtzdHlsZX0gaWQ9e3RoaXMucHJvcHMudGFiLmlkfT5cblxuICAgICAgICB7dGhpcy5wcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2Uoe2lkOnRoaXMucHJvcHMudGFiLmxhYmVsfSl9XG4gICAgPC9UYWI+XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5qZWN0SW50bChvYnNlcnZlcihXaXphcmRUYWIpKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vamF2YXNjcmlwdHMvc3JjL2NvbXBvbmVudHMvY29tbW9uL3dpemFyZC9XaXphcmRUYWIudHN4IiwiLy9NSVQgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkdGhlY2xhcmsvcmVhY3QtYXJpYS10YWJwYW5lbC9ibG9iL21hc3Rlci9saWIvVGFiLmpzXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBzcGVjaWFsQXNzaWduIGZyb20gXCIuL3NwZWNpYWxBc3NpZ25cIjtcbmltcG9ydCB7VGFiTWFuYWdlclBhcmVudH0gZnJvbSBcIi4vYWJzdHJhY3RfdGFiY29tcG9uZW50X3N0YXRlXCI7XG5pbXBvcnQge29ic2VydmVyfSBmcm9tICdtb2J4LXJlYWN0JztcblxuY29uc3QgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG5cbmNvbnN0IGNoZWNrZWRQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIFByb3BUeXBlcy5mdW5jLFxuICBdKS5pc1JlcXVpcmVkLFxuICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB0YWc6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHJvbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICBhY3RpdmU6IFByb3BUeXBlcy5ib29sLFxuICBsZXR0ZXJOYXZpZ2F0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbmludGVyZmFjZSBUYWJQcm9wcyB7XG4gIGlkOiBzdHJpbmdcbiAgYWN0aXZlOiBib29sZWFuXG4gIGxldHRlck5hdmlnYXRpb25UZXh0Pzogc3RyaW5nXG4gIHRhZz86IHN0cmluZ1xuXG4gIFtwcm9wOiBzdHJpbmddOiBhbnlcbn1cblxuQG9ic2VydmVyXG5leHBvcnQgY2xhc3MgVGFiIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFRhYlByb3BzPiB7XG4gIGRpc3BsYXlOYW1lOiAnQXJpYVRhYlBhbmVsLVRhYic7XG5cbiAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7IHRhZzogJ2RpdicsIHJvbGU6ICd0YWInIH07XG5cbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICBhdHBNYW5hZ2VyOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgfTtcblxuICAgY29udGV4dDoge2F0cE1hbmFnZXI6VGFiTWFuYWdlclBhcmVudH07XG4gIGVsUmVmOmFueTtcblxuICBoYW5kbGVSZWYoZWw6YW55KSB7XG4gICAgaWYgKGVsKSB7XG4gICAgICB0aGlzLmVsUmVmID0gZWw7XG4gICAgICB0aGlzLnJlZ2lzdGVyV2l0aE1hbmFnZXIodGhpcy5lbFJlZik7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJXaXRoTWFuYWdlcihlbFJlZjphbnkpe1xuICAgIHRoaXMuY29udGV4dC5hdHBNYW5hZ2VyLnJlZ2lzdGVyVGFiRWxlbWVudCh7XG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIG5vZGU6IGVsUmVmXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVGb2N1cygpIHtcbiAgICB0aGlzLmNvbnRleHQuYXRwTWFuYWdlci5oYW5kbGVUYWJGb2N1cyh0aGlzLnByb3BzLmlkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXNBY3RpdmUgPSAgcHJvcHMuYWN0aXZlO1xuXG4gICAgY29uc3Qga2lkcyA9IHByb3BzLmNoaWxkcmVuO1xuXG4gICAgbGV0IGVsUHJvcHMgPSB7XG4gICAgICBpZDogcHJvcHMuaWQsXG4gICAgICB0YWJJbmRleDogKGlzQWN0aXZlKSA/IDAgOiAtMSxcbiAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzKSxcbiAgICAgIHJvbGU6IHByb3BzLnJvbGUsXG4gICAgICAnYXJpYS1zZWxlY3RlZCc6IGlzQWN0aXZlLFxuICAgICAgJ2FyaWEtY29udHJvbHMnOiB0aGlzLmNvbnRleHQuYXRwTWFuYWdlci5nZXRUYWJQYW5lbElkKHByb3BzLmlkKSxcbiAgICAgIHJlZjogdGhpcy5oYW5kbGVSZWYuYmluZCh0aGlzKVxuICAgIH07XG4gICAgc3BlY2lhbEFzc2lnbihlbFByb3BzLCBwcm9wcywgY2hlY2tlZFByb3BzKTtcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHByb3BzLnRhZywgZWxQcm9wcywga2lkcyk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgIHRoaXMuY29udGV4dC5hdHBNYW5hZ2VyLnVucmVnaXN0ZXJUYWJFbGVtZW50KHtpZDp0aGlzLnByb3BzLmlkfSlcbiAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vamF2YXNjcmlwdHMvc3JjL2NvbXBvbmVudHMvY29tbW9uL3dpemFyZC9SQVQvVGFiLnRzIiwiLy9NSVQgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkdGhlY2xhcmsvcmVhY3QtYXJpYS10YWJwYW5lbC9ibG9iL21hc3Rlci9saWIvVGFiTGlzdC5qc1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgc3BlY2lhbEFzc2lnbiBmcm9tIFwiLi9zcGVjaWFsQXNzaWduXCI7XG5pbXBvcnQge29ic2VydmVyfSBmcm9tICdtb2J4LXJlYWN0JztcblxuY29uc3QgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG5jb25zdCBjaGVja2VkUHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICB0YWc6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5pbnRlcmZhY2UgVGFiTGlzdFByb3BzIHtcbiAgdGFnPzogc3RyaW5nXG5cbiAgW3Byb3A6IHN0cmluZ106IGFueVxufVxuXG5Ab2JzZXJ2ZXJcbmV4cG9ydCBjbGFzcyBUYWJMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFRhYkxpc3RQcm9wcz4ge1xuICBkaXNwbGF5TmFtZTogJ0FyaWFUYWJQYW5lbC1UYWJMaXN0JztcblxuICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHt0YWc6ICdkaXYnfTtcblxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIGF0cE1hbmFnZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGVsUHJvcHMgPSB7XG4gICAgICByb2xlOiAndGFibGlzdCcsXG4gICAgfTtcbiAgICBzcGVjaWFsQXNzaWduKGVsUHJvcHMsIHByb3BzLCBjaGVja2VkUHJvcHMpO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHByb3BzLnRhZywgZWxQcm9wcywgcHJvcHMuY2hpbGRyZW4pO1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vamF2YXNjcmlwdHMvc3JjL2NvbXBvbmVudHMvY29tbW9uL3dpemFyZC9SQVQvVGFiTGlzdC50cyIsIi8vIExpY2Vuc2U6IExHUEwtMy4wLW9yLWxhdGVyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7UmVhY3ROb2RlfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VGFiTWFuYWdlclBhcmVudH0gZnJvbSBcIi4vYWJzdHJhY3RfdGFiY29tcG9uZW50X3N0YXRlXCI7XG5pbXBvcnQge29ic2VydmVyfSBmcm9tICdtb2J4LXJlYWN0JztcbmltcG9ydCBzcGVjaWFsQXNzaWduIGZyb20gXCIuL3NwZWNpYWxBc3NpZ25cIjtcblxuaW1wb3J0IFByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxuaW50ZXJmYWNlIFdyYXBwZXJQcm9wcyB7XG4gIG1hbmFnZXI6IFRhYk1hbmFnZXJQYXJlbnRcbiAgdGFnPzogc3RyaW5nXG4gIGNoaWxkcmVuOiBSZWFjdE5vZGVcbiAgW3Byb3BzOnN0cmluZ106IGFueVxufVxuXG5jb25zdCBjaGVja2VkUHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICB0YWc6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG1hbmFnZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxufTtcblxuLyoqXG4gKiBXb3JrcyBqdXN0IGxpa2UgdGhlIG5vcm1hbCBXcmFwcGVyIGJ1dCBzdXBwb3J0cyBvdXIgb3duIHRhYiBtYW5hZ2VyXG4gKi9cbkBvYnNlcnZlclxuZXhwb3J0IGNsYXNzIFdyYXBwZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8V3JhcHBlclByb3BzPiB7XG5cbiAgZGlzcGxheU5hbWUgPSAnQXJpYVRhYlBhbmVsLVdyYXBwZXInO1xuXG4gIHB1YmxpYyBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRhZzogJ2RpdidcbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0ge1xuICAgIGF0cE1hbmFnZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgcmV0dXJuIHthdHBNYW5hZ2VyOiB0aGlzLnByb3BzLm1hbmFnZXJ9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5tYW5hZ2VyLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMubWFuYWdlci5hY3RpdmF0ZSgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZWxQcm9wcyA9IHt9O1xuICAgIHNwZWNpYWxBc3NpZ24oZWxQcm9wcywgcHJvcHMsIGNoZWNrZWRQcm9wcyk7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQocHJvcHMudGFnLCBlbFByb3BzLCBwcm9wcy5jaGlsZHJlbik7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL2NvbW1vbi93aXphcmQvUkFUL1dyYXBwZXIudHMiLCIvLyBMaWNlbnNlOiBMR1BMLTMuMC1vci1sYXRlclxuaW1wb3J0IHtvYnNlcnZhYmxlLCBhY3Rpb24sIGNvbXB1dGVkLCB0b0pTLCByZWFjdGlvbiwgcnVuSW5BY3Rpb259IGZyb20gXCJtb2J4XCI7XG5pbXBvcnQge0ZpZWxkLCBGb3JtLCBGaWVsZERlZmluaXRpb24sIEZpZWxkSGFuZGxlcnMsIEZpZWxkSG9va3N9IGZyb20gXCJtb2J4LXJlYWN0LWZvcm1cIjtcbmltcG9ydCBfID0gcmVxdWlyZShcImxvZGFzaFwiKTtcbmltcG9ydCB7QWJzdHJhY3RXaXphcmRTdGF0ZSwgQWJzdHJhY3RXaXphcmRUYWJQYW5lbFN0YXRlfSBmcm9tIFwiLi9hYnN0cmFjdF93aXphcmRfc3RhdGVcIjtcblxuaW50ZXJmYWNlIFN1YkZvcm1EZWZpbml0aW9uIHtcbiAgcmVsYXRlZD86IHN0cmluZ1tdXG4gIGJpbmRpbmdzPzogYW55XG4gIG9wdGlvbnM/OiBhbnlcbiAgZXh0cmE/OiBhbnlcbiAgaG9va3M/OiBGaWVsZEhvb2tzXG4gIGhhbmRsZXJzPzogRmllbGRIYW5kbGVyc1xuICBmaWVsZHM/OiBBcnJheTxGaWVsZERlZmluaXRpb24+XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXaXphcmRTdGF0ZTxQYW5lbFN0YXRlVHlwZSBleHRlbmRzIFdpemFyZFRhYlBhbmVsU3RhdGUgPSBXaXphcmRUYWJQYW5lbFN0YXRlLFxuICBGb3JtU3RhdGVUeXBlIGV4dGVuZHMgRm9ybSA9IEZvcm0+IGV4dGVuZHMgQWJzdHJhY3RXaXphcmRTdGF0ZTxQYW5lbFN0YXRlVHlwZT4ge1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihwYW5lbFR5cGU6IHsgbmV3KCk6IFBhbmVsU3RhdGVUeXBlIH0pIHtcbiAgICBzdXBlcihwYW5lbFR5cGUpXG4gIH1cblxuICBAb2JzZXJ2YWJsZSBmb3JtOiBGb3JtU3RhdGVUeXBlO1xuXG4gIGFic3RyYWN0IGNyZWF0ZUZvcm0oaTogYW55KTogRm9ybVN0YXRlVHlwZTtcblxuICBhZGRUYWIodGFiOiB7IHRhYk5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZywgdGFiRmllbGREZWZpbml0aW9uOiBTdWJGb3JtRGVmaW5pdGlvbn0pOiBQYW5lbFN0YXRlVHlwZSB7XG4gICAgY29uc3QgcmV0ID0gc3VwZXIuYWRkVGFiKHRhYik7XG5cbiAgICBydW5JbkFjdGlvbigoKSA9PiB7XG4gICAgICByZXQucGFuZWxGb3JtRGVmaW5pdGlvbiA9IHRhYi50YWJGaWVsZERlZmluaXRpb24gYXMgRmllbGREZWZpbml0aW9uXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgQGFjdGlvbi5ib3VuZFxuICBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhbmVscy5sZW5ndGggPiAwKSB7XG4gICAgICAvL2xldCdzIGNyZWF0ZSB0aGUgZm9ybXNcbiAgICAgIGNvbnN0IGxhc3RJbmRleCA9IHRoaXMucGFuZWxzLmxlbmd0aDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFzdEluZGV4OyBpKyspIHtcbiAgICAgICAgbGV0IG91clBhbmVsID0gdGhpcy5wYW5lbHNbaV1cblxuICAgICAgICBpZiAoIW91clBhbmVsLnBhbmVsRm9ybURlZmluaXRpb24uaG9va3MpXG4gICAgICAgICAgb3VyUGFuZWwucGFuZWxGb3JtRGVmaW5pdGlvbi5ob29rcyA9IHt9XG5cbiAgICAgICAgLy9vdXJQYW5lbC5vcmlnaW5hbE9uU3VjY2Vzc0hvb2sgPSB0b0pTKG91clBhbmVsLnBhbmVsRm9ybURlZmluaXRpb24uaG9va3NbJ29uU3VjY2VzcyddKVxuXG4gICAgICAgIG91clBhbmVsLnBhbmVsRm9ybURlZmluaXRpb24uaG9va3NbJ29uU3VjY2VzcyddID0gdGhpcy5vblN1Y2Nlc3NGb3JQYW5lbFxuXG4gICAgICAgIC8vLyB0aGlzIHdvbid0IHdvcmsgYmVjYXVzZSB0aGUgaG9vayBpcyBhbHJlYWR5IHJlcGxhY2VkXG4gICAgICAgIC8vIGlmIChvdXJQYW5lbC5wYW5lbEZvcm1EZWZpbml0aW9uLmhvb2tzKVxuICAgICAgICAvLyAgIG91clBhbmVsLm9yaWdpbmFsT25FcnJvckhvb2sgPSBvdXJQYW5lbC5wYW5lbEZvcm1EZWZpbml0aW9uLmhvb2tzWydvbkVycm9yJ11cbiAgICAgICAgb3VyUGFuZWwucGFuZWxGb3JtRGVmaW5pdGlvbi5ob29rc1snb25FcnJvciddID0gdGhpcy5vbkVycm9yRm9yUGFuZWxcblxuICAgICAgICBvdXJQYW5lbC5wYW5lbEZvcm1EZWZpbml0aW9uLm5hbWUgPSBvdXJQYW5lbC50YWJOYW1lXG4gICAgICB9XG5cbiAgICAgIC8vd2UgbmVlZCB0byBjaGFuZ2UgdGhlc2UgYmFjayB0byBKUyBvYmplY3RzIGJlY2F1c2UgdGhleSdyZSBsaWtlbHkgb2JzZXJ2YWJsZSBhbmQgZmllbGREZWZpbml0aW9uc1xuICAgICAgLy8gY2FuJ3QgaGFuZGxlIHRoYXRcbiAgICAgIGNvbnN0IGZpZWxkRGVmaW5pdGlvbiA9IHRvSlModGhpcy5wYW5lbHMubWFwKChpKSA9PiB0b0pTKGkucGFuZWxGb3JtRGVmaW5pdGlvbikpKVxuICAgICAgdGhpcy5mb3JtID0gdGhpcy5jcmVhdGVGb3JtKHtmaWVsZHM6IGZpZWxkRGVmaW5pdGlvbn0pXG5cbiAgICAgIF8uZm9yRWFjaCh0aGlzLnBhbmVscywgKGkpID0+IHtcbiAgICAgICAgLy9hZGQgdGhlIGZvcm0gdG8gZWFjaCBwYW5lbFxuICAgICAgICBpLnBhcmVudEZvcm0gPSB0aGlzLmZvcm1cbiAgICAgICAgaS5mb3JtID0gdGhpcy5mb3JtLiQoaS50YWJOYW1lKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBAYWN0aW9uLmJvdW5kXG4gIG9uU3VjY2Vzc0ZvclBhbmVsKGE6IEZpZWxkKTogdm9pZCB7XG5cbiAgICAvLyBpZiAodGhpcy5hY3RpdmVUYWIub3JpZ2luYWxPblN1Y2Nlc3NIb29rKSB7XG4gICAgLy8gICB0aGlzLmFjdGl2ZVRhYi5vcmlnaW5hbE9uU3VjY2Vzc0hvb2soYSlcbiAgICAvLyB9XG5cbiAgICBpZiAoYS5zdWJtaXR0aW5nKSB7XG4gICAgICBpZiAodGhpcy5uZXh0VGFiKVxuICAgICAgICB0aGlzLm1vdmVUb05leHRUYWIoKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICAgIH1cbiAgfVxuXG5cbiAgQGFjdGlvbi5ib3VuZFxuICBvbkVycm9yRm9yUGFuZWwoYTogRmllbGQpOiBhbnkge1xuICAgIC8vIGlmICh0aGlzLmFjdGl2ZVRhYi5vcmlnaW5hbE9uRXJyb3JIb29rKSB7XG4gICAgLy8gICB0aGlzLmFjdGl2ZVRhYi5vcmlnaW5hbE9uRXJyb3JIb29rKGEpXG4gICAgLy8gfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXaXphcmRUYWJQYW5lbFN0YXRlPFBhcmVudEZvcm1TdGF0ZVR5cGUgZXh0ZW5kcyBGb3JtID0gRm9ybT4gZXh0ZW5kcyBBYnN0cmFjdFdpemFyZFRhYlBhbmVsU3RhdGUge1xuICBAb2JzZXJ2YWJsZSBwYXJlbnRGb3JtOiBQYXJlbnRGb3JtU3RhdGVUeXBlXG5cbiAgQG9ic2VydmFibGUgZm9ybTogRmllbGRcblxuXG4gIC8vIEBvYnNlcnZhYmxlIG9yaWdpbmFsT25TdWNjZXNzSG9vazogRnVuY3Rpb25cbiAgLy8gQG9ic2VydmFibGUgb3JpZ2luYWxPbkVycm9ySG9vazogRnVuY3Rpb25cblxuICBwYW5lbEZvcm1EZWZpbml0aW9uOiBGaWVsZERlZmluaXRpb25cblxuICAvKipcbiAgICogV2hldGhlciB0aGlzIHRhYidzIGZvcm0gaXMgdmFsaWQuIFdlIG92ZXJyaWRlIHRoaXMgaW4gYSBtb2NrIHNvIHdlIGNhbiBtYW51YWxseSBzZXQgdGhlIHZhbGlkaXR5XG4gICAqIHZpYSBhIHNpbXBsZSBmdW5jdGlvbiBjYWxsXG4gICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoaXMgdGFiJ3MgZm9ybSBpcyB2YWxpZCwgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBAY29tcHV0ZWRcbiAgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5pc1ZhbGlkXG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9jb21tb24vd2l6YXJkL3dpemFyZF9zdGF0ZS50cyIsIi8vIExpY2Vuc2U6IExHUEwtMy4wLW9yLWxhdGVyXG5pbXBvcnQge2NvbXB1dGVkLCByZWFjdGlvbn0gZnJvbSBcIm1vYnhcIjtcbmltcG9ydCB7QWJzdHJhY3RUYWJDb21wb25lbnRTdGF0ZSwgQWJzdHJhY3RUYWJQYW5lbFN0YXRlfSBmcm9tIFwiLi9SQVQvYWJzdHJhY3RfdGFiY29tcG9uZW50X3N0YXRlXCI7XG5pbXBvcnQgXyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFdpemFyZFN0YXRlPFBhbmVsU3RhdGVUeXBlIGV4dGVuZHMgQWJzdHJhY3RXaXphcmRUYWJQYW5lbFN0YXRlID0gQWJzdHJhY3RXaXphcmRUYWJQYW5lbFN0YXRlPlxuICBleHRlbmRzIEFic3RyYWN0VGFiQ29tcG9uZW50U3RhdGU8UGFuZWxTdGF0ZVR5cGU+IHtcblxuXG4gIGFkZFRhYih0YWI6IHsgdGFiTmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nIH0pOiBQYW5lbFN0YXRlVHlwZSB7XG4gICAgY29uc3QgcmV0ID0gc3VwZXIuYWRkVGFiKHRhYik7XG5cbiAgICByZWFjdGlvbigoKSA9PiB0aGlzLmxhc3RDb25zaXN0ZW50bHlFbmFibGVkVGFiLCAoZGF0YSwgcmVhY3QpID0+IHtcbiAgICAgIHRoaXMuc3RyYXRlZ3kodGhpcylcbiAgICB9KTtcblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBAY29tcHV0ZWRcbiAgZ2V0IGZpcnN0RGlzYWJsZWRUYWIoKTogUGFuZWxTdGF0ZVR5cGUge1xuICAgIHJldHVybiBfLmZpbmQodGhpcy5wYW5lbHMsIChpKSA9PiAhaS5lbmFibGVkKVxuICB9XG5cbiAgQGNvbXB1dGVkXG4gIGdldCBsYXN0Q29uc2lzdGVudGx5RW5hYmxlZFRhYigpOiBQYW5lbFN0YXRlVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuZmlyc3REaXNhYmxlZFRhYiA/IHRoaXMuZmlyc3REaXNhYmxlZFRhYi5wcmV2aW91cyA6IF8ubGFzdCh0aGlzLnBhbmVscylcbiAgfVxuXG4gIHByb3RlY3RlZCBzdHJhdGVneShzdGF0ZTogdGhpcykge1xuICAgIGlmICh0aGlzLmxhc3RDb25zaXN0ZW50bHlFbmFibGVkVGFiLmJlZm9yZSh0aGlzLmFjdGl2ZVRhYikpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGVUYWIodGhpcy5sYXN0Q29uc2lzdGVudGx5RW5hYmxlZFRhYilcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0V2l6YXJkVGFiUGFuZWxTdGF0ZSBleHRlbmRzIEFic3RyYWN0VGFiUGFuZWxTdGF0ZSB7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoaXMgdGFiJ3MgZm9ybSBpcyB2YWxpZC4gV2Ugb3ZlcnJpZGUgdGhpcyBpbiBhIG1vY2sgc28gd2UgY2FuIG1hbnVhbGx5IHNldCB0aGUgdmFsaWRpdHlcbiAgICogdmlhIGEgc2ltcGxlIGZ1bmN0aW9uIGNhbGxcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhpcyB0YWIncyBmb3JtIGlzIHZhbGlkLCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIGFic3RyYWN0IGdldCBpc1ZhbGlkKCk6IGJvb2xlYW5cblxuICBAY29tcHV0ZWRcbiAgZ2V0IGVuYWJsZWQoKTogYm9vbGVhbiB7XG5cbiAgICBjb25zdCBwcmV2aW91cyA9IHRoaXMucHJldmlvdXM7XG5cbiAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgIGNvbnN0IGVuYWJsZWQgPSBwcmV2aW91cy5lbmFibGVkO1xuICAgICAgY29uc3QgdmFsaWQgPSBwcmV2aW91cy5pc1ZhbGlkO1xuICAgICAgcmV0dXJuIGVuYWJsZWQgJiYgdmFsaWRcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vamF2YXNjcmlwdHMvc3JjL2NvbXBvbmVudHMvY29tbW9uL3dpemFyZC9hYnN0cmFjdF93aXphcmRfc3RhdGUudHMiLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RET01cIlxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMiLCIvLyBMaWNlbnNlOiBMR1BMLTMuMC1vci1sYXRlclxuaW1wb3J0IHthY3Rpb24sIGNvbXB1dGVkLCBvYnNlcnZhYmxlLCByZWFjdGlvbiwgcnVuSW5BY3Rpb259IGZyb20gXCJtb2J4XCI7XG5pbXBvcnQgXyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cbmNvbnN0IGNyZWF0ZUZvY3VzR3JvdXAgPSByZXF1aXJlKCdmb2N1cy1ncm91cCcpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRhYk1hbmFnZXJQYXJlbnQge1xuICByZWdpc3RlclRhYkVsZW1lbnQodGFiOiB7IGlkOiBzdHJpbmcsIG5vZGU6IGFueX0pOiB2b2lkXG5cbiAgcmVnaXN0ZXJUYWJQYW5lbEVsZW1lbnQodGFiUGFuZWw6IHsgdGFiSWQ6IHN0cmluZywgbm9kZTogYW55IH0pOiB2b2lkXG5cbiAgdW5yZWdpc3RlclRhYkVsZW1lbnQodGFiOiB7IGlkOiBzdHJpbmcgfSk6IHZvaWRcblxuICB1bnJlZ2lzdGVyVGFiUGFuZWxFbGVtZW50KHRhYlBhbmVsOiB7IGlkOiBzdHJpbmcgfSk6IHZvaWRcblxuICBoYW5kbGVUYWJGb2N1cyh0YWJJZDogc3RyaW5nKTogdm9pZFxuXG4gIGdldFRhYlBhbmVsSWQoaWQ6IHN0cmluZyk6IHN0cmluZ1xuXG4gIGZvY3VzVGFiKGlkOiBzdHJpbmcpOiB2b2lkXG5cbiAgYWN0aXZhdGUoKTogdm9pZFxuXG4gIGRlc3Ryb3koKTogdm9pZFxufVxuXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFRhYkNvbXBvbmVudFN0YXRlPFBhbmVsU3RhdGVUeXBlIGV4dGVuZHMgQWJzdHJhY3RUYWJQYW5lbFN0YXRlID0gQWJzdHJhY3RUYWJQYW5lbFN0YXRlPlxuICBpbXBsZW1lbnRzIFRhYk1hbmFnZXJQYXJlbnQge1xuXG4gIEBvYnNlcnZhYmxlIGZvY3VzR3JvdXA6IGFueTtcbiAgQG9ic2VydmFibGUgcGFuZWxzOkFycmF5PFBhbmVsU3RhdGVUeXBlPiA9IFtdO1xuICBAb2JzZXJ2YWJsZSBhY3RpdmVUYWI6IFBhbmVsU3RhdGVUeXBlO1xuXG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHBhbmVsVHlwZTogeyBuZXcoKTogUGFuZWxTdGF0ZVR5cGUgfSkge1xuXG4gICAgY29uc3QgZm9jdXNHcm91cE9wdGlvbnMgPSB7XG4gICAgICB3cmFwOiB0cnVlLFxuICAgICAgZm9yd2FyZEFycm93czogWydkb3duJywgJ3JpZ2h0J10sXG4gICAgICBiYWNrQXJyb3dzOiBbJ3VwJywgJ2xlZnQnXSxcbiAgICAgIHN0cmluZ1NlYXJjaDogdHJ1ZSxcbiAgICB9O1xuXG4gICAgdGhpcy5mb2N1c0dyb3VwID0gY3JlYXRlRm9jdXNHcm91cChmb2N1c0dyb3VwT3B0aW9ucyk7XG5cbiAgICByZWFjdGlvbigoKSA9PiB0aGlzLmFjdGl2ZVRhYiAmJiB0aGlzLmFjdGl2ZVRhYi5lbmFibGVkICwgKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmFjdGl2ZVRhYi5lbmFibGVkKXtcbiAgICAgICAgdGhpcy5zdHJhdGVneSh0aGlzKVxuICAgICAgfVxuXG4gICAgfSlcbiAgfVxuXG4gIEBjb21wdXRlZFxuICBnZXQgdGFic0J5TmFtZSgpOiB7IFtuYW1lOiBzdHJpbmddOiBQYW5lbFN0YXRlVHlwZSB9IHtcbiAgICByZXR1cm4gXy5mcm9tUGFpcnModGhpcy5wYW5lbHMubWFwKChpKSA9PiBbaS50YWJOYW1lLCBpXSkpO1xuICB9XG5cbiAgQGNvbXB1dGVkXG4gIGdldCBuZXh0VGFiKCk6IFBhbmVsU3RhdGVUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVUYWIubmV4dFxuICB9XG5cbiAgQGNvbXB1dGVkXG4gIGdldCBwcmV2aW91c1RhYigpOiBQYW5lbFN0YXRlVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVGFiLnByZXZpb3VzXG4gIH1cblxuXG4gIGFkZFRhYih0YWI6eyB0YWJOYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcgfSk6IFBhbmVsU3RhdGVUeXBlIHtcbiAgICBsZXQgbmV3VGFiOlBhbmVsU3RhdGVUeXBlO1xuICAgIHJ1bkluQWN0aW9uKCgpID0+IHtcbiAgICAgIG5ld1RhYiA9IHRoaXMuY3JlYXRlQ2hpbGRTdGF0ZSgpO1xuICAgICAgbmV3VGFiLmlkID0gdGhpcy51bmlxdWVJZEZ1bmN0aW9uKCd0YWInKTtcbiAgICAgIG5ld1RhYi50YWJOYW1lID0gdGFiLnRhYk5hbWU7XG4gICAgICBuZXdUYWIubGFiZWwgPSB0YWIubGFiZWw7XG4gICAgICBpZiAodGhpcy5wYW5lbHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSBuZXdUYWJcbiAgICAgIH1cbiAgICAgIG5ld1RhYi5wYXJlbnQgPSB0aGlzO1xuXG4gICAgICB0aGlzLnBhbmVscy5wdXNoKG5ld1RhYilcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3VGFiO1xuICB9XG5cbiAgbW92ZVRvVGFiKHRhYjogUGFuZWxTdGF0ZVR5cGUgfCBzdHJpbmcpIHtcblxuICAgIGxldCB0YWJTdGF0ZTogUGFuZWxTdGF0ZVR5cGUgPSBudWxsO1xuICAgIGlmICh0YWIgaW5zdGFuY2VvZiBBYnN0cmFjdFRhYlBhbmVsU3RhdGUpIHtcbiAgICAgIHRhYlN0YXRlID0gdGFiXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGFiU3RhdGUgPSBfLmZpbmQodGhpcy5wYW5lbHMsIChpKSA9PiBpLmlkID09IHRhYilcbiAgICB9XG5cbiAgICB0aGlzLmZvY3VzVGFiKHRhYlN0YXRlLmlkKVxuICB9XG5cbiAgQGFjdGlvbi5ib3VuZFxuICBhY3RpdmF0ZVRhYih0YWI6IFBhbmVsU3RhdGVUeXBlIHwgc3RyaW5nKSB7XG5cbiAgICBsZXQgdGFiU3RhdGU6IFBhbmVsU3RhdGVUeXBlID0gbnVsbDtcbiAgICBpZiAodGFiIGluc3RhbmNlb2YgQWJzdHJhY3RUYWJQYW5lbFN0YXRlKSB7XG4gICAgICB0YWJTdGF0ZSA9IHRhYlxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRhYlN0YXRlID0gXy5maW5kKHRoaXMucGFuZWxzLCAoaSkgPT4gaS5pZCA9PSB0YWIpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2FuQ2hhbmdlVG8odGFiU3RhdGUuaWQpKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYlN0YXRlXG4gICAgfVxuICB9XG5cbiAgQGFjdGlvbi5ib3VuZFxuICBtb3ZlVG9OZXh0VGFiKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMubmV4dFRhYikge1xuICAgICAgc2VsZi5mb2N1c1RhYih0aGlzLm5leHRUYWIuaWQpXG4gICAgfVxuICB9XG5cblxuICBAYWN0aW9uLmJvdW5kXG4gIG1vdmVUb1ByZXZpb3VzVGFiKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMucHJldmlvdXNUYWIpIHtcbiAgICAgIHNlbGYuZm9jdXNUYWIodGhpcy5wcmV2aW91c1RhYi5pZClcbiAgICB9XG4gIH1cblxuICBAYWN0aW9uLmJvdW5kXG4gIGNhbkNoYW5nZVRvKHRhYklkOiBzdHJpbmcpOiBib29sZWFuIHtcblxuICAgIGNvbnN0IHRhYiA9IF8uZmluZCh0aGlzLnBhbmVscywgKGkpID0+IGkuaWQgPT0gdGFiSWQpO1xuICAgIHJldHVybiB0YWIgJiYgdGFiLmVuYWJsZWRcbiAgfVxuXG4gIGZvY3VzVGFiKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBydW5JbkFjdGlvbigoKSA9PiB7XG4gICAgICBsZXQgdGFiTWVtYmVyVG9Gb2N1cyA9IF8uZmluZCh0aGlzLnBhbmVscywgKHBhbmVsKSA9PiBwYW5lbC5pZCA9PT0gaWQpO1xuICAgICAgaWYgKCF0YWJNZW1iZXJUb0ZvY3VzKSByZXR1cm47XG4gICAgICB0aGlzLmZvY3VzRnVuY3Rpb24odGFiTWVtYmVyVG9Gb2N1cylcbiAgICB9KVxuICB9XG5cbiAgZ2V0VGFiUGFuZWxJZChpZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaWQgKyAnLXBhbmVsJztcbiAgfVxuXG4gIEBhY3Rpb24uYm91bmRcbiAgaGFuZGxlVGFiRm9jdXModGFiSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGVUYWIodGFiSWQpO1xuICB9XG5cbiAgQGFjdGlvbi5ib3VuZFxuICB1bnJlZ2lzdGVyVGFiUGFuZWxFbGVtZW50KHRhYlBhbmVsOiB7IGlkOiBzdHJpbmc7IH0pOiB2b2lkIHtcblxuICB9XG5cbiAgQGFjdGlvbi5ib3VuZFxuICB1bnJlZ2lzdGVyVGFiRWxlbWVudCh0YWI6IHsgaWQ6IHN0cmluZzsgfSk6IHZvaWQge1xuICAgIC8vdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH1cblxuICBAYWN0aW9uLmJvdW5kXG4gIHJlZ2lzdGVyVGFiUGFuZWxFbGVtZW50KHRhYlBhbmVsOiB7IHRhYklkOiBzdHJpbmc7IG5vZGU6IGFueTsgfSk6IHZvaWQge1xuXG4gIH1cblxuICBAYWN0aW9uLmJvdW5kXG4gIHJlZ2lzdGVyVGFiRWxlbWVudCh0YWJNZW1iZXI6IHsgaWQ6IHN0cmluZzsgbm9kZTogYW55IH0pOiB2b2lkIHtcbiAgICBsZXQgdGFiTWVtYmVyVG9SZWdpc3RlciA9IF8uZmluZCh0aGlzLnBhbmVscywgKHBhbmVsKSA9PiBwYW5lbC5pZCA9PT0gdGFiTWVtYmVyLmlkKTtcbiAgICBsZXQgZm9jdXNHcm91cE1lbWJlciA9ICh0YWJNZW1iZXJUb1JlZ2lzdGVyLmxldHRlck5hdmlnYXRpb25UZXh0KSA/IHtcbiAgICAgIG5vZGU6IHRhYk1lbWJlci5ub2RlLFxuICAgICAgdGV4dDogdGFiTWVtYmVyVG9SZWdpc3Rlci5sZXR0ZXJOYXZpZ2F0aW9uVGV4dCxcbiAgICB9IDogdGFiTWVtYmVyLm5vZGU7XG4gICAgdGFiTWVtYmVyVG9SZWdpc3Rlci5ub2RlID0gdGFiTWVtYmVyLm5vZGU7XG4gICAgdGhpcy5mb2N1c0dyb3VwLmFkZE1lbWJlcihmb2N1c0dyb3VwTWVtYmVyLCB0YWJNZW1iZXIpO1xuICB9XG5cbiAgQGFjdGlvbi5ib3VuZFxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmZvY3VzR3JvdXAuYWN0aXZhdGUoKTtcbiAgfVxuXG4gIEBhY3Rpb24uYm91bmRcbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmZvY3VzR3JvdXAuZGVzdHJveSgpO1xuICB9XG5cbiAgQGFjdGlvbi5ib3VuZFxuICBwcm90ZWN0ZWQgY3JlYXRlQ2hpbGRTdGF0ZSgpOiBQYW5lbFN0YXRlVHlwZSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLnBhbmVsVHlwZSgpXG4gIH1cblxuICAvKipcbiAgICogVEVTVElORyBPTkxZOiBUaGUgZnVuY3Rpb24gdXNlZCB0byBmb2N1cyBvbiBhIHBhcnRpY3VsYXIgdGFiLiBXZSBvdmVycmlkZSBpbiBFbnp5bWUgdGVzdHNcbiAgICogQHBhcmFtIHtQYW5lbFN0YXRlVHlwZX0gcGFuZWxcbiAgICovXG4gIHByb3RlY3RlZCBmb2N1c0Z1bmN0aW9uKHBhbmVsOlBhbmVsU3RhdGVUeXBlKSB7XG4gICAgcGFuZWwubm9kZS5mb2N1cygpXG4gIH1cblxuICAvKipcbiAgICogVEVTVElORyBPTkxZOiBUaGUgZnVuY3Rpb24gdXNlZCBmb3IgZ2V0dGluZyB1bmlxdWUgaWQuIFdlIG92ZXJyaWRlIGluIHRlc3RzIHRvIGdldCBjb25zaXN0ZW50IGlkcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgcHJvdGVjdGVkIHVuaXF1ZUlkRnVuY3Rpb24ocHJlZml4PzpzdHJpbmcpOnN0cmluZyB7XG4gICAgcmV0dXJuIF8udW5pcXVlSWQocHJlZml4KVxuICB9XG5cbiAgcHJvdGVjdGVkIHN0cmF0ZWd5KHN0YXRlOnRoaXMpICB7XG4gICAgbGV0IHRlc3RUYWIgPSBzdGF0ZS5hY3RpdmVUYWIgPyBzdGF0ZS5hY3RpdmVUYWIucHJldmlvdXMgOiBudWxsO1xuICAgIHdoaWxlICh0ZXN0VGFiKVxuICAgIHtcbiAgICAgIGlmICh0ZXN0VGFiLmVuYWJsZWQpXG4gICAgICB7XG4gICAgICAgIHN0YXRlLmFjdGl2ZVRhYiA9IHRlc3RUYWI7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGVzdFRhYiA9IHRlc3RUYWIucHJldmlvdXNcbiAgICB9XG4gICAgc3RhdGUuYWN0aXZlVGFiID0gXy5maXJzdChzdGF0ZS5wYW5lbHMpXG4gIH07XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFRhYlBhbmVsU3RhdGUge1xuICBAb2JzZXJ2YWJsZSBwYXJlbnQ6IEFic3RyYWN0VGFiQ29tcG9uZW50U3RhdGU7XG4gIEBvYnNlcnZhYmxlIGlkOiBzdHJpbmc7XG4gIEBvYnNlcnZhYmxlIHRhYk5hbWU6IHN0cmluZztcbiAgQG9ic2VydmFibGUgbGFiZWw6IHN0cmluZztcblxuICBAb2JzZXJ2YWJsZSBsZXR0ZXJOYXZpZ2F0aW9uVGV4dDogc3RyaW5nO1xuXG4gIEBvYnNlcnZhYmxlIG5vZGU6IGFueTtcblxuICBhYnN0cmFjdCBnZXQgZW5hYmxlZCgpOiBib29sZWFuXG5cbiAgQGNvbXB1dGVkXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50LmFjdGl2ZVRhYiA9PT0gdGhpc1xuICB9XG5cbiAgQGNvbXB1dGVkXG4gIGdldCBwcmV2aW91cygpOiB0aGlzIHtcbiAgICBpZiAoIXRoaXMucGFyZW50IHx8ICF0aGlzLnBhcmVudC5wYW5lbHMpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBpbmRleCA9IF8uZmluZEluZGV4KHRoaXMucGFyZW50LnBhbmVscywgKGkpID0+IGkgPT0gdGhpcyk7XG4gICAgaWYgKGluZGV4ID09PSBudWxsKSB7XG4gICAgICAvLyByZXR1cm4gbnVsbCBidXQgd2UgaGF2ZSBhIHByb2JsZW0gaGVyZVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAvLyB0aGVyZSBpcyBubyBwcmV2aW91cyBvbmUgYmVjYXVzZSB3ZSdyZSBmaXJzdCFcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhcmVudC5wYW5lbHNbaW5kZXggLSAxXSBhcyB0aGlzXG4gIH1cblxuICBAY29tcHV0ZWRcbiAgZ2V0IG5leHQoKTogdGhpcyB7XG4gICAgaWYgKCF0aGlzLnBhcmVudCB8fCAhdGhpcy5wYXJlbnQucGFuZWxzKVxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBpbmRleCA9IF8uZmluZEluZGV4KHRoaXMucGFyZW50LnBhbmVscywgKGkpID0+IGkgPT0gdGhpcyk7XG4gICAgY29uc3QgcGFuZWxMZW5ndGggPSB0aGlzLnBhcmVudC5wYW5lbHMubGVuZ3RoO1xuICAgIGlmIChpbmRleCA9PT0gbnVsbCkge1xuICAgICAgLy8gcmV0dXJuIG51bGwgYnV0IHdlIGhhdmUgYSBwcm9ibGVtIGhlcmVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChpbmRleCArIDEgPj0gcGFuZWxMZW5ndGgpIHtcbiAgICAgIC8vd2UgaGF2ZSBubyBhZHZhbmNlZFxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGFyZW50LnBhbmVsc1tpbmRleCArIDFdIGFzIHRoaXNcbiAgfVxuXG4gIGJlZm9yZSh0YWI6IHRoaXMpOiBib29sZWFuIHtcbiAgICBsZXQgdGVzdEl0ZW06IHRoaXMgPSB0aGlzO1xuICAgIHdoaWxlICh0ZXN0SXRlbS5uZXh0ICE9IHRhYikge1xuICAgICAgaWYgKCF0ZXN0SXRlbS5uZXh0KVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB0ZXN0SXRlbSA9IHRlc3RJdGVtLm5leHRcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cblxuICBhZnRlcih0YWI6IHRoaXMpOiBib29sZWFuIHtcbiAgICBsZXQgdGVzdEl0ZW06IHRoaXMgPSB0aGlzO1xuICAgIHdoaWxlICh0ZXN0SXRlbS5wcmV2aW91cyAhPSB0YWIpIHtcbiAgICAgIGlmICghdGVzdEl0ZW0ucHJldmlvdXMpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIHRlc3RJdGVtID0gdGVzdEl0ZW0ucHJldmlvdXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL2NvbW1vbi93aXphcmQvUkFUL2Fic3RyYWN0X3RhYmNvbXBvbmVudF9zdGF0ZS50cyIsImZ1bmN0aW9uIEZvY3VzR3JvdXAob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHVzZXJLZXliaW5kaW5ncyA9IG9wdGlvbnMua2V5YmluZGluZ3MgfHwge307XG4gIHRoaXMuX3NldHRpbmdzID0ge1xuICAgIGtleWJpbmRpbmdzOiB7XG4gICAgICBuZXh0OiAodXNlcktleWJpbmRpbmdzLm5leHQpIHx8IHsga2V5Q29kZTogNDAgfSxcbiAgICAgIHByZXY6ICh1c2VyS2V5YmluZGluZ3MucHJldikgfHwgeyBrZXlDb2RlOiAzOCB9LFxuICAgICAgZmlyc3Q6IHVzZXJLZXliaW5kaW5ncy5maXJzdCxcbiAgICAgIGxhc3Q6IHVzZXJLZXliaW5kaW5ncy5sYXN0LFxuICAgIH0sXG4gICAgd3JhcDogb3B0aW9ucy53cmFwLFxuICAgIHN0cmluZ1NlYXJjaDogb3B0aW9ucy5zdHJpbmdTZWFyY2gsXG4gICAgc3RyaW5nU2VhcmNoRGVsYXk6IDgwMFxuICB9O1xuXG4gIC8vIENvbnN0cnVjdCBhIGtleWJpbmRpbmcgbG9va3VwIHRoYXQgd2lsbCBiZSBtb3JlIHVzZWZ1bCBsYXRlclxuICB0aGlzLl9rZXliaW5kaW5nc0xvb2t1cCA9IFtdO1xuICB2YXIgYWN0aW9uO1xuICB2YXIgZXZlbnRNYXRjaGVyc1xuICBmb3IgKGFjdGlvbiBpbiB0aGlzLl9zZXR0aW5ncy5rZXliaW5kaW5ncykge1xuICAgIGV2ZW50TWF0Y2hlcnMgPSB0aGlzLl9zZXR0aW5ncy5rZXliaW5kaW5nc1thY3Rpb25dO1xuICAgIGlmICghZXZlbnRNYXRjaGVycykgY29udGludWU7XG4gICAgW10uY29uY2F0KGV2ZW50TWF0Y2hlcnMpLmZvckVhY2goZnVuY3Rpb24oZXZlbnRNYXRjaGVyKSB7XG4gICAgICBldmVudE1hdGNoZXIubWV0YUtleSA9IGV2ZW50TWF0Y2hlci5tZXRhS2V5IHx8IGZhbHNlO1xuICAgICAgZXZlbnRNYXRjaGVyLmN0cmxLZXkgPSBldmVudE1hdGNoZXIuY3RybEtleSB8fCBmYWxzZTtcbiAgICAgIGV2ZW50TWF0Y2hlci5hbHRLZXkgPSBldmVudE1hdGNoZXIuYWx0S2V5IHx8IGZhbHNlO1xuICAgICAgZXZlbnRNYXRjaGVyLnNoaWZ0S2V5ID0gZXZlbnRNYXRjaGVyLnNoaWZ0S2V5IHx8IGZhbHNlO1xuICAgICAgdGhpcy5fa2V5YmluZGluZ3NMb29rdXAucHVzaCh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBldmVudE1hdGNoZXI6IGV2ZW50TWF0Y2hlclxuICAgICAgfSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHRoaXMuX3NlYXJjaFN0cmluZyA9ICcnO1xuICB0aGlzLl9tZW1iZXJzID0gW107XG4gIGlmIChvcHRpb25zLm1lbWJlcnMpIHRoaXMuc2V0TWVtYmVycyhvcHRpb25zLm1lbWJlcnMpO1xuICB0aGlzLl9ib3VuZEhhbmRsZUtleWRvd25FdmVudCA9IHRoaXMuX2hhbmRsZUtleWRvd25FdmVudC5iaW5kKHRoaXMpO1xufVxuXG5Gb2N1c0dyb3VwLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBVc2UgY2FwdHVyZSBpbiBjYXNlIG90aGVyIGxpYnJhcmllcyBtaWdodCBncmFiIGl0IGZpcnN0IC0tIGkuZS4gUmVhY3RcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2JvdW5kSGFuZGxlS2V5ZG93bkV2ZW50LCB0cnVlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5Gb2N1c0dyb3VwLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9ib3VuZEhhbmRsZUtleWRvd25FdmVudCwgdHJ1ZSk7XG4gIHRoaXMuX2NsZWFyU2VhcmNoU3RyaW5nUmVmcmVzaFRpbWVyKCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRm9jdXNHcm91cC5wcm90b3R5cGUuX2hhbmRsZUtleWRvd25FdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIC8vIE9ubHkgcmVzcG9uZCB0byBrZXlib2FyZCBldmVudHMgd2hlblxuICAvLyBmb2N1cyBpcyBhbHJlYWR5IHdpdGhpbiB0aGUgZm9jdXMtZ3JvdXBcbiAgdmFyIGFjdGl2ZUVsZW1lbnRJbmRleCA9IHRoaXMuX2dldEFjdGl2ZUVsZW1lbnRJbmRleCgpO1xuICBpZiAoYWN0aXZlRWxlbWVudEluZGV4ID09PSAtMSkgcmV0dXJuO1xuXG4gIC8vIFNlZSBpZiB0aGUgZXZlbnQgbWF0Y2hlcyBhbnkgcmVnaXN0ZXJlZCBrZXliaW5kc1xuICB2YXIgZXZlbnRCb3VuZCA9IGZhbHNlO1xuICB0aGlzLl9rZXliaW5kaW5nc0xvb2t1cC5mb3JFYWNoKGZ1bmN0aW9uKGtleWJpbmRpbmcpIHtcbiAgICBpZiAoIW1hdGNoZXNFdmVudChrZXliaW5kaW5nLmV2ZW50TWF0Y2hlciwgZXZlbnQpKSByZXR1cm47XG4gICAgZXZlbnRCb3VuZCA9IHRydWU7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBzd2l0Y2ggKGtleWJpbmRpbmcuYWN0aW9uKSB7XG4gICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgdGhpcy5tb3ZlRm9jdXNGb3J3YXJkKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncHJldic6XG4gICAgICAgIHRoaXMubW92ZUZvY3VzQmFjaygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ZpcnN0JzpcbiAgICAgICAgdGhpcy5tb3ZlRm9jdXNUb0ZpcnN0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGFzdCc6XG4gICAgICAgIHRoaXMubW92ZUZvY3VzVG9MYXN0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogcmV0dXJuO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpKTtcblxuICBpZiAoIWV2ZW50Qm91bmQpIHtcbiAgICB0aGlzLl9oYW5kbGVVbmJvdW5kS2V5KGV2ZW50KTtcbiAgfVxufTtcblxuRm9jdXNHcm91cC5wcm90b3R5cGUubW92ZUZvY3VzRm9yd2FyZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYWN0aXZlRWxlbWVudEluZGV4ID0gdGhpcy5fZ2V0QWN0aXZlRWxlbWVudEluZGV4KCk7XG4gIHZhciB0YXJnZXRJbmRleDtcbiAgaWYgKGFjdGl2ZUVsZW1lbnRJbmRleCA8IHRoaXMuX21lbWJlcnMubGVuZ3RoIC0gMSkge1xuICAgIHRhcmdldEluZGV4ID0gYWN0aXZlRWxlbWVudEluZGV4ICsgMTtcbiAgfSBlbHNlIGlmICh0aGlzLl9zZXR0aW5ncy53cmFwKSB7XG4gICAgdGFyZ2V0SW5kZXggPSAwO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldEluZGV4ID0gYWN0aXZlRWxlbWVudEluZGV4O1xuICB9XG4gIHRoaXMuZm9jdXNOb2RlQXRJbmRleCh0YXJnZXRJbmRleCk7XG4gIHJldHVybiB0YXJnZXRJbmRleDtcbn07XG5cbkZvY3VzR3JvdXAucHJvdG90eXBlLm1vdmVGb2N1c0JhY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGFjdGl2ZUVsZW1lbnRJbmRleCA9IHRoaXMuX2dldEFjdGl2ZUVsZW1lbnRJbmRleCgpO1xuICB2YXIgdGFyZ2V0SW5kZXg7XG4gIGlmIChhY3RpdmVFbGVtZW50SW5kZXggPiAwKSB7XG4gICAgdGFyZ2V0SW5kZXggPSBhY3RpdmVFbGVtZW50SW5kZXggLSAxO1xuICB9IGVsc2UgaWYgKHRoaXMuX3NldHRpbmdzLndyYXApIHtcbiAgICB0YXJnZXRJbmRleCA9IHRoaXMuX21lbWJlcnMubGVuZ3RoIC0gMTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXRJbmRleCA9IGFjdGl2ZUVsZW1lbnRJbmRleDtcbiAgfVxuICB0aGlzLmZvY3VzTm9kZUF0SW5kZXgodGFyZ2V0SW5kZXgpO1xuICByZXR1cm4gdGFyZ2V0SW5kZXg7XG59O1xuXG5Gb2N1c0dyb3VwLnByb3RvdHlwZS5tb3ZlRm9jdXNUb0ZpcnN0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZm9jdXNOb2RlQXRJbmRleCgwKTtcbn07XG5cbkZvY3VzR3JvdXAucHJvdG90eXBlLm1vdmVGb2N1c1RvTGFzdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZvY3VzTm9kZUF0SW5kZXgodGhpcy5fbWVtYmVycy5sZW5ndGggLSAxKTtcbn07XG5cbkZvY3VzR3JvdXAucHJvdG90eXBlLl9oYW5kbGVVbmJvdW5kS2V5ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKCF0aGlzLl9zZXR0aW5ncy5zdHJpbmdTZWFyY2gpIHJldHVybjtcblxuICAvLyBXaGlsZSBhIHN0cmluZyBzZWFyY2ggaXMgdW5kZXJ3YXksIGlnbm9yZSBzcGFjZXNcbiAgLy8gYW5kIHByZXZlbnQgdGhlIGRlZmF1bHQgc3BhY2Uta2V5IGJlaGF2aW9yXG4gIGlmICh0aGlzLl9zZWFyY2hTdHJpbmcgIT09ICcnICYmIChldmVudC5rZXkgPT09ICcgJyB8fCBldmVudC5rZXlDb2RlID09PSAzMikpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8vIE9ubHkgcmVzcG9uZCB0byBsZXR0ZXIga2V5c1xuICBpZiAoIWlzTGV0dGVyS2V5Q29kZShldmVudC5rZXlDb2RlKSkgcmV0dXJuIC0xO1xuXG4gIC8vIElmIHRoZSBsZXR0ZXIga2V5IGlzIHBhcnQgb2YgYSBrZXkgY29tYm8sXG4gIC8vIGxldCBpdCBkbyB3aGF0ZXZlciBpdCB3YXMgZ29pbmcgdG8gZG9cbiAgaWYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSB8fCBldmVudC5hbHRLZXkpIHJldHVybiAtMTtcblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHRoaXMuX2FkZFRvU2VhcmNoU3RyaW5nKFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQua2V5Q29kZSkpO1xuICB0aGlzLl9ydW5TdHJpbmdTZWFyY2goKTtcbn07XG5cbkZvY3VzR3JvdXAucHJvdG90eXBlLl9jbGVhclNlYXJjaFN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9zZWFyY2hTdHJpbmcgPSAnJztcbn07XG5cbkZvY3VzR3JvdXAucHJvdG90eXBlLl9hZGRUb1NlYXJjaFN0cmluZyA9IGZ1bmN0aW9uKGxldHRlcikge1xuICAvLyBBbHdheXMgc3RvcmUgdGhlIGxvd2VyY2FzZSB2ZXJzaW9uIG9mIHRoZSBsZXR0ZXJcbiAgdGhpcy5fc2VhcmNoU3RyaW5nICs9IGxldHRlci50b0xvd2VyQ2FzZSgpO1xufTtcblxuRm9jdXNHcm91cC5wcm90b3R5cGUuX3N0YXJ0U2VhcmNoU3RyaW5nUmVmcmVzaFRpbWVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fY2xlYXJTZWFyY2hTdHJpbmdSZWZyZXNoVGltZXIoKTtcbiAgdGhpcy5fc3RyaW5nU2VhcmNoVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuX2NsZWFyU2VhcmNoU3RyaW5nKCk7XG4gIH0sIHRoaXMuX3NldHRpbmdzLnN0cmluZ1NlYXJjaERlbGF5KTtcbn07XG5cbkZvY3VzR3JvdXAucHJvdG90eXBlLl9jbGVhclNlYXJjaFN0cmluZ1JlZnJlc2hUaW1lciA9IGZ1bmN0aW9uKCkge1xuICBjbGVhclRpbWVvdXQodGhpcy5fc3RyaW5nU2VhcmNoVGltZXIpO1xufTtcblxuRm9jdXNHcm91cC5wcm90b3R5cGUuX3J1blN0cmluZ1NlYXJjaCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9zdGFydFNlYXJjaFN0cmluZ1JlZnJlc2hUaW1lcigpO1xuICB0aGlzLm1vdmVGb2N1c0J5U3RyaW5nKHRoaXMuX3NlYXJjaFN0cmluZyk7XG59O1xuXG5Gb2N1c0dyb3VwLnByb3RvdHlwZS5tb3ZlRm9jdXNCeVN0cmluZyA9IGZ1bmN0aW9uKHN0cikge1xuICB2YXIgbWVtYmVyO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuX21lbWJlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgbWVtYmVyID0gdGhpcy5fbWVtYmVyc1tpXTtcbiAgICBpZiAoIW1lbWJlci50ZXh0KSBjb250aW51ZTtcblxuICAgIGlmIChtZW1iZXIudGV4dC5pbmRleE9mKHN0cikgPT09IDApIHtcbiAgICAgIHJldHVybiBmb2N1c05vZGUobWVtYmVyLm5vZGUpO1xuICAgIH1cbiAgfVxufTtcblxuRm9jdXNHcm91cC5wcm90b3R5cGUuX2ZpbmRJbmRleE9mTm9kZSA9IGZ1bmN0aW9uKHNlYXJjaE5vZGUpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLl9tZW1iZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGlmICh0aGlzLl9tZW1iZXJzW2ldLm5vZGUgPT09IHNlYXJjaE5vZGUpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5Gb2N1c0dyb3VwLnByb3RvdHlwZS5fZ2V0QWN0aXZlRWxlbWVudEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9maW5kSW5kZXhPZk5vZGUoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG59O1xuXG5Gb2N1c0dyb3VwLnByb3RvdHlwZS5mb2N1c05vZGVBdEluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgdmFyIG1lbWJlciA9IHRoaXMuX21lbWJlcnNbaW5kZXhdO1xuICBpZiAobWVtYmVyKSBmb2N1c05vZGUobWVtYmVyLm5vZGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkZvY3VzR3JvdXAucHJvdG90eXBlLmFkZE1lbWJlciA9IGZ1bmN0aW9uKG1lbWJlckRhdGEsIGluZGV4KSB7XG4gIHZhciBub2RlID0gbWVtYmVyRGF0YS5ub2RlIHx8IG1lbWJlckRhdGE7XG4gIHZhciBub2RlVGV4dCA9IG1lbWJlckRhdGEudGV4dCB8fCBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1mb2N1cy1ncm91cC10ZXh0JykgfHwgbm9kZS50ZXh0Q29udGVudCB8fCAnJztcblxuICB0aGlzLl9jaGVja05vZGUobm9kZSk7XG5cbiAgdmFyIGNsZWFuZWROb2RlVGV4dCA9IG5vZGVUZXh0LnJlcGxhY2UoL1tcXFdfXS9nLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgdmFyIG1lbWJlciA9IHtcbiAgICBub2RlOiBub2RlLFxuICAgIHRleHQ6IGNsZWFuZWROb2RlVGV4dCxcbiAgfTtcblxuICBpZiAoaW5kZXggIT09IG51bGwgJiYgaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX21lbWJlcnMuc3BsaWNlKGluZGV4LCAwLCBtZW1iZXIpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX21lbWJlcnMucHVzaChtZW1iZXIpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuRm9jdXNHcm91cC5wcm90b3R5cGUucmVtb3ZlTWVtYmVyID0gZnVuY3Rpb24obWVtYmVyKSB7XG4gIHZhciByZW1vdmFsSW5kZXggPSAodHlwZW9mIG1lbWJlciA9PT0gJ251bWJlcicpXG4gICAgPyBtZW1iZXJcbiAgICA6IHRoaXMuX2ZpbmRJbmRleE9mTm9kZShtZW1iZXIpO1xuICBpZiAocmVtb3ZhbEluZGV4ID09PSAtMSkgcmV0dXJuO1xuICB0aGlzLl9tZW1iZXJzLnNwbGljZShyZW1vdmFsSW5kZXgsIDEpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkZvY3VzR3JvdXAucHJvdG90eXBlLmNsZWFyTWVtYmVycyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9tZW1iZXJzID0gW107XG4gIHJldHVybiB0aGlzO1xufTtcblxuRm9jdXNHcm91cC5wcm90b3R5cGUuc2V0TWVtYmVycyA9IGZ1bmN0aW9uKG5leHRNZW1iZXJzKSB7XG4gIHRoaXMuY2xlYXJNZW1iZXJzKCk7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gbmV4dE1lbWJlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdGhpcy5hZGRNZW1iZXIobmV4dE1lbWJlcnNbaV0pO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuRm9jdXNHcm91cC5wcm90b3R5cGUuZ2V0TWVtYmVycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fbWVtYmVycztcbn07XG5cbkZvY3VzR3JvdXAucHJvdG90eXBlLl9jaGVja05vZGUgPSBmdW5jdGlvbihub2RlKSB7XG4gIGlmICghbm9kZS5ub2RlVHlwZSB8fCBub2RlLm5vZGVUeXBlICE9PSB3aW5kb3cuTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZvY3VzLWdyb3VwOiBvbmx5IERPTSBub2RlcyBhbGxvd2VkJyk7XG4gIH1cbiAgcmV0dXJuIG5vZGU7XG59O1xuXG5mdW5jdGlvbiBtYXRjaGVzRXZlbnQobWF0Y2hlciwgZXZlbnQpIHtcbiAgZm9yICh2YXIga2V5IGluIG1hdGNoZXIpIHtcbiAgICBpZiAoZXZlbnRba2V5XSAhPT0gdW5kZWZpbmVkICYmIG1hdGNoZXJba2V5XSAhPT0gZXZlbnRba2V5XSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc0xldHRlcktleUNvZGUoa2V5Q29kZSkge1xuICByZXR1cm4ga2V5Q29kZSA+PSA2NSAmJiBrZXlDb2RlIDw9IDkwO1xufVxuXG5mdW5jdGlvbiBmb2N1c05vZGUobm9kZSkge1xuICBpZiAoIW5vZGUgfHwgIW5vZGUuZm9jdXMpIHJldHVybjtcbiAgbm9kZS5mb2N1cygpO1xuICBpZiAobm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIG5vZGUuc2VsZWN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRm9jdXNHcm91cChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRm9jdXNHcm91cChvcHRpb25zKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mb2N1cy1ncm91cC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gODAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8vIExpY2Vuc2U6IExHUEwtMy4wLW9yLWxhdGVyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge29ic2VydmVyfSBmcm9tICdtb2J4LXJlYWN0JztcbmltcG9ydCB7SW5qZWN0ZWRJbnRsUHJvcHMsIGluamVjdEludGx9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHtGaWVsZH0gZnJvbSBcIm1vYngtcmVhY3QtZm9ybVwiO1xuaW1wb3J0IHtjb21wdXRlZH0gZnJvbSAnbW9ieCc7XG5pbXBvcnQge1dpemFyZFBhbmVsLCBXaXphcmRUYWJQYW5lbFByb3BzfSBmcm9tIFwiLi4vY29tbW9uL3dpemFyZC9XaXphcmRQYW5lbFwiO1xuaW1wb3J0IHtXaXphcmRUYWJQYW5lbFN0YXRlfSBmcm9tIFwiLi4vY29tbW9uL3dpemFyZC93aXphcmRfc3RhdGVcIjtcbmltcG9ydCBVc2VySW5mb0Zvcm0gZnJvbSBcIi4vVXNlckluZm9Gb3JtXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckluZm9QYW5lbFByb3BzIGV4dGVuZHMgV2l6YXJkVGFiUGFuZWxQcm9wcyB7XG4gIGJ1dHRvblRleHQ6IHN0cmluZ1xuICBidXR0b25UZXh0T25Qcm9ncmVzcz86c3RyaW5nXG59XG5cbmNsYXNzIFVzZXJJbmZvUGFuZWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8VXNlckluZm9QYW5lbFByb3BzICYgSW5qZWN0ZWRJbnRsUHJvcHMsIHt9PiB7XG5cbiAgQGNvbXB1dGVkXG4gIGdldCB3aXphcmRUYWIoKTogV2l6YXJkVGFiUGFuZWxTdGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMudGFiXG4gIH1cblxuICBAY29tcHV0ZWRcbiAgZ2V0IGZvcm0oKTpGaWVsZHtcbiAgICByZXR1cm4gdGhpcy53aXphcmRUYWIuZm9ybVxuICB9XG5cbiAgQGNvbXB1dGVkXG4gIGdldCBzdWJtaXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5vblN1Ym1pdFxuICB9XG5cbiAgQGNvbXB1dGVkXG4gIGdldCB0YWJOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLndpemFyZFRhYi50YWJOYW1lO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8V2l6YXJkUGFuZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYj17dGhpcy53aXphcmRUYWJ9IGtleT17dGhpcy50YWJOYW1lfVxuICAgID5cbiAgICAgIDxVc2VySW5mb0Zvcm0gZm9ybT17dGhpcy5mb3JtfSBidXR0b25UZXh0PXt0aGlzLnByb3BzLmJ1dHRvblRleHR9IGJ1dHRvblRleHRPblByb2dyZXNzPXt0aGlzLnByb3BzLmJ1dHRvblRleHRPblByb2dyZXNzfS8+XG5cbiAgICA8L1dpemFyZFBhbmVsPjtcbiAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5qZWN0SW50bChvYnNlcnZlcihVc2VySW5mb1BhbmVsKSlcblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbl9wYWdlL1VzZXJJbmZvUGFuZWwudHN4Il0sInNvdXJjZVJvb3QiOiIifQ==