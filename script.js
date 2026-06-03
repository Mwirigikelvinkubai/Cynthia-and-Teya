/* ════════════════════════════════════════════
   Cynthia & Teya Wedding – Scripts
   ════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Form submission via fetch (no-cors) ──────────────────
  // Google Forms blocks cross-origin redirects, so we use
  // fetch with mode:'no-cors' — data goes through, we just
  // can't read the response (which is fine).
  var form = document.getElementById('pledge-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Google Forms requires URL-encoded body, not multipart
      var params = new URLSearchParams(new FormData(form));

      fetch(form.action, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      })
      .then(function () {
        form.style.display = 'none';
        document.getElementById('success-msg').style.display = 'block';
      })
      .catch(function () {
        // no-cors never rejects on network success,
        // but just in case — still show success
        form.style.display = 'none';
        document.getElementById('success-msg').style.display = 'block';
      });
    });
  }

  // ── Radio pill highlight ─────────────────────────────────
  document.querySelectorAll('.radio-option input[type="radio"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var name = this.name;
      document.querySelectorAll('input[name="' + name + '"]').forEach(function (r) {
        r.closest('.radio-option').classList.remove('selected');
      });
      this.closest('.radio-option').classList.add('selected');
    });
  });

});
