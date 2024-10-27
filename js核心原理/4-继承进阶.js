// 自定义实现 new
function _new(ctor, ...args) {
  if (typeof ctor !== "function") {
    throw "ctor must be a function";
  }

  let obj = new Object();
  obj.__proto__ = ctor.prototype;
  let res = ctor.apply(obj, [...args]);

  let isObject = typeof res === "object" && res !== null;
  let isFunction = typeof res === "function";
  return isObject || isFunction ? res : obj;
}

// 自定义实现 call 和 apply
Function.prototype._call = function (context, ...args) {
  context = context || window;
  context.fn = this;
  let res = context.fn(...args);
  delete context.fn;
  return res;
};

Function.prototype._apply = function (context, args) {
  context = context || window;
  context.fn = this;
  let res = context.fn(...args);
  delete context.fn;
  return res;
};

function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Student(grade) {
  this.grade = grade;
  // Person._apply(this, ["张三", 12]);
  Person._call(this, "张三", 12);
}
let result = new Student("一年级");
console.log(result);

// 自定义 bind 函数
Function.prototype._bind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("this must be a function");
  }

  let self = this;
  let fBound = function () {
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };

  if (this.prototype) {
    fBound.prototype = Object.create(this.prototype);
  }
  return fBound;
};
