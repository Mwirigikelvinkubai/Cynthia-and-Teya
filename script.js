/* ════════════════════════════════════════════
   Cynthia & Teya Wedding – Scripts
   ════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  var form = document.getElementById('pledge-form');
  if (!form) return;

  // ── Form submission via hidden iframe (true browser POST) ──
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var iframe = document.getElementById('hidden_iframe');
    var tempForm = document.createElement('form');
    tempForm.method = 'POST';
    tempForm.action = form.action;
    tempForm.target = 'hidden_iframe';
    tempForm.style.display = 'none';

    // Collect answered fields
    var data = new FormData(form);

    // Ensure ALL optional fields are included (blank if unanswered)
    // so Google Forms never silently rejects the submission
    var allFields = [
      'entry.152603535',   // Name
      'entry.683571240',   // Pledge amount
      'entry.1958059898',  // Redemption date
      'entry.358891089',   // Reminder
      'entry.2012485944',  // Other support
      'entry.1649045227',  // Attending
      'entry.1190288487',  // Alone or with someone
      'entry.2010179067',  // How many
      'entry.2010179067.other_option_response' // How many (Other text)
    ];
    allFields.forEach(function (key) {
      if (!data.has(key)) data.append(key, '');
    });

    data.forEach(function (value, key) {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      tempForm.appendChild(input);
    });

    document.body.appendChild(tempForm);
    tempForm.submit();
    document.body.removeChild(tempForm);

    setTimeout(function () {
      form.style.display = 'none';
      document.getElementById('success-msg').style.display = 'block';
    }, 500);
  });

  // ── Radio pill highlight ──────────────────────────────────
  document.querySelectorAll('.radio-option input[type="radio"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var name = this.name;
      document.querySelectorAll('input[name="' + name + '"]').forEach(function (r) {
        r.closest('.radio-option').classList.remove('selected');
      });
      this.closest('.radio-option').classList.add('selected');
    });
  });

  // ── Conditional: Q7 shows when attending = Yes ───────────
  document.querySelectorAll('input[name="entry.1649045227"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var q7 = document.getElementById('q7-group');
      var q8 = document.getElementById('q8-group');
      if (this.value === 'Yes') {
        q7.classList.add('visible');
      } else {
        q7.classList.remove('visible');
        q8.classList.remove('visible');
        document.querySelectorAll('#q7-group input, #q8-group input').forEach(function (i) {
          i.checked = false;
        });
        document.getElementById('q8-other-input').style.display = 'none';
      }
    });
  });

  // ── Conditional: Q8 shows when Q7 = With someone else ────
  document.addEventListener('change', function (e) {
    if (e.target.name === 'entry.1190288487') {
      var q8 = document.getElementById('q8-group');
      if (e.target.value === 'With Someone else') {
        q8.classList.add('visible');
      } else {
        q8.classList.remove('visible');
        document.querySelectorAll('#q8-group input').forEach(function (i) { i.checked = false; });
        document.getElementById('q8-other-input').style.display = 'none';
      }
    }

    // Show number input when Other is selected in Q8
    if (e.target.name === 'entry.2010179067') {
      var otherInput = document.getElementById('q8-other-input');
      if (e.target.value === '__other_option__') {
        otherInput.style.display = 'block';
        otherInput.focus();
      } else {
        otherInput.style.display = 'none';
        otherInput.value = '';
      }
    }
  });

});
