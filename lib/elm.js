"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = elm;
function elm(tag, body, attrs) {
  return {
    tag: tag,
    body: body,
    attrs: attrs
  };
}