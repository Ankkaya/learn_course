// 数据类型判断
function getType(obj) {
  let type = typeof obj;
  // 如果是基础类型直接返回
  if (type !== "object") {
    return type;
  }

  // 引用类型使用Object.prototype.toString.call(obj)返回[object XXX]格式,再提取XXX部分返回即可
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (\S+)\]$/, "$1");
}

function testNum() {
  console.log(Number(0x1122));
  // 严格模式 0o 开头表示八进制
  console.log(Number(0o1122));
  console.log(Number(0b1100));
}

function testObj() {
  let obj = {
    name: "ankkaya",
    [Symbol.toPrimitive]() {
      return 1;
    },
    valueOf() {
      return 2;
    },
    toString: function () {
      return "hello world";
    },
  };
  console.log(1 + obj);
  console.log({} + 10);
  console.log(10 + {});
}

testNum();

testObj();
