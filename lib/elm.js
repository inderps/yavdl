"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = elm;
function elm(tag, children, attrs) {
  return {
    tag: tag,
    children: children,
    attrs: attrs
  };
}