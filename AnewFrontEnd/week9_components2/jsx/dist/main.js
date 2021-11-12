/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./framework.js":
/*!**********************!*\
  !*** ./framework.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function createElement(type, attributes) {
  var element;

  if (typeof type === "string") {
    element = new ElementWrapper(type);
  } else {
    element = new type();
  }

  for (var name in attributes) {
    element.setAttribute(name, attributes[name]);
  }

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  for (var _i = 0, _children = children; _i < _children.length; _i++) {
    var child = _children[_i];

    if (typeof child === "string") {
      child = new TextWrapper(child);
    }

    element.appendChild(child);
  }

  return element;
}
var Component = /*#__PURE__*/function () {
  function Component(type) {
    _classCallCheck(this, Component);
  }

  _createClass(Component, [{
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this.root.setAttribute(name, value);
    }
  }, {
    key: "appendChild",
    value: function appendChild(child) {
      child.appendChild(this.root);
    }
  }, {
    key: "mountTo",
    value: function mountTo(parent) {
      parent.appendChild(this.root);
    }
  }]);

  return Component;
}();

var ElementWrapper = /*#__PURE__*/function (_Component) {
  _inherits(ElementWrapper, _Component);

  var _super = _createSuper(ElementWrapper);

  function ElementWrapper(type) {
    var _this;

    _classCallCheck(this, ElementWrapper);

    _this.root = document.createElement(type);
    return _possibleConstructorReturn(_this);
  }

  return ElementWrapper;
}(Component);

var TextWrapper = /*#__PURE__*/function (_Component2) {
  _inherits(TextWrapper, _Component2);

  var _super2 = _createSuper(TextWrapper);

  function TextWrapper(content) {
    var _this2;

    _classCallCheck(this, TextWrapper);

    _this2.root = document.createTextNode(content);
    return _possibleConstructorReturn(_this2);
  }

  return TextWrapper;
}(Component);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framework */ "./framework.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Carousel = /*#__PURE__*/function (_Component) {
  _inherits(Carousel, _Component);

  var _super = _createSuper(Carousel);

  function Carousel() {
    var _this;

    _classCallCheck(this, Carousel);

    _this = _super.call(this);
    _this.attributes = Object.create(null);
    return _this;
  }

  _createClass(Carousel, [{
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this.attributes[name] = value;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log(this.attributes.src);
      this.root = document.createElement("div");
      this.root.classList.add("carousel");

      var _iterator = _createForOfIteratorHelper(this.attributes.src),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var record = _step.value;
          var child = document.createElement("div");
          child.style.backgroundImage = "url('".concat(record, "')");
          child.src = record;
          this.root.appendChild(child);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var position = 0;
      this.root.addEventListener("mousedown", function (event) {
        // 坐标逻辑
        var children = _this2.root.children;
        var startX = event.clientX;

        var move = function move(event) {
          // 鼠标移动距离
          var x = event.clientX - startX;
          var current = position - (x - x % 500) / 500;

          for (var _i = 0, _arr = [-1, 0, 1]; _i < _arr.length; _i++) {
            var offset = _arr[_i];
            // 处理屏幕当前，前一个，后一个元素
            var pos = current + offset;
            pos = (pos + children.length) % children.length; // 处理pos 可能是负数的情况

            console.log("children.length:", children.length);
            console.log("move pos:", pos); // 这个地方取余还是有概率出现负数

            if (offset === 0) {
              position = pos;
            }

            children[pos].style.transition = "none";
            children[pos].style.transform = "translateX(".concat(-pos * 500 + offset * 500 + x % 500, "px)"); // 位置 * 图片长度 从第 position + 1 张开始
          }
        };

        var up = function up(event) {
          var x = event.clientX - startX;
          position = position - Math.round(x / 500);

          for (var _i2 = 0, _arr2 = [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]; _i2 < _arr2.length; _i2++) {
            var offset = _arr2[_i2];
            // 处理屏幕当前，前一个，后一个元素
            var pos = position + offset;
            pos = (pos + children.length) % children.length; // 处理pos 可能是负数的情况

            children[pos].style.transition = "none";
            children[pos].style.transform = "translateX(".concat(-pos * 500 + offset * 500, "px)"); // 位置 * 图片长度 从第 position + 1 张开始
          }

          document.removeEventListener("mousemove", move);
          document.removeEventListener("mouseup", up);
        };

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
      }); // 下方是自动播放逻辑

      /*
      let currentIndex = 0;
      setInterval(() => {
        // 下面这个逻辑其实就是把轮播标识抽象成为，当前、下一个，两个标识
        let children = this.root.children;
        let nextIndex = (currentIndex + 1) % children.length;
         let current = children[currentIndex];
        let next = children[nextIndex];
         next.style.transition = "none";
        next.style.transform = `translateX(-${100 - nextIndex * 100}%)`;
         setTimeout(() => {
          next.style.transition = "";
          current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
          next.style.transform = `translateX(${-nextIndex * 100}%)`;
          currentIndex = nextIndex;
        }, 16);
        // 此处使用 requestAnimationFrame 会有问题，需要使用两次
      }, 3000);
      */

      return this.root;
    }
  }, {
    key: "mountTo",
    value: function mountTo(parent) {
      parent.appendChild(this.render());
    }
  }]);

  return Carousel;
}(_framework__WEBPACK_IMPORTED_MODULE_0__.Component); // document.body.appendChild(a);


var d = ["https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg", "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg", "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg", "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"];
var a = (0,_framework__WEBPACK_IMPORTED_MODULE_0__.createElement)(Carousel, {
  src: d
});
a.mountTo(document.body);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDBGQUZNLEVBR04sMEZBSE0sRUFJTiwwRkFKTSxDQUFSO0FBTUEsSUFBSUMsQ0FBQyxHQUFHLDBEQUFDLFFBQUQ7QUFBVSxLQUFHLEVBQUVEO0FBQWYsRUFBUjtBQUNBQyxDQUFDLENBQUNDLE9BQUYsQ0FBVW5DLFFBQVEsQ0FBQ29DLElBQW5CLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc3gvLi9mcmFtZXdvcmsuanMiLCJ3ZWJwYWNrOi8vanN4L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pzeC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanN4L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanN4L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vanN4Ly4vbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xuICBsZXQgZWxlbWVudDtcblxuICBpZiAodHlwZW9mIHR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBlbGVtZW50ID0gbmV3IEVsZW1lbnRXcmFwcGVyKHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQgPSBuZXcgdHlwZSgpO1xuICB9XG4gIGZvciAobGV0IG5hbWUgaW4gYXR0cmlidXRlcykge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIGF0dHJpYnV0ZXNbbmFtZV0pO1xuICB9XG4gIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY2hpbGQgPSBuZXcgVGV4dFdyYXBwZXIoY2hpbGQpO1xuICAgIH1cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7fVxuXG4gIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMucm9vdC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9XG4gIGFwcGVuZENoaWxkKGNoaWxkKSB7XG4gICAgY2hpbGQuYXBwZW5kQ2hpbGQodGhpcy5yb290KTtcbiAgfVxuICBtb3VudFRvKHBhcmVudCkge1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLnJvb3QpO1xuICB9XG59XG5cbmNsYXNzIEVsZW1lbnRXcmFwcGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHRoaXMucm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIH1cbn1cbmNsYXNzIFRleHRXcmFwcGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoY29udGVudCkge1xuICAgIHRoaXMucm9vdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IENvbXBvbmVudCwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuL2ZyYW1ld29ya1wiO1xuXG5jbGFzcyBDYXJvdXNlbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxuICBzZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLmF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5hdHRyaWJ1dGVzLnNyYyk7XG4gICAgdGhpcy5yb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJvb3QuY2xhc3NMaXN0LmFkZChcImNhcm91c2VsXCIpO1xuICAgIGZvciAobGV0IHJlY29yZCBvZiB0aGlzLmF0dHJpYnV0ZXMuc3JjKSB7XG4gICAgICBsZXQgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY2hpbGQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtyZWNvcmR9JylgO1xuICAgICAgY2hpbGQuc3JjID0gcmVjb3JkO1xuICAgICAgdGhpcy5yb290LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICB9XG5cbiAgICBsZXQgcG9zaXRpb24gPSAwO1xuXG4gICAgdGhpcy5yb290LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZXZlbnQgPT4ge1xuICAgICAgLy8g5Z2Q5qCH6YC76L6RXG4gICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLnJvb3QuY2hpbGRyZW47XG4gICAgICBsZXQgc3RhcnRYID0gZXZlbnQuY2xpZW50WDtcblxuICAgICAgbGV0IG1vdmUgPSBldmVudCA9PiB7XG4gICAgICAgIC8vIOm8oOagh+enu+WKqOi3neemu1xuICAgICAgICBsZXQgeCA9IGV2ZW50LmNsaWVudFggLSBzdGFydFg7XG5cbiAgICAgICAgbGV0IGN1cnJlbnQgPSBwb3NpdGlvbiAtICh4IC0gKHggJSA1MDApKSAvIDUwMDtcblxuICAgICAgICBmb3IgKGxldCBvZmZzZXQgb2YgWy0xLCAwLCAxXSkge1xuICAgICAgICAgIC8vIOWkhOeQhuWxj+W5leW9k+WJje+8jOWJjeS4gOS4qu+8jOWQjuS4gOS4quWFg+e0oFxuICAgICAgICAgIGxldCBwb3MgPSBjdXJyZW50ICsgb2Zmc2V0O1xuICAgICAgICAgIHBvcyA9IChwb3MgKyBjaGlsZHJlbi5sZW5ndGgpICUgY2hpbGRyZW4ubGVuZ3RoOyAvLyDlpITnkIZwb3Mg5Y+v6IO95piv6LSf5pWw55qE5oOF5Ya1XG4gICAgICAgICAgY29uc29sZS5sb2coXCJjaGlsZHJlbi5sZW5ndGg6XCIsIGNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJtb3ZlIHBvczpcIiwgcG9zKTsgLy8g6L+Z5Liq5Zyw5pa55Y+W5L2Z6L+Y5piv5pyJ5qaC546H5Ye6546w6LSf5pWwXG4gICAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSBwb3M7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoaWxkcmVuW3Bvc10uc3R5bGUudHJhbnNpdGlvbiA9IFwibm9uZVwiO1xuICAgICAgICAgIGNoaWxkcmVuW3Bvc10uc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtcbiAgICAgICAgICAgIC1wb3MgKiA1MDAgKyBvZmZzZXQgKiA1MDAgKyAoeCAlIDUwMClcbiAgICAgICAgICB9cHgpYDsgLy8g5L2N572uICog5Zu+54mH6ZW/5bqmIOS7juesrCBwb3NpdGlvbiArIDEg5byg5byA5aeLXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGxldCB1cCA9IGV2ZW50ID0+IHtcbiAgICAgICAgbGV0IHggPSBldmVudC5jbGllbnRYIC0gc3RhcnRYO1xuXG4gICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gLSBNYXRoLnJvdW5kKHggLyA1MDApO1xuXG4gICAgICAgIGZvciAobGV0IG9mZnNldCBvZiBbXG4gICAgICAgICAgMCxcbiAgICAgICAgICAtTWF0aC5zaWduKE1hdGgucm91bmQoeCAvIDUwMCkgLSB4ICsgMjUwICogTWF0aC5zaWduKHgpKSxcbiAgICAgICAgXSkge1xuICAgICAgICAgIC8vIOWkhOeQhuWxj+W5leW9k+WJje+8jOWJjeS4gOS4qu+8jOWQjuS4gOS4quWFg+e0oFxuICAgICAgICAgIGxldCBwb3MgPSBwb3NpdGlvbiArIG9mZnNldDtcbiAgICAgICAgICBwb3MgPSAocG9zICsgY2hpbGRyZW4ubGVuZ3RoKSAlIGNoaWxkcmVuLmxlbmd0aDsgLy8g5aSE55CGcG9zIOWPr+iDveaYr+i0n+aVsOeahOaDheWGtVxuXG4gICAgICAgICAgY2hpbGRyZW5bcG9zXS5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG4gICAgICAgICAgY2hpbGRyZW5bcG9zXS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke1xuICAgICAgICAgICAgLXBvcyAqIDUwMCArIG9mZnNldCAqIDUwMFxuICAgICAgICAgIH1weClgOyAvLyDkvY3nva4gKiDlm77niYfplb/luqYg5LuO56ysIHBvc2l0aW9uICsgMSDlvKDlvIDlp4tcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdmUpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB1cCk7XG4gICAgICB9O1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdmUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdXApO1xuICAgIH0pO1xuXG4gICAgLy8g5LiL5pa55piv6Ieq5Yqo5pKt5pS+6YC76L6RXG4gICAgLypcbiAgICBsZXQgY3VycmVudEluZGV4ID0gMDtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAvLyDkuIvpnaLov5nkuKrpgLvovpHlhbblrp7lsLHmmK/miorova7mkq3moIfor4bmir3osaHmiJDkuLrvvIzlvZPliY3jgIHkuIvkuIDkuKrvvIzkuKTkuKrmoIfor4ZcbiAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMucm9vdC5jaGlsZHJlbjtcbiAgICAgIGxldCBuZXh0SW5kZXggPSAoY3VycmVudEluZGV4ICsgMSkgJSBjaGlsZHJlbi5sZW5ndGg7XG5cbiAgICAgIGxldCBjdXJyZW50ID0gY2hpbGRyZW5bY3VycmVudEluZGV4XTtcbiAgICAgIGxldCBuZXh0ID0gY2hpbGRyZW5bbmV4dEluZGV4XTtcblxuICAgICAgbmV4dC5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG4gICAgICBuZXh0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0kezEwMCAtIG5leHRJbmRleCAqIDEwMH0lKWA7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBuZXh0LnN0eWxlLnRyYW5zaXRpb24gPSBcIlwiO1xuICAgICAgICBjdXJyZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LTEwMCAtIGN1cnJlbnRJbmRleCAqIDEwMH0lKWA7XG4gICAgICAgIG5leHQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstbmV4dEluZGV4ICogMTAwfSUpYDtcbiAgICAgICAgY3VycmVudEluZGV4ID0gbmV4dEluZGV4O1xuICAgICAgfSwgMTYpO1xuICAgICAgLy8g5q2k5aSE5L2/55SoIHJlcXVlc3RBbmltYXRpb25GcmFtZSDkvJrmnInpl67popjvvIzpnIDopoHkvb/nlKjkuKTmrKFcbiAgICB9LCAzMDAwKTtcbiAgICAqL1xuICAgIHJldHVybiB0aGlzLnJvb3Q7XG4gIH1cbiAgbW91bnRUbyhwYXJlbnQpIHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gIH1cbn1cblxuLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbmxldCBkID0gW1xuICBcImh0dHBzOi8vc3RhdGljMDAxLmdlZWtiYW5nLm9yZy9yZXNvdXJjZS9pbWFnZS9iYi8yMS9iYjM4ZmI3YzEwNzNlYWVlMTc1NWY4MTEzMWYxMWQyMS5qcGdcIixcbiAgXCJodHRwczovL3N0YXRpYzAwMS5nZWVrYmFuZy5vcmcvcmVzb3VyY2UvaW1hZ2UvMWIvMjEvMWI4MDlkOWEyYmRmM2VjYzQ4MTMyMmQ3YzkyMjNjMjEuanBnXCIsXG4gIFwiaHR0cHM6Ly9zdGF0aWMwMDEuZ2Vla2Jhbmcub3JnL3Jlc291cmNlL2ltYWdlL2I2LzRmL2I2ZDY1YjJmMTI2NDZhOWZkNmI4Y2IyYjAyMGQ3NTRmLmpwZ1wiLFxuICBcImh0dHBzOi8vc3RhdGljMDAxLmdlZWtiYW5nLm9yZy9yZXNvdXJjZS9pbWFnZS83My9lNC83MzBlYTljMzkzZGVmNzk3NWRlY2ViNDhiM2ViNmZlNC5qcGdcIixcbl07XG5sZXQgYSA9IDxDYXJvdXNlbCBzcmM9e2R9IC8+O1xuYS5tb3VudFRvKGRvY3VtZW50LmJvZHkpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiYXR0cmlidXRlcyIsImVsZW1lbnQiLCJFbGVtZW50V3JhcHBlciIsIm5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJjaGlsZHJlbiIsImNoaWxkIiwiVGV4dFdyYXBwZXIiLCJhcHBlbmRDaGlsZCIsIkNvbXBvbmVudCIsInZhbHVlIiwicm9vdCIsInBhcmVudCIsImRvY3VtZW50IiwiY29udGVudCIsImNyZWF0ZVRleHROb2RlIiwiQ2Fyb3VzZWwiLCJPYmplY3QiLCJjcmVhdGUiLCJjb25zb2xlIiwibG9nIiwic3JjIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVjb3JkIiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJwb3NpdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInN0YXJ0WCIsImNsaWVudFgiLCJtb3ZlIiwieCIsImN1cnJlbnQiLCJvZmZzZXQiLCJwb3MiLCJsZW5ndGgiLCJ0cmFuc2l0aW9uIiwidHJhbnNmb3JtIiwidXAiLCJNYXRoIiwicm91bmQiLCJzaWduIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsImQiLCJhIiwibW91bnRUbyIsImJvZHkiXSwic291cmNlUm9vdCI6IiJ9