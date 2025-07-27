// Check ban
if (localStorage.getItem('bannedUntil')) {
  const bannedUntil = parseInt(localStorage.getItem('bannedUntil'));
  if (Date.now() < bannedUntil) {
    alert("You are banned temporarily due to eligibility conditions.");
    window.close();
  } else {
    localStorage.removeItem('bannedUntil');
  }
}

const form = document.getElementById('donationForm');
const modal = new bootstrap.Modal(document.getElementById('warningModal'));
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');

let formData;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  formData = new FormData(form);
  modal.show();
});

confirmBtn.addEventListener('click', function () {
  const age = parseInt(formData.get('age'));
  const med = formData.get('medCondition');

  if (med === 'Yes' || age < 18 || age > 50) {
    alert("You're not eligible. You are banned for 1 minute.");
    localStorage.setItem('bannedUntil', (Date.now() + 60000).toString());
    window.close();
  } else {
    alert("Form submitted successfully!");
    form.reset();
    modal.hide();
  }
});

cancelBtn.addEventListener('click', function () {
  modal.hide();
});