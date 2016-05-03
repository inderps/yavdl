'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createElm = createElm;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function generateAttrString(attrs) {
  return 'dd';
}

function createHtmlNode(node, child, attrs) {
  return '<' + node.tag + ' ' + generateAttrString(node.attrs) + '>' + child + '</' + node.tag + '>';
}

var Yavdl = exports.Yavdl = function () {
  function Yavdl(rootElement) {
    _classCallCheck(this, Yavdl);

    this.rootElement = rootElement;
    this.virtualDom = {};
  }

  _createClass(Yavdl, [{
    key: 'renderNode',
    value: function renderNode(node, rawHtml) {
      var _this = this;

      node.body.forEach(function (child) {
        if (typeof child === 'string') {
          rawHtml += createHtmlNode(node, child);
        } else {
          rawHtml += createHtmlNode(node, _this.renderNode(child, rawHtml));
        }
      });
      return rawHtml;
    }
  }, {
    key: 'render',
    value: function render(element) {
      document.getElementById(this.rootElement).innerHTML = this.renderNode(element, '');
    }
  }, {
    key: 'renderx',
    value: function renderx(element, rawhtml) {
      rawhtml = rawhtml;
      element.body.forEach(function (child) {
        if (typeof child === 'string') {
          return child;
        }
      });
    }
  }]);

  return Yavdl;
}();

function createElm(tag, body, attrs) {
  return {
    tag: tag,
    body: body,
    attrs: attrs
  };
}