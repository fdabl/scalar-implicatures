# Scalar Implicatures

## Experiment Overview

(see also misc/specification.pdf)

An implementation of the 'incremental verification task' of (Franke,
Schlotterbeck & Augurzky, submitted), in which binary truth-value
judgements are collected for sentence-picture pairs, but in which the
picture is only incrementally revealed upon the subject's
request. Using this technique, categorical answers give information
about the relative preferences of ambiguous sentences.

The experiment uses this approach for detecting "scalar implicatures",
in particular the enrichment of /some/ to /some but not all/. In the
critical trials in this experiments, subjects must judge a sentence
like "The bell is connected to some of its triangles" true or false
with respect to a picture, in which possible connections are only
partially revealed. Under a semantic reading of /some/, subjects would
then judge the sentence true in a situation in which they can
ascertain that there are some relevant connection, while still
uncertain as to whether the bell is connected to all of its
triangles. Under a pragmatically enriched reading, participants would
withhold a truth-value judgement at this stage until further
information is available.


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
