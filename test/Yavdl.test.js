import { Yavdl, createElm } from './../src/Yavdl';
import { expect, $ } from './testHelper';

describe('Yavdl', () => {

  let yavdl;

  beforeEach(() => {
    yavdl = new Yavdl('root');
  });

  it('render a div with all attributes', () => {

    const nestedElm = createElm('span',
                               ['this is nested span inside div'],
                               { class: 'child' });
    const elm = createElm('div', [nestedElm], { class: 'parent' });

    yavdl.render(elm);

    expect($('#root').html()).to.eql('<div class="parent"><span class="child">this is nested span inside div</span></div>');
  });
});
