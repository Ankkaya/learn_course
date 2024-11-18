console.log(JSON.stringify(null))
console.log(JSON.stringify(undefined))
console.log(JSON.stringify(true))
console.log(JSON.stringify(1))
console.log(JSON.stringify(Symbol(1)))
console.log(JSON.stringify(NaN))
console.log(JSON.stringify(Infinity))
console.log(
  JSON.stringify(function () {
    console.log('function')
  })
)
console.log(
  JSON.stringify([
    undefined,
    null,
    1,
    true,
    Symbol(1),
    NaN,
    Infinity,
    function () {
      console.log('function')
    },
  ])
)
console.log(JSON.stringify(new RegExp('a')))
console.log(JSON.stringify(new Date()))
console.log(JSON.stringify({ a: 1, b: 2 }))

// 自定义实现，先通过 typeof 区分基本类型和引用类型
function jsonStringify(data) {
  let type = typeof data
  if (type !== 'object') {
    let result = data
    // 处理既不是 object 也不是基础类型情况
    if (Number.isNaN(data) || data === Infinity) {
      result = 'null'
    } else if (type === 'function' || type === 'undefined' || type === 'symbol') {
      return undefined
    } else if (type === 'string') {
      result = '"' + data + '"'
    }
    return String(result)
  } else if (type === 'object') {
    if (data === null) {
      return 'null'
    } else if (data.toJSON && typeof data.toJSON === 'function') {
      return jsonStringify(data.toJSON())
    } else if (data instanceof Array) {
      let result = []
      data.forEach((item, index) => {
        if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
          result[index] = 'null'
        } else {
          result[index] = jsonStringify(item)
        }
      })
      result = '[' + result + ']'
      return result.replace(/'/g, '"')
    } else {
      let result = []
      Object.keys(data).forEach((item, index) => {
        if (typeof item !== 'symbol') {
          if (data[item] !== undefined && typeof data[item] !== 'function' && typeof data[item] !== 'symbol') {
            result.push('"' + item + '"' + ':' + jsonStringify(data[item]))
          }
        }
      })
      return ('{' + result + '}').replace(/'/g, '"')
    }
  }
}
