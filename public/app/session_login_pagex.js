webpackJsonp([3],{

/***/ 1:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 100:
/***/ (function(module, exports) {

module.exports = I18n;

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ 803:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// License: LGPL-3.0-or-later
// require a root component here. This will be treated as the root of a webpack package
var Root_1 = __webpack_require__(98);
var SessionLoginPage_1 = __webpack_require__(804);
var ReactDOM = __webpack_require__(8);
var React = __webpack_require__(1);
function LoadReactPage(element) {
    ReactDOM.render(React.createElement(Root_1.default, null,
        React.createElement(SessionLoginPage_1.default, null)), element);
}
window.LoadReactPage = LoadReactPage;


/***/ }),

/***/ 804:
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
var SessionLoginForm_1 = __webpack_require__(805);
var SessionLoginPage = /** @class */ (function (_super) {
    __extends(SessionLoginPage, _super);
    function SessionLoginPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SessionLoginPage.prototype.render = function () {
        return React.createElement("div", { className: "tw-bs" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: 'col-sm-6' },
                        React.createElement("h1", null,
                            React.createElement(react_intl_1.FormattedMessage, { id: "login.header" })),
                        React.createElement(SessionLoginForm_1.default, { buttonText: "login.login", buttonTextOnProgress: "login.logging_in" })))));
    };
    return SessionLoginPage;
}(React.Component));
exports.default = react_intl_1.injectIntl(mobx_react_1.observer(SessionLoginPage));


/***/ }),

/***/ 805:
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
var react_intl_1 = __webpack_require__(16);
var vjf_rules_1 = __webpack_require__(97);
var sign_in_1 = __webpack_require__(141);
var houdini_form_1 = __webpack_require__(86);
var mobx_1 = __webpack_require__(4);
var fields_1 = __webpack_require__(94);
var ProgressableButton_1 = __webpack_require__(96);
exports.FieldDefinitions = [
    {
        name: 'email',
        type: 'text',
        validators: [vjf_rules_1.Validations.isFilled]
    },
    {
        name: 'password',
        type: 'password',
        validators: [vjf_rules_1.Validations.isFilled]
    }
];
var SessionPageForm = /** @class */ (function (_super) {
    __extends(SessionPageForm, _super);
    function SessionPageForm(definition, options) {
        var _this = _super.call(this, definition, options) || this;
        _this.inputToForm = {
            'email': 'email',
            'password': 'password'
        };
        _this.converter = new houdini_form_1.StaticFormToErrorAndBackConverter(_this.inputToForm);
        return _this;
    }
    SessionPageForm.prototype.options = function () {
        return {
            validateOnInit: true,
            validateOnChange: true,
            retrieveOnlyDirtyValues: true,
            retrieveOnlyEnabledFields: true
        };
    };
    SessionPageForm.prototype.hooks = function () {
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
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.signinApi.postLogin(input)];
                        case 2:
                            r = _a.sent();
                            window.location.reload();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            if (e_1.error) {
                                f.invalidateFromServer(e_1.error);
                            }
                            else {
                                f.invalidateFromServer(e_1);
                            }
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); }
        };
    };
    return SessionPageForm;
}(houdini_form_1.HoudiniForm));
exports.SessionPageForm = SessionPageForm;
var InnerSessionLoginForm = /** @class */ (function (_super) {
    __extends(InnerSessionLoginForm, _super);
    function InnerSessionLoginForm(props) {
        var _this = _super.call(this, props) || this;
        _this.createForm();
        return _this;
    }
    InnerSessionLoginForm.prototype.createForm = function () {
        this.form = new SessionPageForm({ fields: exports.FieldDefinitions });
    };
    InnerSessionLoginForm.prototype.componentWillMount = function () {
        var _this = this;
        mobx_1.runInAction(function () {
            _this.form.signinApi = _this.props.ApiManager.get(sign_in_1.WebUserSignInOut);
        });
    };
    InnerSessionLoginForm.prototype.render = function () {
        var errorDiv = !this.form.isValid || this.form.hasServerError ? React.createElement("div", { className: "form-group has-error" },
            React.createElement("div", { className: "help-block", role: "alert" }, this.form.serverError)) : '';
        return React.createElement("form", { onSubmit: this.form.onSubmit },
            React.createElement(fields_1.BasicField, { field: this.form.$('email'), label: this.props.intl.formatMessage({ id: 'login.email' }), inputClassNames: "input-lg" }),
            React.createElement(fields_1.BasicField, { field: this.form.$('password'), label: this.props.intl.formatMessage({ id: 'login.password' }), inputClassNames: "input-lg" }),
            errorDiv,
            React.createElement("div", { className: 'form-group' },
                React.createElement(ProgressableButton_1.default, { onClick: this.form.onSubmit, className: "button", disabled: !this.form.isValid || this.form.submitting, inProgress: this.form.submitting, buttonText: this.props.intl.formatMessage({ id: this.props.buttonText }), buttonTextOnProgress: this.props.intl.formatMessage({ id: this.props.buttonTextOnProgress }) })),
            React.createElement("div", { className: 'row' },
                React.createElement("div", { className: 'col-xs-12 col-sm-6 login-bottom-link' },
                    React.createElement("a", { href: '/users/password/new' },
                        React.createElement(react_intl_1.FormattedMessage, { id: "login.forgot_password" }))),
                React.createElement("div", { className: 'col-xs-12 col-sm-6 login-bottom-link' },
                    React.createElement("a", { href: '/onboard' },
                        React.createElement("div", { className: 'visible-xs-block' },
                            React.createElement(react_intl_1.FormattedMessage, { id: "login.get_started" })),
                        React.createElement("div", { className: "hidden-xs", style: { "textAlign": "right" } },
                            React.createElement(react_intl_1.FormattedMessage, { id: "login.get_started" }))))));
    };
    __decorate([
        mobx_1.action.bound
    ], InnerSessionLoginForm.prototype, "createForm", null);
    __decorate([
        mobx_1.observable
    ], InnerSessionLoginForm.prototype, "form", void 0);
    return InnerSessionLoginForm;
}(React.Component));
exports.default = react_intl_1.injectIntl(mobx_react_1.inject('ApiManager')(mobx_react_1.observer(InnerSessionLoginForm)));


/***/ })

},[803]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkkxOG5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdERPTVwiIiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL2FwcC9zZXNzaW9uX2xvZ2luX3BhZ2UudHN4Iiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL3Nlc3Npb25fbG9naW5fcGFnZS9TZXNzaW9uTG9naW5QYWdlLnRzeCIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9zZXNzaW9uX2xvZ2luX3BhZ2UvU2Vzc2lvbkxvZ2luRm9ybS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Qjs7Ozs7OztBQ0FBLHNCOzs7Ozs7O0FDQUEsMEI7Ozs7Ozs7Ozs7QUNBQSw2QkFBNkI7QUFDN0IsdUZBQXVGO0FBQ3ZGLHFDQUFnRDtBQUNoRCxrREFBb0Y7QUFFcEYsc0NBQXFDO0FBQ3JDLG1DQUE4QjtBQUU5Qix1QkFBdUIsT0FBbUI7SUFDeEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxjQUFJO1FBQUMsb0JBQUMsMEJBQWdCLE9BQUUsQ0FBTyxFQUFFLE9BQU8sQ0FBQztBQUM1RCxDQUFDO0FBR0EsTUFBYyxDQUFDLGFBQWEsR0FBRyxhQUFhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiN0MsNkJBQTZCO0FBQzdCLG1DQUErQjtBQUMvQiwwQ0FBc0M7QUFDdEMsMkNBQXlGO0FBQ3pGLGtEQUFrRDtBQU9sRDtJQUErQixvQ0FBOEQ7SUFBN0Y7O0lBUUEsQ0FBQztJQVBDLGlDQUFNLEdBQU47UUFDRyxPQUFPLDZCQUFLLFNBQVMsRUFBQyxPQUFPO1lBQUMsNkJBQUssU0FBUyxFQUFDLFdBQVc7Z0JBQUMsNkJBQUssU0FBUyxFQUFDLEtBQUs7b0JBQUMsNkJBQUssU0FBUyxFQUFFLFVBQVU7d0JBQ3RHOzRCQUFJLG9CQUFDLDZC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eC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyIsIm1vZHVsZS5leHBvcnRzID0gSTE4bjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkkxOG5cIlxuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3RET007XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdERPTVwiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyIsIi8vIExpY2Vuc2U6IExHUEwtMy4wLW9yLWxhdGVyXG4vLyByZXF1aXJlIGEgcm9vdCBjb21wb25lbnQgaGVyZS4gVGhpcyB3aWxsIGJlIHRyZWF0ZWQgYXMgdGhlIHJvb3Qgb2YgYSB3ZWJwYWNrIHBhY2thZ2VcbmltcG9ydCBSb290IGZyb20gXCIuLi9zcmMvY29tcG9uZW50cy9jb21tb24vUm9vdFwiXG5pbXBvcnQgU2Vzc2lvbkxvZ2luUGFnZSBmcm9tIFwiLi4vc3JjL2NvbXBvbmVudHMvc2Vzc2lvbl9sb2dpbl9wYWdlL1Nlc3Npb25Mb2dpblBhZ2VcIlxuXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcblxuZnVuY3Rpb24gTG9hZFJlYWN0UGFnZShlbGVtZW50OkhUTUxFbGVtZW50KSB7XG4gIFJlYWN0RE9NLnJlbmRlcig8Um9vdD48U2Vzc2lvbkxvZ2luUGFnZS8+PC9Sb290PiwgZWxlbWVudClcbn1cblxuXG4od2luZG93IGFzIGFueSkuTG9hZFJlYWN0UGFnZSA9IExvYWRSZWFjdFBhZ2VcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qYXZhc2NyaXB0cy9hcHAvc2Vzc2lvbl9sb2dpbl9wYWdlLnRzeCIsIi8vIExpY2Vuc2U6IExHUEwtMy4wLW9yLWxhdGVyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBvYnNlcnZlciB9IGZyb20gJ21vYngtcmVhY3QnO1xuaW1wb3J0IHtJbmplY3RlZEludGxQcm9wcywgaW5qZWN0SW50bCwgSW5qZWN0ZWRJbnRsLCBGb3JtYXR0ZWRNZXNzYWdlfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCBTZXNzaW9uTG9naW5Gb3JtIGZyb20gXCIuL1Nlc3Npb25Mb2dpbkZvcm1cIjtcblxuZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uTG9naW5QYWdlUHJvcHNcbntcblxufVxuXG5jbGFzcyBTZXNzaW9uTG9naW5QYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFNlc3Npb25Mb2dpblBhZ2VQcm9wcyAmIEluamVjdGVkSW50bFByb3BzLCB7fT4ge1xuICByZW5kZXIoKSB7XG4gICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInR3LWJzXCI+PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj48ZGl2IGNsYXNzTmFtZT1cInJvd1wiPjxkaXYgY2xhc3NOYW1lPXsnY29sLXNtLTYnfT5cbiAgICAgICA8aDE+PEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJsb2dpbi5oZWFkZXJcIi8+PC9oMT5cbiAgICAgICA8U2Vzc2lvbkxvZ2luRm9ybSBidXR0b25UZXh0PVwibG9naW4ubG9naW5cIiBidXR0b25UZXh0T25Qcm9ncmVzcz1cImxvZ2luLmxvZ2dpbmdfaW5cIi8+XG4gICAgIDwvZGl2PjwvZGl2PlxuICAgICA8L2Rpdj48L2Rpdj47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5qZWN0SW50bChvYnNlcnZlcihTZXNzaW9uTG9naW5QYWdlKSlcblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2phdmFzY3JpcHRzL3NyYy9jb21wb25lbnRzL3Nlc3Npb25fbG9naW5fcGFnZS9TZXNzaW9uTG9naW5QYWdlLnRzeCIsIi8vIExpY2Vuc2U6IExHUEwtMy4wLW9yLWxhdGVyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBvYnNlcnZlciwgaW5qZWN0fSBmcm9tICdtb2J4LXJlYWN0JztcbmltcG9ydCB7SW5qZWN0ZWRJbnRsUHJvcHMsIGluamVjdEludGwsIEZvcm1hdHRlZE1lc3NhZ2V9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHtGaWVsZCwgRmllbGREZWZpbml0aW9uLCBGb3JtLCBpbml0aWFsaXphdGlvbkRlZmluaXRpb259IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcy9tb2J4LXJlYWN0LWZvcm1cIjtcbmltcG9ydCB7VmFsaWRhdGlvbnN9IGZyb20gXCIuLi8uLi9saWIvdmpmX3J1bGVzXCI7XG5pbXBvcnQge1dlYkxvZ2luTW9kZWwsIFdlYlVzZXJTaWduSW5PdXR9IGZyb20gXCIuLi8uLi9saWIvYXBpL3NpZ25faW5cIjtcblxuaW1wb3J0IHtIb3VkaW5pRm9ybSwgU3RhdGljRm9ybVRvRXJyb3JBbmRCYWNrQ29udmVydGVyfSBmcm9tIFwiLi4vLi4vbGliL2hvdWRpbmlfZm9ybVwiO1xuaW1wb3J0IHtvYnNlcnZhYmxlLCBhY3Rpb24sIHJ1bkluQWN0aW9ufSBmcm9tICdtb2J4J1xuaW1wb3J0IHtBcGlNYW5hZ2VyfSBmcm9tIFwiLi4vLi4vbGliL2FwaV9tYW5hZ2VyXCI7XG5pbXBvcnQge0Jhc2ljRmllbGR9IGZyb20gXCIuLi9jb21tb24vZmllbGRzXCI7XG5pbXBvcnQgUHJvZ3Jlc3NhYmxlQnV0dG9uIGZyb20gXCIuLi9jb21tb24vUHJvZ3Jlc3NhYmxlQnV0dG9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2Vzc2lvbkxvZ2luRm9ybVByb3BzXG57XG5cbiAgYnV0dG9uVGV4dDpzdHJpbmdcbiAgYnV0dG9uVGV4dE9uUHJvZ3Jlc3M6c3RyaW5nXG4gIEFwaU1hbmFnZXI/OiBBcGlNYW5hZ2VyXG59XG5cbmV4cG9ydCBjb25zdCBGaWVsZERlZmluaXRpb25zIDogQXJyYXk8RmllbGREZWZpbml0aW9uPiA9IFtcbiAge1xuICAgIG5hbWU6ICdlbWFpbCcsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIHZhbGlkYXRvcnM6IFtWYWxpZGF0aW9ucy5pc0ZpbGxlZF1cbiAgfSxcbiAge1xuICAgIG5hbWU6ICdwYXNzd29yZCcsXG4gICAgdHlwZTogJ3Bhc3N3b3JkJyxcbiAgICB2YWxpZGF0b3JzOiBbVmFsaWRhdGlvbnMuaXNGaWxsZWRdXG4gIH1cbl1cblxuZXhwb3J0IGNsYXNzIFNlc3Npb25QYWdlRm9ybSBleHRlbmRzIEhvdWRpbmlGb3JtIHtcbiAgY29udmVydGVyOiBTdGF0aWNGb3JtVG9FcnJvckFuZEJhY2tDb252ZXJ0ZXI8V2ViTG9naW5Nb2RlbD5cblxuICBjb25zdHJ1Y3RvcihkZWZpbml0aW9uOiBpbml0aWFsaXphdGlvbkRlZmluaXRpb24sIG9wdGlvbnM/OiBhbnkpIHtcbiAgICBzdXBlcihkZWZpbml0aW9uLCBvcHRpb25zKVxuICAgIHRoaXMuY29udmVydGVyID0gbmV3IFN0YXRpY0Zvcm1Ub0Vycm9yQW5kQmFja0NvbnZlcnRlcjxXZWJMb2dpbk1vZGVsPih0aGlzLmlucHV0VG9Gb3JtKVxuICB9XG5cbiAgc2lnbmluQXBpOiBXZWJVc2VyU2lnbkluT3V0XG5cbiAgb3B0aW9ucygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsaWRhdGVPbkluaXQ6IHRydWUsXG4gICAgICB2YWxpZGF0ZU9uQ2hhbmdlOiB0cnVlLFxuICAgICAgcmV0cmlldmVPbmx5RGlydHlWYWx1ZXM6IHRydWUsXG4gICAgICByZXRyaWV2ZU9ubHlFbmFibGVkRmllbGRzOiB0cnVlXG4gICAgfVxuICB9XG5cbiAgaW5wdXRUb0Zvcm0gPSB7XG4gICAgJ2VtYWlsJzogJ2VtYWlsJyxcbiAgICAncGFzc3dvcmQnOiAncGFzc3dvcmQnXG4gIH1cblxuICBob29rcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb25TdWNjZXNzOiBhc3luYyAoZjpTZXNzaW9uUGFnZUZvcm0pID0+IHtcbiAgICAgICAgbGV0IGlucHV0ID0gdGhpcy5jb252ZXJ0ZXIuY29udmVydEZvcm1Ub09iamVjdChmKVxuXG4gICAgICAgIHRyeXtcbiAgICAgICAgICBsZXQgciA9IGF3YWl0IHRoaXMuc2lnbmluQXBpLnBvc3RMb2dpbihpbnB1dClcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKXtcbiAgICAgICAgICBpZiAoZS5lcnJvcikge1xuICAgICAgICAgICAgZi5pbnZhbGlkYXRlRnJvbVNlcnZlcihlLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGYuaW52YWxpZGF0ZUZyb21TZXJ2ZXIoZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5jbGFzcyBJbm5lclNlc3Npb25Mb2dpbkZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8U2Vzc2lvbkxvZ2luRm9ybVByb3BzICYgSW5qZWN0ZWRJbnRsUHJvcHMsIHt9PiB7XG4gIGNvbnN0cnVjdG9yKHByb3BzOiBTZXNzaW9uTG9naW5Gb3JtUHJvcHMgJiBJbmplY3RlZEludGxQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xuICB9XG5cbiAgQGFjdGlvbi5ib3VuZFxuICBjcmVhdGVGb3JtKCkge1xuICAgIHRoaXMuZm9ybSA9IG5ldyBTZXNzaW9uUGFnZUZvcm0oe2ZpZWxkczogRmllbGREZWZpbml0aW9uc30pXG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICBydW5JbkFjdGlvbigoKSA9PiB7XG4gICAgICB0aGlzLmZvcm0uc2lnbmluQXBpID0gdGhpcy5wcm9wcy5BcGlNYW5hZ2VyLmdldChXZWJVc2VyU2lnbkluT3V0KVxuICAgIH0pXG4gIH1cblxuICBAb2JzZXJ2YWJsZSBmb3JtOiBTZXNzaW9uUGFnZUZvcm1cblxuICByZW5kZXIoKSB7XG5cbiAgICBsZXQgZXJyb3JEaXYgPSAhdGhpcy5mb3JtLmlzVmFsaWQgfHwgdGhpcy5mb3JtLmhhc1NlcnZlckVycm9yID8gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGhhcy1lcnJvclwiPjxkaXYgY2xhc3NOYW1lPVwiaGVscC1ibG9ja1wiIHJvbGU9XCJhbGVydFwiPnt0aGlzLmZvcm0uc2VydmVyRXJyb3J9PC9kaXY+PC9kaXY+IDogJydcblxuICAgIHJldHVybiA8Zm9ybSBvblN1Ym1pdD17dGhpcy5mb3JtLm9uU3VibWl0fT5cbiAgICAgIDxCYXNpY0ZpZWxkIGZpZWxkPXt0aGlzLmZvcm0uJCgnZW1haWwnKX1cbiAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHtpZDogJ2xvZ2luLmVtYWlsJ30pfSBpbnB1dENsYXNzTmFtZXM9e1wiaW5wdXQtbGdcIn0vPlxuICAgICAgPEJhc2ljRmllbGQgZmllbGQ9e3RoaXMuZm9ybS4kKCdwYXNzd29yZCcpfVxuICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHtpZDogJ2xvZ2luLnBhc3N3b3JkJ30pfSBpbnB1dENsYXNzTmFtZXM9e1wiaW5wdXQtbGdcIn0vPlxuICAgICAge2Vycm9yRGl2fVxuICAgICAgPGRpdiBjbGFzc05hbWU9eydmb3JtLWdyb3VwJ30+XG4gICAgICAgIDxQcm9ncmVzc2FibGVCdXR0b24gb25DbGljaz17dGhpcy5mb3JtLm9uU3VibWl0fSBjbGFzc05hbWU9XCJidXR0b25cIiBkaXNhYmxlZD17IXRoaXMuZm9ybS5pc1ZhbGlkIHx8IHRoaXMuZm9ybS5zdWJtaXR0aW5nfSBpblByb2dyZXNzPXt0aGlzLmZvcm0uc3VibWl0dGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uVGV4dD17dGhpcy5wcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2Uoe2lkOiB0aGlzLnByb3BzLmJ1dHRvblRleHR9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uVGV4dE9uUHJvZ3Jlc3M9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHtpZDogdGhpcy5wcm9wcy5idXR0b25UZXh0T25Qcm9ncmVzc30pfT48L1Byb2dyZXNzYWJsZUJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9eydyb3cnfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydjb2wteHMtMTIgY29sLXNtLTYgbG9naW4tYm90dG9tLWxpbmsnfT48YSBocmVmPXsnL3VzZXJzL3Bhc3N3b3JkL25ldyd9PjxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtcImxvZ2luLmZvcmdvdF9wYXNzd29yZFwifS8+PC9hPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2NvbC14cy0xMiBjb2wtc20tNiBsb2dpbi1ib3R0b20tbGluayd9PjxhIGhyZWY9eycvb25ib2FyZCd9PjxkaXYgY2xhc3NOYW1lPXsndmlzaWJsZS14cy1ibG9jayd9PjxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtcImxvZ2luLmdldF9zdGFydGVkXCJ9Lz48L2Rpdj48ZGl2IGNsYXNzTmFtZT17XCJoaWRkZW4teHNcIn0gc3R5bGU9e3tcInRleHRBbGlnblwiOlwicmlnaHRcIn19PjxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtcImxvZ2luLmdldF9zdGFydGVkXCJ9Lz48L2Rpdj48L2E+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluamVjdEludGwoXG4gIGluamVjdCgnQXBpTWFuYWdlcicpXG4gIChvYnNlcnZlciggSW5uZXJTZXNzaW9uTG9naW5Gb3JtKVxuICApXG4pXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qYXZhc2NyaXB0cy9zcmMvY29tcG9uZW50cy9zZXNzaW9uX2xvZ2luX3BhZ2UvU2Vzc2lvbkxvZ2luRm9ybS50c3giXSwic291cmNlUm9vdCI6IiJ9