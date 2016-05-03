function setAttributes(jsElm, htmlElm, uniqueId) {
  let attrAsString = '';
  Object.keys(jsElm.attrs).forEach(function (prop) {
    htmlElm.setAttribute(prop, jsElm.attrs[prop]);
  });
  htmlElm.setAttribute('data-yavdl-id', uniqueId);
}

function renderChildren(jsElm, htmlElm, uniqueId) {
  setAttributes(jsElm, htmlElm, uniqueId);
  const body = [];
  jsElm.body.forEach(child => {
    let childHtmlElm;
    if (typeof child === 'string') {
      childHtmlElm = document.createTextNode(child);
      body.push(child);
    } else {
      childHtmlElm = document.createElement(child.tag);
      body.push(renderChildren(child, childHtmlElm, uniqueId + 1));
    }
    htmlElm.appendChild(childHtmlElm);
  });
  return {
    tag: jsElm.tag,
    attrs: jsElm.attrs,
    uniqueId: uniqueId,
    body: body,
  };
}

export default function renderAndCreateVirtualDom(rootElm, jsElm) {
  const htmlElm = document.createElement(jsElm.tag);
  const virtualDom = renderChildren(jsElm, htmlElm, 0);
  document.getElementById(rootElm).appendChild(htmlElm);
  return virtualDom;
}
