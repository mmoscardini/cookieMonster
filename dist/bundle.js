(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["5A-AB-Cookie"] = factory();
	else
		root["5A-AB-Cookie"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst requestHandler = (request) => {\n  const { headers } = request;\n  const allCookies = headers.Cookie ? headers.Cookie.replace(/\\s/g, '') : '';\n\n  const regex = new RegExp('^X-AB-Test=', 'gm');\n\n  const findAbCookie = cookies => cookies.split(';').filter(cookie => regex.test(cookie));\n  const removeCookieKey = cookie => cookie.replace(regex, '').trim();\n\n  const fromStringToObject = (experimentAndVariant) => {\n    const splited = experimentAndVariant.split(':');\n    return {\n      experiment: splited[0],\n      variant: splited[1],\n    };\n  };\n\n  return {\n    getCookieString: () => {\n      if (allCookies) {\n        const ABCookieWithKey = findAbCookie(allCookies);\n        if (ABCookieWithKey && ABCookieWithKey.length) {\n          return removeCookieKey(ABCookieWithKey[0]);\n        }\n      }\n      return '';\n    },\n    getExperimentAndVariantsMap: (cookie) => {\n      const cookieString = cookie || requestHandler(request).getCookieString();\n      return cookieString.split(',')\n        .map((experimentAndVariant => fromStringToObject(experimentAndVariant)))\n        .reduce(\n          (accumulator, { experiment, variant }) =>\n            accumulator.set(experiment, variant),\n          new Map() // eslint-disable-line comma-dangle\n        );\n    },\n    setCookieInHeader: (newCookie) => {\n      if (newCookie === undefined) return null;\n      Object.assign(headers, {\n        'set-cookie': [{\n          key: 'Set-Cookie',\n          value: `X-AB-Test=${newCookie}`,\n        }],\n      });\n      return headers;\n    },\n  };\n};\n\nmodule.exports.default = requestHandler;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly81QS1BQi1Db29raWUvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHJlcXVlc3RIYW5kbGVyID0gKHJlcXVlc3QpID0+IHtcbiAgY29uc3QgeyBoZWFkZXJzIH0gPSByZXF1ZXN0O1xuICBjb25zdCBhbGxDb29raWVzID0gaGVhZGVycy5Db29raWUgPyBoZWFkZXJzLkNvb2tpZS5yZXBsYWNlKC9cXHMvZywgJycpIDogJyc7XG5cbiAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCdeWC1BQi1UZXN0PScsICdnbScpO1xuXG4gIGNvbnN0IGZpbmRBYkNvb2tpZSA9IGNvb2tpZXMgPT4gY29va2llcy5zcGxpdCgnOycpLmZpbHRlcihjb29raWUgPT4gcmVnZXgudGVzdChjb29raWUpKTtcbiAgY29uc3QgcmVtb3ZlQ29va2llS2V5ID0gY29va2llID0+IGNvb2tpZS5yZXBsYWNlKHJlZ2V4LCAnJykudHJpbSgpO1xuXG4gIGNvbnN0IGZyb21TdHJpbmdUb09iamVjdCA9IChleHBlcmltZW50QW5kVmFyaWFudCkgPT4ge1xuICAgIGNvbnN0IHNwbGl0ZWQgPSBleHBlcmltZW50QW5kVmFyaWFudC5zcGxpdCgnOicpO1xuICAgIHJldHVybiB7XG4gICAgICBleHBlcmltZW50OiBzcGxpdGVkWzBdLFxuICAgICAgdmFyaWFudDogc3BsaXRlZFsxXSxcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0Q29va2llU3RyaW5nOiAoKSA9PiB7XG4gICAgICBpZiAoYWxsQ29va2llcykge1xuICAgICAgICBjb25zdCBBQkNvb2tpZVdpdGhLZXkgPSBmaW5kQWJDb29raWUoYWxsQ29va2llcyk7XG4gICAgICAgIGlmIChBQkNvb2tpZVdpdGhLZXkgJiYgQUJDb29raWVXaXRoS2V5Lmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiByZW1vdmVDb29raWVLZXkoQUJDb29raWVXaXRoS2V5WzBdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH0sXG4gICAgZ2V0RXhwZXJpbWVudEFuZFZhcmlhbnRzTWFwOiAoY29va2llKSA9PiB7XG4gICAgICBjb25zdCBjb29raWVTdHJpbmcgPSBjb29raWUgfHwgcmVxdWVzdEhhbmRsZXIocmVxdWVzdCkuZ2V0Q29va2llU3RyaW5nKCk7XG4gICAgICByZXR1cm4gY29va2llU3RyaW5nLnNwbGl0KCcsJylcbiAgICAgICAgLm1hcCgoZXhwZXJpbWVudEFuZFZhcmlhbnQgPT4gZnJvbVN0cmluZ1RvT2JqZWN0KGV4cGVyaW1lbnRBbmRWYXJpYW50KSkpXG4gICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgKGFjY3VtdWxhdG9yLCB7IGV4cGVyaW1lbnQsIHZhcmlhbnQgfSkgPT5cbiAgICAgICAgICAgIGFjY3VtdWxhdG9yLnNldChleHBlcmltZW50LCB2YXJpYW50KSxcbiAgICAgICAgICBuZXcgTWFwKCkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21tYS1kYW5nbGVcbiAgICAgICAgKTtcbiAgICB9LFxuICAgIHNldENvb2tpZUluSGVhZGVyOiAobmV3Q29va2llKSA9PiB7XG4gICAgICBpZiAobmV3Q29va2llID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICAgICAgT2JqZWN0LmFzc2lnbihoZWFkZXJzLCB7XG4gICAgICAgICdzZXQtY29va2llJzogW3tcbiAgICAgICAgICBrZXk6ICdTZXQtQ29va2llJyxcbiAgICAgICAgICB2YWx1ZTogYFgtQUItVGVzdD0ke25ld0Nvb2tpZX1gLFxuICAgICAgICB9XSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfSxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSByZXF1ZXN0SGFuZGxlcjtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });
});