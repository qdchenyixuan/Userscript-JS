// ==UserScript==
// @name         忧郁的loli Onedrive 替换CDN
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://od.hhgal.com:8080/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var s = document.createElement('link');
    s.href = "https://cdn.jsdelivr.net/npm/mdui@0.4.1/dist/css/mdui.min.css";
    // Your code here...
})();