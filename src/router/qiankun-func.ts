import { NextToEntity, ItemEntity } from "./qiankun-type"

const findAllrouter = (a: any, tf?: any) => {
  const _children = a.children;
  if (_children) {
    for (let index = 0; index <= _children.length - 1; index++) {
      const item: ItemEntity = _children[index];
      const itemChildren = item.children;
      if (itemChildren) {
        if (tf.indexOf(item.path) != -1) {
          return true;
        }
        if (findAllrouter(item)) {
          return true;
        }
      } else {
        if (tf.indexOf(item.path) != -1) {
          return true;
        }
      }
    }
  }
  return false;
};

const getParentPath = (tf: any) => {
  let urlArr = [];
  if (/#/.test(tf)) {
    urlArr = tf.split("#");
  }
  // 统一门户-下发路由地址
  const nextTo: NextToEntity = { fullPath: "" };
  if (urlArr.length > 0 && urlArr[1]) {
    nextTo.path = "";
    nextTo.hash = "";
    nextTo.fullPath = urlArr[1];
  }
  return nextTo;
};

export {
  findAllrouter,
  getParentPath
}