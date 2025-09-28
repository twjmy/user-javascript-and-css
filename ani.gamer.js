let ifcancel = false, ended = false;
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
        endtime = Date.now() + setSeconds * 1e3;
        while(Date.now() < endtime)
          await new Promise(requestAnimationFrame);
        danmutxt.placeholder = ``;
      }
      return ended = false;
    }
  }

  // danmutxt.placeholder = `嘗試跳轉下一頁`;
  // history.forward();

  danmutxt.placeholder = `即將播放下一集/訂閱的動畫...`;
  let next = '';
  if (document.querySelector(".vjs-next-button.vjs-hidden")) {
    for (const a of document.querySelectorAll(`
      #topBarMsgList_light_1
      > div
      > a[data-gtm-notification="ani"]
    `)) {
      if (a.href == location.origin+location.pathname+`?sn=`+new URLSearchParams(location.search).get(`sn`)) {
        if (next) open(next, "_self");
        else {
          danmutxt.placeholder = `哈哈被騙了吧？沒有最新的動畫囉！`;
          const endtime = Date.now() + setSeconds * 1e3;
          while(Date.now() < endtime)
            await new Promise(requestAnimationFrame);
          danmutxt.placeholder = ``;
        }
        return ended = false;
      }
      next = a.href;
    }
    danmutxt.placeholder = `⚠️找不到下一部最近更新的動畫`;
    while (!TOPBAR_show)
      await new Promise(requestAnimationFrame);
    TOPBAR_show('light_1');
    const endtime = Date.now() + 2e3;
    while(Date.now() < endtime)
      await new Promise(requestAnimationFrame);
    
    for (s = localStorage.getItem("seconds") ?
     localStorage.getItem("seconds") : 5; s > 0; s--) {
      danmutxt.placeholder = `${s} 秒後嘗試跳轉下一頁...`;
      let endtime = Date.now() + 1e3;
      while(Date.now() < endtime)
        await new Promise(requestAnimationFrame);
    }
    history.forward();
    danmutxt.placeholder = `已嘗試跳轉下一頁`;
    
    return ended = false;
  } else {
    document.querySelector('.vjs-next-button').click();
    while (!document.querySelector(`.choose-btn-agree`))
      await new Promise(requestAnimationFrame);
    agree();
    const endtime = Date.now() + 2e3;
    while(Date.now() < endtime)
      await new Promise(requestAnimationFrame);
    ani_video_html5_api.addEventListener(`ended`, () => next(setSeconds), true);
  }
}

function esc() {
  if (ifcancel) {
    ifcancel = false;
    return true;
  } else return false;
}

let keyDown = {};
window.addEventListener('keydown', event => {
  if (event.defaulPrevented) return;
  if (typeof keyDown[event.key] !== 'number')
    keyDown[event.key] = Date.now();
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
      case `Enter`: return ani_video_html5_api.focus({ focusVisible: true });
    }
  } else if ( Array.from(
      document.querySelectorAll(".input-article-content[contenteditable]"))
        .find(node => node.isEqualNode(document.activeElement))
   ) {
    switch (event.key) {
      case `Enter`: return;
    }
  } else {
    switch (event.key.toLowerCase()) {
      case 'escape': return cancel();
      case 'enter': return danmutxt.focus({ focusVisible: true });
      case 'p': return event.shiftKey ? 
        document.querySelector('.vjs-pre-button').click() :
        document.querySelector('.anime_name>button').click();
      case 'n':
        return event.shiftKey ?
          next() : TOPBAR_show('light_1');
      case ' ': case 'f': return agree(event);
      case 'arrowleft':
        if (event.altKey) {
          return history.back();
        } else return;
      case 'arrowright':
        if (event.altKey) {
          return history.forward();
        } else if (document.querySelector(".vjs-ended")) {
          event.preventDefault();
          next();
          return;
        } else return agree(event);
      case `j`: case `.`: case `,`: case `>`:
        agree(event);
        const 
          jump = event.key.toLowerCase() == `j`? (
            event.shiftKey? -90 : 87): (
              event.key != `.`? -30: (
                Date.now()-keyDown[`.`] > 1e3? 87 : 29
              )
            ),
          hintsq = `hotkey-hint-show`,
          hintd = document.querySelector(jump < 0 ?
            `div.hotkey-hint-left`:
            `div.hotkey-hint-right`
          );
        keyDown = {};
        hintd.classList.remove(hintsq);
        hintd.lastElementChild.innerHTML
          = `${Math.abs(jump)}s`;
        hintd.classList.add(hintsq);
        ani_video_html5_api.currentTime += jump;
        hintd.endtime = Date.now() + 1e3;
        while (Date.now() < hintd.endtime)
          await new Promise(requestAnimationFrame);
        hintd.lastElementChild.innerHTML = `5s`;
        return !event.shiftKey&& event.key.toLowerCase() !== `,`&&
          document.querySelector(".vjs-ended")?
          next() : hintd.classList.remove(hintsq);
    }
  }
}, true);

function agree(event = null) {
  const qagree = `.choose-btn-agree`;
  if (document.querySelector(qagree)) {
    if (event) event.preventDefault();
    document.querySelector(qagree).click();
    cancel();
    if(
      localStorage.getItem(`autoFullscreen`) ? true : false ||
      event && event.key.toLowerCase() == `f`
    ) {
      // ani_video.requestFullscreen();
      document.querySelector(`.vjs-fullscreen-control:not(.fullscreen-close)`).click();
    }
  }
}

~async function (
  error = `.vjs-error>.vjs-error-display>div`,
  qagree = `.choose-btn-agree`,
  fullscreen = `.vjs-fullscreen-control:not(.fullscreen-close)`,
  s = localStorage.getItem("seconds") ?
    localStorage.getItem("seconds") : 5,
) {
  while (!document.querySelector(qagree))
    await new Promise(requestAnimationFrame);
  document.querySelector(`.choose-btn-agree`)
    .addEventListener("click", () => agree(), true);
  ani_video_html5_api.addEventListener(`playing`, () => agree(), true);
  // ani_video_html5_api.addEventListener(`pause`, () => document.exitFullscreen()), true);
  ani_video_html5_api.addEventListener(`ended`, () => next(setSeconds), true);
  // https://stackoverflow.com/a/57065599/13189986
  ani_video.addEventListener(`contextmenu`, event => {
    event.returnValue = true;
    (typeof event.stopPropagation === 'function') &&
      event.stopPropagation();
    (typeof event.cancelBubble === 'function') &&
      event.cancelBubble();
  }, true);
  
  while (!document.getElementById(`ani-tab-content-2`))
    await new Promise(requestAnimationFrame);
  const tabContent  = document.getElementById(`ani-tab-content-2`);
  
  const settingSection = document.createElement(`div`);
  settingSection.classList.add(`ani-setting-section`, `is-seperate`);
  tabContent.insertBefore(settingSection, tabContent.firstChild);
  settingSection.innerHTML = `
<div class="ani-setting-item ani-flex" style="padding: 4px 16px 4px 0;">
  <span class="ani-setting-title" style="display:inline-block">⚙️擴充功能 by VJ</span>
  <span class="ani-setting-value ani-set-flex-right">
    <span class="vipmark">add-on</span>
  </span>
</div>

<div class="ani-setting-item ani-flex">
  <div class="ani-setting-label">
    <span class="ani-setting-label__mian">倒計時</span>
    <div class="qa-icon" tip-content="單位:秒" style="display:inline-block; top:1px;">
      <img src="https://i2.bahamut.com.tw/anime/smallQAicon.svg">
    </div>
  </div>
  <div class="ani-setting-value ani-set-flex-right">
    <input id="inputSeconds" type="number" min="0" maxlength="2" size="2" placeholder="秒" class="ani-input" style="width: 5rem;">
  </div>
</div>

<div class="ani-setting-item ani-flex">
  <div class="ani-setting-label">
    <span class="ani-setting-label__mian">自動全螢幕(需按鍵觸發)</span>
  </div>
  <div class="ani-setting-value ani-set-flex-right">
    <div class="ani-checkbox">
      <label class="ani-checkbox__label">
        <input id="inputFull" type="checkbox" name="ani-checkbox" checked>
        <div class="ani-checkbox__button"></div>
      </label>
    </div>
  </div>
</div>

<div class="ani-setting-item ani-flex">
  <div class="ani-setting-label">
    <span class="ani-setting-label__mian">自動播放</span>
  </div>
  <div class="ani-setting-value ani-set-flex-right">
    <div class="ani-checkbox">
      <label class="ani-checkbox__label">
        <input id="inputAutoplay" type="checkbox" name="ani-checkbox" checked>
        <div class="ani-checkbox__button"></div>
      </label>
    </div>
  </div>
</div>

<div class="ani-setting-item ani-flex">
  <div class="ani-setting-label">
    <span class="ani-setting-label__mian">取消自動播放</span>
    <div class="qa-icon" tip-content="點擊右側按鈕亦可作用" style="display:inline-block; top:1px;">
      <img src="https://i2.bahamut.com.tw/anime/smallQAicon.svg">
    </div>
  </div>
  <div class="ani-setting-value ani-set-flex-right">
    <a role="button" class="bluebtn" style="cursor:pointer;user-select:none;" onclick="cancel()">Esc</a>
  </div>
</div>

<div class="ani-setting-item ani-flex">
  <div class="ani-setting-label">
    <span class="ani-setting-label__mian">訂閱</span>
    <div class="qa-icon" tip-content="鍵盤固定快捷鍵" style="display:inline-block; top:1px;">
      <img src="https://i2.bahamut.com.tw/anime/smallQAicon.svg">
    </div>
  </div>
  <div class="ani-setting-value ani-set-flex-right">
    <span class="ani-setting-label__mian">N</span>
  </div>
</div>

<div class="ani-setting-item ani-flex">
  <div class="ani-setting-label">
    <span class="ani-setting-label__mian">快進87秒</span>
    <div class="qa-icon" tip-content="鍵盤固定快捷鍵" style="display:inline-block; top:1px;">
      <img src="https://i2.bahamut.com.tw/anime/smallQAicon.svg">
    </div>
  </div>
  <div class="ani-setting-value ani-set-flex-right">
    <span class="ani-setting-label__mian">J</span>
  </div>
</div>

<div class="ani-setting-item ani-flex">
  <div class="ani-setting-label">
    <span class="ani-setting-label__mian">倒退90秒</span>
    <div class="qa-icon" tip-content="鍵盤固定快捷鍵" style="display:inline-block; top:1px;">
      <img src="https://i2.bahamut.com.tw/anime/smallQAicon.svg">
    </div>
  </div>
  <div class="ani-setting-value ani-set-flex-right">
    <span class="ani-setting-label__mian">Shift + J</span>
  </div>
</div>

<div class="ani-setting-item ani-flex">
  <div class="ani-setting-label">
    <span class="ani-setting-label__mian">上一集/下一集</span>
    <div class="qa-icon" tip-content="鍵盤固定快捷鍵" style="display:inline-block; top:1px;">
      <img src="https://i2.bahamut.com.tw/anime/smallQAicon.svg">
    </div>
  </div>
  <div class="ani-setting-value ani-set-flex-right">
    <span class="ani-setting-label__mian">Shift + P / N</span>
  </div>
</div>

<div class="ani-setting-item ani-flex">
  <div class="ani-setting-label">
    <span class="ani-setting-label__mian">同意年齡分級</span>
    <div class="qa-icon" tip-content="鍵盤固定快捷鍵" style="display:inline-block; top:1px;">
      <img src="https://i2.bahamut.com.tw/anime/smallQAicon.svg">
    </div>
  </div>
  <div class="ani-setting-value ani-set-flex-right">
    <span class="ani-setting-label__mian">空格</span>
  </div>
</div>
  `;

  let setSeconds = s;
  inputSeconds.value = setSeconds;
  inputSeconds.oninput = () => {
    localStorage.setItem("seconds",
      setSeconds = s
        = Number(inputSeconds.value) === NaN ? setSeconds
        : Number(inputSeconds.value)
    );
    ++s;
  };

  inputFull.checked = localStorage.getItem(`autoFullscreen`)?true:false;
  inputFull.onchange = () => inputFull.checked ?
    localStorage.setItem(`autoFullscreen`, true):
    localStorage.removeItem(`autoFullscreen`);

  inputAutoplay.checked = localStorage.getItem(`autoplay`)?true:false;
  inputAutoplay.onchange = () => inputAutoplay.checked ?
    localStorage.setItem(`autoplay`, true):
    localStorage.removeItem(`autoplay`);

  const autoplayd = window[`anime-search-sky`];
  if (!localStorage.getItem(`autoplay`)) {
    s = `esc`;
    autoplayd.placeholder = `請輸入動畫名稱`;
  }
  else for (ifcancel = false; s > 0; s--) {
    autoplayd.placeholder = `請輸入動畫名稱...${s} 秒後播放動畫`;
    autoplayd.endtime = Date.now() + 1e3;
    while(Date.now() < autoplayd.endtime || !document.hasFocus())
      await new Promise(requestAnimationFrame);
    if (esc() || !localStorage.getItem(`autoplay`)) {
      autoplayd.placeholder = document.querySelector(`.choose-btn-agree`)?
        `請輸入動畫名稱...已取消自動播放動畫`:
        `請輸入動畫名稱...正在播放動畫`;
      autoplayd.endtime = Date.now() + 1e3;
      while(Date.now() < autoplayd.endtime)
        await new Promise(requestAnimationFrame);
      autoplayd.placeholder = `請輸入動畫名稱`;
      s = `esc`;
      break;
    }
  }
  if (s != `esc`) {
    autoplayd.placeholder = `正在播放動畫...`;
    agree();
    autoplayd.endtime = Date.now() + 1e3;
    while(Date.now() < autoplayd.endtime)
      await new Promise(requestAnimationFrame);
    autoplayd.placeholder = `請輸入動畫名稱`;
    // https://stackoverflow.com/a/8086091/13189986
    // // ani_video.requestFullscreen();
    // document.querySelector(`.vjs-button.vjs-fullscreen-control`).click();
    // document.querySelector(fullscreen).dispatchEvent(new MouseEvent(this.CLICK));
  }
  while (!TOPBAR_show)
    await new Promise(requestAnimationFrame);
  TOPBAR_show('light_1');
  TOPBAR_show('light_1');
  while (!document.querySelector(`
    #topBarMsgList_light_1
    > div
    > a[data-gtm-notification="ani"]
  `)) await new Promise(requestAnimationFrame);
  for (const a of document.querySelectorAll(`
    #topBarMsgList_light_1
    > div
    > a[data-gtm-notification="ani"]
  `)) a.target='_self';
  while (!document.querySelector(error))
    await new Promise(requestAnimationFrame);
  let endtime = Date.now() + 2e3;
  while(Date.now() < endtime)
    await new Promise(requestAnimationFrame);
  let e = document.querySelector(`.choose-btn-agree`);
  if (!e) {
    e = document.createElement(`div`);
    document.querySelector(error).appendChild(e);
  }
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
  for (ifcancel = false, s = setSeconds; s > 0; s--) {
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
}();