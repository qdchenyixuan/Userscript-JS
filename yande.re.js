// ==UserScript==
// @name         Yande.re Keyboard
// @namespace    https://github.com/qdchenyixuan/Userscript-JS
// @version      0.1
// @description
// @author       clear
// @match        https://yande.re/post*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
        let href = window.location.href;
        let uArray = href.split("/");
        let pageId = parseInt(uArray[uArray.length-1]);

        window.addEventListener('keyup', function(e){
          if(e.keyCode == 37){
          window.location.href= pageId - 1;
        } else if(e.keyCode == 39){
          window.location.href= pageId + 1;
        }
    });
})();