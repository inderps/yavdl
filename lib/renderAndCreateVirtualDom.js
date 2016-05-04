'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderAndCreateVirtualDom;
function setAttributes(jsElm, htmlElm, uniqueId) {
  var attrAsString = '';
  Object.keys(jsElm.attrs).forEach(function (prop) {
    htmlElm.setAttribute(prop, jsElm.attrs[prop]);
  });
  htmlElm.setAttribute('data-yavdl-id', uniqueId);
}

function renderChildren(jsElm, htmlElm, uniqueId) {
  setAttributes(jsElm, htmlElm, uniqueId);
  var children = [];
  var childrenUniqueId = uniqueId;
  jsElm.children.forEach(function (child) {
    var childHtmlElm = void 0;
    if (typeof child === 'string') {
      childHtmlElm = document.createTextNode(child);
      children.push(child);
    } else {
      childHtmlElm = document.createElement(child.tag);
      childrenUniqueId = childrenUniqueId + 1;
      children.push(renderChildren(child, childHtmlElm, childrenUniqueId));
    }
    htmlElm.appendChild(childHtmlElm);
  });
  return {
    tag: jsElm.tag,
    attrs: jsElm.attrs,
    uniqueId: uniqueId,
    children: children
  };
}

function renderAndCreateVirtualDom(rootElm, jsElm) {
  var htmlElm = document.createElement(jsElm.tag);
  var virtualDom = renderChildren(jsElm, htmlElm, 0);
  document.getElementById(rootElm).appendChild(htmlElm);
  return virtualDom;
}