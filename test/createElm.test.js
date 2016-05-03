import { createElm } from './../src/Yavdl';
import { expect } from './testHelper';

describe('createElm', () => {

  it('return a js representation of element', () => {
    const nestedElm = createElm('span',
                               ['this is nested span inside div'],
                               { class: 'child' });
    const elm = createElm('div', [nestedElm], { class: 'parent' });

    expect(elm.tag).to.eql('div');
    expect(elm.attrs).to.eql({ class: 'parent' });
    expect(elm.body[0].tag).to.eql('span');
    expect(elm.body[0].attrs).to.eql({ class: 'child' });
    expect(elm.body[0].body[0]).to.eql('this is nested span inside div');
  });
});
