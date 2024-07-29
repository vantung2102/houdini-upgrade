/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var I18n = __webpack_require__(1);
I18n.translations || (I18n.translations = {});
I18n.translations["en"] = I18n.extend(I18n.translations["en"] || {}, { "activemodel": { "errors": { "format": "%{attribute} %{message}", "messages": { "accepted": "must be accepted", "blank": "can't be blank", "confirmation": "doesn't match confirmation", "empty": "can't be empty", "equal_to": "must be equal to %{count}", "even": "must be even", "exclusion": "is reserved", "greater_than": "must be greater than %{count}", "greater_than_or_equal_to": "must be greater than or equal to %{count}", "inclusion": "is not included in the list", "invalid": "is invalid", "less_than": "must be less than %{count}", "less_than_or_equal_to": "must be less than or equal to %{count}", "not_a_number": "is not a number", "not_an_integer": "must be an integer", "odd": "must be odd", "record_invalid": "Validation failed: %{errors}", "taken": "has already been taken", "too_long": { "one": "is too long (maximum is 1 character)", "other": "is too long (maximum is %{count} characters)" }, "too_short": { "one": "is too short (minimum is 1 character)", "other": "is too short (minimum is %{count} characters)" }, "wrong_length": { "one": "is the wrong length (should be 1 character)", "other": "is the wrong length (should be %{count} characters)" } }, "template": { "body": "There were problems with the following fields:", "header": { "one": "1 error prohibited this %{model} from being saved", "other": "%{count} errors prohibited this %{model} from being saved" } } } }, "activerecord": { "attributes": { "campaign_comment": { "body": "Comment content" } }, "errors": { "format": "%{attribute} %{message}", "messages": { "accepted": "must be accepted", "blank": "can't be blank", "confirmation": "doesn't match confirmation", "empty": "can't be empty", "equal_to": "must be equal to %{count}", "even": "must be even", "exclusion": "is reserved", "greater_than": "must be greater than %{count}", "greater_than_or_equal_to": "must be greater than or equal to %{count}", "inclusion": "is not included in the list", "invalid": "is invalid", "less_than": "must be less than %{count}", "less_than_or_equal_to": "must be less than or equal to %{count}", "not_a_number": "is not a number", "not_an_integer": "must be an integer", "odd": "must be odd", "record_invalid": "Validation failed: %{errors}", "taken": "has already been taken", "too_long": { "one": "is too long (maximum is 1 character)", "other": "is too long (maximum is %{count} characters)" }, "too_short": { "one": "is too short (minimum is 1 character)", "other": "is too short (minimum is %{count} characters)" }, "wrong_length": { "one": "is the wrong length (should be 1 character)", "other": "is the wrong length (should be %{count} characters)" } }, "template": { "body": "There were problems with the following fields:", "header": { "one": "1 error prohibited this %{model} from being saved", "other": "%{count} errors prohibited this %{model} from being saved" } } } }, "date": { "abbr_day_names": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], "abbr_month_names": [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], "day_names": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "formats": { "default": "%Y-%m-%d", "long": "%B %d, %Y", "short": "%b %d" }, "month_names": [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "order": ["year", "month", "day"] }, "datetime": { "distance_in_words": { "about_x_hours": { "one": "about 1 hour", "other": "about %{count} hours" }, "about_x_months": { "one": "about 1 month", "other": "about %{count} months" }, "about_x_years": { "one": "about 1 year", "other": "about %{count} years" }, "almost_x_years": { "one": "almost 1 year", "other": "almost %{count} years" }, "half_a_minute": "half a minute", "less_than_x_minutes": { "one": "less than a minute", "other": "less than %{count} minutes" }, "less_than_x_seconds": { "one": "less than 1 second", "other": "less than %{count} seconds" }, "over_x_years": { "one": "over 1 year", "other": "over %{count} years" }, "x_days": { "one": "1 day", "other": "%{count} days" }, "x_minutes": { "one": "1 minute", "other": "%{count} minutes" }, "x_months": { "one": "1 month", "other": "%{count} months" }, "x_seconds": { "one": "1 second", "other": "%{count} seconds" } }, "prompts": { "day": "Day", "hour": "Hour", "minute": "Minute", "month": "Month", "second": "Seconds", "year": "Year" } }, "devise": { "confirmations": { "confirmed": "We successfully confirmed your account.", "send_instructions": "We sent a new email with instructions to confirm your account. It should arrive within a few minutes (be sure to check spam and bulk folders).", "send_paranoid_instructions": "If your email address exists in our database, you will receive an email with instructions about how to confirm your account in a few minutes." }, "failure": { "already_authenticated": "Don't worry! You're already signed in.", "inactive": "Your account was not activated yet.", "invalid": "We didn't recognize that email or password.", "invalid_token": "Invalid authentication token.", "last_attempt": "You have one more attempt before your account is locked.", "locked": "Your account is locked.", "not_found_in_database": "Invalid %{authentication_keys} or password.", "timeout": "Your session expired, please sign in again to continue.", "unauthenticated": "You need to sign in or sign up before you can do that.", "unconfirmed": "You have to confirm your account before continuing." }, "mailer": { "confirmation_instructions": { "subject": "Welcome to CommitChange! Let's confirm your account." }, "password_change": { "subject": "Password Changed" }, "reset_password_instructions": { "subject": "Change your password on CommitChange" }, "unlock_instructions": { "subject": "Account unlock instructions for CommitChange" } }, "omniauth_callbacks": { "failure": "Could not sign you in from %{kind} because \"%{reason}\".", "success": "Success! We've signed you in from %{kind}." }, "passwords": { "no_token": "You can't access this page without coming from a password reset email. If you do come from a password reset email, please make sure you used the full URL provided.", "send_instructions": "Check your email for further instructions!", "send_paranoid_instructions": "If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.", "updated": "Your password was changed successfully. You are now signed in.", "updated_not_active": "Your password was changed successfully. High five." }, "registrations": { "destroyed": "Bye! Your account was successfully cancelled. We hope to see you again soon.", "invalid": "Invalid password.", "signed_up": "High five! You have signed up. Check your email for a confirmation link.", "signed_up_but_inactive": "You have signed up successfully. However, we could not sign you in because your account is not yet activated.", "signed_up_but_locked": "You have signed up successfully. However, we could not sign you in because your account is locked.", "signed_up_but_unconfirmed": "A message with a confirmation link has been sent to your email address. Please open the link to activate your account.", "update_needs_confirmation": "You updated your account successfully, but we need to verify your new email address. Please check your email and click on the confirm link to finalize confirming your new email address.", "updated": "Success! You updated your account." }, "sessions": { "already_signed_out": "Signed out successfully.", "signed_in": "", "signed_out": "" }, "unlocks": { "send_instructions": "We sent a new email with instructions to unlock your account. It should arrive within a few minutes (be sure to check spam and bulk folders).", "send_paranoid_instructions": "If your account exists, you will receive an email with instructions about how to unlock it in a few minutes.", "unlocked": "Your account has been unlocked successfully." } }, "donation": { "amount": "Total Amount", "campaign": "Campaign", "comment": "Comment", "date": "Transaction Date", "interval": "Every %{interval} %{time_unit}", "payment_id": "Payment ID", "recurring_interval": "Recurring Interval", "recurring_since": "Recurring Since" }, "errors": { "array?": "must be an array", "attr?": "is missing", "bool?": "must be boolean", "date?": "must be a date", "date_time?": "must be a date time", "decimal?": "must be a decimal", "empty?": "must be empty", "eql?": "must be equal to %{left}", "even?": "must be even", "excluded_from?": { "arg": { "default": "must not be one of: %{list}", "range": "must not be one of: %{list_left} - %{list_right}" } }, "excludes?": "must not include %{value}", "exclusion?": "must not be one of: %{list}", "false?": "must be false", "filled?": "must be filled", "float?": "must be a float", "format": "%{attribute} %{message}", "format?": "is in invalid format", "gt?": "must be greater than %{num}", "gteq?": "must be greater than or equal to %{num}", "hash?": "must be a hash", "included_in?": { "arg": { "default": "must be one of: %{list}", "range": "must be one of: %{list_left} - %{list_right}" } }, "includes?": "must include %{value}", "inclusion?": "must be one of: %{list}", "int?": "must be an integer", "key?": "is missing", "lt?": "must be less than %{num}", "lteq?": "must be less than or equal to %{num}", "max_size?": "size cannot be greater than %{num}", "messages": { "accepted": "must be accepted", "already_confirmed": "was already confirmed, please try signing in", "blank": "can't be blank", "carrierwave_download_error": "could not be downloaded", "carrierwave_integrity_error": "is not of an allowed file type", "carrierwave_processing_error": "failed to be processed", "confirmation": "doesn't match confirmation", "confirmation_period_expired": "needs to be confirmed within %{period}, please request a new one", "empty": "can't be empty", "equal_to": "must be equal to %{count}", "even": "must be even", "exclusion": "is reserved", "expired": "has expired, please request a new one", "extension_black_list_error": "You are not allowed to upload %{extension} files, prohibited types: %{prohibited_types}", "extension_white_list_error": "You are not allowed to upload %{extension} files, allowed types: %{allowed_types}", "greater_than": "must be greater than %{count}", "greater_than_or_equal_to": "must be greater than or equal to %{count}", "inclusion": "is not included in the list", "invalid": "is invalid", "less_than": "must be less than %{count}", "less_than_or_equal_to": "must be less than or equal to %{count}", "mime_types_processing_error": "Failed to process file with MIME::Types, maybe not valid content-type? Original Error: %{e}", "mini_magick_processing_error": "Failed to manipulate with MiniMagick, maybe it is not an image? Original Error: %{e}", "not_a_number": "is not a number", "not_an_integer": "must be an integer", "not_found": "not found", "not_locked": "was not locked", "not_saved": { "one": "1 error:", "other": "%{count} errors:" }, "odd": "must be odd", "record_invalid": "Validation failed: %{errors}", "rmagick_processing_error": "Failed to manipulate with rmagick, maybe it is not an image? Original Error: %{e}", "taken": "has already been taken", "too_long": { "one": "is too long (maximum is 1 character)", "other": "is too long (maximum is %{count} characters)" }, "too_short": { "one": "is too short (minimum is 1 character)", "other": "is too short (minimum is %{count} characters)" }, "wrong_length": { "one": "is the wrong length (should be 1 character)", "other": "is the wrong length (should be %{count} characters)" } }, "min_size?": "size cannot be less than %{num}", "none?": "cannot be defined", "not_eql?": "must not be equal to %{left}", "number?": "must be a number", "odd?": "must be odd", "or": "or", "size?": { "arg": { "default": "size must be %{size}", "range": "size must be within %{size_left} - %{size_right}" }, "value": { "string": { "arg": { "default": "length must be %{size}", "range": "length must be within %{size_left} - %{size_right}" } } } }, "str?": "must be a string", "template": { "body": "There were problems with the following fields:", "header": { "one": "1 error prohibited this %{model} from being saved", "other": "%{count} errors prohibited this %{model} from being saved" } }, "time?": "must be a time", "true?": "must be true", "type?": "must be %{type}" }, "flash": { "actions": { "create": { "notice": "%{resource_name} was successfully created." }, "destroy": { "alert": "%{resource_name} could not be destroyed.", "notice": "%{resource_name} was successfully destroyed." }, "update": { "notice": "%{resource_name} was successfully updated." } } }, "footer": { "about": "About", "terms_and_privacy": "Terms & Privacy" }, "grape": { "errors": { "format": "%{attributes} %{message}", "messages": { "all_or_none": "provide all or none of parameters", "at_least_one": "are missing, at least one parameter must be provided", "blank": "is empty", "coerce": "is invalid", "exactly_one": "are missing, exactly one parameter must be provided", "except_values": "has a value not allowed", "incompatible_option_values": "%{option1}: %{value1} is incompatible with %{option2}: %{value2}", "invalid_accept_header": { "problem": "Invalid accept header", "resolution": "%{message}" }, "invalid_formatter": "cannot convert %{klass} to %{to_format}", "invalid_message_body": { "problem": "message body does not match declared format", "resolution": "when specifying %{body_format} as content-type, you must pass valid %{body_format} in the request's 'body' " }, "invalid_version_header": { "problem": "Invalid version header", "resolution": "%{message}" }, "invalid_versioner_option": { "problem": "Unknown :using for versioner: %{strategy}", "resolution": "available strategy for :using is :path, :header, :accept_version_header, :param" }, "invalid_with_option_for_represent": { "problem": "You must specify an entity class in the :with option.", "resolution": "eg: represent User, :with => Entity::User" }, "is_equal_to": "must be the same", "missing_group_type": "group type is required", "missing_mime_type": { "problem": "missing mime type for %{new_format}", "resolution": "you can choose existing mime type from Grape::ContentTypes::CONTENT_TYPES or add your own with content_type :%{new_format}, 'application/%{new_format}' " }, "missing_option": "You must specify :%{option} options.", "missing_vendor_option": { "problem": "missing :vendor option.", "resolution": "eg: version 'v1', using: :header, vendor: 'twitter'", "summary": "when version using header, you must specify :vendor option. " }, "mutual_exclusion": "are mutually exclusive", "presence": "is missing", "regexp": "is invalid", "unknown_options": "unknown options: %{options}", "unknown_parameter": "unknown parameter: %{param}", "unknown_validator": "unknown validator: %{validator_type}", "unsupported_group_type": "group type must be Array, Hash, JSON or Array[JSON]", "values": "does not have a valid value" } } }, "hello": "Hello world", "helpers": { "button": { "create": "Create %{model}", "submit": "Save %{model}", "update": "Update %{model}" }, "select": { "prompt": "Please select" }, "submit": { "create": "Create %{model}", "submit": "Save %{model}", "update": "Update %{model}" } }, "i18n": { "plural": { "keys": ["one", "other"], "rule": {} } }, "login": { "email": "Email", "forgot_password": "Forgot Password?", "get_started": "Get Started", "header": "Login", "logging_in": "Logging you in...", "login": "Login", "password": "Password" }, "mailer": { "donations": { "donation_receipt": "Donation Receipt", "donor_direct_debit_notification": { "donation_queued_html": "Your direct debit donation towards <strong>%{nonprofit_name}</strong> has been queued for processing.", "recurring_donation_queued_html": "Thank you for your regular donation to <strong>%{nonprofit_name}</strong> and for joining thousands of people across Europe who are invested in making our movement a true force to be reckoned with. Your support will go towards ensuring we can move fast to win the campaigns that matter to all of us.", "subject": "Donation receipt for %{nonprofit_name}", "transfer_info_html": "This transfer will appear on your bank statement as %{label}", "transfer_label_html": "<strong>Donation %{nonprofit_statement}</strong>." }, "donor_name": "Donor Name", "donor_receipt": { "oneoff_donation_html": "Your donation towards <strong>%{nonprofit_name}</strong> was successful!", "recurring_donation_cancel_modify_html": "If you need to update your card or cancel your recurring donation, please follow this link: <a href=\"%{management_url}\">%{management_url}</a>", "recurring_donation_html": "Your recurring donation towards <strong>%{nonprofit_name}</strong>, started on %{start_date}, has been successfully paid.", "subject": "Donation receipt for %{nonprofit_name}", "transfer_info_html": "This transfer will appear on your bank statement as %{label}", "transfer_label_html": "<strong>Donation %{nonprofit_statement}</strong>." } } }, "nonprofits": { "donate": { "amount": { "custom": "Custom", "designation": { "choose": "Choose a designation (optional)", "label": "Designation:", "most_needed": "Use my donation where most needed" }, "label": "Amount", "monthly": "monthly", "next": "Next", "sustaining": "Become a sustaining, monthly contributor", "sustaining_bold": "sustaining, monthly", "sustaining_selected": "Select an amount for your monthly contribution", "sustaining_selected_bold": "monthly", "weekly": "weekly", "weekly_notice": "*to keep bank fees low, we'll debit %{amount} %{currency} monthly" }, "campaign": { "name": "", "tagline": "" }, "dedication": { "donor_note": "The donor's note was: ", "email": "Email (optional)", "first_name": "First name", "full_address": "Full Address (optional)", "in_honor_label": "In honor of", "in_memory_label": "In memory of", "info": "Add a dedication for your donation:", "last_name": "Last name", "note": "Note or message", "phone": "Phone (optional)", "save": "Save & Return" }, "followup": { "finish": "Finish", "message": "appreciates your support!", "receipt_info": "A receipt will be emailed to", "share": { "facebook": "Share", "twitter": "Tweet", "twitter_message": "Join me in supporting" }, "success": "Your donation was successful!" }, "info": { "anonymous_checkbox": "Make this donation anonymous.", "dedication_link": "Make this donation in honor/memory of someone.", "dedication_saved": "Dedicating donation to ", "label": "Info", "next": "Next", "supporter": { "address": "Address", "city": "City", "country": "Country", "email": "Email", "email_required": " (required for receipt)", "errors": { "email": { "format": "Please enter a valid email address" } }, "first_name": "First name", "full_name": "Full name", "last_name": "Last name", "other_country": "Other", "phone": "Phone", "postal_code": "Postal code", "region": "Region", "shipping_address": "Shipping address (required)", "state": "Select state" } }, "log_out": "Logout", "payment": { "card": { "cvc": "CVC", "errors": { "email": { "format": "Please enter a valid email address" }, "field": { "format": "This doesn't look like the right format", "presence": "This field is required" }, "number": { "format": "That card number doesn't look right", "presence": "Please enter your card number" } }, "loading": "Saving...", "month": "Month", "name": "Cardholder's Name", "number": "Card Number", "postal_code": "Zip Code", "secure_info": "Transactions secured with 256-bit SSL", "submit": "Submit", "year": "Year" }, "label": "Payment", "loading": { "checking_card": "Checking card...", "sending_payment": "Sending the payment..." }, "monthly_recurring": "monthly recurring", "one_time": "one-time", "sepa": { "bic": "BIC/SWIFT", "errors": { "field": { "format": "This doesn't look like the right format", "presence": "This field is required" } }, "iban": "IBAN", "name": "Account owner name" }, "tabs": { "card": "Credit Card", "sepa": "Direct Debit" } }, "signed_in": "Signed in as" } }, "number": { "currency": { "format": { "delimiter": ",", "format": "%u%n", "precision": 2, "separator": ".", "significant": false, "strip_insignificant_zeros": false, "unit": "$" } }, "format": { "delimiter": ",", "precision": 3, "separator": ".", "significant": false, "strip_insignificant_zeros": false }, "human": { "decimal_units": { "format": "%n %u", "units": { "billion": "Billion", "million": "Million", "quadrillion": "Quadrillion", "thousand": "Thousand", "trillion": "Trillion", "unit": "" } }, "format": { "delimiter": "", "precision": 3, "significant": true, "strip_insignificant_zeros": true }, "storage_units": { "format": "%n %u", "units": { "byte": { "one": "Byte", "other": "Bytes" }, "gb": "GB", "kb": "KB", "mb": "MB", "tb": "TB" } } }, "percentage": { "format": { "delimiter": "" } }, "precision": { "format": { "delimiter": "" } } }, "organization": { "name": "Organisation" }, "organization_page": { "promote": "Promote this organization" }, "registration": { "get_started": { "description": "Let's get started with Houdini. To begin, fill out your initial nonprofit and info.", "header": "Get started" }, "wizard": { "contact": { "email": { "label": "Your Email (used for login)", "placeholder": "penelope@endpovertyinthefoxvalleyinc.org" }, "name": { "label": "Your Name", "placeholder": "Penelope Schultz" }, "password": { "label": "New Password" }, "password_confirmation": { "label": "Retype Password" }, "phone": { "label": "Your Phone (for account recovery)", "placeholder": "(555) 555-5555" } }, "next": "Next", "nonprofit": { "city": { "label": "City", "placeholder": "Appleton" }, "email": { "label": "Org Email (public)", "placeholder": "contact@endpovertyinthefoxvalleyinc.org" }, "name": { "label": "Organization Name", "placeholder": "Ending Poverty in the Fox Valley Inc." }, "phone": { "label": "Org Phone (public)", "placeholder": "(555) 555-5555" }, "state": { "label": "State", "placeholder": "WI" }, "website": { "label": "Website URL", "placeholder": "http://www.endpovertyinthefoxvalleyinc.org" }, "zip": { "label": "Zip Code", "placeholder": "54915" } }, "save_and_finish": "Save & Finish", "saving": "Saving...", "tabs": { "contact": "Contact", "nonprofit": "Nonprofit" } } }, "support": { "array": { "last_word_connector": ", and ", "two_words_connector": " and ", "words_connector": ", " } }, "time": { "am": "am", "formats": { "default": "%a, %d %b %Y %H:%M:%S %z", "long": "%B %d, %Y %H:%M", "short": "%d %b %H:%M" }, "pm": "pm" } });
I18n.translations["de"] = I18n.extend(I18n.translations["de"] || {}, { "activemodel": { "errors": { "format": "%{attribute} %{message}", "messages": { "accepted": "muss akzeptiert werden", "blank": "muss ausgef\xFCllt werden", "confirmation": "stimmt nicht mit der Best\xE4tigung \xFCberein", "empty": "muss ausgef\xFCllt werden", "equal_to": "muss genau %{count} sein", "even": "muss gerade sein", "exclusion": "ist nicht verf\xFCgbar", "greater_than": "muss gr\xF6\xDFer als %{count} sein", "greater_than_or_equal_to": "muss gr\xF6\xDFer oder gleich %{count} sein", "inclusion": "ist kein g\xFCltiger Wert", "invalid": "ist nicht g\xFCltig", "less_than": "muss kleiner als %{count} sein", "less_than_or_equal_to": "muss kleiner oder gleich %{count} sein", "not_a_number": "ist keine Zahl", "not_an_integer": "muss ganzzahlig sein", "odd": "muss ungerade sein", "record_invalid": "G\xFCltigkeitspr\xFCfung ist fehlgeschlagen: %{errors}", "taken": "ist bereits vergeben", "too_long": "ist zu lang (mehr als %{count} Zeichen)", "too_short": "ist zu kurz (weniger als %{count} Zeichen)", "wrong_length": "hat die falsche L\xE4nge (muss genau %{count} Zeichen haben)" }, "template": { "body": "Bitte \xFCberpr\xFCfen Sie die folgenden Felder:", "header": { "one": "Konnte %{model} nicht speichern: ein Fehler.", "other": "Konnte %{model} nicht speichern: %{count} Fehler." } } } }, "activerecord": { "attributes": { "campaign_comment": { "body": "Inhalt kommentieren" } }, "errors": { "format": "%{attribute} %{message}", "messages": { "accepted": "muss akzeptiert werden", "blank": "muss ausgef\xFCllt werden", "confirmation": "stimmt nicht mit der Best\xE4tigung \xFCberein", "empty": "muss ausgef\xFCllt werden", "equal_to": "muss genau %{count} sein", "even": "muss gerade sein", "exclusion": "ist nicht verf\xFCgbar", "greater_than": "muss gr\xF6\xDFer als %{count} sein", "greater_than_or_equal_to": "muss gr\xF6\xDFer oder gleich %{count} sein", "inclusion": "ist kein g\xFCltiger Wert", "invalid": "ist nicht g\xFCltig", "less_than": "muss kleiner als %{count} sein", "less_than_or_equal_to": "muss kleiner oder gleich %{count} sein", "not_a_number": "ist keine Zahl", "not_an_integer": "muss ganzzahlig sein", "odd": "muss ungerade sein", "record_invalid": "G\xFCltigkeitspr\xFCfung ist fehlgeschlagen: %{errors}", "taken": "ist bereits vergeben", "too_long": "ist zu lang (mehr als %{count} Zeichen)", "too_short": "ist zu kurz (weniger als %{count} Zeichen)", "wrong_length": "hat die falsche L\xE4nge (muss genau %{count} Zeichen haben)" }, "template": { "body": "Bitte \xFCberpr\xFCfen Sie die folgenden Felder:", "header": { "one": "Konnte %{model} nicht speichern: ein Fehler.", "other": "Konnte %{model} nicht speichern: %{count} Fehler." } } } }, "date": { "abbr_day_names": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], "abbr_month_names": [null, "Jan", "Feb", "M\xE4r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"], "day_names": ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"], "formats": { "default": "%d.%m.%Y", "long": "%e. %B %Y", "short": "%e. %b" }, "month_names": [null, "Januar", "Februar", "M\xE4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], "order": ["day", "month", "year"] }, "datetime": { "distance_in_words": { "about_x_hours": { "one": "etwa eine Stunde", "other": "etwa %{count} Stunden" }, "about_x_months": { "one": "etwa ein Monat", "other": "etwa %{count} Monate" }, "about_x_years": { "one": "etwa ein Jahr", "other": "etwa %{count} Jahre" }, "almost_x_years": { "one": "fast ein Jahr", "other": "fast %{count} Jahre" }, "half_a_minute": "eine halbe Minute", "less_than_x_minutes": { "one": "weniger als eine Minute", "other": "weniger als %{count} Minuten" }, "less_than_x_seconds": { "one": "weniger als eine Sekunde", "other": "weniger als %{count} Sekunden" }, "over_x_years": { "one": "mehr als ein Jahr", "other": "mehr als %{count} Jahre" }, "x_days": { "one": "ein Tag", "other": "%{count} Tage" }, "x_minutes": { "one": "eine Minute", "other": "%{count} Minuten" }, "x_months": { "one": "ein Monat", "other": "%{count} Monate" }, "x_seconds": { "one": "eine Sekunde", "other": "%{count} Sekunden" } }, "prompts": { "day": "Tag", "hour": "Stunden", "minute": "Minuten", "month": "Monat", "second": "Sekunden", "year": "Jahr" } }, "donation": { "amount": "Gesamtsumme", "campaign": "Kampagne", "comment": "Kommentar", "date": "Datum der Abbuchung", "interval": "Alle %{interval} %{time_unit}", "payment_id": "Mandatsnummer", "recurring_interval": "Abbuchungsrhythmus", "recurring_since": "Abbuchung begonnen am" }, "errors": { "format": "%{attribute} %{message}", "messages": { "accepted": "muss akzeptiert werden", "blank": "muss ausgef\xFCllt werden", "confirmation": "stimmt nicht mit der Best\xE4tigung \xFCberein", "empty": "muss ausgef\xFCllt werden", "equal_to": "muss genau %{count} sein", "even": "muss gerade sein", "exclusion": "ist nicht verf\xFCgbar", "greater_than": "muss gr\xF6\xDFer als %{count} sein", "greater_than_or_equal_to": "muss gr\xF6\xDFer oder gleich %{count} sein", "inclusion": "ist kein g\xFCltiger Wert", "invalid": "ist nicht g\xFCltig", "less_than": "muss kleiner als %{count} sein", "less_than_or_equal_to": "muss kleiner oder gleich %{count} sein", "not_a_number": "ist keine Zahl", "not_an_integer": "muss ganzzahlig sein", "odd": "muss ungerade sein", "record_invalid": "G\xFCltigkeitspr\xFCfung ist fehlgeschlagen: %{errors}", "taken": "ist bereits vergeben", "too_long": "ist zu lang (mehr als %{count} Zeichen)", "too_short": "ist zu kurz (weniger als %{count} Zeichen)", "wrong_length": "hat die falsche L\xE4nge (muss genau %{count} Zeichen haben)" }, "template": { "body": "Bitte \xFCberpr\xFCfen Sie die folgenden Felder:", "header": { "one": "Konnte %{model} nicht speichern: ein Fehler.", "other": "Konnte %{model} nicht speichern: %{count} Fehler." } } }, "hello": "Hallo Welt", "helpers": { "select": { "prompt": "Bitte w\xE4hlen" }, "submit": { "create": "%{model} erstellen", "submit": "%{model} speichern", "update": "%{model} aktualisieren" } }, "i18n": { "plural": { "keys": ["one", "other"], "rule": {} }, "transliterate": { "rule": { "\xC4": "Ae", "\xD6": "Oe", "\xDC": "Ue", "\xDF": "ss", "\xE4": "ae", "\xF6": "oe", "\xFC": "ue" } } }, "mailer": { "donations": { "donation_receipt": "Informationen \xFCber ihre Spende", "donor_direct_debit_notification": { "donation_queued_html": "Ihre Einzugserm\xE4chtigung f\xFCr <strong>%{nonprofit_name}</strong> ist zur Bearbeitung eingestellt.", "recurring_donation_queued_html": "Herzlichen Dank f\xFCr Ihre regelm\xE4\xDFige Spende an<strong>%{nonprofit_name}</strong>.  Wie Sie spenden Tausende B\xFCrgerinnen und B\xFCrger aus Europa und machen uns so zu einer Bewegung, mit der gerechnet werden muss. Wir bewegen Themen, die uns alle angehen und Ihre Unterst\xFCtzung hilft uns sehr, Kampagnen schnell aufzusetzen und mit ihnen erfolgreich zu sein.", "subject": "Best\xE4tigung \xFCber eine Spende f\xFCr %{nonprofit_name}", "transfer_info_html": "Auf Ihrem Kontoauszug erscheint die Abbuchung so %{label}.", "transfer_label_html": "<strong>Spende %{nonprofit_statement}</strong>." }, "donor_name": "Name des Spenders", "donor_receipt": { "oneoff_donation_html": "Herzlichen Dank f\xFCr Ihre Spende an <strong>%{nonprofit_name}</strong>. Wie Sie spenden Tausende B\xFCrgerinnen und B\xFCrger aus Europa und machen uns so zu einer Bewegung, mit der gerechnet werden muss. Wir bewegen Themen, die uns alle angehen und Ihre Unterst\xFCtzung hilft uns sehr, Kampagnen schnell aufzusetzen und mit ihnen erfolgreich zu sein. ", "recurring_donation_html": "Herzlichen Dank f\xFCr Ihre regelm\xE4\xDFige Spende an<strong>%{nonprofit_name}</strong>. Wie Sie spenden Tausende B\xFCrgerinnen und B\xFCrger aus Europa und machen uns so zu einer Bewegung, mit der gerechnet werden muss. Wir bewegen Themen, die uns alle angehen und Ihre Unterst\xFCtzung hilft uns sehr, Kampagnen schnell aufzusetzen und mit ihnen erfolgreich zu sein. ", "subject": "Best\xE4tigung \xFCber eine Spende f\xFCr ", "transfer_info_html": "Auf Ihrem Kontoauszug erscheint die Abbuchung so: %{label}.", "transfer_label_html": "Spende %{nonprofit_statement}" } } }, "nonprofits": { "donate": { "amount": { "custom": "anderer", "designation": { "choose": "W\xE4hlen Sie eine Bezeichnung (optional)", "label": "Bezeichnung", "most_needed": "Verwenden Sie meine Spende, wo sie am meisten gebraucht wird" }, "label": "Betrag", "monthly": "monatlich", "next": "Weiter", "sustaining": "Werden Sie F\xF6rderer von WeMove.EU", "sustaining_bold": "monatlich", "sustaining_selected": "W\xE4hlen Sie\xA0die H\xF6he der monatlichen Spende aus", "sustaining_selected_bold": "monatlich", "weekly": "w\xF6chentlich", "weekly_notice": "um Verwaltungskosten niedrig zu halten, buchen wir monatlich %{amount}%{currency}ab" }, "dedication": { "donor_note": "Die Anmerkung des Spenders war: ", "email": "E-Mail (optional)", "first_name": "Vorname", "full_address": "Adresse (optional)", "in_honor_label": "Zu Ehren von", "in_memory_label": "In Gedenken an", "info": "F\xFCgen Sie eine Widmung f\xFCr Ihre Spende hinzu:", "last_name": "Nachname", "note": "Anmerkung", "phone": "Telefon (optional)", "save": "speichern\xA0& zur\xFCck" }, "followup": { "finish": "Beenden", "message": "Vielen Dank f\xFCr Ihre Unterst\xFCtzung!", "receipt_info": "Eine Best\xE4tigung wird gesendet an", "share": { "facebook": "Teilen", "twitter": "Twittern", "twitter_message": "Seien Sie dabei!" }, "success": "Ihre Spende wurde erfolgreich \xFCbermittelt!" }, "info": { "anonymous_checkbox": "Anonym spenden", "dedication_link": "Diese Spende ist zum Gedenken f\xFCr jemanden.", "dedication_saved": "Die Spende widmen f\xFCr", "label": "Information", "next": "Weiter", "supporter": { "address": "Adresse", "city": "Stadt", "country": "Land", "email": "E-Mail", "email_required": " (notwendig f\xFCr Best\xE4tigung)", "errors": { "email": { "format": "Bitte geben Sie eine g\xFCltige E-Mail-Adresse ein" } }, "first_name": "Vorname", "full_name": "Name", "last_name": "Nachname", "other_country": "anderes", "phone": "Telefon", "postal_code": "Postleitzahl", "region": "Bundesland", "shipping_address": "Lieferadresse (erforderlich)", "state": "Land w\xE4hlen" } }, "log_out": "Abmelden", "payment": { "card": { "cvc": "Sicherheitscode (CVC)", "errors": { "email": { "format": "Bitte geben Sie eine g\xFCltige E-Mail-Adresse ein" }, "field": { "format": "Das sieht nicht nach dem richtigen Format aus", "presence": "Diese Angabe ist erforderlich" }, "number": { "format": "Falsche Kartennummer", "presence": "Bitten geben Sie Ihre Kartennummer ein" } }, "loading": "Speichert...", "month": "Monat", "name": "Karteninhaber/in", "number": "Kartennummer", "postal_code": "Postleitzahl", "secure_info": "Mit 256-bit SSL gesicherte Transaktionen", "submit": "absenden", "year": "Jahr" }, "label": "Zahlungsart", "loading": { "checking_card": "Karte wird gepr\xFCft...", "sending_payment": "Zahlung wird ausgef\xFChrt..." }, "monthly_recurring": "monatlich", "one_time": "einmalig", "sepa": { "bic": "BIC/SWIFT", "errors": { "field": { "format": "Das scheint nicht das richtige Format zu sein", "presence": "Diese Angabe ist erforderlich" } }, "iban": "IBAN", "name": "Kontoinhaber/in" }, "tabs": { "card": "Kreditkarte", "sepa": "Lastschrift" } }, "signed_in": "Eingeloggt als" } }, "number": { "currency": { "format": { "delimiter": ".", "format": "%n %u", "precision": 2, "separator": ",", "significant": false, "strip_insignificant_zeros": false, "unit": "\u20AC" } }, "format": { "delimiter": ".", "precision": 2, "separator": ",", "significant": false, "strip_insignificant_zeros": false }, "human": { "decimal_units": { "format": "%n %u", "units": { "billion": { "one": "Milliarde", "other": "Milliarden" }, "million": "Millionen", "quadrillion": { "one": "Billiarde", "other": "Billiarden" }, "thousand": "Tausend", "trillion": "Billionen", "unit": "" } }, "format": { "delimiter": "", "precision": 1, "significant": true, "strip_insignificant_zeros": true }, "storage_units": { "format": "%n %u", "units": { "byte": { "one": "Byte", "other": "Bytes" }, "gb": "GB", "kb": "KB", "mb": "MB", "tb": "TB" } } }, "percentage": { "format": { "delimiter": "" } }, "precision": { "format": { "delimiter": "" } } }, "organization": { "name": "Organisation" }, "support": { "array": { "last_word_connector": " und ", "two_words_connector": " und ", "words_connector": ", " } }, "time": { "am": "vormittags", "formats": { "default": "%A, %d. %B %Y, %H:%M Uhr", "long": "%A, %d. %B %Y, %H:%M Uhr", "short": "%d. %B, %H:%M Uhr" }, "pm": "nachmittags" } });

window.I18n = I18n;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;// I18n.js
// =======
//
// This small library provides the Rails I18n API on the Javascript.
// You don't actually have to use Rails (or even Ruby) to use I18n.js.
// Just make sure you export all translations in an object like this:
//
//     I18n.translations.en = {
//       hello: "Hello World"
//     };
//
// See tests for specific formatting like numbers and dates.
//

// Using UMD pattern from
// https://github.com/umdjs/umd#regular-module
// `returnExports.js` version
;(function (root, factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){ return factory(root);}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(root);
  } else {
    // Browser globals (root is window)
    root.I18n = factory(root);
  }
}(this, function(global) {
  "use strict";

  // Use previously defined object if exists in current scope
  var I18n = global && global.I18n || {};

  // Just cache the Array#slice function.
  var slice = Array.prototype.slice;

  // Apply number padding.
  var padding = function(number) {
    return ("0" + number.toString()).substr(-2);
  };

  // Improved toFixed number rounding function with support for unprecise floating points
  // JavaScript's standard toFixed function does not round certain numbers correctly (for example 0.105 with precision 2).
  var toFixed = function(number, precision) {
    return decimalAdjust('round', number, -precision).toFixed(precision);
  };

  // Is a given variable an object?
  // Borrowed from Underscore.js
  var isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object'
  };

  var isFunction = function(func) {
    var type = typeof func;
    return type === 'function'
  };

  // Check if value is different than undefined and null;
  var isSet = function(value) {
    return typeof(value) !== 'undefined' && value !== null;
  };

  // Is a given value an array?
  // Borrowed from Underscore.js
  var isArray = function(val) {
    if (Array.isArray) {
      return Array.isArray(val);
    };
    return Object.prototype.toString.call(val) === '[object Array]';
  };

  var isString = function(val) {
    return typeof value == 'string' || Object.prototype.toString.call(val) === '[object String]';
  };

  var isNumber = function(val) {
    return typeof val == 'number' || Object.prototype.toString.call(val) === '[object Number]';
  };

  var isBoolean = function(val) {
    return val === true || val === false;
  };

  var decimalAdjust = function(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  var lazyEvaluate = function(message, scope) {
    if (isFunction(message)) {
      return message(scope);
    } else {
      return message;
    }
  }

  var merge = function (dest, obj) {
    var key, value;
    for (key in obj) if (obj.hasOwnProperty(key)) {
      value = obj[key];
      if (isString(value) || isNumber(value) || isBoolean(value) || isArray(value)) {
        dest[key] = value;
      } else {
        if (dest[key] == null) dest[key] = {};
        merge(dest[key], value);
      }
    }
    return dest;
  };

  // Set default days/months translations.
  var DATE = {
      day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    , abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    , month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    , abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    , meridian: ["AM", "PM"]
  };

  // Set default number format.
  var NUMBER_FORMAT = {
      precision: 3
    , separator: "."
    , delimiter: ","
    , strip_insignificant_zeros: false
  };

  // Set default currency format.
  var CURRENCY_FORMAT = {
      unit: "$"
    , precision: 2
    , format: "%u%n"
    , sign_first: true
    , delimiter: ","
    , separator: "."
  };

  // Set default percentage format.
  var PERCENTAGE_FORMAT = {
      unit: "%"
    , precision: 3
    , format: "%n%u"
    , separator: "."
    , delimiter: ""
  };

  // Set default size units.
  var SIZE_UNITS = [null, "kb", "mb", "gb", "tb"];

  // Other default options
  var DEFAULT_OPTIONS = {
    // Set default locale. This locale will be used when fallback is enabled and
    // the translation doesn't exist in a particular locale.
      defaultLocale: "en"
    // Set the current locale to `en`.
    , locale: "en"
    // Set the translation key separator.
    , defaultSeparator: "."
    // Set the placeholder format. Accepts `{{placeholder}}` and `%{placeholder}`.
    , placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm
    // Set if engine should fallback to the default locale when a translation
    // is missing.
    , fallbacks: false
    // Set the default translation object.
    , translations: {}
    // Set missing translation behavior. 'message' will display a message
    // that the translation is missing, 'guess' will try to guess the string
    , missingBehaviour: 'message'
    // if you use missingBehaviour with 'message', but want to know that the
    // string is actually missing for testing purposes, you can prefix the
    // guessed string by setting the value here. By default, no prefix!
    , missingTranslationPrefix: ''
  };

  // Set default locale. This locale will be used when fallback is enabled and
  // the translation doesn't exist in a particular locale.
  I18n.reset = function() {
    var key;
    for (key in DEFAULT_OPTIONS) {
      this[key] = DEFAULT_OPTIONS[key];
    }
  };

  // Much like `reset`, but only assign options if not already assigned
  I18n.initializeOptions = function() {
    var key;
    for (key in DEFAULT_OPTIONS) if (!isSet(this[key])) {
      this[key] = DEFAULT_OPTIONS[key];
    }
  };
  I18n.initializeOptions();

  // Return a list of all locales that must be tried before returning the
  // missing translation message. By default, this will consider the inline option,
  // current locale and fallback locale.
  //
  //     I18n.locales.get("de-DE");
  //     // ["de-DE", "de", "en"]
  //
  // You can define custom rules for any locale. Just make sure you return a array
  // containing all locales.
  //
  //     // Default the Wookie locale to English.
  //     I18n.locales["wk"] = function(locale) {
  //       return ["en"];
  //     };
  //
  I18n.locales = {};

  // Retrieve locales based on inline locale, current locale or default to
  // I18n's detection.
  I18n.locales.get = function(locale) {
    var result = this[locale] || this[I18n.locale] || this["default"];

    if (isFunction(result)) {
      result = result(locale);
    }

    if (isArray(result) === false) {
      result = [result];
    }

    return result;
  };

  // The default locale list.
  I18n.locales["default"] = function(locale) {
    var locales = []
      , list = []
    ;

    // Handle the inline locale option that can be provided to
    // the `I18n.t` options.
    if (locale) {
      locales.push(locale);
    }

    // Add the current locale to the list.
    if (!locale && I18n.locale) {
      locales.push(I18n.locale);
    }

    // Add the default locale if fallback strategy is enabled.
    if (I18n.fallbacks && I18n.defaultLocale) {
      locales.push(I18n.defaultLocale);
    }

    // Locale code format 1:
    // According to RFC4646 (http://www.ietf.org/rfc/rfc4646.txt)
    // language codes for Traditional Chinese should be `zh-Hant`
    //
    // But due to backward compatibility
    // We use older version of IETF language tag
    // @see http://www.w3.org/TR/html401/struct/dirlang.html
    // @see http://en.wikipedia.org/wiki/IETF_language_tag
    //
    // Format: `language-code = primary-code ( "-" subcode )*`
    //
    // primary-code uses ISO639-1
    // @see http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // @see http://www.iso.org/iso/home/standards/language_codes.htm
    //
    // subcode uses ISO 3166-1 alpha-2
    // @see http://en.wikipedia.org/wiki/ISO_3166
    // @see http://www.iso.org/iso/country_codes.htm
    //
    // @note
    //   subcode can be in upper case or lower case
    //   defining it in upper case is a convention only


    // Locale code format 2:
    // Format: `code = primary-code ( "-" region-code )*`
    // primary-code uses ISO 639-1
    // script-code uses ISO 15924
    // region-code uses ISO 3166-1 alpha-2
    // Example: zh-Hant-TW, en-HK, zh-Hant-CN
    //
    // It is similar to RFC4646 (or actually the same),
    // but seems to be limited to language, script, region

    // Compute each locale with its country code.
    // So this will return an array containing
    // `de-DE` and `de`
    // or
    // `zh-hans-tw`, `zh-hans`, `zh`
    // locales.
    locales.forEach(function(locale) {
      var localeParts = locale.split("-");
      var firstFallback = null;
      var secondFallback = null;
      if (localeParts.length === 3) {
        firstFallback = [
          localeParts[0],
          localeParts[1]
        ].join("-");
        secondFallback = localeParts[0];
      }
      else if (localeParts.length === 2) {
        firstFallback = localeParts[0];
      }

      if (list.indexOf(locale) === -1) {
        list.push(locale);
      }

      if (! I18n.fallbacks) {
        return;
      }

      [
        firstFallback,
        secondFallback
      ].forEach(function(nullableFallbackLocale) {
        // We don't want null values
        if (typeof nullableFallbackLocale === "undefined") { return; }
        if (nullableFallbackLocale === null) { return; }
        // We don't want duplicate values
        //
        // Comparing with `locale` first is faster than
        // checking whether value's presence in the list
        if (nullableFallbackLocale === locale) { return; }
        if (list.indexOf(nullableFallbackLocale) !== -1) { return; }

        list.push(nullableFallbackLocale);
      });
    });

    // No locales set? English it is.
    if (!locales.length) {
      locales.push("en");
    }

    return list;
  };

  // Hold pluralization rules.
  I18n.pluralization = {};

  // Return the pluralizer for a specific locale.
  // If no specify locale is found, then I18n's default will be used.
  I18n.pluralization.get = function(locale) {
    return this[locale] || this[I18n.locale] || this["default"];
  };

  // The default pluralizer rule.
  // It detects the `zero`, `one`, and `other` scopes.
  I18n.pluralization["default"] = function(count) {
    switch (count) {
      case 0: return ["zero", "other"];
      case 1: return ["one"];
      default: return ["other"];
    }
  };

  // Return current locale. If no locale has been set, then
  // the current locale will be the default locale.
  I18n.currentLocale = function() {
    return this.locale || this.defaultLocale;
  };

  // Check if value is different than undefined and null;
  I18n.isSet = isSet;

  // Find and process the translation using the provided scope and options.
  // This is used internally by some functions and should not be used as an
  // public API.
  I18n.lookup = function(scope, options) {
    options = options || {}

    var locales = this.locales.get(options.locale).slice()
      , requestedLocale = locales[0]
      , locale
      , scopes
      , fullScope
      , translations
    ;

    fullScope = this.getFullScope(scope, options);

    while (locales.length) {
      locale = locales.shift();
      scopes = fullScope.split(this.defaultSeparator);
      translations = this.translations[locale];

      if (!translations) {
        continue;
      }
      while (scopes.length) {
        translations = translations[scopes.shift()];

        if (translations === undefined || translations === null) {
          break;
        }
      }

      if (translations !== undefined && translations !== null) {
        return translations;
      }
    }

    if (isSet(options.defaultValue)) {
      return lazyEvaluate(options.defaultValue, scope);
    }
  };

  // lookup pluralization rule key into translations
  I18n.pluralizationLookupWithoutFallback = function(count, locale, translations) {
    var pluralizer = this.pluralization.get(locale)
      , pluralizerKeys = pluralizer(count)
      , pluralizerKey
      , message;

    if (isObject(translations)) {
      while (pluralizerKeys.length) {
        pluralizerKey = pluralizerKeys.shift();
        if (isSet(translations[pluralizerKey])) {
          message = translations[pluralizerKey];
          break;
        }
      }
    }

    return message;
  };

  // Lookup dedicated to pluralization
  I18n.pluralizationLookup = function(count, scope, options) {
    options = options || {}
    var locales = this.locales.get(options.locale).slice()
      , requestedLocale = locales[0]
      , locale
      , scopes
      , translations
      , message
    ;
    scope = this.getFullScope(scope, options);

    while (locales.length) {
      locale = locales.shift();
      scopes = scope.split(this.defaultSeparator);
      translations = this.translations[locale];

      if (!translations) {
        continue;
      }

      while (scopes.length) {
        translations = translations[scopes.shift()];
        if (!isObject(translations)) {
          break;
        }
        if (scopes.length == 0) {
          message = this.pluralizationLookupWithoutFallback(count, locale, translations);
        }
      }
      if (message != null && message != undefined) {
        break;
      }
    }

    if (message == null || message == undefined) {
      if (isSet(options.defaultValue)) {
        if (isObject(options.defaultValue)) {
          message = this.pluralizationLookupWithoutFallback(count, options.locale, options.defaultValue);
        } else {
          message = options.defaultValue;
        }
        translations = options.defaultValue;
      }
    }

    return { message: message, translations: translations };
  };

  // Rails changed the way the meridian is stored.
  // It started with `date.meridian` returning an array,
  // then it switched to `time.am` and `time.pm`.
  // This function abstracts this difference and returns
  // the correct meridian or the default value when none is provided.
  I18n.meridian = function() {
    var time = this.lookup("time");
    var date = this.lookup("date");

    if (time && time.am && time.pm) {
      return [time.am, time.pm];
    } else if (date && date.meridian) {
      return date.meridian;
    } else {
      return DATE.meridian;
    }
  };

  // Merge serveral hash options, checking if value is set before
  // overwriting any value. The precedence is from left to right.
  //
  //     I18n.prepareOptions({name: "John Doe"}, {name: "Mary Doe", role: "user"});
  //     #=> {name: "John Doe", role: "user"}
  //
  I18n.prepareOptions = function() {
    var args = slice.call(arguments)
      , options = {}
      , subject
    ;

    while (args.length) {
      subject = args.shift();

      if (typeof(subject) != "object") {
        continue;
      }

      for (var attr in subject) {
        if (!subject.hasOwnProperty(attr)) {
          continue;
        }

        if (isSet(options[attr])) {
          continue;
        }

        options[attr] = subject[attr];
      }
    }

    return options;
  };

  // Generate a list of translation options for default fallbacks.
  // `defaultValue` is also deleted from options as it is returned as part of
  // the translationOptions array.
  I18n.createTranslationOptions = function(scope, options) {
    var translationOptions = [{scope: scope}];

    // Defaults should be an array of hashes containing either
    // fallback scopes or messages
    if (isSet(options.defaults)) {
      translationOptions = translationOptions.concat(options.defaults);
    }

    // Maintain support for defaultValue. Since it is always a message
    // insert it in to the translation options as such.
    if (isSet(options.defaultValue)) {
      translationOptions.push({ message: options.defaultValue });
    }

    return translationOptions;
  };

  // Translate the given scope with the provided options.
  I18n.translate = function(scope, options) {
    options = options || {}

    var translationOptions = this.createTranslationOptions(scope, options);

    var translation;

    var optionsWithoutDefault = this.prepareOptions(options)
    delete optionsWithoutDefault.defaultValue

    // Iterate through the translation options until a translation
    // or message is found.
    var translationFound =
      translationOptions.some(function(translationOption) {
        if (isSet(translationOption.scope)) {
          translation = this.lookup(translationOption.scope, optionsWithoutDefault);
        } else if (isSet(translationOption.message)) {
          translation = lazyEvaluate(translationOption.message, scope);
        }

        if (translation !== undefined && translation !== null) {
          return true;
        }
      }, this);

    if (!translationFound) {
      return this.missingTranslation(scope, options);
    }

    if (typeof(translation) === "string") {
      translation = this.interpolate(translation, options);
    } else if (isObject(translation) && isSet(options.count)) {
      translation = this.pluralize(options.count, scope, options);
    }

    return translation;
  };

  // This function interpolates the all variables in the given message.
  I18n.interpolate = function(message, options) {
    options = options || {}
    var matches = message.match(this.placeholder)
      , placeholder
      , value
      , name
      , regex
    ;

    if (!matches) {
      return message;
    }

    var value;

    while (matches.length) {
      placeholder = matches.shift();
      name = placeholder.replace(this.placeholder, "$1");

      if (isSet(options[name])) {
        value = options[name].toString().replace(/\$/gm, "_#$#_");
      } else if (name in options) {
        value = this.nullPlaceholder(placeholder, message, options);
      } else {
        value = this.missingPlaceholder(placeholder, message, options);
      }

      regex = new RegExp(placeholder.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}"));
      message = message.replace(regex, value);
    }

    return message.replace(/_#\$#_/g, "$");
  };

  // Pluralize the given scope using the `count` value.
  // The pluralized translation may have other placeholders,
  // which will be retrieved from `options`.
  I18n.pluralize = function(count, scope, options) {
    options = this.prepareOptions({count: String(count)}, options)
    var pluralizer, message, result;

    result = this.pluralizationLookup(count, scope, options);
    if (result.translations == undefined || result.translations == null) {
      return this.missingTranslation(scope, options);
    }

    if (result.message != undefined && result.message != null) {
      return this.interpolate(result.message, options);
    }
    else {
      pluralizer = this.pluralization.get(options.locale);
      return this.missingTranslation(scope + '.' + pluralizer(count)[0], options);
    }
  };

  // Return a missing translation message for the given parameters.
  I18n.missingTranslation = function(scope, options) {
    //guess intended string
    if(this.missingBehaviour == 'guess'){
      //get only the last portion of the scope
      var s = scope.split('.').slice(-1)[0];
      //replace underscore with space && camelcase with space and lowercase letter
      return (this.missingTranslationPrefix.length > 0 ? this.missingTranslationPrefix : '') +
          s.replace('_',' ').replace(/([a-z])([A-Z])/g,
          function(match, p1, p2) {return p1 + ' ' + p2.toLowerCase()} );
    }

    var localeForTranslation = (options != null && options.locale != null) ? options.locale : this.currentLocale();
    var fullScope           = this.getFullScope(scope, options);
    var fullScopeWithLocale = [localeForTranslation, fullScope].join(this.defaultSeparator);

    return '[missing "' + fullScopeWithLocale + '" translation]';
  };

  // Return a missing placeholder message for given parameters
  I18n.missingPlaceholder = function(placeholder, message, options) {
    return "[missing " + placeholder + " value]";
  };

  I18n.nullPlaceholder = function() {
    return I18n.missingPlaceholder.apply(I18n, arguments);
  };

  // Format number using localization rules.
  // The options will be retrieved from the `number.format` scope.
  // If this isn't present, then the following options will be used:
  //
  // - `precision`: `3`
  // - `separator`: `"."`
  // - `delimiter`: `","`
  // - `strip_insignificant_zeros`: `false`
  //
  // You can also override these options by providing the `options` argument.
  //
  I18n.toNumber = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.format")
      , NUMBER_FORMAT
    );

    var negative = number < 0
      , string = toFixed(Math.abs(number), options.precision).toString()
      , parts = string.split(".")
      , precision
      , buffer = []
      , formattedNumber
      , format = options.format || "%n"
      , sign = negative ? "-" : ""
    ;

    number = parts[0];
    precision = parts[1];

    while (number.length > 0) {
      buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
      number = number.substr(0, number.length -3);
    }

    formattedNumber = buffer.join(options.delimiter);

    if (options.strip_insignificant_zeros && precision) {
      precision = precision.replace(/0+$/, "");
    }

    if (options.precision > 0 && precision) {
      formattedNumber += options.separator + precision;
    }

    if (options.sign_first) {
      format = "%s" + format;
    }
    else {
      format = format.replace("%n", "%s%n");
    }

    formattedNumber = format
      .replace("%u", options.unit)
      .replace("%n", formattedNumber)
      .replace("%s", sign)
    ;

    return formattedNumber;
  };

  // Format currency with localization rules.
  // The options will be retrieved from the `number.currency.format` and
  // `number.format` scopes, in that order.
  //
  // Any missing option will be retrieved from the `I18n.toNumber` defaults and
  // the following options:
  //
  // - `unit`: `"$"`
  // - `precision`: `2`
  // - `format`: `"%u%n"`
  // - `delimiter`: `","`
  // - `separator`: `"."`
  //
  // You can also override these options by providing the `options` argument.
  //
  I18n.toCurrency = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.currency.format")
      , this.lookup("number.format")
      , CURRENCY_FORMAT
    );

    return this.toNumber(number, options);
  };

  // Localize several values.
  // You can provide the following scopes: `currency`, `number`, or `percentage`.
  // If you provide a scope that matches the `/^(date|time)/` regular expression
  // then the `value` will be converted by using the `I18n.toTime` function.
  //
  // It will default to the value's `toString` function.
  //
  I18n.localize = function(scope, value, options) {
    options || (options = {});

    switch (scope) {
      case "currency":
        return this.toCurrency(value);
      case "number":
        scope = this.lookup("number.format");
        return this.toNumber(value, scope);
      case "percentage":
        return this.toPercentage(value);
      default:
        var localizedValue;

        if (scope.match(/^(date|time)/)) {
          localizedValue = this.toTime(scope, value);
        } else {
          localizedValue = value.toString();
        }

        return this.interpolate(localizedValue, options);
    }
  };

  // Parse a given `date` string into a JavaScript Date object.
  // This function is time zone aware.
  //
  // The following string formats are recognized:
  //
  //    yyyy-mm-dd
  //    yyyy-mm-dd[ T]hh:mm::ss
  //    yyyy-mm-dd[ T]hh:mm::ss
  //    yyyy-mm-dd[ T]hh:mm::ssZ
  //    yyyy-mm-dd[ T]hh:mm::ss+0000
  //    yyyy-mm-dd[ T]hh:mm::ss+00:00
  //    yyyy-mm-dd[ T]hh:mm::ss.123Z
  //
  I18n.parseDate = function(date) {
    var matches, convertedDate, fraction;
    // we have a date, so just return it.
    if (typeof(date) == "object") {
      return date;
    };

    matches = date.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})([\.,]\d{1,3})?)?(Z|\+00:?00)?/);

    if (matches) {
      for (var i = 1; i <= 6; i++) {
        matches[i] = parseInt(matches[i], 10) || 0;
      }

      // month starts on 0
      matches[2] -= 1;

      fraction = matches[7] ? 1000 * ("0" + matches[7]) : null;

      if (matches[8]) {
        convertedDate = new Date(Date.UTC(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction));
      } else {
        convertedDate = new Date(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction);
      }
    } else if (typeof(date) == "number") {
      // UNIX timestamp
      convertedDate = new Date();
      convertedDate.setTime(date);
    } else if (date.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/)) {
      // This format `Wed Jul 20 13:03:39 +0000 2011` is parsed by
      // webkit/firefox, but not by IE, so we must parse it manually.
      convertedDate = new Date();
      convertedDate.setTime(Date.parse([
        RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$6, RegExp.$4, RegExp.$5
      ].join(" ")));
    } else if (date.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/)) {
      // a valid javascript format with timezone info
      convertedDate = new Date();
      convertedDate.setTime(Date.parse(date));
    } else {
      // an arbitrary javascript string
      convertedDate = new Date();
      convertedDate.setTime(Date.parse(date));
    }

    return convertedDate;
  };

  // Formats time according to the directives in the given format string.
  // The directives begins with a percent (%) character. Any text not listed as a
  // directive will be passed through to the output string.
  //
  // The accepted formats are:
  //
  //     %a  - The abbreviated weekday name (Sun)
  //     %A  - The full weekday name (Sunday)
  //     %b  - The abbreviated month name (Jan)
  //     %B  - The full month name (January)
  //     %c  - The preferred local date and time representation
  //     %d  - Day of the month (01..31)
  //     %-d - Day of the month (1..31)
  //     %H  - Hour of the day, 24-hour clock (00..23)
  //     %-H - Hour of the day, 24-hour clock (0..23)
  //     %I  - Hour of the day, 12-hour clock (01..12)
  //     %-I - Hour of the day, 12-hour clock (1..12)
  //     %m  - Month of the year (01..12)
  //     %-m - Month of the year (1..12)
  //     %M  - Minute of the hour (00..59)
  //     %-M - Minute of the hour (0..59)
  //     %p  - Meridian indicator (AM  or  PM)
  //     %S  - Second of the minute (00..60)
  //     %-S - Second of the minute (0..60)
  //     %w  - Day of the week (Sunday is 0, 0..6)
  //     %y  - Year without a century (00..99)
  //     %-y - Year without a century (0..99)
  //     %Y  - Year with century
  //     %z  - Timezone offset (+0545)
  //
  I18n.strftime = function(date, format) {
    var options = this.lookup("date")
      , meridianOptions = I18n.meridian()
    ;

    if (!options) {
      options = {};
    }

    options = this.prepareOptions(options, DATE);

    if (isNaN(date.getTime())) {
      throw new Error('I18n.strftime() requires a valid date object, but received an invalid date.');
    }

    var weekDay = date.getDay()
      , day = date.getDate()
      , year = date.getFullYear()
      , month = date.getMonth() + 1
      , hour = date.getHours()
      , hour12 = hour
      , meridian = hour > 11 ? 1 : 0
      , secs = date.getSeconds()
      , mins = date.getMinutes()
      , offset = date.getTimezoneOffset()
      , absOffsetHours = Math.floor(Math.abs(offset / 60))
      , absOffsetMinutes = Math.abs(offset) - (absOffsetHours * 60)
      , timezoneoffset = (offset > 0 ? "-" : "+") +
          (absOffsetHours.toString().length < 2 ? "0" + absOffsetHours : absOffsetHours) +
          (absOffsetMinutes.toString().length < 2 ? "0" + absOffsetMinutes : absOffsetMinutes)
    ;

    if (hour12 > 12) {
      hour12 = hour12 - 12;
    } else if (hour12 === 0) {
      hour12 = 12;
    }

    format = format.replace("%a", options.abbr_day_names[weekDay]);
    format = format.replace("%A", options.day_names[weekDay]);
    format = format.replace("%b", options.abbr_month_names[month]);
    format = format.replace("%B", options.month_names[month]);
    format = format.replace("%d", padding(day));
    format = format.replace("%e", day);
    format = format.replace("%-d", day);
    format = format.replace("%H", padding(hour));
    format = format.replace("%-H", hour);
    format = format.replace("%I", padding(hour12));
    format = format.replace("%-I", hour12);
    format = format.replace("%m", padding(month));
    format = format.replace("%-m", month);
    format = format.replace("%M", padding(mins));
    format = format.replace("%-M", mins);
    format = format.replace("%p", meridianOptions[meridian]);
    format = format.replace("%S", padding(secs));
    format = format.replace("%-S", secs);
    format = format.replace("%w", weekDay);
    format = format.replace("%y", padding(year));
    format = format.replace("%-y", padding(year).replace(/^0+/, ""));
    format = format.replace("%Y", year);
    format = format.replace("%z", timezoneoffset);

    return format;
  };

  // Convert the given dateString into a formatted date.
  I18n.toTime = function(scope, dateString) {
    var date = this.parseDate(dateString)
      , format = this.lookup(scope)
    ;

    if (date.toString().match(/invalid/i)) {
      return date.toString();
    }

    if (!format) {
      return date.toString();
    }

    return this.strftime(date, format);
  };

  // Convert a number into a formatted percentage value.
  I18n.toPercentage = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.percentage.format")
      , this.lookup("number.format")
      , PERCENTAGE_FORMAT
    );

    return this.toNumber(number, options);
  };

  // Convert a number into a readable size representation.
  I18n.toHumanSize = function(number, options) {
    var kb = 1024
      , size = number
      , iterations = 0
      , unit
      , precision
    ;

    while (size >= kb && iterations < 4) {
      size = size / kb;
      iterations += 1;
    }

    if (iterations === 0) {
      unit = this.t("number.human.storage_units.units.byte", {count: size});
      precision = 0;
    } else {
      unit = this.t("number.human.storage_units.units." + SIZE_UNITS[iterations]);
      precision = (size - Math.floor(size) === 0) ? 0 : 1;
    }

    options = this.prepareOptions(
        options
      , {unit: unit, precision: precision, format: "%n%u", delimiter: ""}
    );

    return this.toNumber(size, options);
  };

  I18n.getFullScope = function(scope, options) {
    options = options || {}

    // Deal with the scope as an array.
    if (isArray(scope)) {
      scope = scope.join(this.defaultSeparator);
    }

    // Deal with the scope option provided through the second argument.
    //
    //    I18n.t('hello', {scope: 'greetings'});
    //
    if (options.scope) {
      scope = [options.scope, scope].join(this.defaultSeparator);
    }

    return scope;
  };
  /**
   * Merge obj1 with obj2 (shallow merge), without modifying inputs
   * @param {Object} obj1
   * @param {Object} obj2
   * @returns {Object} Merged values of obj1 and obj2
   *
   * In order to support ES3, `Object.prototype.hasOwnProperty.call` is used
   * Idea is from:
   * https://stackoverflow.com/questions/8157700/object-has-no-hasownproperty-method-i-e-its-undefined-ie8
   */
  I18n.extend = function ( obj1, obj2 ) {
    if (typeof(obj1) === "undefined" && typeof(obj2) === "undefined") {
      return {};
    }
    return merge(obj1, obj2);
  };

  // Set aliases, so we can save some typing.
  I18n.t = I18n.translate;
  I18n.l = I18n.localize;
  I18n.p = I18n.pluralize;

  return I18n;
}));


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjNmYTgzNTRmMDExMDU2N2ZhYjgiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2phdmFzY3JpcHRzL19maW5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaTE4bi1qcy9hcHAvYXNzZXRzL2phdmFzY3JpcHRzL2kxOG4uanMiXSwibmFtZXMiOlsiSTE4biIsInJlcXVpcmUiLCJ0cmFuc2xhdGlvbnMiLCJleHRlbmQiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSxJQUFNQSxPQUFPLG1CQUFBQyxDQUFRLENBQVIsQ0FBYjtBQUNBRCxLQUFLRSxZQUFMLEtBQXNCRixLQUFLRSxZQUFMLEdBQW9CLEVBQTFDO0FBQ0FGLEtBQUtFLFlBQUwsQ0FBa0IsSUFBbEIsSUFBMEJGLEtBQUtHLE1BQUwsQ0FBYUgsS0FBS0UsWUFBTCxDQUFrQixJQUFsQixLQUEyQixFQUF4QyxFQUE2QyxFQUFDLGVBQWMsRUFBQyxVQUFTLEVBQUMsVUFBUyx5QkFBVixFQUFvQyxZQUFXLEVBQUMsWUFBVyxrQkFBWixFQUErQixTQUFRLGdCQUF2QyxFQUF3RCxnQkFBZSw0QkFBdkUsRUFBb0csU0FBUSxnQkFBNUcsRUFBNkgsWUFBVywyQkFBeEksRUFB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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGFBQWEsU0FBUyxZQUFZO0FBQ2hGLHlCQUF5QixFQUFFLElBQUksV0FBVyxFQUFFO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsUUFBUTtBQUNwRSw4Q0FBOEMsUUFB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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5QyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxJQUFJOztBQUV2RztBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSyxrQ0FBa0MsRUFBRSxjQUFjLEVBQUU7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUE4RCxZQUFZO0FBQzFFO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLG1CQUFtQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDIiwiZmlsZSI6ImkxOG4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyM2ZhODM1NGYwMTEwNTY3ZmFiOCIsImNvbnN0IEkxOG4gPSByZXF1aXJlKCdpMThuLWpzJyk7XG5JMThuLnRyYW5zbGF0aW9ucyB8fCAoSTE4bi50cmFuc2xhdGlvbnMgPSB7fSk7XG5JMThuLnRyYW5zbGF0aW9uc1tcImVuXCJdID0gSTE4bi5leHRlbmQoKEkxOG4udHJhbnNsYXRpb25zW1wiZW5cIl0gfHwge30pLCB7XCJhY3RpdmVtb2RlbFwiOntcImVycm9yc1wiOntcImZvcm1hdFwiOlwiJXthdHRyaWJ1dGV9ICV7bWVzc2FnZX1cIixcIm1lc3NhZ2VzXCI6e1wiYWNjZXB0ZWRcIjpcIm11c3QgYmUgYWNjZXB0ZWRcIixcImJsYW5rXCI6XCJjYW4ndCBiZSBibGFua1wiLFwiY29uZmlybWF0aW9uXCI6XCJkb2Vzbid0IG1hdGNoIGNvbmZpcm1hdGlvblwiLFwiZW1wdHlcIjpcImNhbid0IGJlIGVtcHR5XCIsXCJlcXVhbF90b1wiOlwibXVzdCBiZSBlcXVhbCB0byAle2NvdW50fVwiLFwiZXZlblwiOlwibXVzdCBiZSBldmVuXCIsXCJleGNsdXNpb25cIjpcImlzIHJlc2VydmVkXCIsXCJncmVhdGVyX3RoYW5cIjpcIm11c3QgYmUgZ3JlYXRlciB0aGFuICV7Y291bnR9XCIsXCJncmVhdGVyX3RoYW5fb3JfZXF1YWxfdG9cIjpcIm11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICV7Y291bnR9XCIsXCJpbmNsdXNpb25cIjpcImlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgbGlzdFwiLFwiaW52YWxpZFwiOlwiaXMgaW52YWxpZFwiLFwibGVzc190aGFuXCI6XCJtdXN0IGJlIGxlc3MgdGhhbiAle2NvdW50fVwiLFwibGVzc190aGFuX29yX2VxdWFsX3RvXCI6XCJtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAle2NvdW50fVwiLFwibm90X2FfbnVtYmVyXCI6XCJpcyBub3QgYSBudW1iZXJcIixcIm5vdF9hbl9pbnRlZ2VyXCI6XCJtdXN0IGJlIGFuIGludGVnZXJcIixcIm9kZFwiOlwibXVzdCBiZSBvZGRcIixcInJlY29yZF9pbnZhbGlkXCI6XCJWYWxpZGF0aW9uIGZhaWxlZDogJXtlcnJvcnN9XCIsXCJ0YWtlblwiOlwiaGFzIGFscmVhZHkgYmVlbiB0YWtlblwiLFwidG9vX2xvbmdcIjp7XCJvbmVcIjpcImlzIHRvbyBsb25nIChtYXhpbXVtIGlzIDEgY2hhcmFjdGVyKVwiLFwib3RoZXJcIjpcImlzIHRvbyBsb25nIChtYXhpbXVtIGlzICV7Y291bnR9IGNoYXJhY3RlcnMpXCJ9LFwidG9vX3Nob3J0XCI6e1wib25lXCI6XCJpcyB0b28gc2hvcnQgKG1pbmltdW0gaXMgMSBjaGFyYWN0ZXIpXCIsXCJvdGhlclwiOlwiaXMgdG9vIHNob3J0IChtaW5pbXVtIGlzICV7Y291bnR9IGNoYXJhY3RlcnMpXCJ9LFwid3JvbmdfbGVuZ3RoXCI6e1wib25lXCI6XCJpcyB0aGUgd3JvbmcgbGVuZ3RoIChzaG91bGQgYmUgMSBjaGFyYWN0ZXIpXCIsXCJvdGhlclwiOlwiaXMgdGhlIHdyb25nIGxlbmd0aCAoc2hvdWxkIGJlICV7Y291bnR9IGNoYXJhY3RlcnMpXCJ9fSxcInRlbXBsYXRlXCI6e1wiYm9keVwiOlwiVGhlcmUgd2VyZSBwcm9ibGVtcyB3aXRoIHRoZSBmb2xsb3dpbmcgZmllbGRzOlwiLFwiaGVhZGVyXCI6e1wib25lXCI6XCIxIGVycm9yIHByb2hpYml0ZWQgdGhpcyAle21vZGVsfSBmcm9tIGJlaW5nIHNhdmVkXCIsXCJvdGhlclwiOlwiJXtjb3VudH0gZXJyb3JzIHByb2hpYml0ZWQgdGhpcyAle21vZGVsfSBmcm9tIGJlaW5nIHNhdmVkXCJ9fX19LFwiYWN0aXZlcmVjb3JkXCI6e1wiYXR0cmlidXRlc1wiOntcImNhbXBhaWduX2NvbW1lbnRcIjp7XCJib2R5XCI6XCJDb21tZW50IGNvbnRlbnRcIn19LFwiZXJyb3JzXCI6e1wiZm9ybWF0XCI6XCIle2F0dHJpYnV0ZX0gJXttZXNzYWdlfVwiLFwibWVzc2FnZXNcIjp7XCJhY2NlcHRlZFwiOlwibXVzdCBiZSBhY2NlcHRlZFwiLFwiYmxhbmtcIjpcImNhbid0IGJlIGJsYW5rXCIsXCJjb25maXJtYXRpb25cIjpcImRvZXNuJ3QgbWF0Y2ggY29uZmlybWF0aW9uXCIsXCJlbXB0eVwiOlwiY2FuJ3QgYmUgZW1wdHlcIixcImVxdWFsX3RvXCI6XCJtdXN0IGJlIGVxdWFsIHRvICV7Y291bnR9XCIsXCJldmVuXCI6XCJtdXN0IGJlIGV2ZW5cIixcImV4Y2x1c2lvblwiOlwiaXMgcmVzZXJ2ZWRcIixcImdyZWF0ZXJfdGhhblwiOlwibXVzdCBiZSBncmVhdGVyIHRoYW4gJXtjb3VudH1cIixcImdyZWF0ZXJfdGhhbl9vcl9lcXVhbF90b1wiOlwibXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXtjb3VudH1cIixcImluY2x1c2lvblwiOlwiaXMgbm90IGluY2x1ZGVkIGluIHRoZSBsaXN0XCIsXCJpbnZhbGlkXCI6XCJpcyBpbnZhbGlkXCIsXCJsZXNzX3RoYW5cIjpcIm11c3QgYmUgbGVzcyB0aGFuICV7Y291bnR9XCIsXCJsZXNzX3RoYW5fb3JfZXF1YWxfdG9cIjpcIm11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICV7Y291bnR9XCIsXCJub3RfYV9udW1iZXJcIjpcImlzIG5vdCBhIG51bWJlclwiLFwibm90X2FuX2ludGVnZXJcIjpcIm11c3QgYmUgYW4gaW50ZWdlclwiLFwib2RkXCI6XCJtdXN0IGJlIG9kZFwiLFwicmVjb3JkX2ludmFsaWRcIjpcIlZhbGlkYXRpb24gZmFpbGVkOiAle2Vycm9yc31cIixcInRha2VuXCI6XCJoYXMgYWxyZWFkeSBiZWVuIHRha2VuXCIsXCJ0b29fbG9uZ1wiOntcIm9uZVwiOlwiaXMgdG9vIGxvbmcgKG1heGltdW0gaXMgMSBjaGFyYWN0ZXIpXCIsXCJvdGhlclwiOlwiaXMgdG9vIGxvbmcgKG1heGltdW0gaXMgJXtjb3VudH0gY2hhcmFjdGVycylcIn0sXCJ0b29fc2hvcnRcIjp7XCJvbmVcIjpcImlzIHRvbyBzaG9ydCAobWluaW11bSBpcyAxIGNoYXJhY3RlcilcIixcIm90aGVyXCI6XCJpcyB0b28gc2hvcnQgKG1pbmltdW0gaXMgJXtjb3VudH0gY2hhcmFjdGVycylcIn0sXCJ3cm9uZ19sZW5ndGhcIjp7XCJvbmVcIjpcImlzIHRoZSB3cm9uZyBsZW5ndGggKHNob3VsZCBiZSAxIGNoYXJhY3RlcilcIixcIm90aGVyXCI6XCJpcyB0aGUgd3JvbmcgbGVuZ3RoIChzaG91bGQgYmUgJXtjb3VudH0gY2hhcmFjdGVycylcIn19LFwidGVtcGxhdGVcIjp7XCJib2R5XCI6XCJUaGVyZSB3ZXJlIHByb2JsZW1zIHdpdGggdGhlIGZvbGxvd2luZyBmaWVsZHM6XCIsXCJoZWFkZXJcIjp7XCJvbmVcIjpcIjEgZXJyb3IgcHJvaGliaXRlZCB0aGlzICV7bW9kZWx9IGZyb20gYmVpbmcgc2F2ZWRcIixcIm90aGVyXCI6XCIle2NvdW50fSBlcnJvcnMgcHJvaGliaXRlZCB0aGlzICV7bW9kZWx9IGZyb20gYmVpbmcgc2F2ZWRcIn19fX0sXCJkYXRlXCI6e1wiYWJicl9kYXlfbmFtZXNcIjpbXCJTdW5cIixcIk1vblwiLFwiVHVlXCIsXCJXZWRcIixcIlRodVwiLFwiRnJpXCIsXCJTYXRcIl0sXCJhYmJyX21vbnRoX25hbWVzXCI6W251bGwsXCJKYW5cIixcIkZlYlwiLFwiTWFyXCIsXCJBcHJcIixcIk1heVwiLFwiSnVuXCIsXCJKdWxcIixcIkF1Z1wiLFwiU2VwXCIsXCJPY3RcIixcIk5vdlwiLFwiRGVjXCJdLFwiZGF5X25hbWVzXCI6W1wiU3VuZGF5XCIsXCJNb25kYXlcIixcIlR1ZXNkYXlcIixcIldlZG5lc2RheVwiLFwiVGh1cnNkYXlcIixcIkZyaWRheVwiLFwiU2F0dXJkYXlcIl0sXCJmb3JtYXRzXCI6e1wiZGVmYXVsdFwiOlwiJVktJW0tJWRcIixcImxvbmdcIjpcIiVCICVkLCAlWVwiLFwic2hvcnRcIjpcIiViICVkXCJ9LFwibW9udGhfbmFtZXNcIjpbbnVsbCxcIkphbnVhcnlcIixcIkZlYnJ1YXJ5XCIsXCJNYXJjaFwiLFwiQXByaWxcIixcIk1heVwiLFwiSnVuZVwiLFwiSnVseVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9jdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSxcIm9yZGVyXCI6W1wieWVhclwiLFwibW9udGhcIixcImRheVwiXX0sXCJkYXRldGltZVwiOntcImRpc3RhbmNlX2luX3dvcmRzXCI6e1wiYWJvdXRfeF9ob3Vyc1wiOntcIm9uZVwiOlwiYWJvdXQgMSBob3VyXCIsXCJvdGhlclwiOlwiYWJvdXQgJXtjb3VudH0gaG91cnNcIn0sXCJhYm91dF94X21vbnRoc1wiOntcIm9uZVwiOlwiYWJvdXQgMSBtb250aFwiLFwib3RoZXJcIjpcImFib3V0ICV7Y291bnR9IG1vbnRoc1wifSxcImFib3V0X3hfeWVhcnNcIjp7XCJvbmVcIjpcImFib3V0IDEgeWVhclwiLFwib3RoZXJcIjpcImFib3V0ICV7Y291bnR9IHllYXJzXCJ9LFwiYWxtb3N0X3hfeWVhcnNcIjp7XCJvbmVcIjpcImFsbW9zdCAxIHllYXJcIixcIm90aGVyXCI6XCJhbG1vc3QgJXtjb3VudH0geWVhcnNcIn0sXCJoYWxmX2FfbWludXRlXCI6XCJoYWxmIGEgbWludXRlXCIsXCJsZXNzX3RoYW5feF9taW51dGVzXCI6e1wib25lXCI6XCJsZXNzIHRoYW4gYSBtaW51dGVcIixcIm90aGVyXCI6XCJsZXNzIHRoYW4gJXtjb3VudH0gbWludXRlc1wifSxcImxlc3NfdGhhbl94X3NlY29uZHNcIjp7XCJvbmVcIjpcImxlc3MgdGhhbiAxIHNlY29uZFwiLFwib3RoZXJcIjpcImxlc3MgdGhhbiAle2NvdW50fSBzZWNvbmRzXCJ9LFwib3Zlcl94X3llYXJzXCI6e1wib25lXCI6XCJvdmVyIDEgeWVhclwiLFwib3RoZXJcIjpcIm92ZXIgJXtjb3VudH0geWVhcnNcIn0sXCJ4X2RheXNcIjp7XCJvbmVcIjpcIjEgZGF5XCIsXCJvdGhlclwiOlwiJXtjb3VudH0gZGF5c1wifSxcInhfbWludXRlc1wiOntcIm9uZVwiOlwiMSBtaW51dGVcIixcIm90aGVyXCI6XCIle2NvdW50fSBtaW51dGVzXCJ9LFwieF9tb250aHNcIjp7XCJvbmVcIjpcIjEgbW9udGhcIixcIm90aGVyXCI6XCIle2NvdW50fSBtb250aHNcIn0sXCJ4X3NlY29uZHNcIjp7XCJvbmVcIjpcIjEgc2Vjb25kXCIsXCJvdGhlclwiOlwiJXtjb3VudH0gc2Vjb25kc1wifX0sXCJwcm9tcHRzXCI6e1wiZGF5XCI6XCJEYXlcIixcImhvdXJcIjpcIkhvdXJcIixcIm1pbnV0ZVwiOlwiTWludXRlXCIsXCJtb250aFwiOlwiTW9udGhcIixcInNlY29uZFwiOlwiU2Vjb25kc1wiLFwieWVhclwiOlwiWWVhclwifX0sXCJkZXZpc2VcIjp7XCJjb25maXJtYXRpb25zXCI6e1wiY29uZmlybWVkXCI6XCJXZSBzdWNjZXNzZnVsbHkgY29uZmlybWVkIHlvdXIgYWNjb3VudC5cIixcInNlbmRfaW5zdHJ1Y3Rpb25zXCI6XCJXZSBzZW50IGEgbmV3IGVtYWlsIHdpdGggaW5zdHJ1Y3Rpb25zIHRvIGNvbmZpcm0geW91ciBhY2NvdW50LiBJdCBzaG91bGQgYXJyaXZlIHdpdGhpbiBhIGZldyBtaW51dGVzIChiZSBzdXJlIHRvIGNoZWNrIHNwYW0gYW5kIGJ1bGsgZm9sZGVycykuXCIsXCJzZW5kX3BhcmFub2lkX2luc3RydWN0aW9uc1wiOlwiSWYgeW91ciBlbWFpbCBhZGRyZXNzIGV4aXN0cyBpbiBvdXIgZGF0YWJhc2UsIHlvdSB3aWxsIHJlY2VpdmUgYW4gZW1haWwgd2l0aCBpbnN0cnVjdGlvbnMgYWJvdXQgaG93IHRvIGNvbmZpcm0geW91ciBhY2NvdW50IGluIGEgZmV3IG1pbnV0ZXMuXCJ9LFwiZmFpbHVyZVwiOntcImFscmVhZHlfYXV0aGVudGljYXRlZFwiOlwiRG9uJ3Qgd29ycnkhIFlvdSdyZSBhbHJlYWR5IHNpZ25lZCBpbi5cIixcImluYWN0aXZlXCI6XCJZb3VyIGFjY291bnQgd2FzIG5vdCBhY3RpdmF0ZWQgeWV0LlwiLFwiaW52YWxpZFwiOlwiV2UgZGlkbid0IHJlY29nbml6ZSB0aGF0IGVtYWlsIG9yIHBhc3N3b3JkLlwiLFwiaW52YWxpZF90b2tlblwiOlwiSW52YWxpZCBhdXRoZW50aWNhdGlvbiB0b2tlbi5cIixcImxhc3RfYXR0ZW1wdFwiOlwiWW91IGhhdmUgb25lIG1vcmUgYXR0ZW1wdCBiZWZvcmUgeW91ciBhY2NvdW50IGlzIGxvY2tlZC5cIixcImxvY2tlZFwiOlwiWW91ciBhY2NvdW50IGlzIGxvY2tlZC5cIixcIm5vdF9mb3VuZF9pbl9kYXRhYmFzZVwiOlwiSW52YWxpZCAle2F1dGhlbnRpY2F0aW9uX2tleXN9IG9yIHBhc3N3b3JkLlwiLFwidGltZW91dFwiOlwiWW91ciBzZXNzaW9uIGV4cGlyZWQsIHBsZWFzZSBzaWduIGluIGFnYWluIHRvIGNvbnRpbnVlLlwiLFwidW5hdXRoZW50aWNhdGVkXCI6XCJZb3UgbmVlZCB0byBzaWduIGluIG9yIHNpZ24gdXAgYmVmb3JlIHlvdSBjYW4gZG8gdGhhdC5cIixcInVuY29uZmlybWVkXCI6XCJZb3UgaGF2ZSB0byBjb25maXJtIHlvdXIgYWNjb3VudCBiZWZvcmUgY29udGludWluZy5cIn0sXCJtYWlsZXJcIjp7XCJjb25maXJtYXRpb25faW5zdHJ1Y3Rpb25zXCI6e1wic3ViamVjdFwiOlwiV2VsY29tZSB0byBDb21taXRDaGFuZ2UhIExldCdzIGNvbmZpcm0geW91ciBhY2NvdW50LlwifSxcInBhc3N3b3JkX2NoYW5nZVwiOntcInN1YmplY3RcIjpcIlBhc3N3b3JkIENoYW5nZWRcIn0sXCJyZXNldF9wYXNzd29yZF9pbnN0cnVjdGlvbnNcIjp7XCJzdWJqZWN0XCI6XCJDaGFuZ2UgeW91ciBwYXNzd29yZCBvbiBDb21taXRDaGFuZ2VcIn0sXCJ1bmxvY2tfaW5zdHJ1Y3Rpb25zXCI6e1wic3ViamVjdFwiOlwiQWNjb3VudCB1bmxvY2sgaW5zdHJ1Y3Rpb25zIGZvciBDb21taXRDaGFuZ2VcIn19LFwib21uaWF1dGhfY2FsbGJhY2tzXCI6e1wiZmFpbHVyZVwiOlwiQ291bGQgbm90IHNpZ24geW91IGluIGZyb20gJXtraW5kfSBiZWNhdXNlIFxcXCIle3JlYXNvbn1cXFwiLlwiLFwic3VjY2Vzc1wiOlwiU3VjY2VzcyEgV2UndmUgc2lnbmVkIHlvdSBpbiBmcm9tICV7a2luZH0uXCJ9LFwicGFzc3dvcmRzXCI6e1wibm9fdG9rZW5cIjpcIllvdSBjYW4ndCBhY2Nlc3MgdGhpcyBwYWdlIHdpdGhvdXQgY29taW5nIGZyb20gYSBwYXNzd29yZCByZXNldCBlbWFpbC4gSWYgeW91IGRvIGNvbWUgZnJvbSBhIHBhc3N3b3JkIHJlc2V0IGVtYWlsLCBwbGVhc2UgbWFrZSBzdXJlIHlvdSB1c2VkIHRoZSBmdWxsIFVSTCBwcm92aWRlZC5cIixcInNlbmRfaW5zdHJ1Y3Rpb25zXCI6XCJDaGVjayB5b3VyIGVtYWlsIGZvciBmdXJ0aGVyIGluc3RydWN0aW9ucyFcIixcInNlbmRfcGFyYW5vaWRfaW5zdHJ1Y3Rpb25zXCI6XCJJZiB5b3VyIGVtYWlsIGFkZHJlc3MgZXhpc3RzIGluIG91ciBkYXRhYmFzZSwgeW91IHdpbGwgcmVjZWl2ZSBhIHBhc3N3b3JkIHJlY292ZXJ5IGxpbmsgYXQgeW91ciBlbWFpbCBhZGRyZXNzIGluIGEgZmV3IG1pbnV0ZXMuXCIsXCJ1cGRhdGVkXCI6XCJZb3VyIHBhc3N3b3JkIHdhcyBjaGFuZ2VkIHN1Y2Nlc3NmdWxseS4gWW91IGFyZSBub3cgc2lnbmVkIGluLlwiLFwidXBkYXRlZF9ub3RfYWN0aXZlXCI6XCJZb3VyIHBhc3N3b3JkIHdhcyBjaGFuZ2VkIHN1Y2Nlc3NmdWxseS4gSGlnaCBmaXZlLlwifSxcInJlZ2lzdHJhdGlvbnNcIjp7XCJkZXN0cm95ZWRcIjpcIkJ5ZSEgWW91ciBhY2NvdW50IHdhcyBzdWNjZXNzZnVsbHkgY2FuY2VsbGVkLiBXZSBob3BlIHRvIHNlZSB5b3UgYWdhaW4gc29vbi5cIixcImludmFsaWRcIjpcIkludmFsaWQgcGFzc3dvcmQuXCIsXCJzaWduZWRfdXBcIjpcIkhpZ2ggZml2ZSEgWW91IGhhdmUgc2lnbmVkIHVwLiBDaGVjayB5b3VyIGVtYWlsIGZvciBhIGNvbmZpcm1hdGlvbiBsaW5rLlwiLFwic2lnbmVkX3VwX2J1dF9pbmFjdGl2ZVwiOlwiWW91IGhhdmUgc2lnbmVkIHVwIHN1Y2Nlc3NmdWxseS4gSG93ZXZlciwgd2UgY291bGQgbm90IHNpZ24geW91IGluIGJlY2F1c2UgeW91ciBhY2NvdW50IGlzIG5vdCB5ZXQgYWN0aXZhdGVkLlwiLFwic2lnbmVkX3VwX2J1dF9sb2NrZWRcIjpcIllvdSBoYXZlIHNpZ25lZCB1cCBzdWNjZXNzZnVsbHkuIEhvd2V2ZXIsIHdlIGNvdWxkIG5vdCBzaWduIHlvdSBpbiBiZWNhdXNlIHlvdXIgYWNjb3VudCBpcyBsb2NrZWQuXCIsXCJzaWduZWRfdXBfYnV0X3VuY29uZmlybWVkXCI6XCJBIG1lc3NhZ2Ugd2l0aCBhIGNvbmZpcm1hdGlvbiBsaW5rIGhhcyBiZWVuIHNlbnQgdG8geW91ciBlbWFpbCBhZGRyZXNzLiBQbGVhc2Ugb3BlbiB0aGUgbGluayB0byBhY3RpdmF0ZSB5b3VyIGFjY291bnQuXCIsXCJ1cGRhdGVfbmVlZHNfY29uZmlybWF0aW9uXCI6XCJZb3UgdXBkYXRlZCB5b3VyIGFjY291bnQgc3VjY2Vzc2Z1bGx5LCBidXQgd2UgbmVlZCB0byB2ZXJpZnkgeW91ciBuZXcgZW1haWwgYWRkcmVzcy4gUGxlYXNlIGNoZWNrIHlvdXIgZW1haWwgYW5kIGNsaWNrIG9uIHRoZSBjb25maXJtIGxpbmsgdG8gZmluYWxpemUgY29uZmlybWluZyB5b3VyIG5ldyBlbWFpbCBhZGRyZXNzLlwiLFwidXBkYXRlZFwiOlwiU3VjY2VzcyEgWW91IHVwZGF0ZWQgeW91ciBhY2NvdW50LlwifSxcInNlc3Npb25zXCI6e1wiYWxyZWFkeV9zaWduZWRfb3V0XCI6XCJTaWduZWQgb3V0IHN1Y2Nlc3NmdWxseS5cIixcInNpZ25lZF9pblwiOlwiXCIsXCJzaWduZWRfb3V0XCI6XCJcIn0sXCJ1bmxvY2tzXCI6e1wic2VuZF9pbnN0cnVjdGlvbnNcIjpcIldlIHNlbnQgYSBuZXcgZW1haWwgd2l0aCBpbnN0cnVjdGlvbnMgdG8gdW5sb2NrIHlvdXIgYWNjb3VudC4gSXQgc2hvdWxkIGFycml2ZSB3aXRoaW4gYSBmZXcgbWludXRlcyAoYmUgc3VyZSB0byBjaGVjayBzcGFtIGFuZCBidWxrIGZvbGRlcnMpLlwiLFwic2VuZF9wYXJhbm9pZF9pbnN0cnVjdGlvbnNcIjpcIklmIHlvdXIgYWNjb3VudCBleGlzdHMsIHlvdSB3aWxsIHJlY2VpdmUgYW4gZW1haWwgd2l0aCBpbnN0cnVjdGlvbnMgYWJvdXQgaG93IHRvIHVubG9jayBpdCBpbiBhIGZldyBtaW51dGVzLlwiLFwidW5sb2NrZWRcIjpcIllvdXIgYWNjb3VudCBoYXMgYmVlbiB1bmxvY2tlZCBzdWNjZXNzZnVsbHkuXCJ9fSxcImRvbmF0aW9uXCI6e1wiYW1vdW50XCI6XCJUb3RhbCBBbW91bnRcIixcImNhbXBhaWduXCI6XCJDYW1wYWlnblwiLFwiY29tbWVudFwiOlwiQ29tbWVudFwiLFwiZGF0ZVwiOlwiVHJhbnNhY3Rpb24gRGF0ZVwiLFwiaW50ZXJ2YWxcIjpcIkV2ZXJ5ICV7aW50ZXJ2YWx9ICV7dGltZV91bml0fVwiLFwicGF5bWVudF9pZFwiOlwiUGF5bWVudCBJRFwiLFwicmVjdXJyaW5nX2ludGVydmFsXCI6XCJSZWN1cnJpbmcgSW50ZXJ2YWxcIixcInJlY3VycmluZ19zaW5jZVwiOlwiUmVjdXJyaW5nIFNpbmNlXCJ9LFwiZXJyb3JzXCI6e1wiYXJyYXk/XCI6XCJtdXN0IGJlIGFuIGFycmF5XCIsXCJhdHRyP1wiOlwiaXMgbWlzc2luZ1wiLFwiYm9vbD9cIjpcIm11c3QgYmUgYm9vbGVhblwiLFwiZGF0ZT9cIjpcIm11c3QgYmUgYSBkYXRlXCIsXCJkYXRlX3RpbWU/XCI6XCJtdXN0IGJlIGEgZGF0ZSB0aW1lXCIsXCJkZWNpbWFsP1wiOlwibXVzdCBiZSBhIGRlY2ltYWxcIixcImVtcHR5P1wiOlwibXVzdCBiZSBlbXB0eVwiLFwiZXFsP1wiOlwibXVzdCBiZSBlcXVhbCB0byAle2xlZnR9XCIsXCJldmVuP1wiOlwibXVzdCBiZSBldmVuXCIsXCJleGNsdWRlZF9mcm9tP1wiOntcImFyZ1wiOntcImRlZmF1bHRcIjpcIm11c3Qgbm90IGJlIG9uZSBvZjogJXtsaXN0fVwiLFwicmFuZ2VcIjpcIm11c3Qgbm90IGJlIG9uZSBvZjogJXtsaXN0X2xlZnR9IC0gJXtsaXN0X3JpZ2h0fVwifX0sXCJleGNsdWRlcz9cIjpcIm11c3Qgbm90IGluY2x1ZGUgJXt2YWx1ZX1cIixcImV4Y2x1c2lvbj9cIjpcIm11c3Qgbm90IGJlIG9uZSBvZjogJXtsaXN0fVwiLFwiZmFsc2U/XCI6XCJtdXN0IGJlIGZhbHNlXCIsXCJmaWxsZWQ/XCI6XCJtdXN0IGJlIGZpbGxlZFwiLFwiZmxvYXQ/XCI6XCJtdXN0IGJlIGEgZmxvYXRcIixcImZvcm1hdFwiOlwiJXthdHRyaWJ1dGV9ICV7bWVzc2FnZX1cIixcImZvcm1hdD9cIjpcImlzIGluIGludmFsaWQgZm9ybWF0XCIsXCJndD9cIjpcIm11c3QgYmUgZ3JlYXRlciB0aGFuICV7bnVtfVwiLFwiZ3RlcT9cIjpcIm11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICV7bnVtfVwiLFwiaGFzaD9cIjpcIm11c3QgYmUgYSBoYXNoXCIsXCJpbmNsdWRlZF9pbj9cIjp7XCJhcmdcIjp7XCJkZWZhdWx0XCI6XCJtdXN0IGJlIG9uZSBvZjogJXtsaXN0fVwiLFwicmFuZ2VcIjpcIm11c3QgYmUgb25lIG9mOiAle2xpc3RfbGVmdH0gLSAle2xpc3RfcmlnaHR9XCJ9fSxcImluY2x1ZGVzP1wiOlwibXVzdCBpbmNsdWRlICV7dmFsdWV9XCIsXCJpbmNsdXNpb24/XCI6XCJtdXN0IGJlIG9uZSBvZjogJXtsaXN0fVwiLFwiaW50P1wiOlwibXVzdCBiZSBhbiBpbnRlZ2VyXCIsXCJrZXk/XCI6XCJpcyBtaXNzaW5nXCIsXCJsdD9cIjpcIm11c3QgYmUgbGVzcyB0aGFuICV7bnVtfVwiLFwibHRlcT9cIjpcIm11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICV7bnVtfVwiLFwibWF4X3NpemU/XCI6XCJzaXplIGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gJXtudW19XCIsXCJtZXNzYWdlc1wiOntcImFjY2VwdGVkXCI6XCJtdXN0IGJlIGFjY2VwdGVkXCIsXCJhbHJlYWR5X2NvbmZpcm1lZFwiOlwid2FzIGFscmVhZHkgY29uZmlybWVkLCBwbGVhc2UgdHJ5IHNpZ25pbmcgaW5cIixcImJsYW5rXCI6XCJjYW4ndCBiZSBibGFua1wiLFwiY2FycmllcndhdmVfZG93bmxvYWRfZXJyb3JcIjpcImNvdWxkIG5vdCBiZSBkb3dubG9hZGVkXCIsXCJjYXJyaWVyd2F2ZV9pbnRlZ3JpdHlfZXJyb3JcIjpcImlzIG5vdCBvZiBhbiBhbGxvd2VkIGZpbGUgdHlwZVwiLFwiY2FycmllcndhdmVfcHJvY2Vzc2luZ19lcnJvclwiOlwiZmFpbGVkIHRvIGJlIHByb2Nlc3NlZFwiLFwiY29uZmlybWF0aW9uXCI6XCJkb2Vzbid0IG1hdGNoIGNvbmZpcm1hdGlvblwiLFwiY29uZmlybWF0aW9uX3BlcmlvZF9leHBpcmVkXCI6XCJuZWVkcyB0byBiZSBjb25maXJtZWQgd2l0aGluICV7cGVyaW9kfSwgcGxlYXNlIHJlcXVlc3QgYSBuZXcgb25lXCIsXCJlbXB0eVwiOlwiY2FuJ3QgYmUgZW1wdHlcIixcImVxdWFsX3RvXCI6XCJtdXN0IGJlIGVxdWFsIHRvICV7Y291bnR9XCIsXCJldmVuXCI6XCJtdXN0IGJlIGV2ZW5cIixcImV4Y2x1c2lvblwiOlwiaXMgcmVzZXJ2ZWRcIixcImV4cGlyZWRcIjpcImhhcyBleHBpcmVkLCBwbGVhc2UgcmVxdWVzdCBhIG5ldyBvbmVcIixcImV4dGVuc2lvbl9ibGFja19saXN0X2Vycm9yXCI6XCJZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIHVwbG9hZCAle2V4dGVuc2lvbn0gZmlsZXMsIHByb2hpYml0ZWQgdHlwZXM6ICV7cHJvaGliaXRlZF90eXBlc31cIixcImV4dGVuc2lvbl93aGl0ZV9saXN0X2Vycm9yXCI6XCJZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIHVwbG9hZCAle2V4dGVuc2lvbn0gZmlsZXMsIGFsbG93ZWQgdHlwZXM6ICV7YWxsb3dlZF90eXBlc31cIixcImdyZWF0ZXJfdGhhblwiOlwibXVzdCBiZSBncmVhdGVyIHRoYW4gJXtjb3VudH1cIixcImdyZWF0ZXJfdGhhbl9vcl9lcXVhbF90b1wiOlwibXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXtjb3VudH1cIixcImluY2x1c2lvblwiOlwiaXMgbm90IGluY2x1ZGVkIGluIHRoZSBsaXN0XCIsXCJpbnZhbGlkXCI6XCJpcyBpbnZhbGlkXCIsXCJsZXNzX3RoYW5cIjpcIm11c3QgYmUgbGVzcyB0aGFuICV7Y291bnR9XCIsXCJsZXNzX3RoYW5fb3JfZXF1YWxfdG9cIjpcIm11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICV7Y291bnR9XCIsXCJtaW1lX3R5cGVzX3Byb2Nlc3NpbmdfZXJyb3JcIjpcIkZhaWxlZCB0byBwcm9jZXNzIGZpbGUgd2l0aCBNSU1FOjpUeXBlcywgbWF5YmUgbm90IHZhbGlkIGNvbnRlbnQtdHlwZT8gT3JpZ2luYWwgRXJyb3I6ICV7ZX1cIixcIm1pbmlfbWFnaWNrX3Byb2Nlc3NpbmdfZXJyb3JcIjpcIkZhaWxlZCB0byBtYW5pcHVsYXRlIHdpdGggTWluaU1hZ2ljaywgbWF5YmUgaXQgaXMgbm90IGFuIGltYWdlPyBPcmlnaW5hbCBFcnJvcjogJXtlfVwiLFwibm90X2FfbnVtYmVyXCI6XCJpcyBub3QgYSBudW1iZXJcIixcIm5vdF9hbl9pbnRlZ2VyXCI6XCJtdXN0IGJlIGFuIGludGVnZXJcIixcIm5vdF9mb3VuZFwiOlwibm90IGZvdW5kXCIsXCJub3RfbG9ja2VkXCI6XCJ3YXMgbm90IGxvY2tlZFwiLFwibm90X3NhdmVkXCI6e1wib25lXCI6XCIxIGVycm9yOlwiLFwib3RoZXJcIjpcIiV7Y291bnR9IGVycm9yczpcIn0sXCJvZGRcIjpcIm11c3QgYmUgb2RkXCIsXCJyZWNvcmRfaW52YWxpZFwiOlwiVmFsaWRhdGlvbiBmYWlsZWQ6ICV7ZXJyb3JzfVwiLFwicm1hZ2lja19wcm9jZXNzaW5nX2Vycm9yXCI6XCJGYWlsZWQgdG8gbWFuaXB1bGF0ZSB3aXRoIHJtYWdpY2ssIG1heWJlIGl0IGlzIG5vdCBhbiBpbWFnZT8gT3JpZ2luYWwgRXJyb3I6ICV7ZX1cIixcInRha2VuXCI6XCJoYXMgYWxyZWFkeSBiZWVuIHRha2VuXCIsXCJ0b29fbG9uZ1wiOntcIm9uZVwiOlwiaXMgdG9vIGxvbmcgKG1heGltdW0gaXMgMSBjaGFyYWN0ZXIpXCIsXCJvdGhlclwiOlwiaXMgdG9vIGxvbmcgKG1heGltdW0gaXMgJXtjb3VudH0gY2hhcmFjdGVycylcIn0sXCJ0b29fc2hvcnRcIjp7XCJvbmVcIjpcImlzIHRvbyBzaG9ydCAobWluaW11bSBpcyAxIGNoYXJhY3RlcilcIixcIm90aGVyXCI6XCJpcyB0b28gc2hvcnQgKG1pbmltdW0gaXMgJXtjb3VudH0gY2hhcmFjdGVycylcIn0sXCJ3cm9uZ19sZW5ndGhcIjp7XCJvbmVcIjpcImlzIHRoZSB3cm9uZyBsZW5ndGggKHNob3VsZCBiZSAxIGNoYXJhY3RlcilcIixcIm90aGVyXCI6XCJpcyB0aGUgd3JvbmcgbGVuZ3RoIChzaG91bGQgYmUgJXtjb3VudH0gY2hhcmFjdGVycylcIn19LFwibWluX3NpemU/XCI6XCJzaXplIGNhbm5vdCBiZSBsZXNzIHRoYW4gJXtudW19XCIsXCJub25lP1wiOlwiY2Fubm90IGJlIGRlZmluZWRcIixcIm5vdF9lcWw/XCI6XCJtdXN0IG5vdCBiZSBlcXVhbCB0byAle2xlZnR9XCIsXCJudW1iZXI/XCI6XCJtdXN0IGJlIGEgbnVtYmVyXCIsXCJvZGQ/XCI6XCJtdXN0IGJlIG9kZFwiLFwib3JcIjpcIm9yXCIsXCJzaXplP1wiOntcImFyZ1wiOntcImRlZmF1bHRcIjpcInNpemUgbXVzdCBiZSAle3NpemV9XCIsXCJyYW5nZVwiOlwic2l6ZSBtdXN0IGJlIHdpdGhpbiAle3NpemVfbGVmdH0gLSAle3NpemVfcmlnaHR9XCJ9LFwidmFsdWVcIjp7XCJzdHJpbmdcIjp7XCJhcmdcIjp7XCJkZWZhdWx0XCI6XCJsZW5ndGggbXVzdCBiZSAle3NpemV9XCIsXCJyYW5nZVwiOlwibGVuZ3RoIG11c3QgYmUgd2l0aGluICV7c2l6ZV9sZWZ0fSAtICV7c2l6ZV9yaWdodH1cIn19fX0sXCJzdHI/XCI6XCJtdXN0IGJlIGEgc3RyaW5nXCIsXCJ0ZW1wbGF0ZVwiOntcImJvZHlcIjpcIlRoZXJlIHdlcmUgcHJvYmxlbXMgd2l0aCB0aGUgZm9sbG93aW5nIGZpZWxkczpcIixcImhlYWRlclwiOntcIm9uZVwiOlwiMSBlcnJvciBwcm9oaWJpdGVkIHRoaXMgJXttb2RlbH0gZnJvbSBiZWluZyBzYXZlZFwiLFwib3RoZXJcIjpcIiV7Y291bnR9IGVycm9ycyBwcm9oaWJpdGVkIHRoaXMgJXttb2RlbH0gZnJvbSBiZWluZyBzYXZlZFwifX0sXCJ0aW1lP1wiOlwibXVzdCBiZSBhIHRpbWVcIixcInRydWU/XCI6XCJtdXN0IGJlIHRydWVcIixcInR5cGU/XCI6XCJtdXN0IGJlICV7dHlwZX1cIn0sXCJmbGFzaFwiOntcImFjdGlvbnNcIjp7XCJjcmVhdGVcIjp7XCJub3RpY2VcIjpcIiV7cmVzb3VyY2VfbmFtZX0gd2FzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkLlwifSxcImRlc3Ryb3lcIjp7XCJhbGVydFwiOlwiJXtyZXNvdXJjZV9uYW1lfSBjb3VsZCBub3QgYmUgZGVzdHJveWVkLlwiLFwibm90aWNlXCI6XCIle3Jlc291cmNlX25hbWV9IHdhcyBzdWNjZXNzZnVsbHkgZGVzdHJveWVkLlwifSxcInVwZGF0ZVwiOntcIm5vdGljZVwiOlwiJXtyZXNvdXJjZV9uYW1lfSB3YXMgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQuXCJ9fX0sXCJmb290ZXJcIjp7XCJhYm91dFwiOlwiQWJvdXRcIixcInRlcm1zX2FuZF9wcml2YWN5XCI6XCJUZXJtcyBcXHUwMDI2IFByaXZhY3lcIn0sXCJncmFwZVwiOntcImVycm9yc1wiOntcImZvcm1hdFwiOlwiJXthdHRyaWJ1dGVzfSAle21lc3NhZ2V9XCIsXCJtZXNzYWdlc1wiOntcImFsbF9vcl9ub25lXCI6XCJwcm92aWRlIGFsbCBvciBub25lIG9mIHBhcmFtZXRlcnNcIixcImF0X2xlYXN0X29uZVwiOlwiYXJlIG1pc3NpbmcsIGF0IGxlYXN0IG9uZSBwYXJhbWV0ZXIgbXVzdCBiZSBwcm92aWRlZFwiLFwiYmxhbmtcIjpcImlzIGVtcHR5XCIsXCJjb2VyY2VcIjpcImlzIGludmFsaWRcIixcImV4YWN0bHlfb25lXCI6XCJhcmUgbWlzc2luZywgZXhhY3RseSBvbmUgcGFyYW1ldGVyIG11c3QgYmUgcHJvdmlkZWRcIixcImV4Y2VwdF92YWx1ZXNcIjpcImhhcyBhIHZhbHVlIG5vdCBhbGxvd2VkXCIsXCJpbmNvbXBhdGlibGVfb3B0aW9uX3ZhbHVlc1wiOlwiJXtvcHRpb24xfTogJXt2YWx1ZTF9IGlzIGluY29tcGF0aWJsZSB3aXRoICV7b3B0aW9uMn06ICV7dmFsdWUyfVwiLFwiaW52YWxpZF9hY2NlcHRfaGVhZGVyXCI6e1wicHJvYmxlbVwiOlwiSW52YWxpZCBhY2NlcHQgaGVhZGVyXCIsXCJyZXNvbHV0aW9uXCI6XCIle21lc3NhZ2V9XCJ9LFwiaW52YWxpZF9mb3JtYXR0ZXJcIjpcImNhbm5vdCBjb252ZXJ0ICV7a2xhc3N9IHRvICV7dG9fZm9ybWF0fVwiLFwiaW52YWxpZF9tZXNzYWdlX2JvZHlcIjp7XCJwcm9ibGVtXCI6XCJtZXNzYWdlIGJvZHkgZG9lcyBub3QgbWF0Y2ggZGVjbGFyZWQgZm9ybWF0XCIsXCJyZXNvbHV0aW9uXCI6XCJ3aGVuIHNwZWNpZnlpbmcgJXtib2R5X2Zvcm1hdH0gYXMgY29udGVudC10eXBlLCB5b3UgbXVzdCBwYXNzIHZhbGlkICV7Ym9keV9mb3JtYXR9IGluIHRoZSByZXF1ZXN0J3MgJ2JvZHknIFwifSxcImludmFsaWRfdmVyc2lvbl9oZWFkZXJcIjp7XCJwcm9ibGVtXCI6XCJJbnZhbGlkIHZlcnNpb24gaGVhZGVyXCIsXCJyZXNvbHV0aW9uXCI6XCIle21lc3NhZ2V9XCJ9LFwiaW52YWxpZF92ZXJzaW9uZXJfb3B0aW9uXCI6e1wicHJvYmxlbVwiOlwiVW5rbm93biA6dXNpbmcgZm9yIHZlcnNpb25lcjogJXtzdHJhdGVneX1cIixcInJlc29sdXRpb25cIjpcImF2YWlsYWJsZSBzdHJhdGVneSBmb3IgOnVzaW5nIGlzIDpwYXRoLCA6aGVhZGVyLCA6YWNjZXB0X3ZlcnNpb25faGVhZGVyLCA6cGFyYW1cIn0sXCJpbnZhbGlkX3dpdGhfb3B0aW9uX2Zvcl9yZXByZXNlbnRcIjp7XCJwcm9ibGVtXCI6XCJZb3UgbXVzdCBzcGVjaWZ5IGFuIGVudGl0eSBjbGFzcyBpbiB0aGUgOndpdGggb3B0aW9uLlwiLFwicmVzb2x1dGlvblwiOlwiZWc6IHJlcHJlc2VudCBVc2VyLCA6d2l0aCA9XFx1MDAzRSBFbnRpdHk6OlVzZXJcIn0sXCJpc19lcXVhbF90b1wiOlwibXVzdCBiZSB0aGUgc2FtZVwiLFwibWlzc2luZ19ncm91cF90eXBlXCI6XCJncm91cCB0eXBlIGlzIHJlcXVpcmVkXCIsXCJtaXNzaW5nX21pbWVfdHlwZVwiOntcInByb2JsZW1cIjpcIm1pc3NpbmcgbWltZSB0eXBlIGZvciAle25ld19mb3JtYXR9XCIsXCJyZXNvbHV0aW9uXCI6XCJ5b3UgY2FuIGNob29zZSBleGlzdGluZyBtaW1lIHR5cGUgZnJvbSBHcmFwZTo6Q29udGVudFR5cGVzOjpDT05URU5UX1RZUEVTIG9yIGFkZCB5b3VyIG93biB3aXRoIGNvbnRlbnRfdHlwZSA6JXtuZXdfZm9ybWF0fSwgJ2FwcGxpY2F0aW9uLyV7bmV3X2Zvcm1hdH0nIFwifSxcIm1pc3Npbmdfb3B0aW9uXCI6XCJZb3UgbXVzdCBzcGVjaWZ5IDole29wdGlvbn0gb3B0aW9ucy5cIixcIm1pc3NpbmdfdmVuZG9yX29wdGlvblwiOntcInByb2JsZW1cIjpcIm1pc3NpbmcgOnZlbmRvciBvcHRpb24uXCIsXCJyZXNvbHV0aW9uXCI6XCJlZzogdmVyc2lvbiAndjEnLCB1c2luZzogOmhlYWRlciwgdmVuZG9yOiAndHdpdHRlcidcIixcInN1bW1hcnlcIjpcIndoZW4gdmVyc2lvbiB1c2luZyBoZWFkZXIsIHlvdSBtdXN0IHNwZWNpZnkgOnZlbmRvciBvcHRpb24uIFwifSxcIm11dHVhbF9leGNsdXNpb25cIjpcImFyZSBtdXR1YWxseSBleGNsdXNpdmVcIixcInByZXNlbmNlXCI6XCJpcyBtaXNzaW5nXCIsXCJyZWdleHBcIjpcImlzIGludmFsaWRcIixcInVua25vd25fb3B0aW9uc1wiOlwidW5rbm93biBvcHRpb25zOiAle29wdGlvbnN9XCIsXCJ1bmtub3duX3BhcmFtZXRlclwiOlwidW5rbm93biBwYXJhbWV0ZXI6ICV7cGFyYW19XCIsXCJ1bmtub3duX3ZhbGlkYXRvclwiOlwidW5rbm93biB2YWxpZGF0b3I6ICV7dmFsaWRhdG9yX3R5cGV9XCIsXCJ1bnN1cHBvcnRlZF9ncm91cF90eXBlXCI6XCJncm91cCB0eXBlIG11c3QgYmUgQXJyYXksIEhhc2gsIEpTT04gb3IgQXJyYXlbSlNPTl1cIixcInZhbHVlc1wiOlwiZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHZhbHVlXCJ9fX0sXCJoZWxsb1wiOlwiSGVsbG8gd29ybGRcIixcImhlbHBlcnNcIjp7XCJidXR0b25cIjp7XCJjcmVhdGVcIjpcIkNyZWF0ZSAle21vZGVsfVwiLFwic3VibWl0XCI6XCJTYXZlICV7bW9kZWx9XCIsXCJ1cGRhdGVcIjpcIlVwZGF0ZSAle21vZGVsfVwifSxcInNlbGVjdFwiOntcInByb21wdFwiOlwiUGxlYXNlIHNlbGVjdFwifSxcInN1Ym1pdFwiOntcImNyZWF0ZVwiOlwiQ3JlYXRlICV7bW9kZWx9XCIsXCJzdWJtaXRcIjpcIlNhdmUgJXttb2RlbH1cIixcInVwZGF0ZVwiOlwiVXBkYXRlICV7bW9kZWx9XCJ9fSxcImkxOG5cIjp7XCJwbHVyYWxcIjp7XCJrZXlzXCI6W1wib25lXCIsXCJvdGhlclwiXSxcInJ1bGVcIjp7fX19LFwibG9naW5cIjp7XCJlbWFpbFwiOlwiRW1haWxcIixcImZvcmdvdF9wYXNzd29yZFwiOlwiRm9yZ290IFBhc3N3b3JkP1wiLFwiZ2V0X3N0YXJ0ZWRcIjpcIkdldCBTdGFydGVkXCIsXCJoZWFkZXJcIjpcIkxvZ2luXCIsXCJsb2dnaW5nX2luXCI6XCJMb2dnaW5nIHlvdSBpbi4uLlwiLFwibG9naW5cIjpcIkxvZ2luXCIsXCJwYXNzd29yZFwiOlwiUGFzc3dvcmRcIn0sXCJtYWlsZXJcIjp7XCJkb25hdGlvbnNcIjp7XCJkb25hdGlvbl9yZWNlaXB0XCI6XCJEb25hdGlvbiBSZWNlaXB0XCIsXCJkb25vcl9kaXJlY3RfZGViaXRfbm90aWZpY2F0aW9uXCI6e1wiZG9uYXRpb25fcXVldWVkX2h0bWxcIjpcIllvdXIgZGlyZWN0IGRlYml0IGRvbmF0aW9uIHRvd2FyZHMgXFx1MDAzQ3N0cm9uZ1xcdTAwM0Ule25vbnByb2ZpdF9uYW1lfVxcdTAwM0Mvc3Ryb25nXFx1MDAzRSBoYXMgYmVlbiBxdWV1ZWQgZm9yIHByb2Nlc3NpbmcuXCIsXCJyZWN1cnJpbmdfZG9uYXRpb25fcXVldWVkX2h0bWxcIjpcIlRoYW5rIHlvdSBmb3IgeW91ciByZWd1bGFyIGRvbmF0aW9uIHRvIFxcdTAwM0NzdHJvbmdcXHUwMDNFJXtub25wcm9maXRfbmFtZX1cXHUwMDNDL3N0cm9uZ1xcdTAwM0UgYW5kIGZvciBqb2luaW5nIHRob3VzYW5kcyBvZiBwZW9wbGUgYWNyb3NzIEV1cm9wZSB3aG8gYXJlIGludmVzdGVkIGluIG1ha2luZyBvdXIgbW92ZW1lbnQgYSB0cnVlIGZvcmNlIHRvIGJlIHJlY2tvbmVkIHdpdGguIFlvdXIgc3VwcG9ydCB3aWxsIGdvIHRvd2FyZHMgZW5zdXJpbmcgd2UgY2FuIG1vdmUgZmFzdCB0byB3aW4gdGhlIGNhbXBhaWducyB0aGF0IG1hdHRlciB0byBhbGwgb2YgdXMuXCIsXCJzdWJqZWN0XCI6XCJEb25hdGlvbiByZWNlaXB0IGZvciAle25vbnByb2ZpdF9uYW1lfVwiLFwidHJhbnNmZXJfaW5mb19odG1sXCI6XCJUaGlzIHRyYW5zZmVyIHdpbGwgYXBwZWFyIG9uIHlvdXIgYmFuayBzdGF0ZW1lbnQgYXMgJXtsYWJlbH1cIixcInRyYW5zZmVyX2xhYmVsX2h0bWxcIjpcIlxcdTAwM0NzdHJvbmdcXHUwMDNFRG9uYXRpb24gJXtub25wcm9maXRfc3RhdGVtZW50fVxcdTAwM0Mvc3Ryb25nXFx1MDAzRS5cIn0sXCJkb25vcl9uYW1lXCI6XCJEb25vciBOYW1lXCIsXCJkb25vcl9yZWNlaXB0XCI6e1wib25lb2ZmX2RvbmF0aW9uX2h0bWxcIjpcIllvdXIgZG9uYXRpb24gdG93YXJkcyBcXHUwMDNDc3Ryb25nXFx1MDAzRSV7bm9ucHJvZml0X25hbWV9XFx1MDAzQy9zdHJvbmdcXHUwMDNFIHdhcyBzdWNjZXNzZnVsIVwiLFwicmVjdXJyaW5nX2RvbmF0aW9uX2NhbmNlbF9tb2RpZnlfaHRtbFwiOlwiSWYgeW91IG5lZWQgdG8gdXBkYXRlIHlvdXIgY2FyZCBvciBjYW5jZWwgeW91ciByZWN1cnJpbmcgZG9uYXRpb24sIHBsZWFzZSBmb2xsb3cgdGhpcyBsaW5rOiBcXHUwMDNDYSBocmVmPVxcXCIle21hbmFnZW1lbnRfdXJsfVxcXCJcXHUwMDNFJXttYW5hZ2VtZW50X3VybH1cXHUwMDNDL2FcXHUwMDNFXCIsXCJyZWN1cnJpbmdfZG9uYXRpb25faHRtbFwiOlwiWW91ciByZWN1cnJpbmcgZG9uYXRpb24gdG93YXJkcyBcXHUwMDNDc3Ryb25nXFx1MDAzRSV7bm9ucHJvZml0X25hbWV9XFx1MDAzQy9zdHJvbmdcXHUwMDNFLCBzdGFydGVkIG9uICV7c3RhcnRfZGF0ZX0sIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBwYWlkLlwiLFwic3ViamVjdFwiOlwiRG9uYXRpb24gcmVjZWlwdCBmb3IgJXtub25wcm9maXRfbmFtZX1cIixcInRyYW5zZmVyX2luZm9faHRtbFwiOlwiVGhpcyB0cmFuc2ZlciB3aWxsIGFwcGVhciBvbiB5b3VyIGJhbmsgc3RhdGVtZW50IGFzICV7bGFiZWx9XCIsXCJ0cmFuc2Zlcl9sYWJlbF9odG1sXCI6XCJcXHUwMDNDc3Ryb25nXFx1MDAzRURvbmF0aW9uICV7bm9ucHJvZml0X3N0YXRlbWVudH1cXHUwMDNDL3N0cm9uZ1xcdTAwM0UuXCJ9fX0sXCJub25wcm9maXRzXCI6e1wiZG9uYXRlXCI6e1wiYW1vdW50XCI6e1wiY3VzdG9tXCI6XCJDdXN0b21cIixcImRlc2lnbmF0aW9uXCI6e1wiY2hvb3NlXCI6XCJDaG9vc2UgYSBkZXNpZ25hdGlvbiAob3B0aW9uYWwpXCIsXCJsYWJlbFwiOlwiRGVzaWduYXRpb246XCIsXCJtb3N0X25lZWRlZFwiOlwiVXNlIG15IGRvbmF0aW9uIHdoZXJlIG1vc3QgbmVlZGVkXCJ9LFwibGFiZWxcIjpcIkFtb3VudFwiLFwibW9udGhseVwiOlwibW9udGhseVwiLFwibmV4dFwiOlwiTmV4dFwiLFwic3VzdGFpbmluZ1wiOlwiQmVjb21lIGEgc3VzdGFpbmluZywgbW9udGhseSBjb250cmlidXRvclwiLFwic3VzdGFpbmluZ19ib2xkXCI6XCJzdXN0YWluaW5nLCBtb250aGx5XCIsXCJzdXN0YWluaW5nX3NlbGVjdGVkXCI6XCJTZWxlY3QgYW4gYW1vdW50IGZvciB5b3VyIG1vbnRobHkgY29udHJpYnV0aW9uXCIsXCJzdXN0YWluaW5nX3NlbGVjdGVkX2JvbGRcIjpcIm1vbnRobHlcIixcIndlZWtseVwiOlwid2Vla2x5XCIsXCJ3ZWVrbHlfbm90aWNlXCI6XCIqdG8ga2VlcCBiYW5rIGZlZXMgbG93LCB3ZSdsbCBkZWJpdCAle2Ftb3VudH0gJXtjdXJyZW5jeX0gbW9udGhseVwifSxcImNhbXBhaWduXCI6e1wibmFtZVwiOlwiXCIsXCJ0YWdsaW5lXCI6XCJcIn0sXCJkZWRpY2F0aW9uXCI6e1wiZG9ub3Jfbm90ZVwiOlwiVGhlIGRvbm9yJ3Mgbm90ZSB3YXM6IFwiLFwiZW1haWxcIjpcIkVtYWlsIChvcHRpb25hbClcIixcImZpcnN0X25hbWVcIjpcIkZpcnN0IG5hbWVcIixcImZ1bGxfYWRkcmVzc1wiOlwiRnVsbCBBZGRyZXNzIChvcHRpb25hbClcIixcImluX2hvbm9yX2xhYmVsXCI6XCJJbiBob25vciBvZlwiLFwiaW5fbWVtb3J5X2xhYmVsXCI6XCJJbiBtZW1vcnkgb2ZcIixcImluZm9cIjpcIkFkZCBhIGRlZGljYXRpb24gZm9yIHlvdXIgZG9uYXRpb246XCIsXCJsYXN0X25hbWVcIjpcIkxhc3QgbmFtZVwiLFwibm90ZVwiOlwiTm90ZSBvciBtZXNzYWdlXCIsXCJwaG9uZVwiOlwiUGhvbmUgKG9wdGlvbmFsKVwiLFwic2F2ZVwiOlwiU2F2ZSBcXHUwMDI2IFJldHVyblwifSxcImZvbGxvd3VwXCI6e1wiZmluaXNoXCI6XCJGaW5pc2hcIixcIm1lc3NhZ2VcIjpcImFwcHJlY2lhdGVzIHlvdXIgc3VwcG9ydCFcIixcInJlY2VpcHRfaW5mb1wiOlwiQSByZWNlaXB0IHdpbGwgYmUgZW1haWxlZCB0b1wiLFwic2hhcmVcIjp7XCJmYWNlYm9va1wiOlwiU2hhcmVcIixcInR3aXR0ZXJcIjpcIlR3ZWV0XCIsXCJ0d2l0dGVyX21lc3NhZ2VcIjpcIkpvaW4gbWUgaW4gc3VwcG9ydGluZ1wifSxcInN1Y2Nlc3NcIjpcIllvdXIgZG9uYXRpb24gd2FzIHN1Y2Nlc3NmdWwhXCJ9LFwiaW5mb1wiOntcImFub255bW91c19jaGVja2JveFwiOlwiTWFrZSB0aGlzIGRvbmF0aW9uIGFub255bW91cy5cIixcImRlZGljYXRpb25fbGlua1wiOlwiTWFrZSB0aGlzIGRvbmF0aW9uIGluIGhvbm9yL21lbW9yeSBvZiBzb21lb25lLlwiLFwiZGVkaWNhdGlvbl9zYXZlZFwiOlwiRGVkaWNhdGluZyBkb25hdGlvbiB0byBcIixcImxhYmVsXCI6XCJJbmZvXCIsXCJuZXh0XCI6XCJOZXh0XCIsXCJzdXBwb3J0ZXJcIjp7XCJhZGRyZXNzXCI6XCJBZGRyZXNzXCIsXCJjaXR5XCI6XCJDaXR5XCIsXCJjb3VudHJ5XCI6XCJDb3VudHJ5XCIsXCJlbWFpbFwiOlwiRW1haWxcIixcImVtYWlsX3JlcXVpcmVkXCI6XCIgKHJlcXVpcmVkIGZvciByZWNlaXB0KVwiLFwiZXJyb3JzXCI6e1wiZW1haWxcIjp7XCJmb3JtYXRcIjpcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3NcIn19LFwiZmlyc3RfbmFtZVwiOlwiRmlyc3QgbmFtZVwiLFwiZnVsbF9uYW1lXCI6XCJGdWxsIG5hbWVcIixcImxhc3RfbmFtZVwiOlwiTGFzdCBuYW1lXCIsXCJvdGhlcl9jb3VudHJ5XCI6XCJPdGhlclwiLFwicGhvbmVcIjpcIlBob25lXCIsXCJwb3N0YWxfY29kZVwiOlwiUG9zdGFsIGNvZGVcIixcInJlZ2lvblwiOlwiUmVnaW9uXCIsXCJzaGlwcGluZ19hZGRyZXNzXCI6XCJTaGlwcGluZyBhZGRyZXNzIChyZXF1aXJlZClcIixcInN0YXRlXCI6XCJTZWxlY3Qgc3RhdGVcIn19LFwibG9nX291dFwiOlwiTG9nb3V0XCIsXCJwYXltZW50XCI6e1wiY2FyZFwiOntcImN2Y1wiOlwiQ1ZDXCIsXCJlcnJvcnNcIjp7XCJlbWFpbFwiOntcImZvcm1hdFwiOlwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzc1wifSxcImZpZWxkXCI6e1wiZm9ybWF0XCI6XCJUaGlzIGRvZXNuJ3QgbG9vayBsaWtlIHRoZSByaWdodCBmb3JtYXRcIixcInByZXNlbmNlXCI6XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkXCJ9LFwibnVtYmVyXCI6e1wiZm9ybWF0XCI6XCJUaGF0IGNhcmQgbnVtYmVyIGRvZXNuJ3QgbG9vayByaWdodFwiLFwicHJlc2VuY2VcIjpcIlBsZWFzZSBlbnRlciB5b3VyIGNhcmQgbnVtYmVyXCJ9fSxcImxvYWRpbmdcIjpcIlNhdmluZy4uLlwiLFwibW9udGhcIjpcIk1vbnRoXCIsXCJuYW1lXCI6XCJDYXJkaG9sZGVyJ3MgTmFtZVwiLFwibnVtYmVyXCI6XCJDYXJkIE51bWJlclwiLFwicG9zdGFsX2NvZGVcIjpcIlppcCBDb2RlXCIsXCJzZWN1cmVfaW5mb1wiOlwiVHJhbnNhY3Rpb25zIHNlY3VyZWQgd2l0aCAyNTYtYml0IFNTTFwiLFwic3VibWl0XCI6XCJTdWJtaXRcIixcInllYXJcIjpcIlllYXJcIn0sXCJsYWJlbFwiOlwiUGF5bWVudFwiLFwibG9hZGluZ1wiOntcImNoZWNraW5nX2NhcmRcIjpcIkNoZWNraW5nIGNhcmQuLi5cIixcInNlbmRpbmdfcGF5bWVudFwiOlwiU2VuZGluZyB0aGUgcGF5bWVudC4uLlwifSxcIm1vbnRobHlfcmVjdXJyaW5nXCI6XCJtb250aGx5IHJlY3VycmluZ1wiLFwib25lX3RpbWVcIjpcIm9uZS10aW1lXCIsXCJzZXBhXCI6e1wiYmljXCI6XCJCSUMvU1dJRlRcIixcImVycm9yc1wiOntcImZpZWxkXCI6e1wiZm9ybWF0XCI6XCJUaGlzIGRvZXNuJ3QgbG9vayBsaWtlIHRoZSByaWdodCBmb3JtYXRcIixcInByZXNlbmNlXCI6XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkXCJ9fSxcImliYW5cIjpcIklCQU5cIixcIm5hbWVcIjpcIkFjY291bnQgb3duZXIgbmFtZVwifSxcInRhYnNcIjp7XCJjYXJkXCI6XCJDcmVkaXQgQ2FyZFwiLFwic2VwYVwiOlwiRGlyZWN0IERlYml0XCJ9fSxcInNpZ25lZF9pblwiOlwiU2lnbmVkIGluIGFzXCJ9fSxcIm51bWJlclwiOntcImN1cnJlbmN5XCI6e1wiZm9ybWF0XCI6e1wiZGVsaW1pdGVyXCI6XCIsXCIsXCJmb3JtYXRcIjpcIiV1JW5cIixcInByZWNpc2lvblwiOjIsXCJzZXBhcmF0b3JcIjpcIi5cIixcInNpZ25pZmljYW50XCI6ZmFsc2UsXCJzdHJpcF9pbnNpZ25pZmljYW50X3plcm9zXCI6ZmFsc2UsXCJ1bml0XCI6XCIkXCJ9fSxcImZvcm1hdFwiOntcImRlbGltaXRlclwiOlwiLFwiLFwicHJlY2lzaW9uXCI6MyxcInNlcGFyYXRvclwiOlwiLlwiLFwic2lnbmlmaWNhbnRcIjpmYWxzZSxcInN0cmlwX2luc2lnbmlmaWNhbnRfemVyb3NcIjpmYWxzZX0sXCJodW1hblwiOntcImRlY2ltYWxfdW5pdHNcIjp7XCJmb3JtYXRcIjpcIiVuICV1XCIsXCJ1bml0c1wiOntcImJpbGxpb25cIjpcIkJpbGxpb25cIixcIm1pbGxpb25cIjpcIk1pbGxpb25cIixcInF1YWRyaWxsaW9uXCI6XCJRdWFkcmlsbGlvblwiLFwidGhvdXNhbmRcIjpcIlRob3VzYW5kXCIsXCJ0cmlsbGlvblwiOlwiVHJpbGxpb25cIixcInVuaXRcIjpcIlwifX0sXCJmb3JtYXRcIjp7XCJkZWxpbWl0ZXJcIjpcIlwiLFwicHJlY2lzaW9uXCI6MyxcInNpZ25pZmljYW50XCI6dHJ1ZSxcInN0cmlwX2luc2lnbmlmaWNhbnRfemVyb3NcIjp0cnVlfSxcInN0b3JhZ2VfdW5pdHNcIjp7XCJmb3JtYXRcIjpcIiVuICV1XCIsXCJ1bml0c1wiOntcImJ5dGVcIjp7XCJvbmVcIjpcIkJ5dGVcIixcIm90aGVyXCI6XCJCeXRlc1wifSxcImdiXCI6XCJHQlwiLFwia2JcIjpcIktCXCIsXCJtYlwiOlwiTUJcIixcInRiXCI6XCJUQlwifX19LFwicGVyY2VudGFnZVwiOntcImZvcm1hdFwiOntcImRlbGltaXRlclwiOlwiXCJ9fSxcInByZWNpc2lvblwiOntcImZvcm1hdFwiOntcImRlbGltaXRlclwiOlwiXCJ9fX0sXCJvcmdhbml6YXRpb25cIjp7XCJuYW1lXCI6XCJPcmdhbmlzYXRpb25cIn0sXCJvcmdhbml6YXRpb25fcGFnZVwiOntcInByb21vdGVcIjpcIlByb21vdGUgdGhpcyBvcmdhbml6YXRpb25cIn0sXCJyZWdpc3RyYXRpb25cIjp7XCJnZXRfc3RhcnRlZFwiOntcImRlc2NyaXB0aW9uXCI6XCJMZXQncyBnZXQgc3RhcnRlZCB3aXRoIEhvdWRpbmkuIFRvIGJlZ2luLCBmaWxsIG91dCB5b3VyIGluaXRpYWwgbm9ucHJvZml0IGFuZCBpbmZvLlwiLFwiaGVhZGVyXCI6XCJHZXQgc3RhcnRlZFwifSxcIndpemFyZFwiOntcImNvbnRhY3RcIjp7XCJlbWFpbFwiOntcImxhYmVsXCI6XCJZb3VyIEVtYWlsICh1c2VkIGZvciBsb2dpbilcIixcInBsYWNlaG9sZGVyXCI6XCJwZW5lbG9wZUBlbmRwb3ZlcnR5aW50aGVmb3h2YWxsZXlpbmMub3JnXCJ9LFwibmFtZVwiOntcImxhYmVsXCI6XCJZb3VyIE5hbWVcIixcInBsYWNlaG9sZGVyXCI6XCJQZW5lbG9wZSBTY2h1bHR6XCJ9LFwicGFzc3dvcmRcIjp7XCJsYWJlbFwiOlwiTmV3IFBhc3N3b3JkXCJ9LFwicGFzc3dvcmRfY29uZmlybWF0aW9uXCI6e1wibGFiZWxcIjpcIlJldHlwZSBQYXNzd29yZFwifSxcInBob25lXCI6e1wibGFiZWxcIjpcIllvdXIgUGhvbmUgKGZvciBhY2NvdW50IHJlY292ZXJ5KVwiLFwicGxhY2Vob2xkZXJcIjpcIig1NTUpIDU1NS01NTU1XCJ9fSxcIm5leHRcIjpcIk5leHRcIixcIm5vbnByb2ZpdFwiOntcImNpdHlcIjp7XCJsYWJlbFwiOlwiQ2l0eVwiLFwicGxhY2Vob2xkZXJcIjpcIkFwcGxldG9uXCJ9LFwiZW1haWxcIjp7XCJsYWJlbFwiOlwiT3JnIEVtYWlsIChwdWJsaWMpXCIsXCJwbGFjZWhvbGRlclwiOlwiY29udGFjdEBlbmRwb3ZlcnR5aW50aGVmb3h2YWxsZXlpbmMub3JnXCJ9LFwibmFtZVwiOntcImxhYmVsXCI6XCJPcmdhbml6YXRpb24gTmFtZVwiLFwicGxhY2Vob2xkZXJcIjpcIkVuZGluZyBQb3ZlcnR5IGluIHRoZSBGb3ggVmFsbGV5IEluYy5cIn0sXCJwaG9uZVwiOntcImxhYmVsXCI6XCJPcmcgUGhvbmUgKHB1YmxpYylcIixcInBsYWNlaG9sZGVyXCI6XCIoNTU1KSA1NTUtNTU1NVwifSxcInN0YXRlXCI6e1wibGFiZWxcIjpcIlN0YXRlXCIsXCJwbGFjZWhvbGRlclwiOlwiV0lcIn0sXCJ3ZWJzaXRlXCI6e1wibGFiZWxcIjpcIldlYnNpdGUgVVJMXCIsXCJwbGFjZWhvbGRlclwiOlwiaHR0cDovL3d3dy5lbmRwb3ZlcnR5aW50aGVmb3h2YWxsZXlpbmMub3JnXCJ9LFwiemlwXCI6e1wibGFiZWxcIjpcIlppcCBDb2RlXCIsXCJwbGFjZWhvbGRlclwiOlwiNTQ5MTVcIn19LFwic2F2ZV9hbmRfZmluaXNoXCI6XCJTYXZlIFxcdTAwMjYgRmluaXNoXCIsXCJzYXZpbmdcIjpcIlNhdmluZy4uLlwiLFwidGFic1wiOntcImNvbnRhY3RcIjpcIkNvbnRhY3RcIixcIm5vbnByb2ZpdFwiOlwiTm9ucHJvZml0XCJ9fX0sXCJzdXBwb3J0XCI6e1wiYXJyYXlcIjp7XCJsYXN0X3dvcmRfY29ubmVjdG9yXCI6XCIsIGFuZCBcIixcInR3b193b3Jkc19jb25uZWN0b3JcIjpcIiBhbmQgXCIsXCJ3b3Jkc19jb25uZWN0b3JcIjpcIiwgXCJ9fSxcInRpbWVcIjp7XCJhbVwiOlwiYW1cIixcImZvcm1hdHNcIjp7XCJkZWZhdWx0XCI6XCIlYSwgJWQgJWIgJVkgJUg6JU06JVMgJXpcIixcImxvbmdcIjpcIiVCICVkLCAlWSAlSDolTVwiLFwic2hvcnRcIjpcIiVkICViICVIOiVNXCJ9LFwicG1cIjpcInBtXCJ9fSk7XG5JMThuLnRyYW5zbGF0aW9uc1tcImRlXCJdID0gSTE4bi5leHRlbmQoKEkxOG4udHJhbnNsYXRpb25zW1wiZGVcIl0gfHwge30pLCB7XCJhY3RpdmVtb2RlbFwiOntcImVycm9yc1wiOntcImZvcm1hdFwiOlwiJXthdHRyaWJ1dGV9ICV7bWVzc2FnZX1cIixcIm1lc3NhZ2VzXCI6e1wiYWNjZXB0ZWRcIjpcIm11c3MgYWt6ZXB0aWVydCB3ZXJkZW5cIixcImJsYW5rXCI6XCJtdXNzIGF1c2dlZlxcdTAwZmNsbHQgd2VyZGVuXCIsXCJjb25maXJtYXRpb25cIjpcInN0aW1tdCBuaWNodCBtaXQgZGVyIEJlc3RcXHUwMGU0dGlndW5nIFxcdTAwZmNiZXJlaW5cIixcImVtcHR5XCI6XCJtdXNzIGF1c2dlZlxcdTAwZmNsbHQgd2VyZGVuXCIsXCJlcXVhbF90b1wiOlwibXVzcyBnZW5hdSAle2NvdW50fSBzZWluXCIsXCJldmVuXCI6XCJtdXNzIGdlcmFkZSBzZWluXCIsXCJleGNsdXNpb25cIjpcImlzdCBuaWNodCB2ZXJmXFx1MDBmY2diYXJcIixcImdyZWF0ZXJfdGhhblwiOlwibXVzcyBnclxcdTAwZjZcXHUwMGRmZXIgYWxzICV7Y291bnR9IHNlaW5cIixcImdyZWF0ZXJfdGhhbl9vcl9lcXVhbF90b1wiOlwibXVzcyBnclxcdTAwZjZcXHUwMGRmZXIgb2RlciBnbGVpY2ggJXtjb3VudH0gc2VpblwiLFwiaW5jbHVzaW9uXCI6XCJpc3Qga2VpbiBnXFx1MDBmY2x0aWdlciBXZXJ0XCIsXCJpbnZhbGlkXCI6XCJpc3QgbmljaHQgZ1xcdTAwZmNsdGlnXCIsXCJsZXNzX3RoYW5cIjpcIm11c3Mga2xlaW5lciBhbHMgJXtjb3VudH0gc2VpblwiLFwibGVzc190aGFuX29yX2VxdWFsX3RvXCI6XCJtdXNzIGtsZWluZXIgb2RlciBnbGVpY2ggJXtjb3VudH0gc2VpblwiLFwibm90X2FfbnVtYmVyXCI6XCJpc3Qga2VpbmUgWmFobFwiLFwibm90X2FuX2ludGVnZXJcIjpcIm11c3MgZ2FuenphaGxpZyBzZWluXCIsXCJvZGRcIjpcIm11c3MgdW5nZXJhZGUgc2VpblwiLFwicmVjb3JkX2ludmFsaWRcIjpcIkdcXHUwMGZjbHRpZ2tlaXRzcHJcXHUwMGZjZnVuZyBpc3QgZmVobGdlc2NobGFnZW46ICV7ZXJyb3JzfVwiLFwidGFrZW5cIjpcImlzdCBiZXJlaXRzIHZlcmdlYmVuXCIsXCJ0b29fbG9uZ1wiOlwiaXN0IHp1IGxhbmcgKG1laHIgYWxzICV7Y291bnR9IFplaWNoZW4pXCIsXCJ0b29fc2hvcnRcIjpcImlzdCB6dSBrdXJ6ICh3ZW5pZ2VyIGFscyAle2NvdW50fSBaZWljaGVuKVwiLFwid3JvbmdfbGVuZ3RoXCI6XCJoYXQgZGllIGZhbHNjaGUgTFxcdTAwZTRuZ2UgKG11c3MgZ2VuYXUgJXtjb3VudH0gWmVpY2hlbiBoYWJlbilcIn0sXCJ0ZW1wbGF0ZVwiOntcImJvZHlcIjpcIkJpdHRlIFxcdTAwZmNiZXJwclxcdTAwZmNmZW4gU2llIGRpZSBmb2xnZW5kZW4gRmVsZGVyOlwiLFwiaGVhZGVyXCI6e1wib25lXCI6XCJLb25udGUgJXttb2RlbH0gbmljaHQgc3BlaWNoZXJuOiBlaW4gRmVobGVyLlwiLFwib3RoZXJcIjpcIktvbm50ZSAle21vZGVsfSBuaWNodCBzcGVpY2hlcm46ICV7Y291bnR9IEZlaGxlci5cIn19fX0sXCJhY3RpdmVyZWNvcmRcIjp7XCJhdHRyaWJ1dGVzXCI6e1wiY2FtcGFpZ25fY29tbWVudFwiOntcImJvZHlcIjpcIkluaGFsdCBrb21tZW50aWVyZW5cIn19LFwiZXJyb3JzXCI6e1wiZm9ybWF0XCI6XCIle2F0dHJpYnV0ZX0gJXttZXNzYWdlfVwiLFwibWVzc2FnZXNcIjp7XCJhY2NlcHRlZFwiOlwibXVzcyBha3plcHRpZXJ0IHdlcmRlblwiLFwiYmxhbmtcIjpcIm11c3MgYXVzZ2VmXFx1MDBmY2xsdCB3ZXJkZW5cIixcImNvbmZpcm1hdGlvblwiOlwic3RpbW10IG5pY2h0IG1pdCBkZXIgQmVzdFxcdTAwZTR0aWd1bmcgXFx1MDBmY2JlcmVpblwiLFwiZW1wdHlcIjpcIm11c3MgYXVzZ2VmXFx1MDBmY2xsdCB3ZXJkZW5cIixcImVxdWFsX3RvXCI6XCJtdXNzIGdlbmF1ICV7Y291bnR9IHNlaW5cIixcImV2ZW5cIjpcIm11c3MgZ2VyYWRlIHNlaW5cIixcImV4Y2x1c2lvblwiOlwiaXN0IG5pY2h0IHZlcmZcXHUwMGZjZ2JhclwiLFwiZ3JlYXRlcl90aGFuXCI6XCJtdXNzIGdyXFx1MDBmNlxcdTAwZGZlciBhbHMgJXtjb3VudH0gc2VpblwiLFwiZ3JlYXRlcl90aGFuX29yX2VxdWFsX3RvXCI6XCJtdXNzIGdyXFx1MDBmNlxcdTAwZGZlciBvZGVyIGdsZWljaCAle2NvdW50fSBzZWluXCIsXCJpbmNsdXNpb25cIjpcImlzdCBrZWluIGdcXHUwMGZjbHRpZ2VyIFdlcnRcIixcImludmFsaWRcIjpcImlzdCBuaWNodCBnXFx1MDBmY2x0aWdcIixcImxlc3NfdGhhblwiOlwibXVzcyBrbGVpbmVyIGFscyAle2NvdW50fSBzZWluXCIsXCJsZXNzX3RoYW5fb3JfZXF1YWxfdG9cIjpcIm11c3Mga2xlaW5lciBvZGVyIGdsZWljaCAle2NvdW50fSBzZWluXCIsXCJub3RfYV9udW1iZXJcIjpcImlzdCBrZWluZSBaYWhsXCIsXCJub3RfYW5faW50ZWdlclwiOlwibXVzcyBnYW56emFobGlnIHNlaW5cIixcIm9kZFwiOlwibXVzcyB1bmdlcmFkZSBzZWluXCIsXCJyZWNvcmRfaW52YWxpZFwiOlwiR1xcdTAwZmNsdGlna2VpdHNwclxcdTAwZmNmdW5nIGlzdCBmZWhsZ2VzY2hsYWdlbjogJXtlcnJvcnN9XCIsXCJ0YWtlblwiOlwiaXN0IGJlcmVpdHMgdmVyZ2ViZW5cIixcInRvb19sb25nXCI6XCJpc3QgenUgbGFuZyAobWVociBhbHMgJXtjb3VudH0gWmVpY2hlbilcIixcInRvb19zaG9ydFwiOlwiaXN0IHp1IGt1cnogKHdlbmlnZXIgYWxzICV7Y291bnR9IFplaWNoZW4pXCIsXCJ3cm9uZ19sZW5ndGhcIjpcImhhdCBkaWUgZmFsc2NoZSBMXFx1MDBlNG5nZSAobXVzcyBnZW5hdSAle2NvdW50fSBaZWljaGVuIGhhYmVuKVwifSxcInRlbXBsYXRlXCI6e1wiYm9keVwiOlwiQml0dGUgXFx1MDBmY2JlcnByXFx1MDBmY2ZlbiBTaWUgZGllIGZvbGdlbmRlbiBGZWxkZXI6XCIsXCJoZWFkZXJcIjp7XCJvbmVcIjpcIktvbm50ZSAle21vZGVsfSBuaWNodCBzcGVpY2hlcm46IGVpbiBGZWhsZXIuXCIsXCJvdGhlclwiOlwiS29ubnRlICV7bW9kZWx9IG5pY2h0IHNwZWljaGVybjogJXtjb3VudH0gRmVobGVyLlwifX19fSxcImRhdGVcIjp7XCJhYmJyX2RheV9uYW1lc1wiOltcIlNvXCIsXCJNb1wiLFwiRGlcIixcIk1pXCIsXCJEb1wiLFwiRnJcIixcIlNhXCJdLFwiYWJicl9tb250aF9uYW1lc1wiOltudWxsLFwiSmFuXCIsXCJGZWJcIixcIk1cXHUwMGU0clwiLFwiQXByXCIsXCJNYWlcIixcIkp1blwiLFwiSnVsXCIsXCJBdWdcIixcIlNlcFwiLFwiT2t0XCIsXCJOb3ZcIixcIkRlelwiXSxcImRheV9uYW1lc1wiOltcIlNvbm50YWdcIixcIk1vbnRhZ1wiLFwiRGllbnN0YWdcIixcIk1pdHR3b2NoXCIsXCJEb25uZXJzdGFnXCIsXCJGcmVpdGFnXCIsXCJTYW1zdGFnXCJdLFwiZm9ybWF0c1wiOntcImRlZmF1bHRcIjpcIiVkLiVtLiVZXCIsXCJsb25nXCI6XCIlZS4gJUIgJVlcIixcInNob3J0XCI6XCIlZS4gJWJcIn0sXCJtb250aF9uYW1lc1wiOltudWxsLFwiSmFudWFyXCIsXCJGZWJydWFyXCIsXCJNXFx1MDBlNHJ6XCIsXCJBcHJpbFwiLFwiTWFpXCIsXCJKdW5pXCIsXCJKdWxpXCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2t0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlemVtYmVyXCJdLFwib3JkZXJcIjpbXCJkYXlcIixcIm1vbnRoXCIsXCJ5ZWFyXCJdfSxcImRhdGV0aW1lXCI6e1wiZGlzdGFuY2VfaW5fd29yZHNcIjp7XCJhYm91dF94X2hvdXJzXCI6e1wib25lXCI6XCJldHdhIGVpbmUgU3R1bmRlXCIsXCJvdGhlclwiOlwiZXR3YSAle2NvdW50fSBTdHVuZGVuXCJ9LFwiYWJvdXRfeF9tb250aHNcIjp7XCJvbmVcIjpcImV0d2EgZWluIE1vbmF0XCIsXCJvdGhlclwiOlwiZXR3YSAle2NvdW50fSBNb25hdGVcIn0sXCJhYm91dF94X3llYXJzXCI6e1wib25lXCI6XCJldHdhIGVpbiBKYWhyXCIsXCJvdGhlclwiOlwiZXR3YSAle2NvdW50fSBKYWhyZVwifSxcImFsbW9zdF94X3llYXJzXCI6e1wib25lXCI6XCJmYXN0IGVpbiBKYWhyXCIsXCJvdGhlclwiOlwiZmFzdCAle2NvdW50fSBKYWhyZVwifSxcImhhbGZfYV9taW51dGVcIjpcImVpbmUgaGFsYmUgTWludXRlXCIsXCJsZXNzX3RoYW5feF9taW51dGVzXCI6e1wib25lXCI6XCJ3ZW5pZ2VyIGFscyBlaW5lIE1pbnV0ZVwiLFwib3RoZXJcIjpcIndlbmlnZXIgYWxzICV7Y291bnR9IE1pbnV0ZW5cIn0sXCJsZXNzX3RoYW5feF9zZWNvbmRzXCI6e1wib25lXCI6XCJ3ZW5pZ2VyIGFscyBlaW5lIFNla3VuZGVcIixcIm90aGVyXCI6XCJ3ZW5pZ2VyIGFscyAle2NvdW50fSBTZWt1bmRlblwifSxcIm92ZXJfeF95ZWFyc1wiOntcIm9uZVwiOlwibWVociBhbHMgZWluIEphaHJcIixcIm90aGVyXCI6XCJtZWhyIGFscyAle2NvdW50fSBKYWhyZVwifSxcInhfZGF5c1wiOntcIm9uZVwiOlwiZWluIFRhZ1wiLFwib3RoZXJcIjpcIiV7Y291bnR9IFRhZ2VcIn0sXCJ4X21pbnV0ZXNcIjp7XCJvbmVcIjpcImVpbmUgTWludXRlXCIsXCJvdGhlclwiOlwiJXtjb3VudH0gTWludXRlblwifSxcInhfbW9udGhzXCI6e1wib25lXCI6XCJlaW4gTW9uYXRcIixcIm90aGVyXCI6XCIle2NvdW50fSBNb25hdGVcIn0sXCJ4X3NlY29uZHNcIjp7XCJvbmVcIjpcImVpbmUgU2VrdW5kZVwiLFwib3RoZXJcIjpcIiV7Y291bnR9IFNla3VuZGVuXCJ9fSxcInByb21wdHNcIjp7XCJkYXlcIjpcIlRhZ1wiLFwiaG91clwiOlwiU3R1bmRlblwiLFwibWludXRlXCI6XCJNaW51dGVuXCIsXCJtb250aFwiOlwiTW9uYXRcIixcInNlY29uZFwiOlwiU2VrdW5kZW5cIixcInllYXJcIjpcIkphaHJcIn19LFwiZG9uYXRpb25cIjp7XCJhbW91bnRcIjpcIkdlc2FtdHN1bW1lXCIsXCJjYW1wYWlnblwiOlwiS2FtcGFnbmVcIixcImNvbW1lbnRcIjpcIktvbW1lbnRhclwiLFwiZGF0ZVwiOlwiRGF0dW0gZGVyIEFiYnVjaHVuZ1wiLFwiaW50ZXJ2YWxcIjpcIkFsbGUgJXtpbnRlcnZhbH0gJXt0aW1lX3VuaXR9XCIsXCJwYXltZW50X2lkXCI6XCJNYW5kYXRzbnVtbWVyXCIsXCJyZWN1cnJpbmdfaW50ZXJ2YWxcIjpcIkFiYnVjaHVuZ3NyaHl0aG11c1wiLFwicmVjdXJyaW5nX3NpbmNlXCI6XCJBYmJ1Y2h1bmcgYmVnb25uZW4gYW1cIn0sXCJlcnJvcnNcIjp7XCJmb3JtYXRcIjpcIiV7YXR0cmlidXRlfSAle21lc3NhZ2V9XCIsXCJtZXNzYWdlc1wiOntcImFjY2VwdGVkXCI6XCJtdXNzIGFremVwdGllcnQgd2VyZGVuXCIsXCJibGFua1wiOlwibXVzcyBhdXNnZWZcXHUwMGZjbGx0IHdlcmRlblwiLFwiY29uZmlybWF0aW9uXCI6XCJzdGltbXQgbmljaHQgbWl0IGRlciBCZXN0XFx1MDBlNHRpZ3VuZyBcXHUwMGZjYmVyZWluXCIsXCJlbXB0eVwiOlwibXVzcyBhdXNnZWZcXHUwMGZjbGx0IHdlcmRlblwiLFwiZXF1YWxfdG9cIjpcIm11c3MgZ2VuYXUgJXtjb3VudH0gc2VpblwiLFwiZXZlblwiOlwibXVzcyBnZXJhZGUgc2VpblwiLFwiZXhjbHVzaW9uXCI6XCJpc3QgbmljaHQgdmVyZlxcdTAwZmNnYmFyXCIsXCJncmVhdGVyX3RoYW5cIjpcIm11c3MgZ3JcXHUwMGY2XFx1MDBkZmVyIGFscyAle2NvdW50fSBzZWluXCIsXCJncmVhdGVyX3RoYW5fb3JfZXF1YWxfdG9cIjpcIm11c3MgZ3JcXHUwMGY2XFx1MDBkZmVyIG9kZXIgZ2xlaWNoICV7Y291bnR9IHNlaW5cIixcImluY2x1c2lvblwiOlwiaXN0IGtlaW4gZ1xcdTAwZmNsdGlnZXIgV2VydFwiLFwiaW52YWxpZFwiOlwiaXN0IG5pY2h0IGdcXHUwMGZjbHRpZ1wiLFwibGVzc190aGFuXCI6XCJtdXNzIGtsZWluZXIgYWxzICV7Y291bnR9IHNlaW5cIixcImxlc3NfdGhhbl9vcl9lcXVhbF90b1wiOlwibXVzcyBrbGVpbmVyIG9kZXIgZ2xlaWNoICV7Y291bnR9IHNlaW5cIixcIm5vdF9hX251bWJlclwiOlwiaXN0IGtlaW5lIFphaGxcIixcIm5vdF9hbl9pbnRlZ2VyXCI6XCJtdXNzIGdhbnp6YWhsaWcgc2VpblwiLFwib2RkXCI6XCJtdXNzIHVuZ2VyYWRlIHNlaW5cIixcInJlY29yZF9pbnZhbGlkXCI6XCJHXFx1MDBmY2x0aWdrZWl0c3ByXFx1MDBmY2Z1bmcgaXN0IGZlaGxnZXNjaGxhZ2VuOiAle2Vycm9yc31cIixcInRha2VuXCI6XCJpc3QgYmVyZWl0cyB2ZXJnZWJlblwiLFwidG9vX2xvbmdcIjpcImlzdCB6dSBsYW5nIChtZWhyIGFscyAle2NvdW50fSBaZWljaGVuKVwiLFwidG9vX3Nob3J0XCI6XCJpc3QgenUga3VyeiAod2VuaWdlciBhbHMgJXtjb3VudH0gWmVpY2hlbilcIixcIndyb25nX2xlbmd0aFwiOlwiaGF0IGRpZSBmYWxzY2hlIExcXHUwMGU0bmdlIChtdXNzIGdlbmF1ICV7Y291bnR9IFplaWNoZW4gaGFiZW4pXCJ9LFwidGVtcGxhdGVcIjp7XCJib2R5XCI6XCJCaXR0ZSBcXHUwMGZjYmVycHJcXHUwMGZjZmVuIFNpZSBkaWUgZm9sZ2VuZGVuIEZlbGRlcjpcIixcImhlYWRlclwiOntcIm9uZVwiOlwiS29ubnRlICV7bW9kZWx9IG5pY2h0IHNwZWljaGVybjogZWluIEZlaGxlci5cIixcIm90aGVyXCI6XCJLb25udGUgJXttb2RlbH0gbmljaHQgc3BlaWNoZXJuOiAle2NvdW50fSBGZWhsZXIuXCJ9fX0sXCJoZWxsb1wiOlwiSGFsbG8gV2VsdFwiLFwiaGVscGVyc1wiOntcInNlbGVjdFwiOntcInByb21wdFwiOlwiQml0dGUgd1xcdTAwZTRobGVuXCJ9LFwic3VibWl0XCI6e1wiY3JlYXRlXCI6XCIle21vZGVsfSBlcnN0ZWxsZW5cIixcInN1Ym1pdFwiOlwiJXttb2RlbH0gc3BlaWNoZXJuXCIsXCJ1cGRhdGVcIjpcIiV7bW9kZWx9IGFrdHVhbGlzaWVyZW5cIn19LFwiaTE4blwiOntcInBsdXJhbFwiOntcImtleXNcIjpbXCJvbmVcIixcIm90aGVyXCJdLFwicnVsZVwiOnt9fSxcInRyYW5zbGl0ZXJhdGVcIjp7XCJydWxlXCI6e1wiXFx1MDBjNFwiOlwiQWVcIixcIlxcdTAwZDZcIjpcIk9lXCIsXCJcXHUwMGRjXCI6XCJVZVwiLFwiXFx1MDBkZlwiOlwic3NcIixcIlxcdTAwZTRcIjpcImFlXCIsXCJcXHUwMGY2XCI6XCJvZVwiLFwiXFx1MDBmY1wiOlwidWVcIn19fSxcIm1haWxlclwiOntcImRvbmF0aW9uc1wiOntcImRvbmF0aW9uX3JlY2VpcHRcIjpcIkluZm9ybWF0aW9uZW4gXFx1MDBmY2JlciBpaHJlIFNwZW5kZVwiLFwiZG9ub3JfZGlyZWN0X2RlYml0X25vdGlmaWNhdGlvblwiOntcImRvbmF0aW9uX3F1ZXVlZF9odG1sXCI6XCJJaHJlIEVpbnp1Z3Nlcm1cXHUwMGU0Y2h0aWd1bmcgZlxcdTAwZmNyIFxcdTAwM0NzdHJvbmdcXHUwMDNFJXtub25wcm9maXRfbmFtZX1cXHUwMDNDL3N0cm9uZ1xcdTAwM0UgaXN0IHp1ciBCZWFyYmVpdHVuZyBlaW5nZXN0ZWxsdC5cIixcInJlY3VycmluZ19kb25hdGlvbl9xdWV1ZWRfaHRtbFwiOlwiSGVyemxpY2hlbiBEYW5rIGZcXHUwMGZjciBJaHJlIHJlZ2VsbVxcdTAwZTRcXHUwMGRmaWdlIFNwZW5kZSBhblxcdTAwM0NzdHJvbmdcXHUwMDNFJXtub25wcm9maXRfbmFtZX1cXHUwMDNDL3N0cm9uZ1xcdTAwM0UuICBXaWUgU2llIHNwZW5kZW4gVGF1c2VuZGUgQlxcdTAwZmNyZ2VyaW5uZW4gdW5kIEJcXHUwMGZjcmdlciBhdXMgRXVyb3BhIHVuZCBtYWNoZW4gdW5zIHNvIHp1IGVpbmVyIEJld2VndW5nLCBtaXQgZGVyIGdlcmVjaG5ldCB3ZXJkZW4gbXVzcy4gV2lyIGJld2VnZW4gVGhlbWVuLCBkaWUgdW5zIGFsbGUgYW5nZWhlbiB1bmQgSWhyZSBVbnRlcnN0XFx1MDBmY3R6dW5nIGhpbGZ0IHVucyBzZWhyLCBLYW1wYWduZW4gc2NobmVsbCBhdWZ6dXNldHplbiB1bmQgbWl0IGlobmVuIGVyZm9sZ3JlaWNoIHp1IHNlaW4uXCIsXCJzdWJqZWN0XCI6XCJCZXN0XFx1MDBlNHRpZ3VuZyBcXHUwMGZjYmVyIGVpbmUgU3BlbmRlIGZcXHUwMGZjciAle25vbnByb2ZpdF9uYW1lfVwiLFwidHJhbnNmZXJfaW5mb19odG1sXCI6XCJBdWYgSWhyZW0gS29udG9hdXN6dWcgZXJzY2hlaW50IGRpZSBBYmJ1Y2h1bmcgc28gJXtsYWJlbH0uXCIsXCJ0cmFuc2Zlcl9sYWJlbF9odG1sXCI6XCJcXHUwMDNDc3Ryb25nXFx1MDAzRVNwZW5kZSAle25vbnByb2ZpdF9zdGF0ZW1lbnR9XFx1MDAzQy9zdHJvbmdcXHUwMDNFLlwifSxcImRvbm9yX25hbWVcIjpcIk5hbWUgZGVzIFNwZW5kZXJzXCIsXCJkb25vcl9yZWNlaXB0XCI6e1wib25lb2ZmX2RvbmF0aW9uX2h0bWxcIjpcIkhlcnpsaWNoZW4gRGFuayBmXFx1MDBmY3IgSWhyZSBTcGVuZGUgYW4gXFx1MDAzQ3N0cm9uZ1xcdTAwM0Ule25vbnByb2ZpdF9uYW1lfVxcdTAwM0Mvc3Ryb25nXFx1MDAzRS4gV2llIFNpZSBzcGVuZGVuIFRhdXNlbmRlIEJcXHUwMGZjcmdlcmlubmVuIHVuZCBCXFx1MDBmY3JnZXIgYXVzIEV1cm9wYSB1bmQgbWFjaGVuIHVucyBzbyB6dSBlaW5lciBCZXdlZ3VuZywgbWl0IGRlciBnZXJlY2huZXQgd2VyZGVuIG11c3MuIFdpciBiZXdlZ2VuIFRoZW1lbiwgZGllIHVucyBhbGxlIGFuZ2VoZW4gdW5kIElocmUgVW50ZXJzdFxcdTAwZmN0enVuZyBoaWxmdCB1bnMgc2VociwgS2FtcGFnbmVuIHNjaG5lbGwgYXVmenVzZXR6ZW4gdW5kIG1pdCBpaG5lbiBlcmZvbGdyZWljaCB6dSBzZWluLiBcIixcInJlY3VycmluZ19kb25hdGlvbl9odG1sXCI6XCJIZXJ6bGljaGVuIERhbmsgZlxcdTAwZmNyIElocmUgcmVnZWxtXFx1MDBlNFxcdTAwZGZpZ2UgU3BlbmRlIGFuXFx1MDAzQ3N0cm9uZ1xcdTAwM0Ule25vbnByb2ZpdF9uYW1lfVxcdTAwM0Mvc3Ryb25nXFx1MDAzRS4gV2llIFNpZSBzcGVuZGVuIFRhdXNlbmRlIEJcXHUwMGZjcmdlcmlubmVuIHVuZCBCXFx1MDBmY3JnZXIgYXVzIEV1cm9wYSB1bmQgbWFjaGVuIHVucyBzbyB6dSBlaW5lciBCZXdlZ3VuZywgbWl0IGRlciBnZXJlY2huZXQgd2VyZGVuIG11c3MuIFdpciBiZXdlZ2VuIFRoZW1lbiwgZGllIHVucyBhbGxlIGFuZ2VoZW4gdW5kIElocmUgVW50ZXJzdFxcdTAwZmN0enVuZyBoaWxmdCB1bnMgc2VociwgS2FtcGFnbmVuIHNjaG5lbGwgYXVmenVzZXR6ZW4gdW5kIG1pdCBpaG5lbiBlcmZvbGdyZWljaCB6dSBzZWluLiBcIixcInN1YmplY3RcIjpcIkJlc3RcXHUwMGU0dGlndW5nIFxcdTAwZmNiZXIgZWluZSBTcGVuZGUgZlxcdTAwZmNyIFwiLFwidHJhbnNmZXJfaW5mb19odG1sXCI6XCJBdWYgSWhyZW0gS29udG9hdXN6dWcgZXJzY2hlaW50IGRpZSBBYmJ1Y2h1bmcgc286ICV7bGFiZWx9LlwiLFwidHJhbnNmZXJfbGFiZWxfaHRtbFwiOlwiU3BlbmRlICV7bm9ucHJvZml0X3N0YXRlbWVudH1cIn19fSxcIm5vbnByb2ZpdHNcIjp7XCJkb25hdGVcIjp7XCJhbW91bnRcIjp7XCJjdXN0b21cIjpcImFuZGVyZXJcIixcImRlc2lnbmF0aW9uXCI6e1wiY2hvb3NlXCI6XCJXXFx1MDBlNGhsZW4gU2llIGVpbmUgQmV6ZWljaG51bmcgKG9wdGlvbmFsKVwiLFwibGFiZWxcIjpcIkJlemVpY2hudW5nXCIsXCJtb3N0X25lZWRlZFwiOlwiVmVyd2VuZGVuIFNpZSBtZWluZSBTcGVuZGUsIHdvIHNpZSBhbSBtZWlzdGVuIGdlYnJhdWNodCB3aXJkXCJ9LFwibGFiZWxcIjpcIkJldHJhZ1wiLFwibW9udGhseVwiOlwibW9uYXRsaWNoXCIsXCJuZXh0XCI6XCJXZWl0ZXJcIixcInN1c3RhaW5pbmdcIjpcIldlcmRlbiBTaWUgRlxcdTAwZjZyZGVyZXIgdm9uIFdlTW92ZS5FVVwiLFwic3VzdGFpbmluZ19ib2xkXCI6XCJtb25hdGxpY2hcIixcInN1c3RhaW5pbmdfc2VsZWN0ZWRcIjpcIldcXHUwMGU0aGxlbiBTaWVcXHUwMGEwZGllIEhcXHUwMGY2aGUgZGVyIG1vbmF0bGljaGVuIFNwZW5kZSBhdXNcIixcInN1c3RhaW5pbmdfc2VsZWN0ZWRfYm9sZFwiOlwibW9uYXRsaWNoXCIsXCJ3ZWVrbHlcIjpcIndcXHUwMGY2Y2hlbnRsaWNoXCIsXCJ3ZWVrbHlfbm90aWNlXCI6XCJ1bSBWZXJ3YWx0dW5nc2tvc3RlbiBuaWVkcmlnIHp1IGhhbHRlbiwgYnVjaGVuIHdpciBtb25hdGxpY2ggJXthbW91bnR9JXtjdXJyZW5jeX1hYlwifSxcImRlZGljYXRpb25cIjp7XCJkb25vcl9ub3RlXCI6XCJEaWUgQW5tZXJrdW5nIGRlcyBTcGVuZGVycyB3YXI6IFwiLFwiZW1haWxcIjpcIkUtTWFpbCAob3B0aW9uYWwpXCIsXCJmaXJzdF9uYW1lXCI6XCJWb3JuYW1lXCIsXCJmdWxsX2FkZHJlc3NcIjpcIkFkcmVzc2UgKG9wdGlvbmFsKVwiLFwiaW5faG9ub3JfbGFiZWxcIjpcIlp1IEVocmVuIHZvblwiLFwiaW5fbWVtb3J5X2xhYmVsXCI6XCJJbiBHZWRlbmtlbiBhblwiLFwiaW5mb1wiOlwiRlxcdTAwZmNnZW4gU2llIGVpbmUgV2lkbXVuZyBmXFx1MDBmY3IgSWhyZSBTcGVuZGUgaGluenU6XCIsXCJsYXN0X25hbWVcIjpcIk5hY2huYW1lXCIsXCJub3RlXCI6XCJBbm1lcmt1bmdcIixcInBob25lXCI6XCJUZWxlZm9uIChvcHRpb25hbClcIixcInNhdmVcIjpcInNwZWljaGVyblxcdTAwYTBcXHUwMDI2IHp1clxcdTAwZmNja1wifSxcImZvbGxvd3VwXCI6e1wiZmluaXNoXCI6XCJCZWVuZGVuXCIsXCJtZXNzYWdlXCI6XCJWaWVsZW4gRGFuayBmXFx1MDBmY3IgSWhyZSBVbnRlcnN0XFx1MDBmY3R6dW5nIVwiLFwicmVjZWlwdF9pbmZvXCI6XCJFaW5lIEJlc3RcXHUwMGU0dGlndW5nIHdpcmQgZ2VzZW5kZXQgYW5cIixcInNoYXJlXCI6e1wiZmFjZWJvb2tcIjpcIlRlaWxlblwiLFwidHdpdHRlclwiOlwiVHdpdHRlcm5cIixcInR3aXR0ZXJfbWVzc2FnZVwiOlwiU2VpZW4gU2llIGRhYmVpIVwifSxcInN1Y2Nlc3NcIjpcIklocmUgU3BlbmRlIHd1cmRlIGVyZm9sZ3JlaWNoIFxcdTAwZmNiZXJtaXR0ZWx0IVwifSxcImluZm9cIjp7XCJhbm9ueW1vdXNfY2hlY2tib3hcIjpcIkFub255bSBzcGVuZGVuXCIsXCJkZWRpY2F0aW9uX2xpbmtcIjpcIkRpZXNlIFNwZW5kZSBpc3QgenVtIEdlZGVua2VuIGZcXHUwMGZjciBqZW1hbmRlbi5cIixcImRlZGljYXRpb25fc2F2ZWRcIjpcIkRpZSBTcGVuZGUgd2lkbWVuIGZcXHUwMGZjclwiLFwibGFiZWxcIjpcIkluZm9ybWF0aW9uXCIsXCJuZXh0XCI6XCJXZWl0ZXJcIixcInN1cHBvcnRlclwiOntcImFkZHJlc3NcIjpcIkFkcmVzc2VcIixcImNpdHlcIjpcIlN0YWR0XCIsXCJjb3VudHJ5XCI6XCJMYW5kXCIsXCJlbWFpbFwiOlwiRS1NYWlsXCIsXCJlbWFpbF9yZXF1aXJlZFwiOlwiIChub3R3ZW5kaWcgZlxcdTAwZmNyIEJlc3RcXHUwMGU0dGlndW5nKVwiLFwiZXJyb3JzXCI6e1wiZW1haWxcIjp7XCJmb3JtYXRcIjpcIkJpdHRlIGdlYmVuIFNpZSBlaW5lIGdcXHUwMGZjbHRpZ2UgRS1NYWlsLUFkcmVzc2UgZWluXCJ9fSxcImZpcnN0X25hbWVcIjpcIlZvcm5hbWVcIixcImZ1bGxfbmFtZVwiOlwiTmFtZVwiLFwibGFzdF9uYW1lXCI6XCJOYWNobmFtZVwiLFwib3RoZXJfY291bnRyeVwiOlwiYW5kZXJlc1wiLFwicGhvbmVcIjpcIlRlbGVmb25cIixcInBvc3RhbF9jb2RlXCI6XCJQb3N0bGVpdHphaGxcIixcInJlZ2lvblwiOlwiQnVuZGVzbGFuZFwiLFwic2hpcHBpbmdfYWRkcmVzc1wiOlwiTGllZmVyYWRyZXNzZSAoZXJmb3JkZXJsaWNoKVwiLFwic3RhdGVcIjpcIkxhbmQgd1xcdTAwZTRobGVuXCJ9fSxcImxvZ19vdXRcIjpcIkFibWVsZGVuXCIsXCJwYXltZW50XCI6e1wiY2FyZFwiOntcImN2Y1wiOlwiU2ljaGVyaGVpdHNjb2RlIChDVkMpXCIsXCJlcnJvcnNcIjp7XCJlbWFpbFwiOntcImZvcm1hdFwiOlwiQml0dGUgZ2ViZW4gU2llIGVpbmUgZ1xcdTAwZmNsdGlnZSBFLU1haWwtQWRyZXNzZSBlaW5cIn0sXCJmaWVsZFwiOntcImZvcm1hdFwiOlwiRGFzIHNpZWh0IG5pY2h0IG5hY2ggZGVtIHJpY2h0aWdlbiBGb3JtYXQgYXVzXCIsXCJwcmVzZW5jZVwiOlwiRGllc2UgQW5nYWJlIGlzdCBlcmZvcmRlcmxpY2hcIn0sXCJudW1iZXJcIjp7XCJmb3JtYXRcIjpcIkZhbHNjaGUgS2FydGVubnVtbWVyXCIsXCJwcmVzZW5jZVwiOlwiQml0dGVuIGdlYmVuIFNpZSBJaHJlIEthcnRlbm51bW1lciBlaW5cIn19LFwibG9hZGluZ1wiOlwiU3BlaWNoZXJ0Li4uXCIsXCJtb250aFwiOlwiTW9uYXRcIixcIm5hbWVcIjpcIkthcnRlbmluaGFiZXIvaW5cIixcIm51bWJlclwiOlwiS2FydGVubnVtbWVyXCIsXCJwb3N0YWxfY29kZVwiOlwiUG9zdGxlaXR6YWhsXCIsXCJzZWN1cmVfaW5mb1wiOlwiTWl0IDI1Ni1iaXQgU1NMIGdlc2ljaGVydGUgVHJhbnNha3Rpb25lblwiLFwic3VibWl0XCI6XCJhYnNlbmRlblwiLFwieWVhclwiOlwiSmFoclwifSxcImxhYmVsXCI6XCJaYWhsdW5nc2FydFwiLFwibG9hZGluZ1wiOntcImNoZWNraW5nX2NhcmRcIjpcIkthcnRlIHdpcmQgZ2VwclxcdTAwZmNmdC4uLlwiLFwic2VuZGluZ19wYXltZW50XCI6XCJaYWhsdW5nIHdpcmQgYXVzZ2VmXFx1MDBmY2hydC4uLlwifSxcIm1vbnRobHlfcmVjdXJyaW5nXCI6XCJtb25hdGxpY2hcIixcIm9uZV90aW1lXCI6XCJlaW5tYWxpZ1wiLFwic2VwYVwiOntcImJpY1wiOlwiQklDL1NXSUZUXCIsXCJlcnJvcnNcIjp7XCJmaWVsZFwiOntcImZvcm1hdFwiOlwiRGFzIHNjaGVpbnQgbmljaHQgZGFzIHJpY2h0aWdlIEZvcm1hdCB6dSBzZWluXCIsXCJwcmVzZW5jZVwiOlwiRGllc2UgQW5nYWJlIGlzdCBlcmZvcmRlcmxpY2hcIn19LFwiaWJhblwiOlwiSUJBTlwiLFwibmFtZVwiOlwiS29udG9pbmhhYmVyL2luXCJ9LFwidGFic1wiOntcImNhcmRcIjpcIktyZWRpdGthcnRlXCIsXCJzZXBhXCI6XCJMYXN0c2NocmlmdFwifX0sXCJzaWduZWRfaW5cIjpcIkVpbmdlbG9nZ3QgYWxzXCJ9fSxcIm51bWJlclwiOntcImN1cnJlbmN5XCI6e1wiZm9ybWF0XCI6e1wiZGVsaW1pdGVyXCI6XCIuXCIsXCJmb3JtYXRcIjpcIiVuICV1XCIsXCJwcmVjaXNpb25cIjoyLFwic2VwYXJhdG9yXCI6XCIsXCIsXCJzaWduaWZpY2FudFwiOmZhbHNlLFwic3RyaXBfaW5zaWduaWZpY2FudF96ZXJvc1wiOmZhbHNlLFwidW5pdFwiOlwiXFx1MjBhY1wifX0sXCJmb3JtYXRcIjp7XCJkZWxpbWl0ZXJcIjpcIi5cIixcInByZWNpc2lvblwiOjIsXCJzZXBhcmF0b3JcIjpcIixcIixcInNpZ25pZmljYW50XCI6ZmFsc2UsXCJzdHJpcF9pbnNpZ25pZmljYW50X3plcm9zXCI6ZmFsc2V9LFwiaHVtYW5cIjp7XCJkZWNpbWFsX3VuaXRzXCI6e1wiZm9ybWF0XCI6XCIlbiAldVwiLFwidW5pdHNcIjp7XCJiaWxsaW9uXCI6e1wib25lXCI6XCJNaWxsaWFyZGVcIixcIm90aGVyXCI6XCJNaWxsaWFyZGVuXCJ9LFwibWlsbGlvblwiOlwiTWlsbGlvbmVuXCIsXCJxdWFkcmlsbGlvblwiOntcIm9uZVwiOlwiQmlsbGlhcmRlXCIsXCJvdGhlclwiOlwiQmlsbGlhcmRlblwifSxcInRob3VzYW5kXCI6XCJUYXVzZW5kXCIsXCJ0cmlsbGlvblwiOlwiQmlsbGlvbmVuXCIsXCJ1bml0XCI6XCJcIn19LFwiZm9ybWF0XCI6e1wiZGVsaW1pdGVyXCI6XCJcIixcInByZWNpc2lvblwiOjEsXCJzaWduaWZpY2FudFwiOnRydWUsXCJzdHJpcF9pbnNpZ25pZmljYW50X3plcm9zXCI6dHJ1ZX0sXCJzdG9yYWdlX3VuaXRzXCI6e1wiZm9ybWF0XCI6XCIlbiAldVwiLFwidW5pdHNcIjp7XCJieXRlXCI6e1wib25lXCI6XCJCeXRlXCIsXCJvdGhlclwiOlwiQnl0ZXNcIn0sXCJnYlwiOlwiR0JcIixcImtiXCI6XCJLQlwiLFwibWJcIjpcIk1CXCIsXCJ0YlwiOlwiVEJcIn19fSxcInBlcmNlbnRhZ2VcIjp7XCJmb3JtYXRcIjp7XCJkZWxpbWl0ZXJcIjpcIlwifX0sXCJwcmVjaXNpb25cIjp7XCJmb3JtYXRcIjp7XCJkZWxpbWl0ZXJcIjpcIlwifX19LFwib3JnYW5pemF0aW9uXCI6e1wibmFtZVwiOlwiT3JnYW5pc2F0aW9uXCJ9LFwic3VwcG9ydFwiOntcImFycmF5XCI6e1wibGFzdF93b3JkX2Nvbm5lY3RvclwiOlwiIHVuZCBcIixcInR3b193b3Jkc19jb25uZWN0b3JcIjpcIiB1bmQgXCIsXCJ3b3Jkc19jb25uZWN0b3JcIjpcIiwgXCJ9fSxcInRpbWVcIjp7XCJhbVwiOlwidm9ybWl0dGFnc1wiLFwiZm9ybWF0c1wiOntcImRlZmF1bHRcIjpcIiVBLCAlZC4gJUIgJVksICVIOiVNIFVoclwiLFwibG9uZ1wiOlwiJUEsICVkLiAlQiAlWSwgJUg6JU0gVWhyXCIsXCJzaG9ydFwiOlwiJWQuICVCLCAlSDolTSBVaHJcIn0sXCJwbVwiOlwibmFjaG1pdHRhZ3NcIn19KTtcblxuIHdpbmRvdy5JMThuID0gSTE4blxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qYXZhc2NyaXB0cy9fZmluYWwuanMiLCIvLyBJMThuLmpzXG4vLyA9PT09PT09XG4vL1xuLy8gVGhpcyBzbWFsbCBsaWJyYXJ5IHByb3ZpZGVzIHRoZSBSYWlscyBJMThuIEFQSSBvbiB0aGUgSmF2YXNjcmlwdC5cbi8vIFlvdSBkb24ndCBhY3R1YWxseSBoYXZlIHRvIHVzZSBSYWlscyAob3IgZXZlbiBSdWJ5KSB0byB1c2UgSTE4bi5qcy5cbi8vIEp1c3QgbWFrZSBzdXJlIHlvdSBleHBvcnQgYWxsIHRyYW5zbGF0aW9ucyBpbiBhbiBvYmplY3QgbGlrZSB0aGlzOlxuLy9cbi8vICAgICBJMThuLnRyYW5zbGF0aW9ucy5lbiA9IHtcbi8vICAgICAgIGhlbGxvOiBcIkhlbGxvIFdvcmxkXCJcbi8vICAgICB9O1xuLy9cbi8vIFNlZSB0ZXN0cyBmb3Igc3BlY2lmaWMgZm9ybWF0dGluZyBsaWtlIG51bWJlcnMgYW5kIGRhdGVzLlxuLy9cblxuLy8gVXNpbmcgVU1EIHBhdHRlcm4gZnJvbVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3VtZGpzL3VtZCNyZWd1bGFyLW1vZHVsZVxuLy8gYHJldHVybkV4cG9ydHMuanNgIHZlcnNpb25cbjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoXCJpMThuXCIsIGZ1bmN0aW9uKCl7IHJldHVybiBmYWN0b3J5KHJvb3QpO30pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgLy8gbGlrZSBOb2RlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgIHJvb3QuSTE4biA9IGZhY3Rvcnkocm9vdCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIFVzZSBwcmV2aW91c2x5IGRlZmluZWQgb2JqZWN0IGlmIGV4aXN0cyBpbiBjdXJyZW50IHNjb3BlXG4gIHZhciBJMThuID0gZ2xvYmFsICYmIGdsb2JhbC5JMThuIHx8IHt9O1xuXG4gIC8vIEp1c3QgY2FjaGUgdGhlIEFycmF5I3NsaWNlIGZ1bmN0aW9uLlxuICB2YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbiAgLy8gQXBwbHkgbnVtYmVyIHBhZGRpbmcuXG4gIHZhciBwYWRkaW5nID0gZnVuY3Rpb24obnVtYmVyKSB7XG4gICAgcmV0dXJuIChcIjBcIiArIG51bWJlci50b1N0cmluZygpKS5zdWJzdHIoLTIpO1xuICB9O1xuXG4gIC8vIEltcHJvdmVkIHRvRml4ZWQgbnVtYmVyIHJvdW5kaW5nIGZ1bmN0aW9uIHdpdGggc3VwcG9ydCBmb3IgdW5wcmVjaXNlIGZsb2F0aW5nIHBvaW50c1xuICAvLyBKYXZhU2NyaXB0J3Mgc3RhbmRhcmQgdG9GaXhlZCBmdW5jdGlvbiBkb2VzIG5vdCByb3VuZCBjZXJ0YWluIG51bWJlcnMgY29ycmVjdGx5IChmb3IgZXhhbXBsZSAwLjEwNSB3aXRoIHByZWNpc2lvbiAyKS5cbiAgdmFyIHRvRml4ZWQgPSBmdW5jdGlvbihudW1iZXIsIHByZWNpc2lvbikge1xuICAgIHJldHVybiBkZWNpbWFsQWRqdXN0KCdyb3VuZCcsIG51bWJlciwgLXByZWNpc2lvbikudG9GaXhlZChwcmVjaXNpb24pO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgYW4gb2JqZWN0P1xuICAvLyBCb3Jyb3dlZCBmcm9tIFVuZGVyc2NvcmUuanNcbiAgdmFyIGlzT2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnXG4gIH07XG5cbiAgdmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbihmdW5jKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgZnVuYztcbiAgICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJ1xuICB9O1xuXG4gIC8vIENoZWNrIGlmIHZhbHVlIGlzIGRpZmZlcmVudCB0aGFuIHVuZGVmaW5lZCBhbmQgbnVsbDtcbiAgdmFyIGlzU2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mKHZhbHVlKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGw7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhbiBhcnJheT9cbiAgLy8gQm9ycm93ZWQgZnJvbSBVbmRlcnNjb3JlLmpzXG4gIHZhciBpc0FycmF5ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkpIHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgdmFyIGlzU3RyaW5nID0gZnVuY3Rpb24odmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG4gIH07XG5cbiAgdmFyIGlzTnVtYmVyID0gZnVuY3Rpb24odmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT0gJ251bWJlcicgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xuICB9O1xuXG4gIHZhciBpc0Jvb2xlYW4gPSBmdW5jdGlvbih2YWwpIHtcbiAgICByZXR1cm4gdmFsID09PSB0cnVlIHx8IHZhbCA9PT0gZmFsc2U7XG4gIH07XG5cbiAgdmFyIGRlY2ltYWxBZGp1c3QgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSwgZXhwKSB7XG4gICAgLy8gSWYgdGhlIGV4cCBpcyB1bmRlZmluZWQgb3IgemVyby4uLlxuICAgIGlmICh0eXBlb2YgZXhwID09PSAndW5kZWZpbmVkJyB8fCArZXhwID09PSAwKSB7XG4gICAgICByZXR1cm4gTWF0aFt0eXBlXSh2YWx1ZSk7XG4gICAgfVxuICAgIHZhbHVlID0gK3ZhbHVlO1xuICAgIGV4cCA9ICtleHA7XG4gICAgLy8gSWYgdGhlIHZhbHVlIGlzIG5vdCBhIG51bWJlciBvciB0aGUgZXhwIGlzIG5vdCBhbiBpbnRlZ2VyLi4uXG4gICAgaWYgKGlzTmFOKHZhbHVlKSB8fCAhKHR5cGVvZiBleHAgPT09ICdudW1iZXInICYmIGV4cCAlIDEgPT09IDApKSB7XG4gICAgICByZXR1cm4gTmFOO1xuICAgIH1cbiAgICAvLyBTaGlmdFxuICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5zcGxpdCgnZScpO1xuICAgIHZhbHVlID0gTWF0aFt0eXBlXSgrKHZhbHVlWzBdICsgJ2UnICsgKHZhbHVlWzFdID8gKCt2YWx1ZVsxXSAtIGV4cCkgOiAtZXhwKSkpO1xuICAgIC8vIFNoaWZ0IGJhY2tcbiAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJ2UnKTtcbiAgICByZXR1cm4gKyh2YWx1ZVswXSArICdlJyArICh2YWx1ZVsxXSA/ICgrdmFsdWVbMV0gKyBleHApIDogZXhwKSk7XG4gIH1cblxuICB2YXIgbGF6eUV2YWx1YXRlID0gZnVuY3Rpb24obWVzc2FnZSwgc2NvcGUpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihtZXNzYWdlKSkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2Uoc2NvcGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG4gIH1cblxuICB2YXIgbWVyZ2UgPSBmdW5jdGlvbiAoZGVzdCwgb2JqKSB7XG4gICAgdmFyIGtleSwgdmFsdWU7XG4gICAgZm9yIChrZXkgaW4gb2JqKSBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHZhbHVlID0gb2JqW2tleV07XG4gICAgICBpZiAoaXNTdHJpbmcodmFsdWUpIHx8IGlzTnVtYmVyKHZhbHVlKSB8fCBpc0Jvb2xlYW4odmFsdWUpIHx8IGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGRlc3Rba2V5XSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRlc3Rba2V5XSA9PSBudWxsKSBkZXN0W2tleV0gPSB7fTtcbiAgICAgICAgbWVyZ2UoZGVzdFtrZXldLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZXN0O1xuICB9O1xuXG4gIC8vIFNldCBkZWZhdWx0IGRheXMvbW9udGhzIHRyYW5zbGF0aW9ucy5cbiAgdmFyIERBVEUgPSB7XG4gICAgICBkYXlfbmFtZXM6IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdXG4gICAgLCBhYmJyX2RheV9uYW1lczogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdXG4gICAgLCBtb250aF9uYW1lczogW251bGwsIFwiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl1cbiAgICAsIGFiYnJfbW9udGhfbmFtZXM6IFtudWxsLCBcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXVxuICAgICwgbWVyaWRpYW46IFtcIkFNXCIsIFwiUE1cIl1cbiAgfTtcblxuICAvLyBTZXQgZGVmYXVsdCBudW1iZXIgZm9ybWF0LlxuICB2YXIgTlVNQkVSX0ZPUk1BVCA9IHtcbiAgICAgIHByZWNpc2lvbjogM1xuICAgICwgc2VwYXJhdG9yOiBcIi5cIlxuICAgICwgZGVsaW1pdGVyOiBcIixcIlxuICAgICwgc3RyaXBfaW5zaWduaWZpY2FudF96ZXJvczogZmFsc2VcbiAgfTtcblxuICAvLyBTZXQgZGVmYXVsdCBjdXJyZW5jeSBmb3JtYXQuXG4gIHZhciBDVVJSRU5DWV9GT1JNQVQgPSB7XG4gICAgICB1bml0OiBcIiRcIlxuICAgICwgcHJlY2lzaW9uOiAyXG4gICAgLCBmb3JtYXQ6IFwiJXUlblwiXG4gICAgLCBzaWduX2ZpcnN0OiB0cnVlXG4gICAgLCBkZWxpbWl0ZXI6IFwiLFwiXG4gICAgLCBzZXBhcmF0b3I6IFwiLlwiXG4gIH07XG5cbiAgLy8gU2V0IGRlZmF1bHQgcGVyY2VudGFnZSBmb3JtYXQuXG4gIHZhciBQRVJDRU5UQUdFX0ZPUk1BVCA9IHtcbiAgICAgIHVuaXQ6IFwiJVwiXG4gICAgLCBwcmVjaXNpb246IDNcbiAgICAsIGZvcm1hdDogXCIlbiV1XCJcbiAgICAsIHNlcGFyYXRvcjogXCIuXCJcbiAgICAsIGRlbGltaXRlcjogXCJcIlxuICB9O1xuXG4gIC8vIFNldCBkZWZhdWx0IHNpemUgdW5pdHMuXG4gIHZhciBTSVpFX1VOSVRTID0gW251bGwsIFwia2JcIiwgXCJtYlwiLCBcImdiXCIsIFwidGJcIl07XG5cbiAgLy8gT3RoZXIgZGVmYXVsdCBvcHRpb25zXG4gIHZhciBERUZBVUxUX09QVElPTlMgPSB7XG4gICAgLy8gU2V0IGRlZmF1bHQgbG9jYWxlLiBUaGlzIGxvY2FsZSB3aWxsIGJlIHVzZWQgd2hlbiBmYWxsYmFjayBpcyBlbmFibGVkIGFuZFxuICAgIC8vIHRoZSB0cmFuc2xhdGlvbiBkb2Vzbid0IGV4aXN0IGluIGEgcGFydGljdWxhciBsb2NhbGUuXG4gICAgICBkZWZhdWx0TG9jYWxlOiBcImVuXCJcbiAgICAvLyBTZXQgdGhlIGN1cnJlbnQgbG9jYWxlIHRvIGBlbmAuXG4gICAgLCBsb2NhbGU6IFwiZW5cIlxuICAgIC8vIFNldCB0aGUgdHJhbnNsYXRpb24ga2V5IHNlcGFyYXRvci5cbiAgICAsIGRlZmF1bHRTZXBhcmF0b3I6IFwiLlwiXG4gICAgLy8gU2V0IHRoZSBwbGFjZWhvbGRlciBmb3JtYXQuIEFjY2VwdHMgYHt7cGxhY2Vob2xkZXJ9fWAgYW5kIGAle3BsYWNlaG9sZGVyfWAuXG4gICAgLCBwbGFjZWhvbGRlcjogLyg/Olxce1xce3wlXFx7KSguKj8pKD86XFx9XFx9PykvZ21cbiAgICAvLyBTZXQgaWYgZW5naW5lIHNob3VsZCBmYWxsYmFjayB0byB0aGUgZGVmYXVsdCBsb2NhbGUgd2hlbiBhIHRyYW5zbGF0aW9uXG4gICAgLy8gaXMgbWlzc2luZy5cbiAgICAsIGZhbGxiYWNrczogZmFsc2VcbiAgICAvLyBTZXQgdGhlIGRlZmF1bHQgdHJhbnNsYXRpb24gb2JqZWN0LlxuICAgICwgdHJhbnNsYXRpb25zOiB7fVxuICAgIC8vIFNldCBtaXNzaW5nIHRyYW5zbGF0aW9uIGJlaGF2aW9yLiAnbWVzc2FnZScgd2lsbCBkaXNwbGF5IGEgbWVzc2FnZVxuICAgIC8vIHRoYXQgdGhlIHRyYW5zbGF0aW9uIGlzIG1pc3NpbmcsICdndWVzcycgd2lsbCB0cnkgdG8gZ3Vlc3MgdGhlIHN0cmluZ1xuICAgICwgbWlzc2luZ0JlaGF2aW91cjogJ21lc3NhZ2UnXG4gICAgLy8gaWYgeW91IHVzZSBtaXNzaW5nQmVoYXZpb3VyIHdpdGggJ21lc3NhZ2UnLCBidXQgd2FudCB0byBrbm93IHRoYXQgdGhlXG4gICAgLy8gc3RyaW5nIGlzIGFjdHVhbGx5IG1pc3NpbmcgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHlvdSBjYW4gcHJlZml4IHRoZVxuICAgIC8vIGd1ZXNzZWQgc3RyaW5nIGJ5IHNldHRpbmcgdGhlIHZhbHVlIGhlcmUuIEJ5IGRlZmF1bHQsIG5vIHByZWZpeCFcbiAgICAsIG1pc3NpbmdUcmFuc2xhdGlvblByZWZpeDogJydcbiAgfTtcblxuICAvLyBTZXQgZGVmYXVsdCBsb2NhbGUuIFRoaXMgbG9jYWxlIHdpbGwgYmUgdXNlZCB3aGVuIGZhbGxiYWNrIGlzIGVuYWJsZWQgYW5kXG4gIC8vIHRoZSB0cmFuc2xhdGlvbiBkb2Vzbid0IGV4aXN0IGluIGEgcGFydGljdWxhciBsb2NhbGUuXG4gIEkxOG4ucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5O1xuICAgIGZvciAoa2V5IGluIERFRkFVTFRfT1BUSU9OUykge1xuICAgICAgdGhpc1trZXldID0gREVGQVVMVF9PUFRJT05TW2tleV07XG4gICAgfVxuICB9O1xuXG4gIC8vIE11Y2ggbGlrZSBgcmVzZXRgLCBidXQgb25seSBhc3NpZ24gb3B0aW9ucyBpZiBub3QgYWxyZWFkeSBhc3NpZ25lZFxuICBJMThuLmluaXRpYWxpemVPcHRpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGtleTtcbiAgICBmb3IgKGtleSBpbiBERUZBVUxUX09QVElPTlMpIGlmICghaXNTZXQodGhpc1trZXldKSkge1xuICAgICAgdGhpc1trZXldID0gREVGQVVMVF9PUFRJT05TW2tleV07XG4gICAgfVxuICB9O1xuICBJMThuLmluaXRpYWxpemVPcHRpb25zKCk7XG5cbiAgLy8gUmV0dXJuIGEgbGlzdCBvZiBhbGwgbG9jYWxlcyB0aGF0IG11c3QgYmUgdHJpZWQgYmVmb3JlIHJldHVybmluZyB0aGVcbiAgLy8gbWlzc2luZyB0cmFuc2xhdGlvbiBtZXNzYWdlLiBCeSBkZWZhdWx0LCB0aGlzIHdpbGwgY29uc2lkZXIgdGhlIGlubGluZSBvcHRpb24sXG4gIC8vIGN1cnJlbnQgbG9jYWxlIGFuZCBmYWxsYmFjayBsb2NhbGUuXG4gIC8vXG4gIC8vICAgICBJMThuLmxvY2FsZXMuZ2V0KFwiZGUtREVcIik7XG4gIC8vICAgICAvLyBbXCJkZS1ERVwiLCBcImRlXCIsIFwiZW5cIl1cbiAgLy9cbiAgLy8gWW91IGNhbiBkZWZpbmUgY3VzdG9tIHJ1bGVzIGZvciBhbnkgbG9jYWxlLiBKdXN0IG1ha2Ugc3VyZSB5b3UgcmV0dXJuIGEgYXJyYXlcbiAgLy8gY29udGFpbmluZyBhbGwgbG9jYWxlcy5cbiAgLy9cbiAgLy8gICAgIC8vIERlZmF1bHQgdGhlIFdvb2tpZSBsb2NhbGUgdG8gRW5nbGlzaC5cbiAgLy8gICAgIEkxOG4ubG9jYWxlc1tcIndrXCJdID0gZnVuY3Rpb24obG9jYWxlKSB7XG4gIC8vICAgICAgIHJldHVybiBbXCJlblwiXTtcbiAgLy8gICAgIH07XG4gIC8vXG4gIEkxOG4ubG9jYWxlcyA9IHt9O1xuXG4gIC8vIFJldHJpZXZlIGxvY2FsZXMgYmFzZWQgb24gaW5saW5lIGxvY2FsZSwgY3VycmVudCBsb2NhbGUgb3IgZGVmYXVsdCB0b1xuICAvLyBJMThuJ3MgZGV0ZWN0aW9uLlxuICBJMThuLmxvY2FsZXMuZ2V0ID0gZnVuY3Rpb24obG9jYWxlKSB7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXNbbG9jYWxlXSB8fCB0aGlzW0kxOG4ubG9jYWxlXSB8fCB0aGlzW1wiZGVmYXVsdFwiXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKHJlc3VsdCkpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdChsb2NhbGUpO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KHJlc3VsdCkgPT09IGZhbHNlKSB7XG4gICAgICByZXN1bHQgPSBbcmVzdWx0XTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFRoZSBkZWZhdWx0IGxvY2FsZSBsaXN0LlxuICBJMThuLmxvY2FsZXNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24obG9jYWxlKSB7XG4gICAgdmFyIGxvY2FsZXMgPSBbXVxuICAgICAgLCBsaXN0ID0gW11cbiAgICA7XG5cbiAgICAvLyBIYW5kbGUgdGhlIGlubGluZSBsb2NhbGUgb3B0aW9uIHRoYXQgY2FuIGJlIHByb3ZpZGVkIHRvXG4gICAgLy8gdGhlIGBJMThuLnRgIG9wdGlvbnMuXG4gICAgaWYgKGxvY2FsZSkge1xuICAgICAgbG9jYWxlcy5wdXNoKGxvY2FsZSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBjdXJyZW50IGxvY2FsZSB0byB0aGUgbGlzdC5cbiAgICBpZiAoIWxvY2FsZSAmJiBJMThuLmxvY2FsZSkge1xuICAgICAgbG9jYWxlcy5wdXNoKEkxOG4ubG9jYWxlKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGRlZmF1bHQgbG9jYWxlIGlmIGZhbGxiYWNrIHN0cmF0ZWd5IGlzIGVuYWJsZWQuXG4gICAgaWYgKEkxOG4uZmFsbGJhY2tzICYmIEkxOG4uZGVmYXVsdExvY2FsZSkge1xuICAgICAgbG9jYWxlcy5wdXNoKEkxOG4uZGVmYXVsdExvY2FsZSk7XG4gICAgfVxuXG4gICAgLy8gTG9jYWxlIGNvZGUgZm9ybWF0IDE6XG4gICAgLy8gQWNjb3JkaW5nIHRvIFJGQzQ2NDYgKGh0dHA6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzQ2NDYudHh0KVxuICAgIC8vIGxhbmd1YWdlIGNvZGVzIGZvciBUcmFkaXRpb25hbCBDaGluZXNlIHNob3VsZCBiZSBgemgtSGFudGBcbiAgICAvL1xuICAgIC8vIEJ1dCBkdWUgdG8gYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgIC8vIFdlIHVzZSBvbGRlciB2ZXJzaW9uIG9mIElFVEYgbGFuZ3VhZ2UgdGFnXG4gICAgLy8gQHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNDAxL3N0cnVjdC9kaXJsYW5nLmh0bWxcbiAgICAvLyBAc2VlIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSUVURl9sYW5ndWFnZV90YWdcbiAgICAvL1xuICAgIC8vIEZvcm1hdDogYGxhbmd1YWdlLWNvZGUgPSBwcmltYXJ5LWNvZGUgKCBcIi1cIiBzdWJjb2RlICkqYFxuICAgIC8vXG4gICAgLy8gcHJpbWFyeS1jb2RlIHVzZXMgSVNPNjM5LTFcbiAgICAvLyBAc2VlIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGlzdF9vZl9JU09fNjM5LTFfY29kZXNcbiAgICAvLyBAc2VlIGh0dHA6Ly93d3cuaXNvLm9yZy9pc28vaG9tZS9zdGFuZGFyZHMvbGFuZ3VhZ2VfY29kZXMuaHRtXG4gICAgLy9cbiAgICAvLyBzdWJjb2RlIHVzZXMgSVNPIDMxNjYtMSBhbHBoYS0yXG4gICAgLy8gQHNlZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT18zMTY2XG4gICAgLy8gQHNlZSBodHRwOi8vd3d3Lmlzby5vcmcvaXNvL2NvdW50cnlfY29kZXMuaHRtXG4gICAgLy9cbiAgICAvLyBAbm90ZVxuICAgIC8vICAgc3ViY29kZSBjYW4gYmUgaW4gdXBwZXIgY2FzZSBvciBsb3dlciBjYXNlXG4gICAgLy8gICBkZWZpbmluZyBpdCBpbiB1cHBlciBjYXNlIGlzIGEgY29udmVudGlvbiBvbmx5XG5cblxuICAgIC8vIExvY2FsZSBjb2RlIGZvcm1hdCAyOlxuICAgIC8vIEZvcm1hdDogYGNvZGUgPSBwcmltYXJ5LWNvZGUgKCBcIi1cIiByZWdpb24tY29kZSApKmBcbiAgICAvLyBwcmltYXJ5LWNvZGUgdXNlcyBJU08gNjM5LTFcbiAgICAvLyBzY3JpcHQtY29kZSB1c2VzIElTTyAxNTkyNFxuICAgIC8vIHJlZ2lvbi1jb2RlIHVzZXMgSVNPIDMxNjYtMSBhbHBoYS0yXG4gICAgLy8gRXhhbXBsZTogemgtSGFudC1UVywgZW4tSEssIHpoLUhhbnQtQ05cbiAgICAvL1xuICAgIC8vIEl0IGlzIHNpbWlsYXIgdG8gUkZDNDY0NiAob3IgYWN0dWFsbHkgdGhlIHNhbWUpLFxuICAgIC8vIGJ1dCBzZWVtcyB0byBiZSBsaW1pdGVkIHRvIGxhbmd1YWdlLCBzY3JpcHQsIHJlZ2lvblxuXG4gICAgLy8gQ29tcHV0ZSBlYWNoIGxvY2FsZSB3aXRoIGl0cyBjb3VudHJ5IGNvZGUuXG4gICAgLy8gU28gdGhpcyB3aWxsIHJldHVybiBhbiBhcnJheSBjb250YWluaW5nXG4gICAgLy8gYGRlLURFYCBhbmQgYGRlYFxuICAgIC8vIG9yXG4gICAgLy8gYHpoLWhhbnMtdHdgLCBgemgtaGFuc2AsIGB6aGBcbiAgICAvLyBsb2NhbGVzLlxuICAgIGxvY2FsZXMuZm9yRWFjaChmdW5jdGlvbihsb2NhbGUpIHtcbiAgICAgIHZhciBsb2NhbGVQYXJ0cyA9IGxvY2FsZS5zcGxpdChcIi1cIik7XG4gICAgICB2YXIgZmlyc3RGYWxsYmFjayA9IG51bGw7XG4gICAgICB2YXIgc2Vjb25kRmFsbGJhY2sgPSBudWxsO1xuICAgICAgaWYgKGxvY2FsZVBhcnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICBmaXJzdEZhbGxiYWNrID0gW1xuICAgICAgICAgIGxvY2FsZVBhcnRzWzBdLFxuICAgICAgICAgIGxvY2FsZVBhcnRzWzFdXG4gICAgICAgIF0uam9pbihcIi1cIik7XG4gICAgICAgIHNlY29uZEZhbGxiYWNrID0gbG9jYWxlUGFydHNbMF07XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChsb2NhbGVQYXJ0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgZmlyc3RGYWxsYmFjayA9IGxvY2FsZVBhcnRzWzBdO1xuICAgICAgfVxuXG4gICAgICBpZiAobGlzdC5pbmRleE9mKGxvY2FsZSkgPT09IC0xKSB7XG4gICAgICAgIGxpc3QucHVzaChsb2NhbGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoISBJMThuLmZhbGxiYWNrcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIFtcbiAgICAgICAgZmlyc3RGYWxsYmFjayxcbiAgICAgICAgc2Vjb25kRmFsbGJhY2tcbiAgICAgIF0uZm9yRWFjaChmdW5jdGlvbihudWxsYWJsZUZhbGxiYWNrTG9jYWxlKSB7XG4gICAgICAgIC8vIFdlIGRvbid0IHdhbnQgbnVsbCB2YWx1ZXNcbiAgICAgICAgaWYgKHR5cGVvZiBudWxsYWJsZUZhbGxiYWNrTG9jYWxlID09PSBcInVuZGVmaW5lZFwiKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAobnVsbGFibGVGYWxsYmFja0xvY2FsZSA9PT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgLy8gV2UgZG9uJ3Qgd2FudCBkdXBsaWNhdGUgdmFsdWVzXG4gICAgICAgIC8vXG4gICAgICAgIC8vIENvbXBhcmluZyB3aXRoIGBsb2NhbGVgIGZpcnN0IGlzIGZhc3RlciB0aGFuXG4gICAgICAgIC8vIGNoZWNraW5nIHdoZXRoZXIgdmFsdWUncyBwcmVzZW5jZSBpbiB0aGUgbGlzdFxuICAgICAgICBpZiAobnVsbGFibGVGYWxsYmFja0xvY2FsZSA9PT0gbG9jYWxlKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAobGlzdC5pbmRleE9mKG51bGxhYmxlRmFsbGJhY2tMb2NhbGUpICE9PSAtMSkgeyByZXR1cm47IH1cblxuICAgICAgICBsaXN0LnB1c2gobnVsbGFibGVGYWxsYmFja0xvY2FsZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIE5vIGxvY2FsZXMgc2V0PyBFbmdsaXNoIGl0IGlzLlxuICAgIGlmICghbG9jYWxlcy5sZW5ndGgpIHtcbiAgICAgIGxvY2FsZXMucHVzaChcImVuXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBsaXN0O1xuICB9O1xuXG4gIC8vIEhvbGQgcGx1cmFsaXphdGlvbiBydWxlcy5cbiAgSTE4bi5wbHVyYWxpemF0aW9uID0ge307XG5cbiAgLy8gUmV0dXJuIHRoZSBwbHVyYWxpemVyIGZvciBhIHNwZWNpZmljIGxvY2FsZS5cbiAgLy8gSWYgbm8gc3BlY2lmeSBsb2NhbGUgaXMgZm91bmQsIHRoZW4gSTE4bidzIGRlZmF1bHQgd2lsbCBiZSB1c2VkLlxuICBJMThuLnBsdXJhbGl6YXRpb24uZ2V0ID0gZnVuY3Rpb24obG9jYWxlKSB7XG4gICAgcmV0dXJuIHRoaXNbbG9jYWxlXSB8fCB0aGlzW0kxOG4ubG9jYWxlXSB8fCB0aGlzW1wiZGVmYXVsdFwiXTtcbiAgfTtcblxuICAvLyBUaGUgZGVmYXVsdCBwbHVyYWxpemVyIHJ1bGUuXG4gIC8vIEl0IGRldGVjdHMgdGhlIGB6ZXJvYCwgYG9uZWAsIGFuZCBgb3RoZXJgIHNjb3Blcy5cbiAgSTE4bi5wbHVyYWxpemF0aW9uW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgc3dpdGNoIChjb3VudCkge1xuICAgICAgY2FzZSAwOiByZXR1cm4gW1wiemVyb1wiLCBcIm90aGVyXCJdO1xuICAgICAgY2FzZSAxOiByZXR1cm4gW1wib25lXCJdO1xuICAgICAgZGVmYXVsdDogcmV0dXJuIFtcIm90aGVyXCJdO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZXR1cm4gY3VycmVudCBsb2NhbGUuIElmIG5vIGxvY2FsZSBoYXMgYmVlbiBzZXQsIHRoZW5cbiAgLy8gdGhlIGN1cnJlbnQgbG9jYWxlIHdpbGwgYmUgdGhlIGRlZmF1bHQgbG9jYWxlLlxuICBJMThuLmN1cnJlbnRMb2NhbGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbGUgfHwgdGhpcy5kZWZhdWx0TG9jYWxlO1xuICB9O1xuXG4gIC8vIENoZWNrIGlmIHZhbHVlIGlzIGRpZmZlcmVudCB0aGFuIHVuZGVmaW5lZCBhbmQgbnVsbDtcbiAgSTE4bi5pc1NldCA9IGlzU2V0O1xuXG4gIC8vIEZpbmQgYW5kIHByb2Nlc3MgdGhlIHRyYW5zbGF0aW9uIHVzaW5nIHRoZSBwcm92aWRlZCBzY29wZSBhbmQgb3B0aW9ucy5cbiAgLy8gVGhpcyBpcyB1c2VkIGludGVybmFsbHkgYnkgc29tZSBmdW5jdGlvbnMgYW5kIHNob3VsZCBub3QgYmUgdXNlZCBhcyBhblxuICAvLyBwdWJsaWMgQVBJLlxuICBJMThuLmxvb2t1cCA9IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICAgIHZhciBsb2NhbGVzID0gdGhpcy5sb2NhbGVzLmdldChvcHRpb25zLmxvY2FsZSkuc2xpY2UoKVxuICAgICAgLCByZXF1ZXN0ZWRMb2NhbGUgPSBsb2NhbGVzWzBdXG4gICAgICAsIGxvY2FsZVxuICAgICAgLCBzY29wZXNcbiAgICAgICwgZnVsbFNjb3BlXG4gICAgICAsIHRyYW5zbGF0aW9uc1xuICAgIDtcblxuICAgIGZ1bGxTY29wZSA9IHRoaXMuZ2V0RnVsbFNjb3BlKHNjb3BlLCBvcHRpb25zKTtcblxuICAgIHdoaWxlIChsb2NhbGVzLmxlbmd0aCkge1xuICAgICAgbG9jYWxlID0gbG9jYWxlcy5zaGlmdCgpO1xuICAgICAgc2NvcGVzID0gZnVsbFNjb3BlLnNwbGl0KHRoaXMuZGVmYXVsdFNlcGFyYXRvcik7XG4gICAgICB0cmFuc2xhdGlvbnMgPSB0aGlzLnRyYW5zbGF0aW9uc1tsb2NhbGVdO1xuXG4gICAgICBpZiAoIXRyYW5zbGF0aW9ucykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChzY29wZXMubGVuZ3RoKSB7XG4gICAgICAgIHRyYW5zbGF0aW9ucyA9IHRyYW5zbGF0aW9uc1tzY29wZXMuc2hpZnQoKV07XG5cbiAgICAgICAgaWYgKHRyYW5zbGF0aW9ucyA9PT0gdW5kZWZpbmVkIHx8IHRyYW5zbGF0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2xhdGlvbnMgIT09IHVuZGVmaW5lZCAmJiB0cmFuc2xhdGlvbnMgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9ucztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNTZXQob3B0aW9ucy5kZWZhdWx0VmFsdWUpKSB7XG4gICAgICByZXR1cm4gbGF6eUV2YWx1YXRlKG9wdGlvbnMuZGVmYXVsdFZhbHVlLCBzY29wZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGxvb2t1cCBwbHVyYWxpemF0aW9uIHJ1bGUga2V5IGludG8gdHJhbnNsYXRpb25zXG4gIEkxOG4ucGx1cmFsaXphdGlvbkxvb2t1cFdpdGhvdXRGYWxsYmFjayA9IGZ1bmN0aW9uKGNvdW50LCBsb2NhbGUsIHRyYW5zbGF0aW9ucykge1xuICAgIHZhciBwbHVyYWxpemVyID0gdGhpcy5wbHVyYWxpemF0aW9uLmdldChsb2NhbGUpXG4gICAgICAsIHBsdXJhbGl6ZXJLZXlzID0gcGx1cmFsaXplcihjb3VudClcbiAgICAgICwgcGx1cmFsaXplcktleVxuICAgICAgLCBtZXNzYWdlO1xuXG4gICAgaWYgKGlzT2JqZWN0KHRyYW5zbGF0aW9ucykpIHtcbiAgICAgIHdoaWxlIChwbHVyYWxpemVyS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgcGx1cmFsaXplcktleSA9IHBsdXJhbGl6ZXJLZXlzLnNoaWZ0KCk7XG4gICAgICAgIGlmIChpc1NldCh0cmFuc2xhdGlvbnNbcGx1cmFsaXplcktleV0pKSB7XG4gICAgICAgICAgbWVzc2FnZSA9IHRyYW5zbGF0aW9uc1twbHVyYWxpemVyS2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtZXNzYWdlO1xuICB9O1xuXG4gIC8vIExvb2t1cCBkZWRpY2F0ZWQgdG8gcGx1cmFsaXphdGlvblxuICBJMThuLnBsdXJhbGl6YXRpb25Mb29rdXAgPSBmdW5jdGlvbihjb3VudCwgc2NvcGUsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIHZhciBsb2NhbGVzID0gdGhpcy5sb2NhbGVzLmdldChvcHRpb25zLmxvY2FsZSkuc2xpY2UoKVxuICAgICAgLCByZXF1ZXN0ZWRMb2NhbGUgPSBsb2NhbGVzWzBdXG4gICAgICAsIGxvY2FsZVxuICAgICAgLCBzY29wZXNcbiAgICAgICwgdHJhbnNsYXRpb25zXG4gICAgICAsIG1lc3NhZ2VcbiAgICA7XG4gICAgc2NvcGUgPSB0aGlzLmdldEZ1bGxTY29wZShzY29wZSwgb3B0aW9ucyk7XG5cbiAgICB3aGlsZSAobG9jYWxlcy5sZW5ndGgpIHtcbiAgICAgIGxvY2FsZSA9IGxvY2FsZXMuc2hpZnQoKTtcbiAgICAgIHNjb3BlcyA9IHNjb3BlLnNwbGl0KHRoaXMuZGVmYXVsdFNlcGFyYXRvcik7XG4gICAgICB0cmFuc2xhdGlvbnMgPSB0aGlzLnRyYW5zbGF0aW9uc1tsb2NhbGVdO1xuXG4gICAgICBpZiAoIXRyYW5zbGF0aW9ucykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHNjb3Blcy5sZW5ndGgpIHtcbiAgICAgICAgdHJhbnNsYXRpb25zID0gdHJhbnNsYXRpb25zW3Njb3Blcy5zaGlmdCgpXTtcbiAgICAgICAgaWYgKCFpc09iamVjdCh0cmFuc2xhdGlvbnMpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3Blcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLnBsdXJhbGl6YXRpb25Mb29rdXBXaXRob3V0RmFsbGJhY2soY291bnQsIGxvY2FsZSwgdHJhbnNsYXRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lc3NhZ2UgIT0gbnVsbCAmJiBtZXNzYWdlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZSA9PSBudWxsIHx8IG1lc3NhZ2UgPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoaXNTZXQob3B0aW9ucy5kZWZhdWx0VmFsdWUpKSB7XG4gICAgICAgIGlmIChpc09iamVjdChvcHRpb25zLmRlZmF1bHRWYWx1ZSkpIHtcbiAgICAgICAgICBtZXNzYWdlID0gdGhpcy5wbHVyYWxpemF0aW9uTG9va3VwV2l0aG91dEZhbGxiYWNrKGNvdW50LCBvcHRpb25zLmxvY2FsZSwgb3B0aW9ucy5kZWZhdWx0VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lc3NhZ2UgPSBvcHRpb25zLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0cmFuc2xhdGlvbnMgPSBvcHRpb25zLmRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBtZXNzYWdlOiBtZXNzYWdlLCB0cmFuc2xhdGlvbnM6IHRyYW5zbGF0aW9ucyB9O1xuICB9O1xuXG4gIC8vIFJhaWxzIGNoYW5nZWQgdGhlIHdheSB0aGUgbWVyaWRpYW4gaXMgc3RvcmVkLlxuICAvLyBJdCBzdGFydGVkIHdpdGggYGRhdGUubWVyaWRpYW5gIHJldHVybmluZyBhbiBhcnJheSxcbiAgLy8gdGhlbiBpdCBzd2l0Y2hlZCB0byBgdGltZS5hbWAgYW5kIGB0aW1lLnBtYC5cbiAgLy8gVGhpcyBmdW5jdGlvbiBhYnN0cmFjdHMgdGhpcyBkaWZmZXJlbmNlIGFuZCByZXR1cm5zXG4gIC8vIHRoZSBjb3JyZWN0IG1lcmlkaWFuIG9yIHRoZSBkZWZhdWx0IHZhbHVlIHdoZW4gbm9uZSBpcyBwcm92aWRlZC5cbiAgSTE4bi5tZXJpZGlhbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aW1lID0gdGhpcy5sb29rdXAoXCJ0aW1lXCIpO1xuICAgIHZhciBkYXRlID0gdGhpcy5sb29rdXAoXCJkYXRlXCIpO1xuXG4gICAgaWYgKHRpbWUgJiYgdGltZS5hbSAmJiB0aW1lLnBtKSB7XG4gICAgICByZXR1cm4gW3RpbWUuYW0sIHRpbWUucG1dO1xuICAgIH0gZWxzZSBpZiAoZGF0ZSAmJiBkYXRlLm1lcmlkaWFuKSB7XG4gICAgICByZXR1cm4gZGF0ZS5tZXJpZGlhbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIERBVEUubWVyaWRpYW47XG4gICAgfVxuICB9O1xuXG4gIC8vIE1lcmdlIHNlcnZlcmFsIGhhc2ggb3B0aW9ucywgY2hlY2tpbmcgaWYgdmFsdWUgaXMgc2V0IGJlZm9yZVxuICAvLyBvdmVyd3JpdGluZyBhbnkgdmFsdWUuIFRoZSBwcmVjZWRlbmNlIGlzIGZyb20gbGVmdCB0byByaWdodC5cbiAgLy9cbiAgLy8gICAgIEkxOG4ucHJlcGFyZU9wdGlvbnMoe25hbWU6IFwiSm9obiBEb2VcIn0sIHtuYW1lOiBcIk1hcnkgRG9lXCIsIHJvbGU6IFwidXNlclwifSk7XG4gIC8vICAgICAjPT4ge25hbWU6IFwiSm9obiBEb2VcIiwgcm9sZTogXCJ1c2VyXCJ9XG4gIC8vXG4gIEkxOG4ucHJlcGFyZU9wdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgICAgLCBvcHRpb25zID0ge31cbiAgICAgICwgc3ViamVjdFxuICAgIDtcblxuICAgIHdoaWxlIChhcmdzLmxlbmd0aCkge1xuICAgICAgc3ViamVjdCA9IGFyZ3Muc2hpZnQoKTtcblxuICAgICAgaWYgKHR5cGVvZihzdWJqZWN0KSAhPSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBhdHRyIGluIHN1YmplY3QpIHtcbiAgICAgICAgaWYgKCFzdWJqZWN0Lmhhc093blByb3BlcnR5KGF0dHIpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNTZXQob3B0aW9uc1thdHRyXSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnNbYXR0cl0gPSBzdWJqZWN0W2F0dHJdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlIGEgbGlzdCBvZiB0cmFuc2xhdGlvbiBvcHRpb25zIGZvciBkZWZhdWx0IGZhbGxiYWNrcy5cbiAgLy8gYGRlZmF1bHRWYWx1ZWAgaXMgYWxzbyBkZWxldGVkIGZyb20gb3B0aW9ucyBhcyBpdCBpcyByZXR1cm5lZCBhcyBwYXJ0IG9mXG4gIC8vIHRoZSB0cmFuc2xhdGlvbk9wdGlvbnMgYXJyYXkuXG4gIEkxOG4uY3JlYXRlVHJhbnNsYXRpb25PcHRpb25zID0gZnVuY3Rpb24oc2NvcGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgdHJhbnNsYXRpb25PcHRpb25zID0gW3tzY29wZTogc2NvcGV9XTtcblxuICAgIC8vIERlZmF1bHRzIHNob3VsZCBiZSBhbiBhcnJheSBvZiBoYXNoZXMgY29udGFpbmluZyBlaXRoZXJcbiAgICAvLyBmYWxsYmFjayBzY29wZXMgb3IgbWVzc2FnZXNcbiAgICBpZiAoaXNTZXQob3B0aW9ucy5kZWZhdWx0cykpIHtcbiAgICAgIHRyYW5zbGF0aW9uT3B0aW9ucyA9IHRyYW5zbGF0aW9uT3B0aW9ucy5jb25jYXQob3B0aW9ucy5kZWZhdWx0cyk7XG4gICAgfVxuXG4gICAgLy8gTWFpbnRhaW4gc3VwcG9ydCBmb3IgZGVmYXVsdFZhbHVlLiBTaW5jZSBpdCBpcyBhbHdheXMgYSBtZXNzYWdlXG4gICAgLy8gaW5zZXJ0IGl0IGluIHRvIHRoZSB0cmFuc2xhdGlvbiBvcHRpb25zIGFzIHN1Y2guXG4gICAgaWYgKGlzU2V0KG9wdGlvbnMuZGVmYXVsdFZhbHVlKSkge1xuICAgICAgdHJhbnNsYXRpb25PcHRpb25zLnB1c2goeyBtZXNzYWdlOiBvcHRpb25zLmRlZmF1bHRWYWx1ZSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25PcHRpb25zO1xuICB9O1xuXG4gIC8vIFRyYW5zbGF0ZSB0aGUgZ2l2ZW4gc2NvcGUgd2l0aCB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgSTE4bi50cmFuc2xhdGUgPSBmdW5jdGlvbihzY29wZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgICB2YXIgdHJhbnNsYXRpb25PcHRpb25zID0gdGhpcy5jcmVhdGVUcmFuc2xhdGlvbk9wdGlvbnMoc2NvcGUsIG9wdGlvbnMpO1xuXG4gICAgdmFyIHRyYW5zbGF0aW9uO1xuXG4gICAgdmFyIG9wdGlvbnNXaXRob3V0RGVmYXVsdCA9IHRoaXMucHJlcGFyZU9wdGlvbnMob3B0aW9ucylcbiAgICBkZWxldGUgb3B0aW9uc1dpdGhvdXREZWZhdWx0LmRlZmF1bHRWYWx1ZVxuXG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSB0cmFuc2xhdGlvbiBvcHRpb25zIHVudGlsIGEgdHJhbnNsYXRpb25cbiAgICAvLyBvciBtZXNzYWdlIGlzIGZvdW5kLlxuICAgIHZhciB0cmFuc2xhdGlvbkZvdW5kID1cbiAgICAgIHRyYW5zbGF0aW9uT3B0aW9ucy5zb21lKGZ1bmN0aW9uKHRyYW5zbGF0aW9uT3B0aW9uKSB7XG4gICAgICAgIGlmIChpc1NldCh0cmFuc2xhdGlvbk9wdGlvbi5zY29wZSkpIHtcbiAgICAgICAgICB0cmFuc2xhdGlvbiA9IHRoaXMubG9va3VwKHRyYW5zbGF0aW9uT3B0aW9uLnNjb3BlLCBvcHRpb25zV2l0aG91dERlZmF1bHQpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU2V0KHRyYW5zbGF0aW9uT3B0aW9uLm1lc3NhZ2UpKSB7XG4gICAgICAgICAgdHJhbnNsYXRpb24gPSBsYXp5RXZhbHVhdGUodHJhbnNsYXRpb25PcHRpb24ubWVzc2FnZSwgc2NvcGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyYW5zbGF0aW9uICE9PSB1bmRlZmluZWQgJiYgdHJhbnNsYXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG5cbiAgICBpZiAoIXRyYW5zbGF0aW9uRm91bmQpIHtcbiAgICAgIHJldHVybiB0aGlzLm1pc3NpbmdUcmFuc2xhdGlvbihzY29wZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZih0cmFuc2xhdGlvbikgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRyYW5zbGF0aW9uID0gdGhpcy5pbnRlcnBvbGF0ZSh0cmFuc2xhdGlvbiwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh0cmFuc2xhdGlvbikgJiYgaXNTZXQob3B0aW9ucy5jb3VudCkpIHtcbiAgICAgIHRyYW5zbGF0aW9uID0gdGhpcy5wbHVyYWxpemUob3B0aW9ucy5jb3VudCwgc2NvcGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0cmFuc2xhdGlvbjtcbiAgfTtcblxuICAvLyBUaGlzIGZ1bmN0aW9uIGludGVycG9sYXRlcyB0aGUgYWxsIHZhcmlhYmxlcyBpbiB0aGUgZ2l2ZW4gbWVzc2FnZS5cbiAgSTE4bi5pbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIHZhciBtYXRjaGVzID0gbWVzc2FnZS5tYXRjaCh0aGlzLnBsYWNlaG9sZGVyKVxuICAgICAgLCBwbGFjZWhvbGRlclxuICAgICAgLCB2YWx1ZVxuICAgICAgLCBuYW1lXG4gICAgICAsIHJlZ2V4XG4gICAgO1xuXG4gICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWU7XG5cbiAgICB3aGlsZSAobWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgIHBsYWNlaG9sZGVyID0gbWF0Y2hlcy5zaGlmdCgpO1xuICAgICAgbmFtZSA9IHBsYWNlaG9sZGVyLnJlcGxhY2UodGhpcy5wbGFjZWhvbGRlciwgXCIkMVwiKTtcblxuICAgICAgaWYgKGlzU2V0KG9wdGlvbnNbbmFtZV0pKSB7XG4gICAgICAgIHZhbHVlID0gb3B0aW9uc1tuYW1lXS50b1N0cmluZygpLnJlcGxhY2UoL1xcJC9nbSwgXCJfIyQjX1wiKTtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSBpbiBvcHRpb25zKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5udWxsUGxhY2Vob2xkZXIocGxhY2Vob2xkZXIsIG1lc3NhZ2UsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLm1pc3NpbmdQbGFjZWhvbGRlcihwbGFjZWhvbGRlciwgbWVzc2FnZSwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHJlZ2V4ID0gbmV3IFJlZ0V4cChwbGFjZWhvbGRlci5yZXBsYWNlKC9cXHsvZ20sIFwiXFxcXHtcIikucmVwbGFjZSgvXFx9L2dtLCBcIlxcXFx9XCIpKTtcbiAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UocmVnZXgsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZS5yZXBsYWNlKC9fI1xcJCNfL2csIFwiJFwiKTtcbiAgfTtcblxuICAvLyBQbHVyYWxpemUgdGhlIGdpdmVuIHNjb3BlIHVzaW5nIHRoZSBgY291bnRgIHZhbHVlLlxuICAvLyBUaGUgcGx1cmFsaXplZCB0cmFuc2xhdGlvbiBtYXkgaGF2ZSBvdGhlciBwbGFjZWhvbGRlcnMsXG4gIC8vIHdoaWNoIHdpbGwgYmUgcmV0cmlldmVkIGZyb20gYG9wdGlvbnNgLlxuICBJMThuLnBsdXJhbGl6ZSA9IGZ1bmN0aW9uKGNvdW50LCBzY29wZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB0aGlzLnByZXBhcmVPcHRpb25zKHtjb3VudDogU3RyaW5nKGNvdW50KX0sIG9wdGlvbnMpXG4gICAgdmFyIHBsdXJhbGl6ZXIsIG1lc3NhZ2UsIHJlc3VsdDtcblxuICAgIHJlc3VsdCA9IHRoaXMucGx1cmFsaXphdGlvbkxvb2t1cChjb3VudCwgc2NvcGUsIG9wdGlvbnMpO1xuICAgIGlmIChyZXN1bHQudHJhbnNsYXRpb25zID09IHVuZGVmaW5lZCB8fCByZXN1bHQudHJhbnNsYXRpb25zID09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLm1pc3NpbmdUcmFuc2xhdGlvbihzY29wZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC5tZXNzYWdlICE9IHVuZGVmaW5lZCAmJiByZXN1bHQubWVzc2FnZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnRlcnBvbGF0ZShyZXN1bHQubWVzc2FnZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcGx1cmFsaXplciA9IHRoaXMucGx1cmFsaXphdGlvbi5nZXQob3B0aW9ucy5sb2NhbGUpO1xuICAgICAgcmV0dXJuIHRoaXMubWlzc2luZ1RyYW5zbGF0aW9uKHNjb3BlICsgJy4nICsgcGx1cmFsaXplcihjb3VudClbMF0sIG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZXR1cm4gYSBtaXNzaW5nIHRyYW5zbGF0aW9uIG1lc3NhZ2UgZm9yIHRoZSBnaXZlbiBwYXJhbWV0ZXJzLlxuICBJMThuLm1pc3NpbmdUcmFuc2xhdGlvbiA9IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgLy9ndWVzcyBpbnRlbmRlZCBzdHJpbmdcbiAgICBpZih0aGlzLm1pc3NpbmdCZWhhdmlvdXIgPT0gJ2d1ZXNzJyl7XG4gICAgICAvL2dldCBvbmx5IHRoZSBsYXN0IHBvcnRpb24gb2YgdGhlIHNjb3BlXG4gICAgICB2YXIgcyA9IHNjb3BlLnNwbGl0KCcuJykuc2xpY2UoLTEpWzBdO1xuICAgICAgLy9yZXBsYWNlIHVuZGVyc2NvcmUgd2l0aCBzcGFjZSAmJiBjYW1lbGNhc2Ugd2l0aCBzcGFjZSBhbmQgbG93ZXJjYXNlIGxldHRlclxuICAgICAgcmV0dXJuICh0aGlzLm1pc3NpbmdUcmFuc2xhdGlvblByZWZpeC5sZW5ndGggPiAwID8gdGhpcy5taXNzaW5nVHJhbnNsYXRpb25QcmVmaXggOiAnJykgK1xuICAgICAgICAgIHMucmVwbGFjZSgnXycsJyAnKS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLFxuICAgICAgICAgIGZ1bmN0aW9uKG1hdGNoLCBwMSwgcDIpIHtyZXR1cm4gcDEgKyAnICcgKyBwMi50b0xvd2VyQ2FzZSgpfSApO1xuICAgIH1cblxuICAgIHZhciBsb2NhbGVGb3JUcmFuc2xhdGlvbiA9IChvcHRpb25zICE9IG51bGwgJiYgb3B0aW9ucy5sb2NhbGUgIT0gbnVsbCkgPyBvcHRpb25zLmxvY2FsZSA6IHRoaXMuY3VycmVudExvY2FsZSgpO1xuICAgIHZhciBmdWxsU2NvcGUgICAgICAgICAgID0gdGhpcy5nZXRGdWxsU2NvcGUoc2NvcGUsIG9wdGlvbnMpO1xuICAgIHZhciBmdWxsU2NvcGVXaXRoTG9jYWxlID0gW2xvY2FsZUZvclRyYW5zbGF0aW9uLCBmdWxsU2NvcGVdLmpvaW4odGhpcy5kZWZhdWx0U2VwYXJhdG9yKTtcblxuICAgIHJldHVybiAnW21pc3NpbmcgXCInICsgZnVsbFNjb3BlV2l0aExvY2FsZSArICdcIiB0cmFuc2xhdGlvbl0nO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIG1pc3NpbmcgcGxhY2Vob2xkZXIgbWVzc2FnZSBmb3IgZ2l2ZW4gcGFyYW1ldGVyc1xuICBJMThuLm1pc3NpbmdQbGFjZWhvbGRlciA9IGZ1bmN0aW9uKHBsYWNlaG9sZGVyLCBtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIFwiW21pc3NpbmcgXCIgKyBwbGFjZWhvbGRlciArIFwiIHZhbHVlXVwiO1xuICB9O1xuXG4gIEkxOG4ubnVsbFBsYWNlaG9sZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEkxOG4ubWlzc2luZ1BsYWNlaG9sZGVyLmFwcGx5KEkxOG4sIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLy8gRm9ybWF0IG51bWJlciB1c2luZyBsb2NhbGl6YXRpb24gcnVsZXMuXG4gIC8vIFRoZSBvcHRpb25zIHdpbGwgYmUgcmV0cmlldmVkIGZyb20gdGhlIGBudW1iZXIuZm9ybWF0YCBzY29wZS5cbiAgLy8gSWYgdGhpcyBpc24ndCBwcmVzZW50LCB0aGVuIHRoZSBmb2xsb3dpbmcgb3B0aW9ucyB3aWxsIGJlIHVzZWQ6XG4gIC8vXG4gIC8vIC0gYHByZWNpc2lvbmA6IGAzYFxuICAvLyAtIGBzZXBhcmF0b3JgOiBgXCIuXCJgXG4gIC8vIC0gYGRlbGltaXRlcmA6IGBcIixcImBcbiAgLy8gLSBgc3RyaXBfaW5zaWduaWZpY2FudF96ZXJvc2A6IGBmYWxzZWBcbiAgLy9cbiAgLy8gWW91IGNhbiBhbHNvIG92ZXJyaWRlIHRoZXNlIG9wdGlvbnMgYnkgcHJvdmlkaW5nIHRoZSBgb3B0aW9uc2AgYXJndW1lbnQuXG4gIC8vXG4gIEkxOG4udG9OdW1iZXIgPSBmdW5jdGlvbihudW1iZXIsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gdGhpcy5wcmVwYXJlT3B0aW9ucyhcbiAgICAgICAgb3B0aW9uc1xuICAgICAgLCB0aGlzLmxvb2t1cChcIm51bWJlci5mb3JtYXRcIilcbiAgICAgICwgTlVNQkVSX0ZPUk1BVFxuICAgICk7XG5cbiAgICB2YXIgbmVnYXRpdmUgPSBudW1iZXIgPCAwXG4gICAgICAsIHN0cmluZyA9IHRvRml4ZWQoTWF0aC5hYnMobnVtYmVyKSwgb3B0aW9ucy5wcmVjaXNpb24pLnRvU3RyaW5nKClcbiAgICAgICwgcGFydHMgPSBzdHJpbmcuc3BsaXQoXCIuXCIpXG4gICAgICAsIHByZWNpc2lvblxuICAgICAgLCBidWZmZXIgPSBbXVxuICAgICAgLCBmb3JtYXR0ZWROdW1iZXJcbiAgICAgICwgZm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQgfHwgXCIlblwiXG4gICAgICAsIHNpZ24gPSBuZWdhdGl2ZSA/IFwiLVwiIDogXCJcIlxuICAgIDtcblxuICAgIG51bWJlciA9IHBhcnRzWzBdO1xuICAgIHByZWNpc2lvbiA9IHBhcnRzWzFdO1xuXG4gICAgd2hpbGUgKG51bWJlci5sZW5ndGggPiAwKSB7XG4gICAgICBidWZmZXIudW5zaGlmdChudW1iZXIuc3Vic3RyKE1hdGgubWF4KDAsIG51bWJlci5sZW5ndGggLSAzKSwgMykpO1xuICAgICAgbnVtYmVyID0gbnVtYmVyLnN1YnN0cigwLCBudW1iZXIubGVuZ3RoIC0zKTtcbiAgICB9XG5cbiAgICBmb3JtYXR0ZWROdW1iZXIgPSBidWZmZXIuam9pbihvcHRpb25zLmRlbGltaXRlcik7XG5cbiAgICBpZiAob3B0aW9ucy5zdHJpcF9pbnNpZ25pZmljYW50X3plcm9zICYmIHByZWNpc2lvbikge1xuICAgICAgcHJlY2lzaW9uID0gcHJlY2lzaW9uLnJlcGxhY2UoLzArJC8sIFwiXCIpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnByZWNpc2lvbiA+IDAgJiYgcHJlY2lzaW9uKSB7XG4gICAgICBmb3JtYXR0ZWROdW1iZXIgKz0gb3B0aW9ucy5zZXBhcmF0b3IgKyBwcmVjaXNpb247XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc2lnbl9maXJzdCkge1xuICAgICAgZm9ybWF0ID0gXCIlc1wiICsgZm9ybWF0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFwiJW5cIiwgXCIlcyVuXCIpO1xuICAgIH1cblxuICAgIGZvcm1hdHRlZE51bWJlciA9IGZvcm1hdFxuICAgICAgLnJlcGxhY2UoXCIldVwiLCBvcHRpb25zLnVuaXQpXG4gICAgICAucmVwbGFjZShcIiVuXCIsIGZvcm1hdHRlZE51bWJlcilcbiAgICAgIC5yZXBsYWNlKFwiJXNcIiwgc2lnbilcbiAgICA7XG5cbiAgICByZXR1cm4gZm9ybWF0dGVkTnVtYmVyO1xuICB9O1xuXG4gIC8vIEZvcm1hdCBjdXJyZW5jeSB3aXRoIGxvY2FsaXphdGlvbiBydWxlcy5cbiAgLy8gVGhlIG9wdGlvbnMgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSB0aGUgYG51bWJlci5jdXJyZW5jeS5mb3JtYXRgIGFuZFxuICAvLyBgbnVtYmVyLmZvcm1hdGAgc2NvcGVzLCBpbiB0aGF0IG9yZGVyLlxuICAvL1xuICAvLyBBbnkgbWlzc2luZyBvcHRpb24gd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSB0aGUgYEkxOG4udG9OdW1iZXJgIGRlZmF1bHRzIGFuZFxuICAvLyB0aGUgZm9sbG93aW5nIG9wdGlvbnM6XG4gIC8vXG4gIC8vIC0gYHVuaXRgOiBgXCIkXCJgXG4gIC8vIC0gYHByZWNpc2lvbmA6IGAyYFxuICAvLyAtIGBmb3JtYXRgOiBgXCIldSVuXCJgXG4gIC8vIC0gYGRlbGltaXRlcmA6IGBcIixcImBcbiAgLy8gLSBgc2VwYXJhdG9yYDogYFwiLlwiYFxuICAvL1xuICAvLyBZb3UgY2FuIGFsc28gb3ZlcnJpZGUgdGhlc2Ugb3B0aW9ucyBieSBwcm92aWRpbmcgdGhlIGBvcHRpb25zYCBhcmd1bWVudC5cbiAgLy9cbiAgSTE4bi50b0N1cnJlbmN5ID0gZnVuY3Rpb24obnVtYmVyLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHRoaXMucHJlcGFyZU9wdGlvbnMoXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICwgdGhpcy5sb29rdXAoXCJudW1iZXIuY3VycmVuY3kuZm9ybWF0XCIpXG4gICAgICAsIHRoaXMubG9va3VwKFwibnVtYmVyLmZvcm1hdFwiKVxuICAgICAgLCBDVVJSRU5DWV9GT1JNQVRcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMudG9OdW1iZXIobnVtYmVyLCBvcHRpb25zKTtcbiAgfTtcblxuICAvLyBMb2NhbGl6ZSBzZXZlcmFsIHZhbHVlcy5cbiAgLy8gWW91IGNhbiBwcm92aWRlIHRoZSBmb2xsb3dpbmcgc2NvcGVzOiBgY3VycmVuY3lgLCBgbnVtYmVyYCwgb3IgYHBlcmNlbnRhZ2VgLlxuICAvLyBJZiB5b3UgcHJvdmlkZSBhIHNjb3BlIHRoYXQgbWF0Y2hlcyB0aGUgYC9eKGRhdGV8dGltZSkvYCByZWd1bGFyIGV4cHJlc3Npb25cbiAgLy8gdGhlbiB0aGUgYHZhbHVlYCB3aWxsIGJlIGNvbnZlcnRlZCBieSB1c2luZyB0aGUgYEkxOG4udG9UaW1lYCBmdW5jdGlvbi5cbiAgLy9cbiAgLy8gSXQgd2lsbCBkZWZhdWx0IHRvIHRoZSB2YWx1ZSdzIGB0b1N0cmluZ2AgZnVuY3Rpb24uXG4gIC8vXG4gIEkxOG4ubG9jYWxpemUgPSBmdW5jdGlvbihzY29wZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuXG4gICAgc3dpdGNoIChzY29wZSkge1xuICAgICAgY2FzZSBcImN1cnJlbmN5XCI6XG4gICAgICAgIHJldHVybiB0aGlzLnRvQ3VycmVuY3kodmFsdWUpO1xuICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBzY29wZSA9IHRoaXMubG9va3VwKFwibnVtYmVyLmZvcm1hdFwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9OdW1iZXIodmFsdWUsIHNjb3BlKTtcbiAgICAgIGNhc2UgXCJwZXJjZW50YWdlXCI6XG4gICAgICAgIHJldHVybiB0aGlzLnRvUGVyY2VudGFnZSh2YWx1ZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgbG9jYWxpemVkVmFsdWU7XG5cbiAgICAgICAgaWYgKHNjb3BlLm1hdGNoKC9eKGRhdGV8dGltZSkvKSkge1xuICAgICAgICAgIGxvY2FsaXplZFZhbHVlID0gdGhpcy50b1RpbWUoc2NvcGUsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2NhbGl6ZWRWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnBvbGF0ZShsb2NhbGl6ZWRWYWx1ZSwgb3B0aW9ucyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFBhcnNlIGEgZ2l2ZW4gYGRhdGVgIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBEYXRlIG9iamVjdC5cbiAgLy8gVGhpcyBmdW5jdGlvbiBpcyB0aW1lIHpvbmUgYXdhcmUuXG4gIC8vXG4gIC8vIFRoZSBmb2xsb3dpbmcgc3RyaW5nIGZvcm1hdHMgYXJlIHJlY29nbml6ZWQ6XG4gIC8vXG4gIC8vICAgIHl5eXktbW0tZGRcbiAgLy8gICAgeXl5eS1tbS1kZFsgVF1oaDptbTo6c3NcbiAgLy8gICAgeXl5eS1tbS1kZFsgVF1oaDptbTo6c3NcbiAgLy8gICAgeXl5eS1tbS1kZFsgVF1oaDptbTo6c3NaXG4gIC8vICAgIHl5eXktbW0tZGRbIFRdaGg6bW06OnNzKzAwMDBcbiAgLy8gICAgeXl5eS1tbS1kZFsgVF1oaDptbTo6c3MrMDA6MDBcbiAgLy8gICAgeXl5eS1tbS1kZFsgVF1oaDptbTo6c3MuMTIzWlxuICAvL1xuICBJMThuLnBhcnNlRGF0ZSA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICB2YXIgbWF0Y2hlcywgY29udmVydGVkRGF0ZSwgZnJhY3Rpb247XG4gICAgLy8gd2UgaGF2ZSBhIGRhdGUsIHNvIGp1c3QgcmV0dXJuIGl0LlxuICAgIGlmICh0eXBlb2YoZGF0ZSkgPT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfTtcblxuICAgIG1hdGNoZXMgPSBkYXRlLnRvU3RyaW5nKCkubWF0Y2goLyhcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pKD86WyBUXShcXGR7Mn0pOihcXGR7Mn0pOihcXGR7Mn0pKFtcXC4sXVxcZHsxLDN9KT8pPyhafFxcKzAwOj8wMCk/Lyk7XG5cbiAgICBpZiAobWF0Y2hlcykge1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gNjsgaSsrKSB7XG4gICAgICAgIG1hdGNoZXNbaV0gPSBwYXJzZUludChtYXRjaGVzW2ldLCAxMCkgfHwgMDtcbiAgICAgIH1cblxuICAgICAgLy8gbW9udGggc3RhcnRzIG9uIDBcbiAgICAgIG1hdGNoZXNbMl0gLT0gMTtcblxuICAgICAgZnJhY3Rpb24gPSBtYXRjaGVzWzddID8gMTAwMCAqIChcIjBcIiArIG1hdGNoZXNbN10pIDogbnVsbDtcblxuICAgICAgaWYgKG1hdGNoZXNbOF0pIHtcbiAgICAgICAgY29udmVydGVkRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKG1hdGNoZXNbMV0sIG1hdGNoZXNbMl0sIG1hdGNoZXNbM10sIG1hdGNoZXNbNF0sIG1hdGNoZXNbNV0sIG1hdGNoZXNbNl0sIGZyYWN0aW9uKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb252ZXJ0ZWREYXRlID0gbmV3IERhdGUobWF0Y2hlc1sxXSwgbWF0Y2hlc1syXSwgbWF0Y2hlc1szXSwgbWF0Y2hlc1s0XSwgbWF0Y2hlc1s1XSwgbWF0Y2hlc1s2XSwgZnJhY3Rpb24pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mKGRhdGUpID09IFwibnVtYmVyXCIpIHtcbiAgICAgIC8vIFVOSVggdGltZXN0YW1wXG4gICAgICBjb252ZXJ0ZWREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnZlcnRlZERhdGUuc2V0VGltZShkYXRlKTtcbiAgICB9IGVsc2UgaWYgKGRhdGUubWF0Y2goLyhbQS1aXVthLXpdezJ9KSAoW0EtWl1bYS16XXsyfSkgKFxcZCspIChcXGQrOlxcZCs6XFxkKykgKFsrLV1cXGQrKSAoXFxkKykvKSkge1xuICAgICAgLy8gVGhpcyBmb3JtYXQgYFdlZCBKdWwgMjAgMTM6MDM6MzkgKzAwMDAgMjAxMWAgaXMgcGFyc2VkIGJ5XG4gICAgICAvLyB3ZWJraXQvZmlyZWZveCwgYnV0IG5vdCBieSBJRSwgc28gd2UgbXVzdCBwYXJzZSBpdCBtYW51YWxseS5cbiAgICAgIGNvbnZlcnRlZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29udmVydGVkRGF0ZS5zZXRUaW1lKERhdGUucGFyc2UoW1xuICAgICAgICBSZWdFeHAuJDEsIFJlZ0V4cC4kMiwgUmVnRXhwLiQzLCBSZWdFeHAuJDYsIFJlZ0V4cC4kNCwgUmVnRXhwLiQ1XG4gICAgICBdLmpvaW4oXCIgXCIpKSk7XG4gICAgfSBlbHNlIGlmIChkYXRlLm1hdGNoKC9cXGQrIFxcZCs6XFxkKzpcXGQrIFsrLV1cXGQrIFxcZCsvKSkge1xuICAgICAgLy8gYSB2YWxpZCBqYXZhc2NyaXB0IGZvcm1hdCB3aXRoIHRpbWV6b25lIGluZm9cbiAgICAgIGNvbnZlcnRlZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29udmVydGVkRGF0ZS5zZXRUaW1lKERhdGUucGFyc2UoZGF0ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhbiBhcmJpdHJhcnkgamF2YXNjcmlwdCBzdHJpbmdcbiAgICAgIGNvbnZlcnRlZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29udmVydGVkRGF0ZS5zZXRUaW1lKERhdGUucGFyc2UoZGF0ZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBjb252ZXJ0ZWREYXRlO1xuICB9O1xuXG4gIC8vIEZvcm1hdHMgdGltZSBhY2NvcmRpbmcgdG8gdGhlIGRpcmVjdGl2ZXMgaW4gdGhlIGdpdmVuIGZvcm1hdCBzdHJpbmcuXG4gIC8vIFRoZSBkaXJlY3RpdmVzIGJlZ2lucyB3aXRoIGEgcGVyY2VudCAoJSkgY2hhcmFjdGVyLiBBbnkgdGV4dCBub3QgbGlzdGVkIGFzIGFcbiAgLy8gZGlyZWN0aXZlIHdpbGwgYmUgcGFzc2VkIHRocm91Z2ggdG8gdGhlIG91dHB1dCBzdHJpbmcuXG4gIC8vXG4gIC8vIFRoZSBhY2NlcHRlZCBmb3JtYXRzIGFyZTpcbiAgLy9cbiAgLy8gICAgICVhICAtIFRoZSBhYmJyZXZpYXRlZCB3ZWVrZGF5IG5hbWUgKFN1bilcbiAgLy8gICAgICVBICAtIFRoZSBmdWxsIHdlZWtkYXkgbmFtZSAoU3VuZGF5KVxuICAvLyAgICAgJWIgIC0gVGhlIGFiYnJldmlhdGVkIG1vbnRoIG5hbWUgKEphbilcbiAgLy8gICAgICVCICAtIFRoZSBmdWxsIG1vbnRoIG5hbWUgKEphbnVhcnkpXG4gIC8vICAgICAlYyAgLSBUaGUgcHJlZmVycmVkIGxvY2FsIGRhdGUgYW5kIHRpbWUgcmVwcmVzZW50YXRpb25cbiAgLy8gICAgICVkICAtIERheSBvZiB0aGUgbW9udGggKDAxLi4zMSlcbiAgLy8gICAgICUtZCAtIERheSBvZiB0aGUgbW9udGggKDEuLjMxKVxuICAvLyAgICAgJUggIC0gSG91ciBvZiB0aGUgZGF5LCAyNC1ob3VyIGNsb2NrICgwMC4uMjMpXG4gIC8vICAgICAlLUggLSBIb3VyIG9mIHRoZSBkYXksIDI0LWhvdXIgY2xvY2sgKDAuLjIzKVxuICAvLyAgICAgJUkgIC0gSG91ciBvZiB0aGUgZGF5LCAxMi1ob3VyIGNsb2NrICgwMS4uMTIpXG4gIC8vICAgICAlLUkgLSBIb3VyIG9mIHRoZSBkYXksIDEyLWhvdXIgY2xvY2sgKDEuLjEyKVxuICAvLyAgICAgJW0gIC0gTW9udGggb2YgdGhlIHllYXIgKDAxLi4xMilcbiAgLy8gICAgICUtbSAtIE1vbnRoIG9mIHRoZSB5ZWFyICgxLi4xMilcbiAgLy8gICAgICVNICAtIE1pbnV0ZSBvZiB0aGUgaG91ciAoMDAuLjU5KVxuICAvLyAgICAgJS1NIC0gTWludXRlIG9mIHRoZSBob3VyICgwLi41OSlcbiAgLy8gICAgICVwICAtIE1lcmlkaWFuIGluZGljYXRvciAoQU0gIG9yICBQTSlcbiAgLy8gICAgICVTICAtIFNlY29uZCBvZiB0aGUgbWludXRlICgwMC4uNjApXG4gIC8vICAgICAlLVMgLSBTZWNvbmQgb2YgdGhlIG1pbnV0ZSAoMC4uNjApXG4gIC8vICAgICAldyAgLSBEYXkgb2YgdGhlIHdlZWsgKFN1bmRheSBpcyAwLCAwLi42KVxuICAvLyAgICAgJXkgIC0gWWVhciB3aXRob3V0IGEgY2VudHVyeSAoMDAuLjk5KVxuICAvLyAgICAgJS15IC0gWWVhciB3aXRob3V0IGEgY2VudHVyeSAoMC4uOTkpXG4gIC8vICAgICAlWSAgLSBZZWFyIHdpdGggY2VudHVyeVxuICAvLyAgICAgJXogIC0gVGltZXpvbmUgb2Zmc2V0ICgrMDU0NSlcbiAgLy9cbiAgSTE4bi5zdHJmdGltZSA9IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5sb29rdXAoXCJkYXRlXCIpXG4gICAgICAsIG1lcmlkaWFuT3B0aW9ucyA9IEkxOG4ubWVyaWRpYW4oKVxuICAgIDtcblxuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIG9wdGlvbnMgPSB0aGlzLnByZXBhcmVPcHRpb25zKG9wdGlvbnMsIERBVEUpO1xuXG4gICAgaWYgKGlzTmFOKGRhdGUuZ2V0VGltZSgpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJMThuLnN0cmZ0aW1lKCkgcmVxdWlyZXMgYSB2YWxpZCBkYXRlIG9iamVjdCwgYnV0IHJlY2VpdmVkIGFuIGludmFsaWQgZGF0ZS4nKTtcbiAgICB9XG5cbiAgICB2YXIgd2Vla0RheSA9IGRhdGUuZ2V0RGF5KClcbiAgICAgICwgZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICAgICwgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgLCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgICAgICwgaG91ciA9IGRhdGUuZ2V0SG91cnMoKVxuICAgICAgLCBob3VyMTIgPSBob3VyXG4gICAgICAsIG1lcmlkaWFuID0gaG91ciA+IDExID8gMSA6IDBcbiAgICAgICwgc2VjcyA9IGRhdGUuZ2V0U2Vjb25kcygpXG4gICAgICAsIG1pbnMgPSBkYXRlLmdldE1pbnV0ZXMoKVxuICAgICAgLCBvZmZzZXQgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgICAgICwgYWJzT2Zmc2V0SG91cnMgPSBNYXRoLmZsb29yKE1hdGguYWJzKG9mZnNldCAvIDYwKSlcbiAgICAgICwgYWJzT2Zmc2V0TWludXRlcyA9IE1hdGguYWJzKG9mZnNldCkgLSAoYWJzT2Zmc2V0SG91cnMgKiA2MClcbiAgICAgICwgdGltZXpvbmVvZmZzZXQgPSAob2Zmc2V0ID4gMCA/IFwiLVwiIDogXCIrXCIpICtcbiAgICAgICAgICAoYWJzT2Zmc2V0SG91cnMudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gXCIwXCIgKyBhYnNPZmZzZXRIb3VycyA6IGFic09mZnNldEhvdXJzKSArXG4gICAgICAgICAgKGFic09mZnNldE1pbnV0ZXMudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gXCIwXCIgKyBhYnNPZmZzZXRNaW51dGVzIDogYWJzT2Zmc2V0TWludXRlcylcbiAgICA7XG5cbiAgICBpZiAoaG91cjEyID4gMTIpIHtcbiAgICAgIGhvdXIxMiA9IGhvdXIxMiAtIDEyO1xuICAgIH0gZWxzZSBpZiAoaG91cjEyID09PSAwKSB7XG4gICAgICBob3VyMTIgPSAxMjtcbiAgICB9XG5cbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShcIiVhXCIsIG9wdGlvbnMuYWJicl9kYXlfbmFtZXNbd2Vla0RheV0pO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFwiJUFcIiwgb3B0aW9ucy5kYXlfbmFtZXNbd2Vla0RheV0pO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFwiJWJcIiwgb3B0aW9ucy5hYmJyX21vbnRoX25hbWVzW21vbnRoXSk7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXCIlQlwiLCBvcHRpb25zLm1vbnRoX25hbWVzW21vbnRoXSk7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXCIlZFwiLCBwYWRkaW5nKGRheSkpO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFwiJWVcIiwgZGF5KTtcbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShcIiUtZFwiLCBkYXkpO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFwiJUhcIiwgcGFkZGluZyhob3VyKSk7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXCIlLUhcIiwgaG91cik7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXCIlSVwiLCBwYWRkaW5nKGhvdXIxMikpO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFwiJS1JXCIsIGhvdXIxMik7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXCIlbVwiLCBwYWRkaW5nKG1vbnRoKSk7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXCIlLW1cIiwgbW9udGgpO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFwiJU1cIiwgcGFkZGluZyhtaW5zKSk7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXCIlLU1cIiwgbWlucyk7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXCIlcFwiLCBtZXJpZGlhbk9wdGlvbnNbbWVyaWRpYW5dKTtcbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShcIiVTXCIsIHBhZGRpbmcoc2VjcykpO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFwiJS1TXCIsIHNlY3MpO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFwiJXdcIiwgd2Vla0RheSk7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXCIleVwiLCBwYWRkaW5nKHllYXIpKTtcbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShcIiUteVwiLCBwYWRkaW5nKHllYXIpLnJlcGxhY2UoL14wKy8sIFwiXCIpKTtcbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShcIiVZXCIsIHllYXIpO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFwiJXpcIiwgdGltZXpvbmVvZmZzZXQpO1xuXG4gICAgcmV0dXJuIGZvcm1hdDtcbiAgfTtcblxuICAvLyBDb252ZXJ0IHRoZSBnaXZlbiBkYXRlU3RyaW5nIGludG8gYSBmb3JtYXR0ZWQgZGF0ZS5cbiAgSTE4bi50b1RpbWUgPSBmdW5jdGlvbihzY29wZSwgZGF0ZVN0cmluZykge1xuICAgIHZhciBkYXRlID0gdGhpcy5wYXJzZURhdGUoZGF0ZVN0cmluZylcbiAgICAgICwgZm9ybWF0ID0gdGhpcy5sb29rdXAoc2NvcGUpXG4gICAgO1xuXG4gICAgaWYgKGRhdGUudG9TdHJpbmcoKS5tYXRjaCgvaW52YWxpZC9pKSkge1xuICAgICAgcmV0dXJuIGRhdGUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvcm1hdCkge1xuICAgICAgcmV0dXJuIGRhdGUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJmdGltZShkYXRlLCBmb3JtYXQpO1xuICB9O1xuXG4gIC8vIENvbnZlcnQgYSBudW1iZXIgaW50byBhIGZvcm1hdHRlZCBwZXJjZW50YWdlIHZhbHVlLlxuICBJMThuLnRvUGVyY2VudGFnZSA9IGZ1bmN0aW9uKG51bWJlciwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB0aGlzLnByZXBhcmVPcHRpb25zKFxuICAgICAgICBvcHRpb25zXG4gICAgICAsIHRoaXMubG9va3VwKFwibnVtYmVyLnBlcmNlbnRhZ2UuZm9ybWF0XCIpXG4gICAgICAsIHRoaXMubG9va3VwKFwibnVtYmVyLmZvcm1hdFwiKVxuICAgICAgLCBQRVJDRU5UQUdFX0ZPUk1BVFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy50b051bWJlcihudW1iZXIsIG9wdGlvbnMpO1xuICB9O1xuXG4gIC8vIENvbnZlcnQgYSBudW1iZXIgaW50byBhIHJlYWRhYmxlIHNpemUgcmVwcmVzZW50YXRpb24uXG4gIEkxOG4udG9IdW1hblNpemUgPSBmdW5jdGlvbihudW1iZXIsIG9wdGlvbnMpIHtcbiAgICB2YXIga2IgPSAxMDI0XG4gICAgICAsIHNpemUgPSBudW1iZXJcbiAgICAgICwgaXRlcmF0aW9ucyA9IDBcbiAgICAgICwgdW5pdFxuICAgICAgLCBwcmVjaXNpb25cbiAgICA7XG5cbiAgICB3aGlsZSAoc2l6ZSA+PSBrYiAmJiBpdGVyYXRpb25zIDwgNCkge1xuICAgICAgc2l6ZSA9IHNpemUgLyBrYjtcbiAgICAgIGl0ZXJhdGlvbnMgKz0gMTtcbiAgICB9XG5cbiAgICBpZiAoaXRlcmF0aW9ucyA9PT0gMCkge1xuICAgICAgdW5pdCA9IHRoaXMudChcIm51bWJlci5odW1hbi5zdG9yYWdlX3VuaXRzLnVuaXRzLmJ5dGVcIiwge2NvdW50OiBzaXplfSk7XG4gICAgICBwcmVjaXNpb24gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB1bml0ID0gdGhpcy50KFwibnVtYmVyLmh1bWFuLnN0b3JhZ2VfdW5pdHMudW5pdHMuXCIgKyBTSVpFX1VOSVRTW2l0ZXJhdGlvbnNdKTtcbiAgICAgIHByZWNpc2lvbiA9IChzaXplIC0gTWF0aC5mbG9vcihzaXplKSA9PT0gMCkgPyAwIDogMTtcbiAgICB9XG5cbiAgICBvcHRpb25zID0gdGhpcy5wcmVwYXJlT3B0aW9ucyhcbiAgICAgICAgb3B0aW9uc1xuICAgICAgLCB7dW5pdDogdW5pdCwgcHJlY2lzaW9uOiBwcmVjaXNpb24sIGZvcm1hdDogXCIlbiV1XCIsIGRlbGltaXRlcjogXCJcIn1cbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMudG9OdW1iZXIoc2l6ZSwgb3B0aW9ucyk7XG4gIH07XG5cbiAgSTE4bi5nZXRGdWxsU2NvcGUgPSBmdW5jdGlvbihzY29wZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgICAvLyBEZWFsIHdpdGggdGhlIHNjb3BlIGFzIGFuIGFycmF5LlxuICAgIGlmIChpc0FycmF5KHNjb3BlKSkge1xuICAgICAgc2NvcGUgPSBzY29wZS5qb2luKHRoaXMuZGVmYXVsdFNlcGFyYXRvcik7XG4gICAgfVxuXG4gICAgLy8gRGVhbCB3aXRoIHRoZSBzY29wZSBvcHRpb24gcHJvdmlkZWQgdGhyb3VnaCB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICAgIC8vXG4gICAgLy8gICAgSTE4bi50KCdoZWxsbycsIHtzY29wZTogJ2dyZWV0aW5ncyd9KTtcbiAgICAvL1xuICAgIGlmIChvcHRpb25zLnNjb3BlKSB7XG4gICAgICBzY29wZSA9IFtvcHRpb25zLnNjb3BlLCBzY29wZV0uam9pbih0aGlzLmRlZmF1bHRTZXBhcmF0b3IpO1xuICAgIH1cblxuICAgIHJldHVybiBzY29wZTtcbiAgfTtcbiAgLyoqXG4gICAqIE1lcmdlIG9iajEgd2l0aCBvYmoyIChzaGFsbG93IG1lcmdlKSwgd2l0aG91dCBtb2RpZnlpbmcgaW5wdXRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmoyXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IE1lcmdlZCB2YWx1ZXMgb2Ygb2JqMSBhbmQgb2JqMlxuICAgKlxuICAgKiBJbiBvcmRlciB0byBzdXBwb3J0IEVTMywgYE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbGAgaXMgdXNlZFxuICAgKiBJZGVhIGlzIGZyb206XG4gICAqIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzgxNTc3MDAvb2JqZWN0LWhhcy1uby1oYXNvd25wcm9wZXJ0eS1tZXRob2QtaS1lLWl0cy11bmRlZmluZWQtaWU4XG4gICAqL1xuICBJMThuLmV4dGVuZCA9IGZ1bmN0aW9uICggb2JqMSwgb2JqMiApIHtcbiAgICBpZiAodHlwZW9mKG9iajEpID09PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZihvYmoyKSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICByZXR1cm4gbWVyZ2Uob2JqMSwgb2JqMik7XG4gIH07XG5cbiAgLy8gU2V0IGFsaWFzZXMsIHNvIHdlIGNhbiBzYXZlIHNvbWUgdHlwaW5nLlxuICBJMThuLnQgPSBJMThuLnRyYW5zbGF0ZTtcbiAgSTE4bi5sID0gSTE4bi5sb2NhbGl6ZTtcbiAgSTE4bi5wID0gSTE4bi5wbHVyYWxpemU7XG5cbiAgcmV0dXJuIEkxOG47XG59KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pMThuLWpzL2FwcC9hc3NldHMvamF2YXNjcmlwdHMvaTE4bi5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9