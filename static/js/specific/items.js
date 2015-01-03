var items = [{

  'sentence': 'The letter is not connected to any of the rectangles.',
  'sequence': ['0-0', '0-2', '0-3', '0-6'],
  'correct': [4, true],
  'condition': 2, // hardcode condition to 2; so it's about letters and rectangles
  'training': true 
  }, {

  'sentence': 'The bell is connected to at most two of the triangles.',
  'sequence': ['0-0', '2-0', '3-0', '3-3'], // added 3-3 ~ does not say so in the spec!
  'correct': [3, false],
  'condition': 3, // hardcode condition to 3; so it's about bells and triangles
  'training': true
  }, {

  'sentence': 'The {X} {pred} connected to some of the {Y}.',
  'sequence': ['0-0', '3-0', '4-0', '6-0'],
  'correct': [[2, true], [4, false]],
  'critical': true // is the critical target stimulus
  }, {

  'sentence': 'The {X} {pred} connected to some of the {Y}.',
  'sequence': ['0-0', '3-0', '4-0', '6-0'],
  'correct': [[2, true], [4, false]],
  'critical': true // is the critical target stimulus
  }, {

  'sentence': 'The {X} {pred} not connected to more than 3 of the {Y}.',
  'sequence': ['0-0', '2-0', '3-0', '3-3'],
  'correct': [4, true]
  }, {

  'sentence': 'The {X} {pred} connected to more than half of the {Y}.',
  'sequence': ['0-0', '0-2', '0-3', '1-5'],
  'correct': [3, false]
  }, {

  'sentence': 'There are no connections from the {Y} to the {X}.',
  'sequence': ['0-0', '2-0', '3-0', '3-3'],
  'correct': [2, false]
  }, {

  'sentence': 'There are more than three {Y}.',
  'sequence': ['0-0', '2-0', '3-0', '3-3'], // assume 2-0 instead of 1-0 as in the spec!
  'correct': [1, true]
}];


function setupTrial(conditions, item) {
  var crit2 = null;
  var cond = _.random(1, 3);

  // training items are hardcoded
  if (!item.training) {

    // have two critical items which should have different conditions
    if (item.critical) {
      if (crit2) {
        var added = cond + 1;
        cond = added > 3 ? added % 3 : added;
      }
      crit2 = true;
    }

    var current = conditions[cond];
    var [X, Y] = current;

    item.condition = cond;
    item.sentence = item.sentence.replace('{X}', X).replace('{Y}', Y);
    item.sentence = item.sentence.replace('{pred}', X === 'scissors' ? 'are' : 'is');
  }
  return item;
}


function adjust(stimuli) {
  // randomize, but such that the two critical stimuli
  // are at least two control stimuli apart. since there
  // are enough degrees of freedom, let's just do it like bogosort >:D

  var apart = (stimuli) => {
    var pos = [];
    _.each(stimuli, (stim, i) => {
      if (stim.critical) pos.push(i);
    });
    var diff = pos[0] - pos[1];
    return diff * diff <= 4;
  };

  while (apart(stimuli)) stimuli = _.shuffle(stimuli); // whoop whoop
  return stimuli;
}


function setup(conditions, items) {
  var stimuli = _.map(items, (item) => {
    var trial = setupTrial(conditions, item);
    return trial;
  });

  // shuffle all but the first two training trials
  var training = stimuli.splice(0, 2);
  return training.concat(adjust(stimuli));
}


module.exports = {
  items: items,
  setup: setup
};
