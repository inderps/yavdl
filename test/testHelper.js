import jq from 'jquery';
import jsdom from 'jsdom';
import { expect } from 'chai';

global.document = jsdom.jsdom('<!doctype html><html><body><div id="root"></div></body></html>');
global.window = global.document.defaultView;
const $ = jq(window);

function clearDom() {
  $('#root').html('');
}

export { expect, $, clearDom };
