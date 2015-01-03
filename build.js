var fs = require('fs');
var path = require('path');
var es6ify = require('es6ify');
var browserify = require('browserify');

var jsRoot = path.join(__dirname, 'static');
var bundlePath = path.join(jsRoot, 'bundle.js');


browserify({ debug: true })
  .add(es6ify.runtime)
  .transform(es6ify)
  .require(require.resolve('./static/js/task.js'), { entry: true })
  .bundle()
  .on('error', function (err) { console.error(err); })
  .pipe(fs.createWriteStream(bundlePath));

console.log('./static/build.js written to disk');
