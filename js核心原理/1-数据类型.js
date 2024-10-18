// 数据类型判断
function getType(obj) {
  let type = typeof obj
  // 如果是基础类型直接返回
  if (type !== 'object') {
    return type
  }

  // 引用类型使用Object.prototype.toString.call(obj)返回[object XXX]格式,再提取XXX部分返回即可
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}
