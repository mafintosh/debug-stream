var debug = require('debug')
var through = require('through2')
var split = require('split')

module.exports = function(name) {
  var d = typeof name === 'function' ? name : debug(name)

  try {
    var enabled = process.env.DEBUG || localStorage.debug
  } catch (e) {}

  if (!enabled) {
    return function() {
      return through.obj()
    }
  }

  return function() {
    var args = arguments.length && Array.prototype.slice.call(arguments)

    var run = args ?
      function(line) {
        d.apply(d, args.concat(line))
      } :
      function(line) {
        d(line)
      }

    var s = split(run)

    return through.obj(function(data, enc, cb) {
      if (typeof data === 'string' || Buffer.isBuffer(data)) s.write(data)
      else run(data)
      cb(null, data)
    })
  }
}
