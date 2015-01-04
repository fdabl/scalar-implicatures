# Scalar Implicatures

## Experiment Overview

(see also misc/specification.pdf)

The experiment implements a version of an **incremental
verification task** in which binary truth-value judgements are
collected for sentence-picture pairs,while the picture is only
incrementally revealed upon subjects' request. The task helps to
obtain information about the relative preferences for different
readings of potentially ambiguous sentences from categorical answers.

The experiment uses this approach for detecting "scalar implicatures",
in particular the enrichment of *some* to *some but not all*. In the
critical trials of this experiments, subjects must judge a sentence
like "The bell is connected to some of the triangles" true or false
with respect to a picture, in which possible connections between bell
and triangles are only partially revealed. Under a semantic reading of
*some*, subjects would then judge the sentence true in a situation in
which they can ascertain that there are at least some relevant connection,
while still uncertain as to whether the bell is connected to all of
the triangles. Under a pragmatically enriched reading, participants
would withhold a truth-value judgement at this stage until further
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
