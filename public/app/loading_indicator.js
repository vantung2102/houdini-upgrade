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
/***/ (function(module, exports) {

// License: LGPL-3.0-or-later
var PageProgressBar = /** @class */ (function () {
    function PageProgressBar() {
        this.template = document.createElement('template');
        this.template.innerHTML = "<div class='progressBar--app' id=\"pageProgressBar\"><div class='progressBar-fill--striped'></div></div>";
    }
    PageProgressBar.prototype.beginPageLoad = function () {
        var element = this.getElem();
        if (!element) {
            var firstChild = document.body.firstChild;
            var clone = document.importNode(this.template.content, true);
            if (firstChild) {
                document.body.insertBefore(clone, firstChild);
            }
            else {
                document.body.appendChild(clone);
            }
        }
        return;
    };
    PageProgressBar.prototype.finishPageLoad = function () {
        var element = this.getElem();
        if (element) {
            element.remove();
        }
    };
    PageProgressBar.prototype.getElem = function () {
        return document.getElementById("pageProgressBar");
    };
    return PageProgressBar;
}());
var pp = new PageProgressBar();
window.pageProgress = pp;
var ua = window.navigator.userAgent;
if (ua.indexOf('MSIE ') <= 0 && ua.indexOf('Trident/') <= 0) {
    pp.beginPageLoad();
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTY3ZWVjYzYwOGE5N2E1NmJjYjAiLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdHMvYXBwL2xvYWRpbmdfaW5kaWNhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSw2QkFBNkI7QUFDN0I7SUFHRTtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsMEdBQXdHO0lBQ3BJLENBQUM7SUFFRCx1Q0FBYSxHQUFiO1FBQ0UsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUM1QixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVO1lBQ3pDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDO1lBQzVELElBQUksVUFBVSxFQUFFO2dCQUVkLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUM7YUFDOUM7aUJBQ0k7Z0JBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO2FBQ2pDO1NBQ0Y7UUFFRCxPQUFNO0lBQ1IsQ0FBQztJQUVELHdDQUFjLEdBQWQ7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQzVCLElBQUksT0FBTyxFQUFFO1lBQ1gsT0FBTyxDQUFDLE1BQU0sRUFBRTtTQUNqQjtJQUNILENBQUM7SUFFTyxpQ0FBTyxHQUFmO1FBQ0UsT0FBTyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDO0lBQ25ELENBQUM7SUFDSCxzQkFBQztBQUFELENBQUM7QUFFRCxJQUFNLEVBQUUsR0FBb0IsSUFBSSxlQUFlLEVBQUUsQ0FBQztBQUVqRCxNQUFjLENBQUMsWUFBWSxHQUFHLEVBQUU7QUFFakMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTO0FBQ25DLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDM0QsRUFBRSxDQUFDLGFBQWEsRUFBRTtDQUNuQiIsImZpbGUiOiJsb2FkaW5nX2luZGljYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU2N2VlY2M2MDhhOTdhNTZiY2IwIiwiLy8gTGljZW5zZTogTEdQTC0zLjAtb3ItbGF0ZXJcbmNsYXNzIFBhZ2VQcm9ncmVzc0JhciB7XG4gIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJylcbiAgICB0aGlzLnRlbXBsYXRlLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPSdwcm9ncmVzc0Jhci0tYXBwJyBpZD1cInBhZ2VQcm9ncmVzc0JhclwiPjxkaXYgY2xhc3M9J3Byb2dyZXNzQmFyLWZpbGwtLXN0cmlwZWQnPjwvZGl2PjwvZGl2PmBcbiAgfVxuXG4gIGJlZ2luUGFnZUxvYWQoKTogdm9pZCB7XG4gICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW0oKVxuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgbGV0IGZpcnN0Q2hpbGQgPSBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGRcbiAgICAgIGxldCBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy50ZW1wbGF0ZS5jb250ZW50LCB0cnVlKVxuICAgICAgaWYgKGZpcnN0Q2hpbGQpIHtcblxuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShjbG9uZSwgZmlyc3RDaGlsZClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb25lKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVyblxuICB9XG5cbiAgZmluaXNoUGFnZUxvYWQoKSB7XG4gICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW0oKVxuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LnJlbW92ZSgpXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRFbGVtKCk6IEVsZW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhZ2VQcm9ncmVzc0JhclwiKVxuICB9XG59XG5cbmNvbnN0IHBwOiBQYWdlUHJvZ3Jlc3NCYXIgPSBuZXcgUGFnZVByb2dyZXNzQmFyKCk7XG5cbih3aW5kb3cgYXMgYW55KS5wYWdlUHJvZ3Jlc3MgPSBwcFxuXG5sZXQgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudFxuaWYgKHVhLmluZGV4T2YoJ01TSUUgJykgPD0gMCAmJiB1YS5pbmRleE9mKCdUcmlkZW50LycpIDw9IDApIHtcbiAgcHAuYmVnaW5QYWdlTG9hZCgpXG59XG5cblxuXG5cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2phdmFzY3JpcHRzL2FwcC9sb2FkaW5nX2luZGljYXRvci50cyJdLCJzb3VyY2VSb290IjoiIn0=