// ==UserScript==
// @name         咪咕网页版
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        *://music.migu.cn/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  //定时器自动切换清晰度
  function BQTest() {
    const a = document.querySelector(".cp-switch").children[0];
    if (a.classList.contains("BQ")) {
      a.click();
      document.querySelector(".bit-rate").children[1].click();
    }
  }
  setInterval(BQTest, 500);

  //下载
  let windowID = getRandStr(
      "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
      100
    ),
    MediaSources = [];
  if (
    document.contentType.indexOf("audio") == 0 ||
    document.contentType.indexOf("video") == 0
  ) {
    if (location.href.indexOf("audioVideoCapturerDownloadThisLink") != -1) {
      setTimeout(function () {
        if (document.querySelector("video")) {
          document.querySelector("video").volume = 0;
          document.querySelector("video").pause();
          document.querySelector("video").remove();
        } else {
          setTimeout(this, 100);
        }
      }, 100);
    }
    let link = document.createElement("a");
    document.body.appendChild(link);
    function hide_1() {
      link.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
      link.style.color = "rgba(255, 255, 255, 0.5)";
    }
    function show_1() {
      link.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      link.style.color = "rgba(255, 255, 255, 1)";
    }
    link.style.border = "none";
    link.style.zIndex = 99999999;
    link.style.height = "31px";
    link.style.width = "20px";
    link.style.position = "fixed";
    link.style.right = "0";
    link.style.top = "50%";
    link.style.margin = "-15px 0 0 0";
    link.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    link.style.transition = "all 0.3s linear";
    link.style.cursor = "pointer";
    link.style.lineHeight = "150%";
    link.style.color = "rgba(255, 255, 255, 0.5)";
    link.style.fontSize = "30px";
    link.style.fontFamily =
      "Microsoft YaHei,Microsoft YaHei UI,Microsoft JhengHei,Microsoft JhengHei UI,Segoe UI,Lucida Grande,Helvetica,Arial,Noto Sans CJK SC,Droid Sans Fallback,Noto Sans Mono CJK SC,FreeSans,Arimo,Droid Sans,Hiragino Sans GB,Hiragino Sans GB W3,FontAwesome,PingFang SC,Source Han Sans CN,Wenquanyi Micro Hei,WenQuanYi Zen Hei,sans-serif";
    link.style.textDecoration = "none";
    link.style.transition = "all 0.3s linear";
    link.onselectstart = function () {
      return false;
    };
    link.onmousedown = function () {
      return false;
    };
    link.onmouseup = function () {
      return false;
    };
    link.onmouseover = show_1;
    link.onmouseout = hide_1;
    link.innerHTML = "\u25cb";
    let req = new XMLHttpRequest();
    req.open("GET", location.href);
    req.responseType = "blob";
    req.onload = function () {
      link.href = URL.createObjectURL(req.response);
      link.download = "";
      link.innerHTML = "\u2193";
      if (location.href.indexOf("audioVideoCapturerDownloadThisLink") != -1) {
        link.click();
        window.top.postMessage("audioVideoCapturerDownloadFinished", "*");
      }
    };
    req.send();
    return;
  }
  function getRandStr(chs, len) {
    let str = "";
    while (len--) {
      str += chs[parseInt(Math.random() * chs.length)];
    }
    return str;
  }
  function process(outerHTML) {
    let i,
      result = "";
    while (outerHTML.indexOf('src="') != -1) {
      i = outerHTML.indexOf('src="') + 5;
      while (outerHTML[i] != '"' && i < outerHTML.length) {
        result += outerHTML[i];
        ++i;
      }
      if (i < outerHTML.length) {
        result += "\r\n";
      }
      outerHTML = outerHTML.replace('src="', "");
    }
    return result;
  }
  (function () {
    let playOriginal = HTMLAudioElement.prototype.play;
    function play() {
      let link;
      if (this.src) {
        link = this.src;
      } else {
        link = process(this.outerHTML);
      }
      if (link.indexOf("blob") != 0) {
        window.top.postMessage(Array("audioVideoCapturer", link), "*");
      }
      return playOriginal.call(this);
    }
    HTMLAudioElement.prototype.play = play;
    HTMLAudioElement.prototype.play.toString = function () {
      return "function play() { [native code] }";
    };
  })();
  (function () {
    let playOriginal = HTMLVideoElement.prototype.play;
    function play() {
      let link;
      if (this.src) {
        link = this.src;
      } else {
        link = process(this.outerHTML);
      }
      if (link.indexOf("blob") != 0) {
        window.top.postMessage(Array("audioVideoCapturer", link), "*");
      }
      return playOriginal.call(this);
    }
    HTMLVideoElement.prototype.play = play;
    HTMLVideoElement.prototype.play.toString = function () {
      return "function play() { [native code] }";
    };
  })();
  (function () {
    let MediaSourceOriginal = MediaSource;
    class MediaSourcE extends MediaSourceOriginal {
      constructor() {
        super();
        this.content = [];
        let id = getRandStr(
          "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
          100
        );
        MediaSources[id] = this;
        window.top.postMessage(Array("audioVideoCapturer", id, windowID), "*");
      }
    }
    window.MediaSource = MediaSourcE;
    MediaSource.toString = function () {
      return "function MediaSource() { [native code] }";
    };
  })();
  (function () {
    let addSourceBufferOriginal = MediaSource.prototype.addSourceBuffer;
    function addSourceBuffer(mimeType) {
      let result = addSourceBufferOriginal.call(this, mimeType);
      this.content.push(result);
      result.mimeType = mimeType;
      result.content = [];
      return result;
    }
    MediaSource.prototype.addSourceBuffer = addSourceBuffer;
    MediaSource.prototype.addSourceBuffer.toString = function () {
      return "function addSourceBuffer() { [native code] }";
    };
  })();
  (function () {
    let appendBufferOriginal = SourceBuffer.prototype.appendBuffer;
    function appendBuffer(data) {
      if (this.content == undefined) {
        this.content = [];
      }
      this.content.push(data);
      return appendBufferOriginal.call(this, data);
    }
    SourceBuffer.prototype.appendBuffer = appendBuffer;
    SourceBuffer.prototype.appendBuffer.toString = function () {
      return "function appendBuffer() { [native code] }";
    };
  })();
  window.addEventListener("message", function (event) {
    if (event.data[0] == "audioVideoCapturerDownload") {
      if (event.data[1] == windowID) {
        let content,
          link = document.createElement("a");
        link.download = "";
        for (let i in MediaSources[event.data[2]].content) {
          content = [];
          for (let j in MediaSources[event.data[2]].content[i].content) {
            content = content.concat(
              MediaSources[event.data[2]].content[i].content[j]
            );
          }
          content = new Blob(content, {
            type: MediaSources[event.data[2]].content[i].mimeType,
          });
          link.href = URL.createObjectURL(content);
          link.click();
        }
        window.top.postMessage("audioVideoCapturerDownloadFinished", "*");
      } else {
        for (let i = 0; i < frames.length; i++) {
          frames[i].postMessage(event.data, "*");
        }
      }
    }
  });
  let lastBackquote = 0,
    backquoteNum = 1,
    iframe2,
    forceEnableIntervalID,
    downloading = 0,
    style2;
  function forceEnable() {
    if (document.body) {
      forceEnableIntervalID = setInterval(function () {
        document.body.onkeydown = function (event) {
          if (event.key == "`") {
            let time = new Date().valueOf();
            if (time - lastBackquote <= 5000) {
              backquoteNum++;
              if (backquoteNum == 100) {
                clearInterval(forceEnableIntervalID);
                document.body.onkeydown = undefined;
                alert("AudioVideoCapturer is enabled by force!");
                window.top.postMessage("audioVideoCapturerShow", "*");
              }
            } else {
              lastBackquote = time;
              backquoteNum = 0;
            }
          } else {
            lastBackquote = 0;
          }
        };
      }, 100);
    } else {
      setTimeout(forceEnable, 25);
    }
  }
  forceEnable();
  function showUI() {
    if (document.body) {
      function hide_1() {
        iframe.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        iframe.contentDocument.body.style.color = "rgba(255, 255, 255, 0.4)";
      }
      function show_1() {
        iframe.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        iframe.contentDocument.body.style.color = "rgba(255, 255, 255, 0.8)";
      }
      function show_2_hide_1() {
        iframe2.style.transform = "translate(-300px, 0)";
        iframe.contentDocument.body.onmousemove = undefined;
        iframe.contentDocument.body.onmouseout = undefined;
        iframe.contentDocument.body.onmouseover = undefined;
        setTimeout(function () {
          iframe.style.backgroundColor = "rgba(0, 0, 0, 0)";
          iframe.contentDocument.body.style.color = "rgba(255, 255, 255, 0)";
        }, 50);
      }
      function show_1_hide_2() {
        iframe2.style.transform = "none";
        iframe.contentDocument.body.onmousemove = show_1;
        iframe.contentDocument.body.onmouseover = show_1;
        iframe.contentDocument.body.onmouseout = hide_1;
        hide_1();
      }
      let iframe = document.createElement("iframe"); //to cope with different CSS Style and DOCTYPE
      iframe.style.border = "none";
      iframe.style.zIndex = 99999999;
      iframe.style.height = "31px";
      iframe.style.width = "23px";
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.top = "50%";
      iframe.style.margin = "-15px 0 0 0";
      iframe.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      iframe.style.transition = "all 0.3s linear";
      document.body.appendChild(iframe);
      setTimeout(function () {
        iframe.contentDocument.body.style.cursor = "pointer";
        iframe.contentDocument.body.style.margin = 0;
        iframe.contentDocument.body.style.lineHeight = "150%";
        iframe.contentDocument.body.style.color = "rgba(255, 255, 255, 0.4)";
        iframe.contentDocument.body.style.fontSize = "20px";
        iframe.contentDocument.body.style.fontFamily =
          "Microsoft YaHei,Microsoft YaHei UI,Microsoft JhengHei,Microsoft JhengHei UI,Segoe UI,Lucida Grande,Helvetica,Arial,Noto Sans CJK SC,Droid Sans Fallback,Noto Sans Mono CJK SC,FreeSans,Arimo,Droid Sans,Hiragino Sans GB,Hiragino Sans GB W3,FontAwesome,PingFang SC,Source Han Sans CN,Wenquanyi Micro Hei,WenQuanYi Zen Hei,sans-serif";
        iframe.contentDocument.body.style.transition = "all 0.3s linear";
        setTimeout(function () {
          iframe.contentDocument.body.innerHTML = "\u300a";
        }, 500);
        iframe.contentDocument.body.onclick = show_2_hide_1;
        iframe.contentDocument.body.onmouseover = show_1;
        iframe.contentDocument.body.onmouseout = hide_1;
        iframe.contentDocument.body.onselectstart = function () {
          return false;
        };
        iframe.contentDocument.body.onmousedown = function () {
          return false;
        };
        iframe.contentDocument.body.onmouseup = function () {
          return false;
        };
      }, 100);
      document.body.appendChild(iframe2);
      iframe2.style.border = "none";
      iframe2.style.zIndex = 99999999;
      iframe2.style.height = "100%";
      iframe2.style.width = "300px";
      iframe2.style.position = "fixed";
      iframe2.style.left = "100%";
      iframe2.style.top = "0";
      iframe2.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      iframe2.style.transition = "all 0.3s";
      setTimeout(function () {
        iframe2.contentDocument.body.style.whiteSpace = "pre";
        iframe2.contentDocument.body.style.color = "#fff";
        iframe2.contentDocument.body.style.lineHeight = "140%";
        iframe2.contentDocument.body.style.fontSize = "1.0em";
        iframe2.contentDocument.body.style.paddingTop = "4px";
        let style = iframe2.contentDocument.createElement("style");
        style.innerHTML =
          '@keyframes loading{0%{left:-20%;}100%{left:100%;}}.loading{overflow:hidden;background:rgba(255,255,255,0.2);transition:background 0.5s linear;}.loading::after{content:"";display:block;position:relative;background:rgba(255,255,255,0.8);height:100%;width:20%;animation:loading 2s linear infinite;transition:background 0.5s linear;}';
        style2 = iframe2.contentDocument.createElement("style");
        style2.id = "style2";
        style2.innerHTML =
          ".loading{background:rgba(255,255,255,0.075)}.loading::after{background:transparent}";
        iframe2.contentDocument.body.appendChild(style);
        iframe2.contentDocument.body.appendChild(style2);
        let loading = iframe2.contentDocument.createElement("div");
        loading.className = "loading";
        setTimeout(function () {
          iframe2.contentDocument.body.appendChild(loading);
          setTimeout(function () {
            loading.style.position = "fixed";
            loading.style.right = "0";
            loading.style.top = "0";
            loading.style.height = "4px";
            loading.style.width = "300px";
          }, 25);
        }, 25);
        iframe2.contentDocument.body.style.fontFamily =
          "Microsoft YaHei,Microsoft YaHei UI,Microsoft JhengHei,Microsoft JhengHei UI,Segoe UI,Lucida Grande,Helvetica,Arial,Noto Sans CJK SC,Droid Sans Fallback,Noto Sans Mono CJK SC,FreeSans,Arimo,Droid Sans,Hiragino Sans GB,Hiragino Sans GB W3,FontAwesome,PingFang SC,Source Han Sans CN,Wenquanyi Micro Hei,WenQuanYi Zen Hei,sans-serif";
        let clickTime;
        iframe2.contentDocument.onclick = function () {
          let time = new Date().valueOf();
          if (time - clickTime <= 400) {
            show_1_hide_2();
            clickTime = 0;
          } else {
            clickTime = time;
          }
        };
      }, 50);
    } else {
      setTimeout(showUI, 25);
    }
  }
  let show = false;
  if (window.top == window) {
    window.addEventListener("message", function (event) {
      if (event.data == "audioVideoCapturerDownloadFinished") {
        downloading--;
        if (!downloading) {
          iframe2.contentDocument.body.appendChild(style2);
        }
      }
    });
    window.addEventListener("message", function (event) {
      if (event.data == "audioVideoCapturerShow" && show == false) {
        show = true;
        iframe2 = document.createElement("iframe");
        window.addEventListener("message", function (event) {
          if (event.data[0] == "audioVideoCapturer") {
            function addToList() {
              if (iframe2.contentDocument) {
                let id = getRandStr(
                    "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
                    100
                  ),
                  elt = iframe2.contentDocument.createElement("a");
                iframe2.contentDocument.body.appendChild(elt);
                if (event.data[2]) {
                  elt.outerHTML =
                    '<a id="' +
                    id +
                    '" style="text-decoration: underline; cursor: pointer;">' +
                    event.data[1].slice(0, 20) +
                    "</a>\r\n";
                  iframe2.contentDocument.getElementById(id).onclick =
                    function () {
                      window.postMessage(
                        [
                          "audioVideoCapturerDownload",
                          event.data[2],
                          event.data[1],
                        ],
                        "*"
                      );
                      for (let i = 0; i < frames.length; i++) {
                        frames[i].postMessage(
                          [
                            "audioVideoCapturerDownload",
                            event.data[2],
                            event.data[1],
                          ],
                          "*"
                        );
                      }
                      downloading++;
                      if (
                        iframe2.contentDocument.getElementById("style2") &&
                        downloading
                      ) {
                        iframe2.contentDocument
                          .getElementById("style2")
                          .remove();
                      }
                    };
                } else {
                  elt.outerHTML =
                    '<a id="' +
                    id +
                    '" style="text-decoration: underline; cursor: pointer;">' +
                    event.data[1] +
                    "</a>\r\n";
                  iframe2.contentDocument.getElementById(id).onclick =
                    function () {
                      /*
                                        let link = document.createElement("a");
                                        link.href = event.data[1];
                                        link.click();
                                        setTimeout(function() {
                                            location.href = event.data[1];
                                        }, 200);
                                        */
                      let f = document.createElement("iframe");
                      let src = event.data[1];
                      if (src.indexOf("?") == -1) {
                        src += "?audioVideoCapturerDownloadThisLink";
                      } else {
                        src += "&audioVideoCapturerDownloadThisLink";
                      }
                      f.src = src;
                      f.style.position = "fixed";
                      f.style.zIndex = -99999999;
                      f.style.height = "10px";
                      f.style.width = "10px";
                      f.style.top = "-1000px";
                      f.style.left = "-1000px";
                      document.body.appendChild(f);
                      downloading++;
                      if (
                        iframe2.contentDocument.getElementById("style2") &&
                        downloading
                      ) {
                        iframe2.contentDocument
                          .getElementById("style2")
                          .remove();
                      }
                    };
                }
              } else {
                setTimeout(addToList, 25);
              }
            }
            addToList();
          }
        });
        showUI();
      }
    });
  }
  if (
    location.href.toLocaleLowerCase().indexOf("youku") != -1 ||
    location.href.toLocaleLowerCase().indexOf("play") != -1 ||
    location.href.toLocaleLowerCase().indexOf("sing") != -1 ||
    location.href.toLocaleLowerCase().indexOf("song") != -1 ||
    location.href.toLocaleLowerCase().indexOf("album") != -1 ||
    location.href.toLocaleLowerCase().indexOf("audio") != -1 ||
    location.href.toLocaleLowerCase().indexOf("music") != -1 ||
    location.href.toLocaleLowerCase().indexOf("yinyue") != -1 ||
    location.href.toLocaleLowerCase().indexOf("video") != -1 ||
    location.href.toLocaleLowerCase().indexOf("movie") != -1 ||
    location.href.toLocaleLowerCase().indexOf("film") != -1 ||
    location.href.toLocaleLowerCase().indexOf("watch") != -1 ||
    location.href.toLocaleLowerCase().indexOf("dianying") != -1 ||
    location.href.toLocaleUpperCase().indexOf("%E6%AD%8C") != -1 ||
    location.href.toLocaleUpperCase().indexOf("%E4%B9%90") != -1 ||
    location.href.toLocaleUpperCase().indexOf("%E6%9B%B2") != -1 ||
    location.href.toLocaleUpperCase().indexOf("%E5%BD%B1") != -1 ||
    location.href.toLocaleUpperCase().indexOf("%E5%89%A7") != -1
  ) {
    window.top.postMessage("audioVideoCapturerShow", "*");
  }
})();
