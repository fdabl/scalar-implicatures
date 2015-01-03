var psiTurk = require('./psiturk');
var Experiment = require('./exp');

// All pages to be loaded
var pages = [
	"instructions/instruction-1.html",
	"instructions/instruction-2.html",
    "intermediate.html",
	"item.html",
    "postquestionnaire.html"
];


var instructionPages = [
	"instructions/instruction-1.html",
	"instructions/instruction-2.html",
];
psiTurk.preloadPages(pages);

// Task object to keep track of the current phase
var currentview;

// RUN TASK
$(window).load(() => {
    psiTurk.doInstructions(
    	instructionPages, // list of instruction pages
    	() => currentview = new Experiment().start() // after instructions
    );
});
