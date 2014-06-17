var debugStream = require('debug-stream')('my-app')

process.stdin
  .pipe(debugStream('process.stdin: %s'))
  .resume() // just drain it
