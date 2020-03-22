var traversal = function _walk(node, func) {
  var o = {
      node,
      children: []
    },
    i = 0,
    n = node.firstChild,
    returnNode = null
  while (n) {
    if (returnNode = func(n)) {
      // 递归调用遍历所有子节点
      o.children.push(_walk(returnNode, func))
    }
    // 每个子节点都有兄弟节点, 需要移动下迭代位置， 防止死循环
    n = n.nextSibling
  }
  return o
}

// traversal的回调函数，可以处理一些逻辑
var step = function (node) {
  // 过滤掉其它类型的节点, 只需要元素节点
  return node.nodeType === 1 ? node : false
}

var tree = traversal(document, step)