import { elm, renderAndCreateVirtualDom } from './../src/index';
import { expect, $, clearDom } from './testHelper';

describe('renderAndCreateVirtualDom', () => {

  beforeEach(() => {
    clearDom();
  });

  it('render a div with all attributes', () => {

    const childElm = elm('span',
                               ['this is nested span inside div'],
                               { class: 'child' });
    const parentElm = elm('div', [childElm], { class: 'parent' });

    const vDom = renderAndCreateVirtualDom('root', parentElm);

    expect(vDom.uniqueId).to.eql(0);
    expect(vDom.children[0].uniqueId).to.eql(1);

    expect($('#root').html()).to.eql('<div class="parent" data-yavdl-id="0"><span class="child" data-yavdl-id="1">this is nested span inside div</span></div>');
  });
});
