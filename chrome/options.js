// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var defaultNumber = "8087227218";

function toggle() {
  if (window.localStorage === null) {
    alert('Local storage is required for changing providers');
    return;
  }
  if (document.getElementById('loved-ones-number').checked) {
    window.localStorage.lovedOnesNumber = defaultNumber;
  } else {
    window.localStorage.lovedOnesNumber = "";
  }
}

function main() {
  if (window.localStorage === null) {
    alert("LocalStorage must be enabled for changing options.");
    document.getElementById('loved-ones-number').disabled = true;
    return;
  }

  if (window.localStorage.lovedOnesNumber !== null) {
    document.getElementById('loved-ones-number').value = window.localStorage.lovedOnesNumber;
    return
  }

  document.getElementById('loved-ones-number').value = defaultNumber;
}

document.addEventListener('DOMContentLoaded', function () {
  main();
  document.querySelector('#default').addEventListener('click', toggle);
  document.querySelector('#gmail').addEventListener('click', toggle);
});
