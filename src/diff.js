import PATCH_TYPES from './patch-types';

function diffAttrs(oldElm, newElm, patches) {
  const attrs = [];
  Object.keys(newElm.attrs).forEach(function (key) {
    if (oldElm.attrs[key] !== newElm.attrs[key]) {
      attrs.push({
        attr: key,
        value: newElm.attrs[key],
      });
    }
  });

  Object.keys(oldElm.attrs).forEach(function (key) {
    if (!newElm.attrs[key]) {
      attrs.push({
        attr: key,
        remove: true,
      });
    }
  });

  if (attrs.length > 0) {
    patches.push({
      type: PATCH_TYPES.ATTRS,
      uniqueId: oldElm.uniqueId,
      attrs: attrs,
    });
  }
}

function diffChildren(oldElm, newElm, patches) {
  if (oldElm.tag === newElm.tag) {
    diffAttrs(oldElm, newElm, patches);
    newElm.children.forEach((newChild, index) => {
      if (!oldElm.children[index]) {
        patches.push({
          type: PATCH_TYPES.ADD,
          uniqueId: oldElm.uniqueId,
          newChild: newChild,
        });
      } else {
        if (typeof newChild === 'string') {
          if (newChild !== oldElm.children[index]) {
            patches.push({
              type: PATCH_TYPES.TEXT,
              uniqueId: oldElm.uniqueId,
              newText: newChild,
            });
          }
        } else {
          diffChildren(oldElm.children[index], newChild, patches);
        }
      }
    });

    let nodesToRemove = [];
    oldElm.children.forEach((oldChild, index) => {
      if (!newElm.children[index]) {
        nodesToRemove.push(oldChild.uniqueId);
      }
    });

    if (nodesToRemove.length > 0) {
      patches.push({
        type: PATCH_TYPES.REMOVE,
        uniqueId: oldElm.uniqueId,
        nodesToRemove: nodesToRemove,
      });
    }
  } else {
    patches.push({
      type: PATCH_TYPES.REPLACE,
      uniqueId: oldElm.uniqueId,
      newNode: newElm,
    });
  }
}

export default function diff(oldElm, newElm) {
  const patches = [];
  diffChildren(oldElm, newElm, patches);
  return patches;
}
