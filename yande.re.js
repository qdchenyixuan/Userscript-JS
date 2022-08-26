// ==UserScript==
// @name         yande keybord turn pages  键盘翻页  ページをめくる
// @namespace    https://yande.re/*
// @version      0.1
// @description  yande keybord turn pages  键盘翻页  ページをめくる
// @author       clear
// @match        https://yande.re/*
// @grant        GM_log
// @grant        GM_addStyle
// @license      MIT

// ==/UserScript==

(function () {
  'use strict';
  let href = window.location.href;
  let uArray = href.split('/');
  let pageId = parseInt(uArray[uArray.length - 1]);

  window.addEventListener('keyup', function (e) {
    if (e.keyCode == 37) {
      window.location.href = pageId - 1;
    } else if (e.keyCode == 39) {
      window.location.href = pageId + 1;
    }
  });
})();
