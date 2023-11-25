let 倒計時_秒 = 5, autoplays = 倒計時_秒, ifcancel = false, ended = false;
const cancel = () => ifcancel = true;

async function next(s = 0) {
  if (ended && s>0) return ended = true;
  ended = true;
  danmutxt.addEventListener(`click`, cancel, true);
  for (ifcancel = false; s > 0; s--) {
    danmutxt.placeholder = `${s} 秒後播放下一集/訂閱的動畫...`;
    let endtime = Date.now() + 1e3;
    while(Date.now() < endtime)
      await new Promise(requestAnimationFrame);
    while (!document.hasFocus())
      await new Promise(requestAnimationFrame);
    if (esc()) {
      danmutxt.placeholder = `已取消繼續播放`;
      if (!document.querySelector(`.vjs-ended`)) {
        endtime = Date.now() + 倒計時_秒 * 1e3;
        while(Date.now() < endtime)
          await new Promise(requestAnimationFrame);
        danmutxt.placeholder = ``;
      }
      return ended = false;
    }
  }
  danmutxt.placeholder = `即將播放下一集/訂閱的動畫...`;
  let next = '';
  if (document.querySelector(".vjs-next-button.vjs-hidden")) {
    for (const a of document.querySelectorAll(`
      #topBarMsgList_light_1
      > div
      > a[data-gtm-notification="ani"]
    `)) {
      if (a.href == document.URL) {
        if (!next) {
          danmutxt.placeholder = `哈哈被騙了吧？沒有最新的動畫囉！`;
          const endtime = Date.now() + 倒計時_秒 * 1e3;
          while(Date.now() < endtime)
            await new Promise(requestAnimationFrame);
          danmutxt.placeholder = ``;
        } else open(next, "_self");
        return ended = false;
      }
      next = a.href;
    }
    danmutxt.placeholder = `⚠️找不到下一部最近更新的動畫`;
    const endtime = Date.now() + 2e3;
    while(Date.now() < endtime)
      await new Promise(requestAnimationFrame);
    
    for (s = 倒計時_秒; s > 0; s--) {
      danmutxt.placeholder = `${s} 秒後嘗試跳轉下一頁...`;
      let endtime = Date.now() + 1e3;
      while(Date.now() < endtime)
        await new Promise(requestAnimationFrame);
    }
    history.forward();
    danmutxt.placeholder = `已嘗試跳轉下一頁`;
    
    return ended = false;
  } else document.querySelector('.vjs-next-button').click();
}

var autoplaytip = `已取消自動播放動畫`;
function agree(event = null) {
  const qagree = `.choose-btn-agree`;
  if (document.querySelector(qagree)) {
    if (event) event.preventDefault();
    document.querySelector(qagree).click();
    autoplaytip = `正在播放動畫...`;
    cancel();
    ani_video.requestFullscreen();
  }
}

function esc() {
  if (ifcancel) {
    ifcancel = false;
    return true;
  } else return false;
}

window.addEventListener('keydown', event => {
  if (event.defaulPrevented) return;
  if (event.key === ' ' && (
    document.querySelector(`.vjs-ended`) ||
    document.querySelector('.choose-btn-agree'))
  ) event.preventDefault();
  (event.key === `Escape` && !ifcancel) &&
    event.preventDefault();
}, true);

window.addEventListener('keyup', async event => {
  // console.log(event.key,event.keyCode);
  if (event.defaulPrevented) return;
  // https://stackoverflow.com/a/17614883/13189986
  if (
    document.activeElement == document.getElementById(`danmutxt`) ||
    document.activeElement == window[`anime-search-sky`]
  ) {
    switch (event.key) {
      case `Escape`: event.preventDefault(); return cancel();
      case `Enter`:
        return ani_video_html5_api.focus({ focusVisible: true });
    }
  } else {
    switch (event.key) {
      case 'Escape': return cancel();
      case 'Enter': return danmutxt.focus({ focusVisible: true });
      case 'P': return document.querySelector('.vjs-pre-button').click();
      case 'n':
        document.querySelector('.anime_name>button').click();
        return TOPBAR_show('light_1');
      case 'N': return next();
      case ' ': return agree(event);
      case 'ArrowLeft':
        if (event.altKey) {
          return history.back();
        } else return;
      case 'ArrowRight':
        if (event.altKey) {
          return history.forward();
        } else if (document.querySelector(".vjs-ended")) {
          event.preventDefault();
          next();
        } else return;
      case `J`: case `j`: case `.`: case `,`: case `>`:
        const 
          jump = (event.key == `j` || event.key == `J`)
            ? (event.shiftKey ? -90 : 87)
            : ((event.key == `.`) ? 29 : -30),
          hintdq = jump < 0
            ? `div.hotkey-hint-left`
            : `div.hotkey-hint-right`,
          hintsq = `hotkey-hint-show`,
          hintd = document.querySelector(hintdq);
        hintd.classList.remove(hintsq);
        document.querySelector(hintdq + `>div`).innerHTML = `${Math.abs(jump)}s`;
        hintd.classList.add(hintsq);
        ani_video_html5_api.currentTime += jump;
        hintd.endtime = Date.now() + 1e3;
        while (Date.now() < hintd.endtime)
          await new Promise(requestAnimationFrame);
        document.querySelector(hintdq + `>div`).innerHTML = `5s`;
        return hintd.classList.remove(hintsq);
    }
  }
}, true);

~async function (
  error = `.vjs-error>.vjs-error-display>div`,
  qagree = `.choose-btn-agree`,
  fullscreen = `.vjs-fullscreen-control:not(.fullscreen-close)`,
  s = autoplays,
) {
  while (!document.querySelector(qagree))
    await new Promise(requestAnimationFrame);
  document.querySelector(`.choose-btn-agree`).onclick
    = ani_video_html5_api.onplaying = () => agree();
  // ani_video_html5_api.onpause = () => document.exitFullscreen();
  ani_video_html5_api.onended = () => next(倒計時_秒);
  // https://stackoverflow.com/a/57065599/13189986
  ani_video.addEventListener(`contextmenu`, event => {
    event.returnValue = true;
    (typeof event.stopPropagation === 'function') &&
      event.stopPropagation();
    (typeof event.cancelBubble === 'function') &&
      event.cancelBubble();
  }, true);
  const tipd = document.createElement(`div`);
  document.body.appendChild(tipd);
  tipd.style.cssText = `
    position: fixed;
    top: 10%;
    right: 0%;
    padding: 8px 14px;
    background-color: rgba(0, 0, 0, 0.6);
    line-height: 1.5;
    width: fit-content;
    min-width: fit-content;
    border-radius: 4px;
    color: #fff;
    z-index: 99999;
    font-size: 14px;
  `;
  tipd.innerHTML = `
    <h3>巴哈姆特動漫瘋外掛 by VJ</h3>
    <button>N</button>=訂閱<br>
    [<button>Shift</button>+]<button>J</button>=快進87秒/倒退90秒<br>
    <button>Shift</button>+<button>P</button>/<button>N</button>=上一集/下一集<br>
    <button>␣</button>=同意年齡分級<br>
    倒計時_秒=<input id="倒計時" type="number" min="0" maxlength="2"><br>
    按<button>Esc</button><span onclick="cancel()">取消</span>自動<span onclick="agree(event)">播放</span>
  `;
  // EDITED form https://www.w3schools.com/howto/howto_js_draggable.asp
  tipd.onmousedown = function dragMouseDown(e) {
    e ||= window.event;
    e.preventDefault();
    // get mouse cursor position at startup:
    var posx = e.clientX, posy = e.clientY;
    document.onmouseup = function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = document.onmousemove = null;
    };
    // call a function whenever cursor moves:
    document.onmousemove = function elementDrag(e) {
      e ||= window.event;
      e.preventDefault();
      // calculate new cursor position, set element's new position:
      tipd.style.left = (tipd.offsetLeft - posx + e.clientX) + "px";
      tipd.style.top = (tipd.offsetTop - posy + e.clientY) + "px";
      posx = e.clientX, posy = e.clientY;
    };
  };
  倒計時.value = 倒計時_秒;
  倒計時.oninput = () => {
    倒計時_秒 = autoplays
      = Number(倒計時.value) === NaN ? 倒計時_秒
      : Number(倒計時.value);
    ++autoplays;
  };
  const autoplayd = document.createElement(`div`);
  tipd.appendChild(autoplayd);
  for (ifcancel = false; autoplays > 0; autoplays--) {
    autoplayd.innerHTML = `${autoplays} 秒後播放動畫...`;
    autoplayd.endtime = Date.now() + 1e3;
    while(Date.now() < autoplayd.endtime || !document.hasFocus())
      await new Promise(requestAnimationFrame);
    if (esc()) {
      autoplayd.innerHTML = autoplaytip;
      autoplayd.endtime = Date.now() + 1e3;
      while(Date.now() < autoplayd.endtime || tipd.matches(':hover'))
        await new Promise(requestAnimationFrame);
      document.body.removeChild(tipd);
      autoplays = `esc`;
      break;
    }
  }
  if (autoplays != `esc`) {
    autoplayd.innerHTML = `正在播放動畫...`;
    agree();
    autoplayd.endtime = Date.now() + 1e3;
    while(Date.now() < autoplayd.endtime || tipd.matches(':hover'))
      await new Promise(requestAnimationFrame);
    document.body.removeChild(tipd);
    // https://stackoverflow.com/a/8086091/13189986
    // ani_video.requestFullscreen();
    // document.querySelector(fullscreen).dispatchEvent(new MouseEvent(this.CLICK));
  }
  TOPBAR_show('light_1');
  TOPBAR_show('light_1');
  while (!document.querySelector(error)) {
    await new Promise(requestAnimationFrame);
    if (document.querySelector(error)) {
      let endtime = Date.now() + 2e3;
      while(Date.now() < endtime)
        await new Promise(requestAnimationFrame);
      const e = document.createElement(`div`);
      document.querySelector(error).appendChild(e);
      e.addEventListener(`click`, cancel, true);
      window.addEventListener('keyup', async event => {
        if ( document.activeElement == window[`anime-search-sky`] ) {
          switch (event.key) {
            case `Escape`: return cancel();
            case `Enter`: return;
          }
        } else switch (event.key) {
          case ' ': return window.location.reload();
          case 'Escape': return cancel();
          case `Enter`:
            return window[`anime-search-sky`].focus({focusVisible: true});
        }
      }, true);
      for (ifcancel = false, s = 倒計時_秒; s > 0; s--) {
        e.endtime = Date.now() + 1e3;
        while(Date.now() < e.endtime)
          await new Promise(requestAnimationFrame);
        e.innerHTML = `${s} 秒後重新整理...`;
        if (esc()) {
          e.innerHTML = `已取消重新整理...`;
          e.endtime = Date.now() + 1e3;
          while(Date.now() < e.endtime)
            await new Promise(requestAnimationFrame);
          return e.remove();
        }
      }
      location.reload();
    }
  }
}();