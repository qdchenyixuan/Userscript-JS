// ==UserScript==
// @name         openAi 自动改缓存
// @namespace    https://github.com/qdchenyixuan/Userscript-JS
// @version      0.1
// @description  openAi 自动改缓存
// @author       clear
// @match        https://chat.openai.com/*
// @grant        GM_log
// @grant        GM_addStyle
// @license MIT

// ==/UserScript==

(function () {
  //   'use strict';
  javascript: window.localStorage.removeItem(Object.keys(window.localStorage).find(i => i.startsWith('@@auth0spajs')));
})();
