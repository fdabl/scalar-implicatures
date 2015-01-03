var psiTurk = require('./psiturk');
var ending = require('./specific/ending');
var items = require('./specific/items').items;
var setup = require('./specific/items').setup;


class Experiment {

  constructor() {
    this.curStim = 0;
    this.curTrial = 0;
    this.trialData = [];

    this.trial = null;
    this.maxStim = null;
    this.training = null;
    this.curSequence = null;

    this.conditions = {
      '1': ['scissors', 'circles'],
      '2': ['letter', 'rectangles'],
      '3': ['bell', 'triangles']
    };

    this.paused = false;
    this.maxTrials = items.length;
    this.allTrials = setup(this.conditions, items);
    this.mapping = {
      false: 'bad',
      true: 'good'
    };
  }


  nextTrial() {
    this.curStim = 0;

    if (this.curTrial == 2 && !this.paused) { // after the training trials
      this.paused = true; // otherwise we would get stuck in this if clause!
      psiTurk.showPage('intermediate.html');
      $('.intermediate').on('click', (e) => this.start());
    }

    else {
      if (this.curTrial < this.maxTrials) {
        var trial = this.allTrials[this.curTrial++];

        this.curSequence = trial.sequence;
        this.changeSentence(trial.sentence);
        this.maxStim = trial.sequence.length;
        this.training = trial.training || false;

        this.trial = trial;
        this.nextStim();
      }

      else {
        this.end();
      }
    }
  }


  nextStim() {
    this.curStim += 1;
    $('#more-info').show();
    if (this.curStim == this.maxStim) $('#more-info').hide();

    var img = this.curSequence.splice(0, 1);
    this.changeImage(this.trial.condition, img);
  }


  save(e) {
    e.preventDefault();
    var id = $(e.target).attr('id');
    var correct = this.rightAnswer(id);
    var nr = correct === null ? 0 : correct ? 1 : -1;

    if (this.training) { // give feedback
      let mess = null;
      let corStim = _.first(this.trial.correct);

      if (this.curStim < corStim && id != 'more-info')
        mess = 'Please check again. You don\'t have enough information yet.';

      if (this.curStim == corStim && id != 'more-info' && !correct)
        mess = 'Please check again. This is not the right answer.';

      if (this.curStim == corStim && id == 'more-info')
        mess = 'Please check again. You actually do have enough information.';

      if (mess) {
        alert(mess);
        return false;
      }
    }

    this.trialData.push(nr * this.curStim);

    if (id == 'bad' || id == 'good') {
      for (let i in _.range(this.maxStim - this.curStim)) {
        this.trialData.push(null);
      }

      var type = this.training ? 'training' : this.trial.critical ? 
                                              'critical' : 'control';
      this.trialData.push(nr > 0);
      this.trialData.push(type);
      this.trialData.push(this.trial.sentence);

      psiTurk.recordTrialData(this.trialData);
      this.trialData = []; // reset for next trial
    }

    return correct === null ? this.nextStim() : this.nextTrial();
  }


  rightAnswer(id) {
    if (id == 'more-info') return null;

    var correct = this.trial.correct;
    if (!_.isArray(_.first(correct)))
      return this.check(id, correct);

    var [first, second] = correct;
    return this.check(id, first) || this.check(id, second);
  }


  check(id, correct) {
    var [corStim, corAns] = correct;
    return this.curStim == corStim && id == this.mapping[corAns];
  }


  changeImage(number, type) {
    $('img').attr('src', `../static/conditions/${number}/${type}.png`);
  }


  changeSentence(sentence) {
    $('#target-sentence').text(sentence);
  }


  start() {
    psiTurk.showPage('item.html');
    $('button').on('click', _.bind(this.save, this));
    this.nextTrial();
  }


  end() {
    psiTurk.showPage('postquestionnaire.html');
    psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
    ending();
  }
}


module.exports = Experiment;
