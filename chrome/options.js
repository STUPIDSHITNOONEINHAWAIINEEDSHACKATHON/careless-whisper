function saveValue() {
  chrome.storage.sync.get('lovedOnesNumber', function(items) {
    if (items.lovedOnesNumber === null) {
      alert('Local storage is required for changing providers');
      return;
    }
    var number = $('#loved-ones-number').val();
    if (number) {
      chrome.storage.sync.set({ lovedOnesNumber: number }, function() {
        alert('Number saved.');
      });
    } else {
      alert('A number is needed to send information.');
    }
  });
}

function main() {
  chrome.storage.sync.get('lovedOnesNumber', function(items) {
    console.log(items.lovedOnesNumber);
    if (items.lovedOnesNumber === null) {
      alert("LocalStorage must be enabled for changing options.");
      $('#loved-ones-number').prop('disabled', true);
      return;
    }

    $('#loved-ones-number').val(items.lovedOnesNumber);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  main();
  $('#save-number').on('click', saveValue);
});
