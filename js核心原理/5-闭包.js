function fun1() {
  var a = 2;
  function fun2() {
    console.log(a);
  }
  return fun2;
}
var result = fun1();
result(); // 2

// 循环输出
for (var i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

// let 块作用域
for (let i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

// 立即执行函数
for (var i = 1; i <= 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
  })(i);
}

// setTimeout 第三个参数
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function (i) {
      console.log(i);
    },
    1000,
    i
  );
}
