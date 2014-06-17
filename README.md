# debug-stream

Use the debug module on a stream

```
npm install debug-stream
```

## Usage

``` js
var debugStream = require('debug-stream')

process.stdin
  .pipe(debugStream('my-app'))
  .resume() // just drain it

// or if you're already using debug

var debug = require('debug')('my-app')
process.stdin
  .pipe(debugStream(debug))
  .resume()
```

Running the above program with `DEBUG=*` will use the [debug module](https://github.com/visionmedia/debug) on every line
in the stream. If the stream is an object stream it will run debug on every object in the stream.

You can add an optional format string as well

``` js
var debugStream = require('debug-stream')

process.stdin
  .pipe(debugStream('my-app', 'process.stdin: %s'))
  .resume() // just drain it
```

The debug stream behaives as pass through stream so can just insert it in any existing pipe chain

``` js
inputStream
  .pipe(debugStream('my-app'))
  .pipe(outputStream)
```

## License

MIT
