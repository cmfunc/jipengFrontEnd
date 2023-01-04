const utils = require('./utils')

// 在 Worker 线程执行上下文会全局暴露一个 worker 对象，直接调用 worker.onMessage/postMessage 即可
worker.onMessage(function (res) {
  console.log(res)
  var i = 0
  for (i=0;i<5;i++) {
    console.log("for loop")
  }
})
