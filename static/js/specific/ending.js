var psiTurk = require('../psiturk');


module.exports = () => {

  $('#next').on('click', () => {
    // save their native language
    var language = $('#language').val();

    if (language === '') {
      alert('Please indicate your native language.');
      $('#language').focus();
      return false;
    }

    else {
      psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});
      psiTurk.recordTrialData([language]);

      $('textarea').each(function(i, val) {
        psiTurk.recordUnstructuredData(this.id, this.value);
      });

      $('select').each(function(i, val) {
        psiTurk.recordUnstructuredData(this.id, this.value);
      });

      psiTurk.saveData({
        success: function() {
          psiTurk.completeHIT();
        }
      });
    }
  });

};
