var debugStream = require('debug-stream')

process.stdin
  .pipe(debugStream('my-app', 'process.stdin: %s'))
  .resume() // just drain it
