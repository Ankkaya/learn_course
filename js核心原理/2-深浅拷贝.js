// Object.assign
// 浅拷贝
function testAssign() {
  let obj1 = { a: 1, b: { c: 3 } };
  let obj2 = Object.assign({}, obj1);
  obj2.b.c = 4;
  console.log(obj1, obj2);
}

testAssign();

// 扩展运算符
// 浅拷贝
function testSpread() {
  let obj1 = { a: 1, b: { c: 3 } };
  let obj2 = { ...obj1 };
  obj2.b.c = 4;
  console.log(obj1, obj2);
}

testSpread();

// contact
// 浅拷贝
function testContact() {
  let arr1 = [
    1,
    2,
    3,
    {
      a: 1,
    },
  ];
  let arr2 = arr1.concat();
  arr2[0] = 4;
  arr2[3].a = 5;
  console.log(arr1, arr2);
}

testContact();

// 自定义浅拷贝
function testShallowCopy(target) {
  if (typeof target === "object" && target !== null) {
    let copy = Array.isArray(target) ? [] : {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        copy[key] = target[key];
      }
    }
    return copy;
  } else {
    return target;
  }
}

// 深拷贝
// JSON.stringify()
function testJson() {
  let obj1 = {
    a: 1,
    b: { c: 3 },
    d: null,
    e: undefined,
    f: () => {},
    g: Symbol("g"),
    nan: NaN,
    inf: Infinity,
    date: new Date(),
    reg: /a/g,
  };
  let obj2 = JSON.parse(JSON.stringify(obj1));
  obj2.b.c = 4;
  console.log(obj1, obj2);
}
testJson();

// 自定义深拷贝（简易版）
function testDeepCopyBasic(target) {
  let cloneObj = {};
  for (let key in target) {
    if (typeof target[key] === "object") {
      cloneObj[key] = testDeepCopyBasic(target[key]);
    } else {
      cloneObj[key] = target[key];
    }
  }
  return cloneObj;
}

let obj = {
  a: 1,
  b: {
    c: 2,
  },
  d: [1, 2, 3],
  e: null,
  f: undefined,
  g: () => {},
  h: Symbol("h"),
  [Symbol("1")]: 1,
  date: new Date(),
  reg: /a/g,
  i: NaN,
  j: Infinity,
};
let obj2 = testDeepCopyBasic(obj);
obj2.b.c = 4;
console.log(obj2, obj);

// 自定义深拷贝（完整版）
function testDeepCopy(target, map = new WeakMap()) {
  if (target.constructor === Date) {
    return new Date(target);
  }
  if (target.constructor === RegExp) {
    return new RegExp(target);
  }
  let allDesc = Object.getOwnPropertyDescriptors(target);
  let cloneObj = Object.create(Object.getPrototypeOf(target), allDesc);
  map.set(target, cloneObj);

  for (let key of Reflect.ownKeys(target)) {
    cloneObj[key] =
      typeof target[key] === "object" &&
      target[key] !== "function" &&
      target[key] !== null
        ? testDeepCopy(target[key], map)
        : target[key];
  }

  return cloneObj;
}

let obj3 = testDeepCopy(obj);
console.log(obj3);
console.log(obj3.d[2]);
