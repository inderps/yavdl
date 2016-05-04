# yavdl
Yet another virtual dom library


## Usage

```javascript
// Example 1

import { elm, renderAndCreateVirtualDom, diff } from 'yavdl';

const realElm = elm('div', ['some-content'], { class: 'content' });

const vDom = renderAndCreateVirtualDom('root', realElm);

const newElm = elm('h1', ['some-content'], { class: 'content' });

const patchList = diff(vDom, newElm);

expect(patchList.length).to.eql(1);
expect(patchList[0].type).to.eql(PATCH_TYPES.REPLACE);
expect(patchList[0].uniqueId).to.eql(0);
expect(patchList[0].newNode.tag).to.eql('h1');


// Example 2

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
```

## Run Tests locally

* `npm install`
* `npm run test`

## TODOs

* apply patch


To learn more, Checkout [`diff`](https://github.com/inderps/yavdl/blob/master/test/diff.spec.js) specs.


