# yavdl
Yet another virtual dom library


## Usage

```javascript
import { elm, renderAndCreateVirtualDom, diff, applyPatch } from 'yavdl';


  const realElm = elm('div', ['some-content'], { class: 'content' });

  const vDom = renderAndCreateVirtualDom('root', realElm);

  const newElm = elm('h1', ['some-content'], { class: 'content' });

  const patchList = diff(vDom, newElm);

  expect(patchList.length).to.eql(1);
  expect(patchList[0].type).to.eql(PATCH_TYPES.REPLACE);
  expect(patchList[0].uniqueId).to.eql(0);
  expect(patchList[0].newNode.tag).to.eql('h1');

  applyPatch('root', patchList);

  expect($('#root').html()).to.eql('');
```

To learn more, Checkout [`diff`](https://github.com/inderps/yavdl/blob/master/test/diff.spec.js) specs.


