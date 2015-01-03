# Scalar Implicatures

## Experiment Overview



... see also misc/specification.pdf.


## Code Overview
[browserify](http://browserify.org/) is used to modularize the JavaScript. Additionally, browserify allows several transforms.
Therefore we can write [ES6](https://github.com/lukehoban/es6features) JavaScript (the next version of JavaScript with many nice features)
which then gets transpiled to ES3 JavaScript by browserify such that the code is runnable in all current browsers.

Since these are [node](http://nodejs.org/) tools, you need to have node installed. Then just run

```
[sudo] npm install
```

in the top directory to install browserify and es6ify.

*Note*: Before your changes to the experiment have any effect, you need to transpile the ES6 code:
```
node build.js # or: npm run-script build
```
