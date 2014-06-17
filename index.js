var debug = require('debug')
var through = require('through2')
var split = require('split')

module.exports = function(name, fmt) {
  var d = typeof name === 'function' ? name : debug(name)
  var run = fmt ?
    function(line) {
      d(fmt, line)
    } :
    function(line) {
      d(line)
    }

  var s = split(run)

  if (!process.env.DEBUG) return through.obj()

  return through.obj(function(data, enc, cb) {
    if (typeof data === 'string' || Buffer.isBuffer(data)) s.write(data)
    else run(data)
    cb(null, data)
  })
}