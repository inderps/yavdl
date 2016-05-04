'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = diff;

var _patchTypes = require('./patch-types');

var _patchTypes2 = _interopRequireDefault(_patchTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function diffAttrs(oldElm, newElm, patches) {
  var attrs = [];
  Object.keys(newElm.attrs).forEach(function (key) {
    if (oldElm.attrs[key] !== newElm.attrs[key]) {
      attrs.push({
        attr: key,
        value: newElm.attrs[key]
      });
    }
  });

  Object.keys(oldElm.attrs).forEach(function (key) {
    if (!newElm.attrs[key]) {
      attrs.push({
        attr: key,
        remove: true
      });
    }
  });

  if (attrs.length > 0) {
    patches.push({
      type: _patchTypes2.default.ATTRS,
      uniqueId: oldElm.uniqueId,
      attrs: attrs
    });
  }
}

function diffChildren(oldElm, newElm, patches) {
  if (oldElm.tag === newElm.tag) {
    (function () {
      diffAttrs(oldElm, newElm, patches);
      newElm.children.forEach(function (newChild, index) {
        if (!oldElm.children[index]) {
          patches.push({
            type: _patchTypes2.default.ADD,
            uniqueId: oldElm.uniqueId,
            newChild: newChild
          });
        } else {
          if (typeof newChild === 'string') {
            if (newChild !== oldElm.children[index]) {
              patches.push({
                type: _patchTypes2.default.TEXT,
                uniqueId: oldElm.uniqueId,
                newText: newChild
              });
            }
          } else {
            diffChildren(oldElm.children[index], newChild, patches);
          }
        }
      });

      var nodesToRemove = [];
      oldElm.children.forEach(function (oldChild, index) {
        if (!newElm.children[index]) {
          nodesToRemove.push(oldChild.uniqueId);
        }
      });

      if (nodesToRemove.length > 0) {
        patches.push({
          type: _patchTypes2.default.REMOVE,
          uniqueId: oldElm.uniqueId,
          nodesToRemove: nodesToRemove
        });
      }
    })();
  } else {
    patches.push({
      type: _patchTypes2.default.REPLACE,
      uniqueId: oldElm.uniqueId,
      newNode: newElm
    });
  }
}

function diff(oldElm, newElm) {
  var patches = [];
  diffChildren(oldElm, newElm, patches);
  return patches;
}