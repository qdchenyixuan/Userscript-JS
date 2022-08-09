// ==UserScript==
// @name         ruanyifeng font
// @namespace    https://github.com/qdchenyixuan/Userscript-JS
// @version      0.1
// @description
// @author       clear
// @match        www.ruanyifeng.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const obj = document.querySelector('#container');
  obj.style.cssText = "font-family: 'PingFang SC','Helvetica Neue','Microsoft YaHei New','STHeiti Light',sans-serif;";
})();
