let obj = {
  a: 1,
}
obj.loop = Object.create(obj, Object.getOwnPropertyDescriptors(obj))

console.log(obj)
