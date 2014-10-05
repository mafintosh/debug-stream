# debug-stream

Use the debug module on a stream

```
npm install debug-stream
```

## Usage

``` js
var debugStream = require('debug-stream')('my-app')

process.stdin
  .pipe(debugStream())
  .resume() // just drain it

// or if you're already using debug

var debug = require('debug')('my-app')
var debugStream = require('debug-stream')(debug)

process.stdin
  .pipe(debugStream())
  .resume()
```

Running the above program with `DEBUG=*` will use the [debug module](https://github.com/visionmedia/debug) on every line
in the stream. If the stream is an object stream it will run debug on every object in the stream.

You can add an optional format string as well

``` js
var debugStream = require('debug-stream')('my-app')

process.stdin
  .pipe(debugStream('process.stdin: %s'))
  .resume() // just drain it
```

The debug stream behaives as pass through stream so can just insert it in any existing pipe chain

``` js
inputStream
  .pipe(debugStream())
  .pipe(outputStream)
```
## Browser support

As with debug, this module also supports the browser environment through either browserify or webpack.

To enable the functionality, you need to run `require('debug').enable('*')` in your console. It will persist
this setting in localStorage, until you run `require('debug').disable()`.

## License

MIT
