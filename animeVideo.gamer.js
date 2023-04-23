async function next(s = 0) {
  for (const sleep = resolve => setTimeout(resolve, 1000); s > 0; s--) {
    danmutxt.placeholder = `${s} 秒後播放下一集/訂閱的動畫...`;
    await new Promise(sleep);
    if (esc()) {
      danmutxt.placeholder = `已取消繼續播放`;
      for (s = 3; s > 0; s--) await new Promise(sleep);
      danmutxt.placeholder = ``;
      return;
    }
  }
  danmutxt.placeholder = `即將播放下一集/訂閱的動畫...`;
  let next = '';
  if (document.querySelector(".vjs-next-button.vjs-hidden")) {
    for (const a of document.querySelectorAll(`#topBarMsgList_light_1 > div > a[data-gtm-notification="ani"]`)) {
      //  console.log(`
      //  a.href=${a.href}
      //  document.URL=${document.URL}
      //  next=${next}
      //  `);
      if (a.href == document.URL) {
        if (!next)
          danmutxt.placeholder = `⚠️找不到下一部最近更新的動畫`;
        else open(next, "_self");
        // console.log(`open(next, "_self");`);
        return;
      }
      next = a.href;
    }
  } else {
    $('.vjs-next-button').click();
    // console.log(`$('.vjs-next-button').click();`);
  }
}
function agree(event = null) {
  const qagree = `.choose-btn-agree`;
  if (document.querySelector(qagree)) {
    if (event) event.preventDefault();
    $(qagree).click();
    // console.log(`$(qagree).click();`);
  }
}
function skip(event = null) {
  const adskip = `.videoAdUiSkipButton.videoAdUiAction.videoAdUiRedesignedSkipButton`,
    nadskip = `.nativeAD-skip-button.enable`;
  if (document.querySelector(adskip)) {
    if (event) event.preventDefault();
    $(adskip).click();
    // console.log(`$(adskip).click();`);
  } else if (document.querySelector(nadskip)) {
    if (event) event.preventDefault();
    $(nadskip).click();
    // console.log(`$(nadskip).click();`);
  }
}
let ifcancel = false;
function esc() {
  if (ifcancel) {
    ifcancel = false;
    return true;
  } else return false;
}
addEventListener('keyup', (event) => {
  if (!$('.danmu-text').is(':focus')) {
    // console.log(event.key);
    switch (event.key) {
      case 'Enter':
        document.querySelector(`button.vjs-playing`).click();
        danmutxt.focus({ focusVisible: true });
        return;
      case 'Escape':
        if (!ifcancel)
          ifcancel = true;
        return;
      case ' ':
        agree(event);
        skip(event);
        return;
      case 'ArrowRight':
        if (document.querySelector(".vjs-ended"))
          next();
        return;
      case 'n':
        TOPBAR_show('light_1');
        return;
      case 'N':
        next();
        return;
      case 'P':
        $('.vjs-pre-button').click();
        // console.log(`$('.vjs-pre-button').click();`);
        return;
      case `j`:
        ani_video_html5_api.currentTime += 87;
    }
  }
}, true);

addEventListener('keydown', (event) => {
  if (event.defaulPrevented) return;
  if (event.key === ' ' && (
    document.querySelector(`.vjs-ended`) ||
    document.querySelector('.choose-btn-agree') ||
    document.querySelector('.nativeAD-skip-button.enable') ||
    document.querySelector('.videoAdUiSkipButton.videoAdUiAction.videoAdUiRedesignedSkipButton'))
  ) event.preventDefault();
}, true);

// https://stackoverflow.com/questions/17614844/javascript-jquery-detect-if-input-is-focused
// this === document.activeElement

TOPBAR_show('light_1');
TOPBAR_show('light_1');

~async function (
  ended = `.vjs-ended`,
  qagree = `.choose-btn-agree`,
  adskip = `.videoAdUiSkipButton.videoAdUiAction.videoAdUiRedesignedSkipButton`,
  nadskip = `.nativeAD-skip-button.enable`,
  fullscreen = `.vjs-fullscreen-control:not(.fullscreen-close)`,
  searchsky = window[`anime-search-sky`]) {
  while (!document.querySelector(qagree) || !document.hasFocus())
    await new Promise(resolve => requestAnimationFrame(resolve));
  qagree = searchsky.placeholder;
  let s = 10;
  for (const sleep = resolve => setTimeout(resolve, 1000); s > 0; s--) {
    searchsky.placeholder = `${s} 秒後播放動畫...`;
    await new Promise(sleep);
    if (esc()) {
      searchsky.placeholder = `已取消自動播放動畫`;
      for (s = 3; s > 0; s--) await new Promise(sleep);
      searchsky.placeholder = qagree;
      s = `esc`;
      break;
    }
  }
  if (s != `esc`) {
    searchsky.placeholder = `即將播放動畫...`;
    agree();
    searchsky.placeholder = qagree;
    ani_video.requestFullscreen();
  }
  while (!document.hasFocus() ||
    !document.querySelector(adskip) ||
    !document.querySelector(nadskip) ||
    !document.querySelector(ended)) {
    await new Promise(resolve => requestAnimationFrame(resolve));
    if (document.querySelector(ended)) { //no AD
      next(10);
      return;
    }
  }
  skip();
  while (!document.hasFocus() || !document.querySelector(ended))
    await new Promise(resolve => setTimeout(resolve, 1000));
  next(10);
}();
