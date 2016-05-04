import { elm, renderAndCreateVirtualDom, diff } from './../src/index';
import PATCH_TYPES from './../src/patch-types';
import { expect, $, clearDom } from './testHelper';

describe('diff', () => {

  beforeEach(() => {
    clearDom();
  });

  it('should return the whole element as patch if node type is different', () => {

    const realElm = elm('div', ['some-content'], { class: 'content' });

    const vDom = renderAndCreateVirtualDom('root', realElm);

    const newElm = elm('h1', ['some-content'], { class: 'content' });

    const patchList = diff(vDom, newElm);

    expect(patchList.length).to.eql(1);
    expect(patchList[0].type).to.eql(PATCH_TYPES.REPLACE);
    expect(patchList[0].uniqueId).to.eql(0);
    expect(patchList[0].newNode.tag).to.eql('h1');
  });

  it('should return only those attributes which gets added, edited or removed', () => {

    const realElm = elm('input', [], { class: 'content', value: '50' });

    const vDom = renderAndCreateVirtualDom('root', realElm);

    const newElm = elm('input', [], { class: 'content-new', type: 'submit' });

    const patchList = diff(vDom, newElm);

    expect(patchList.length).to.eql(1);
    expect(patchList[0].type).to.eql(PATCH_TYPES.ATTRS);
    expect(patchList[0].uniqueId).to.eql(0);
    expect(patchList[0].attrs).to.eql([
      { attr: 'class', value: 'content-new' },
      { attr: 'type', value: 'submit' },
      { attr: 'value', remove: true }]);
  });

  it('should return the new text if it got changed in new element', () => {

    const realElm = elm('h1', ['old-content'], {});

    const vDom = renderAndCreateVirtualDom('root', realElm);

    const newElm = elm('h1', ['new-content'], {});

    const patchList = diff(vDom, newElm);

    expect(patchList.length).to.eql(1);
    expect(patchList[0].type).to.eql(PATCH_TYPES.TEXT);
    expect(patchList[0].uniqueId).to.eql(0);
    expect(patchList[0].newText).to.eql('new-content');
  });

  it('should return the whole child node if it has different node type', () => {

    const childElm1 = elm('span', ['some-content'], {});
    const parentElm1 = elm('div', [childElm1], {});

    const vDom = renderAndCreateVirtualDom('root', parentElm1);

    const childElm2 = elm('h1', ['some-content'], {});
    const parentElm2 = elm('div', [childElm2], {});

    const patchList = diff(vDom, parentElm2);

    expect(patchList.length).to.eql(1);
    expect(patchList[0].type).to.eql(PATCH_TYPES.REPLACE);
    expect(patchList[0].uniqueId).to.eql(1);
    expect(patchList[0].newNode.tag).to.eql('h1');
  });

  it('should return the new child node if it gets added', () => {

    const childElm1 = elm('span', ['some-content'], {});
    const parentElm1 = elm('div', [childElm1], {});

    const vDom = renderAndCreateVirtualDom('root', parentElm1);

    const childElm2 = elm('h1', ['some-content'], {});
    const parentElm2 = elm('div', [childElm1, childElm2], {});

    const patchList = diff(vDom, parentElm2);

    expect(patchList.length).to.eql(1);
    expect(patchList[0].type).to.eql(PATCH_TYPES.ADD);
    expect(patchList[0].uniqueId).to.eql(0);
    expect(patchList[0].newChild.tag).to.eql('h1');
  });

  it('should return the child nodes to be deleted if they are not present in new node', () => {

    const childElm1 = elm('span', ['some-content'], {});
    const childElm2 = elm('h1', ['some-content'], {});
    const childElm3 = elm('div', ['some-content'], {});

    const parentElm1 = elm('div', [childElm1, childElm2, childElm3], {});

    const vDom = renderAndCreateVirtualDom('root', parentElm1);

    const parentElm2 = elm('div', [childElm1], {});

    const patchList = diff(vDom, parentElm2);

    expect(patchList.length).to.eql(1);
    expect(patchList[0].type).to.eql(PATCH_TYPES.REMOVE);
    expect(patchList[0].uniqueId).to.eql(0);
    expect(patchList[0].nodesToRemove).to.eql([2, 3]);
  });
});
