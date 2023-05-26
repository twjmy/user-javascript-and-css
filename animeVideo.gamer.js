const 倒計時_秒 = 5,
  cancel = () => ifcancel = true,
  sleep = (ms = 1e3) => new Promise(resolve => setTimeout(resolve, ms));
let ifcancel = false, ended = false;
async function next(s = 0) {
  if (ended && s > 0) return ended = true;
  ended = true;
  danmutxt.addEventListener(`click`, cancel, true);
  for (; s > 0; s--) {
    danmutxt.placeholder = `${s} 秒後播放下一集/訂閱的動畫...`;
    await sleep();
    while (!document.hasFocus())
      await new Promise(requestAnimationFrame);
    if (esc()) {
      danmutxt.placeholder = `已取消繼續播放`;
      if (!document.querySelector(`.vjs-ended`)) {
        await sleep(3e3);
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
          danmutxt.placeholder = `👀這是最新的動畫了`;
          if (!document.querySelector(`.vjs-ended`)) {
            await sleep(3e3);
            danmutxt.placeholder = ``;
          }
        } else open(next, "_self");
        return ended = false;
      }
      next = a.href;
    }
    danmutxt.placeholder = `⚠️找不到下一部最近更新的動畫`;
    if (!document.querySelector(`.vjs-ended`)) {
      await sleep(3e3);
      danmutxt.placeholder = ``;
    }
    return ended = false;
  } else document.querySelector('.vjs-next-button').click();
}
function agree(event = null) {
  const qagree = `.choose-btn-agree`;
  if (document.querySelector(qagree)) {
    if (event) event.preventDefault();
    document.querySelector(qagree).click();
  }
}
function esc() {
  if (ifcancel) {
    ifcancel = false;
    return true;
  } else return false;
}
addEventListener('keydown', event => {
  if (event.defaulPrevented) return;
  if (event.key === ' ' && (
    document.querySelector(`.vjs-ended`) ||
    document.querySelector('.choose-btn-agree'))
  ) event.preventDefault();
  (event.key === `Escape` && !ifcancel) &&
    event.preventDefault();
}, true);
addEventListener('keyup', async event => {
  if (event.defaulPrevented) return;
  // https://stackoverflow.com/a/17614883/13189986
  if (
    document.activeElement == danmutxt ||
    document.activeElement == this[`anime-search-sky`]
  ) {
    switch (event.key) {
      case `Escape`: event.preventDefault();
      case `Enter`:
        return ani_video_html5_api.focus({ focusVisible: true });
    }
  } else {
    switch (event.key) {
      case 'Escape': return ifcancel = true;
      case 'Enter': return danmutxt.focus({ focusVisible: true });
      case 'P': return document.querySelector('.vjs-pre-button').click();
      case 'n': return TOPBAR_show('light_1');
      case 'N': return next();
      case ' ': return agree(event);
      case 'ArrowRight':
        if (document.querySelector(".vjs-ended")) {
          event.preventDefault();
          next();
        }
        return;
      case `J`: case `j`: case `.`: case `,`: case `>`:
        const hintsq = `hotkey-hint-show`,
          hintdq = event.shiftKey ?
            `div.hotkey-hint-left` :
            `div.hotkey-hint-right`,
          hintd = document.querySelector(hintdq),
          jump = (event.key == `J` || event.key == `J`) ?
            (event.shiftKey ? -90 : 87) : (
              (event.key == `>`) ? -30 :
                (event.shiftKey ? -30 : 29));
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

TOPBAR_show('light_1');
TOPBAR_show('light_1');

~async function (
  error = `.vjs-error>.vjs-error-display>div`,
  qagree = `.choose-btn-agree`,
  fullscreen = `.vjs-fullscreen-control:not(.fullscreen-close)`,
  searchsky = this[`anime-search-sky`],
  s = 倒計時_秒,
) {
  while (!document.querySelector(qagree))
    await new Promise(requestAnimationFrame);
  document.querySelector(`.choose-btn-agree`).onclick
    = ani_video_html5_api.onplaying = () => ani_video.requestFullscreen();
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
  searchsky.addEventListener(`click`, cancel, true);
  for (qagree = searchsky.placeholder; s > 0; s--) {
    searchsky.placeholder = `${s} 秒後播放動畫...`;
    await sleep();
    while (!document.hasFocus())
      await new Promise(requestAnimationFrame);
    if (esc()) {
      searchsky.placeholder = `已取消自動播放動畫`;
      await sleep(3e3);
      searchsky.placeholder = qagree;
      s = `esc`;
      break;
    }
  }
  if (s != `esc`) {
    searchsky.placeholder = `即將播放動畫...`;
    agree();
    searchsky.placeholder = qagree;
    // https://stackoverflow.com/a/8086091/13189986
    // ani_video.requestFullscreen();
    // document.querySelector(fullscreen).dispatchEvent(new MouseEvent(this.CLICK));
  }
  while (!document.querySelector(error)) {
    await new Promise(requestAnimationFrame);
    if (document.querySelector(error)) {
      await sleep();
      const e = document.createElement(`div`);
      document.querySelector(error).appendChild(e);
      e.addEventListener(`click`, cancel, true);
      for (s = 3; s > 0; s--) {
        await sleep();
        e.innerHTML = `${s} 秒後重新整理...`;
        if (esc()) {
          e.innerHTML = `已取消重新整理...`;
          await sleep(3e3);
          return e.remove();
        }
      }
      location.reload();
    }
  }
}();