var debug = require('debug')
var through = require('through2')

module.exports = function (name) {
  var d = typeof name === 'function' ? name : debug(name)

  try {
    var enabled = !!(process.env.DEBUG || localStorage.debug)
  } catch (e) {}

  passThrough.enabled = false
  debugStream.enabled = true

  return enabled ? debugStream : passThrough

  function passThrough () {
    return through.obj()
  }

  function debugStream () {
    var args = arguments.length && Array.prototype.slice.call(arguments)

    var run = args ?
      function (line) {
        d.apply(d, args.concat(line))
      } :
      function (line) {
        d(line)
      }

    return through.obj(function (data, enc, cb) {
      run(data)
      cb(null, data)
    })
  }
}
