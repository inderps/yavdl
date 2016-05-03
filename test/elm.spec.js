import elm from './../src/elm';
import { expect } from './testHelper';

describe('elm', () => {

  it('return a js representation of element', () => {
    const childElm = elm('span',
                               ['this is nested span inside div'],
                               { class: 'child' });
    const parentElm = elm('div', [childElm], { class: 'parent' });

    expect(parentElm.tag).to.eql('div');
    expect(parentElm.attrs).to.eql({ class: 'parent' });
    expect(parentElm.body[0].tag).to.eql('span');
    expect(parentElm.body[0].attrs).to.eql({ class: 'child' });
    expect(parentElm.body[0].body[0]).to.eql('this is nested span inside div');
  });
});
