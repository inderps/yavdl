function generateAttrString(attrs) {
  let attrAsString = '';
  Object.keys(attrs).forEach(function (prop) {
    attrAsString += `${prop}=${attrs[prop]} `;
  });
  return attrAsString;
}

function createHtmlNode(node, child, attrs) {
  return `<${node.tag} ${generateAttrString(node.attrs)}>${child}</${node.tag}>`;
}

export class Yavdl {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.virtualDom = {};
  }

  renderNode(node, rawHtml) {
    node.body.forEach(child => {
      if (typeof child === 'string') {
        rawHtml += createHtmlNode(node, child);
      } else {
        rawHtml += createHtmlNode(node, this.renderNode(child, rawHtml));
      }
    });
    return rawHtml;
  }

  render(element) {
    document.getElementById(this.rootElement).innerHTML = this.renderNode(element, '');
  }

  renderx(element, rawhtml) {
    rawhtml = rawhtml
    element.body.forEach(child => {
      if (typeof child === 'string') {
        return child;
      }
    });
  }
}

export function createElm(tag, body, attrs) {
  return {
    tag,
    body,
    attrs,
  };
}
