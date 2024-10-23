// 原型链继承
{
  function Parent1() {
    this.name = 'parent1'
    this.play = [1, 2, 3]
  }

  function Child1() {
    this.type = 'child2'
  }

  Child1.prototype.__proto__ = new Parent1()
  console.log(new Child1().name)

  // 共用原型对象，会导致实例对象之间相互影响
  let s1 = new Child1()
  let s2 = new Child1()

  s1.play.push(4)
  console.log(s1.play, s2.play) // [1, 2, 3, 4] [1, 2, 3, 4]
}

{
  // 构造函数继承
  function Parent1() {
    this.name = 'parent1'
  }

  Parent1.prototype.getName = function () {
    return this.name
  }

  function Child1() {
    Parent1.call(this)
    this.type = 'child1'
  }

  let child = new Child1()
  console.log(child)
  // 构造函数继承，无法继承父类原型上的方法
  // console.log(child.getName())
}

// 组合继承-------------------
{
  console.log('组合继承')
  function Parent1() {
    this.name = 'parent1'
    this.play = [1, 2, 3]
  }

  Parent1.prototype.getName = function () {
    return this.name
  }

  function Child1() {
    Parent1.call(this)
    this.type = 'child1'
  }

  Child1.prototype.__proto__ = new Parent1()
  console.log(Child1.prototype.constructor)

  let child = new Child1()
  let child2 = new Child1()

  child.play.push(4)
  child.name = 'child1'
  console.log(child.play, child2.play) // [1, 2, 3, 4] [1, 2, 3]
  console.log(child.getName()) // parent1
  console.log(child2.getName())
}

// 原型式继承
{
  console.log('原型式继承------------')

  let parent1 = {
    name: 'parent1',
    friends: ['a', 'b', 'c'],
    getName: function () {
      return this.name
    },
  }

  let person1 = Object.create(parent1)
  person1.name = 'person1'
  person1.friends.push('d')

  let person2 = Object.create(parent1)
  person2.name = 'person2'
  person2.friends.push('e')

  console.log(person1.name, person1.friends)
  console.log(person2.name, person2.friends)
  console.log(person1.name === person1.getName())
}

{
  // 寄生式继承
  console.log('寄生式继承------------')
  let parent = {
    name: 'parent',
    friends: ['a', 'b', 'c'],
    getName: function () {
      return this.name
    },
  }

  function clone(original) {
    let clone = Object.create(original)
    clone.getFriends = function () {
      return this.friends
    }
    return clone
  }

  let person = clone(parent)
  console.log(person.getName())
  console.log(person.getFriends())
}

{
  // 寄生组合式继承
  console.log('寄生组合式继承------------')

  function clone(parent, child) {
    child.prototype = Object.create(parent.prototype)
    child.prototype.constructor = child
  }
  function Parent1() {
    this.name = 'parent1'
    this.play = [1, 2, 3]
  }

  Parent1.prototype.getName = function () {
    return this.name
  }

  Parent1.prototype.list = [1, 2, 3]

  function Child1() {
    Parent1.call(this)
    this.type = 'child1'
  }

  clone(Parent1, Child1)

  Child1.prototype.getPlay = function () {
    return this.play
  }

  let parent = new Child1()
  let parent2 = new Child1()
  parent.name = 'change'
  parent.play.push(4)
  parent.list.push(4)
  console.log(parent.getName())
  console.log(parent.getPlay())
  console.log(parent instanceof Parent1, parent instanceof Child1)
  console.log(parent.name)
  console.log(parent.type)
  console.log(parent.list)
  console.log(parent2.list)
  console.log(parent2.name, parent2.play)
}
