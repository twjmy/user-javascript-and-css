function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen();
}

function toggleContentEditable() {
  if (localStorage.getItem("contentEditable")) {
    localStorage.removeItem("contentEditable");
    document.documentElement.contentEditable = 'inherit';
    hint('結束網頁編輯模式');
  } else {
    localStorage.setItem("contentEditable", "true");
    document.documentElement.setAttribute('contenteditable', '');
    hint('按下 F2 即可結束網頁編輯模式');
  }
}

const userSelect = document.createElement("style");
userSelect.setAttribute('id', 'userSelect');
userSelect.innerHTML = `*{user-select: text !important;}`;

function toggleUserSelect() {
  if (localStorage.getItem("userSelect")) {
    localStorage.removeItem("userSelect");
    userSelect.remove();
    hint('結束網頁選取模式');
  } else {
    localStorage.setItem("userSelect", "true");
    document.documentElement.appendChild(userSelect);
    hint('按下 F4 即可結束網頁選取模式');
  }
}

const hintd = document.createElement(`div`);
document.body.appendChild(hintd);
hintd.style.cssText = `
  display: none;
  position: fixed;
  top: 10%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  padding: 8px 14px;
  background-color: rgba(0, 0, 0, 0.6);
  line-height: 1.5;
  max-width: 60%;
  border-radius: 4px;
  color: #fff;
  z-index: 2147483647;
  font-size: 14px;
  cursor: move;
`;
// from .mhy-toast in https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481
hintd.onclick = () => hintd.style.display = `none`;
hintd.onmousedown = function dragMouseDown(e) {
  e ||= window.event;
  e.preventDefault();
  // get mouse cursor position at startup:
  var posx = e.clientX, posy = e.clientY;
  hintd.onmouseup = function closeDragElement() {
    // stop moving when mouse button is released:
    hintd.onmouseup = hintd.onmousemove = null;
  };
  // call a function whenever cursor moves:
  hintd.onmousemove = function elementDrag(e) {
    e ||= window.event;
    e.preventDefault();
    // calculate new cursor position, set element's new position:
    hintd.style.left = (hintd.offsetLeft - posx + e.clientX) + "px";
    hintd.style.top = (hintd.offsetTop - posy + e.clientY) + "px";
    posx = e.clientX, posy = e.clientY;
  };
};
// https://jsfiddle.net/Tq5m3/43
async function hint(msg = null, s = 1) {
  // document.onmouseup = document.onmousemove = null;
  hintd.style.top = "10%";
  hintd.style.left = "50%";
  hintd.innerHTML = msg;
  hintd.style.display = `block`;
  hintd.endtime = Date.now() + s * 1e3;
  while(Date.now() < hintd.endtime || hintd.matches(':hover'))
    await new Promise(requestAnimationFrame);
  hintd.style.display = `none`;
}

addEventListener("keydown", event => {
  if (event.key === 'Enter' && event.altKey) toggleFullscreen();
  else if (event.key == "F2") toggleContentEditable();
  else if (event.key == "F4") toggleUserSelect();
});

if (localStorage.getItem("contentEditable")) {
  document.documentElement.setAttribute('contenteditable', '');
  hint('按下 F2 即可結束網頁編輯模式');
}
if (localStorage.getItem("userSelect")) {
  document.documentElement.appendChild(userSelect);
  hint('按下 F4 即可結束網頁選取模式');
}

~async function(){
  window.alert = message => {
    hint(message, 2);
    console.log(message);
  }
}();

// delete code bottom if you don't need AD block
const select = query => document.querySelector(query);
if (location.href.includes(`honeyhunterworld.com/`)){
  ~async function(){
    while (!select(`.ad_sidebar_video`))
      await new Promise(requestAnimationFrame);
    select(`.ad_sidebar_video`).remove();
  }();
  ~async function(){
    while (!select(`.ad_sidebar_right`))
      await new Promise(requestAnimationFrame);
    select(`.ad_sidebar_right`).remove();
  }();
  ~async function(){
    while (!select(`.ad_sidebar_left`))
      await new Promise(requestAnimationFrame);
    select(`.ad_sidebar_left`).remove();
  }();
  ~async function(){
    while (!select(`.ad_header_top`))
      await new Promise(requestAnimationFrame);
    select(`.ad_header_top`).remove();
  }();
  ~async function(){
    while (!select(`.ad_content_bottom`))
      await new Promise(requestAnimationFrame);
    select(`.ad_content_bottom`).remove();
  }();
  ~async function(){
    while (!select(`.ad_content_anchor`))
      await new Promise(requestAnimationFrame);
    select(`.ad_content_anchor`).remove();
  }();
  ~async function(){
    while (!select(`#ad-genshin-anchor`))
      await new Promise(requestAnimationFrame);
    select(`#ad-genshin-anchor`).remove();
  }();
  ~async function(){
    while (!select(`select`))
      await new Promise(requestAnimationFrame);
    for (selectElement of document.querySelectorAll(`select`)){
      selectElement.firstElementChild.innerHTML = Infinity;
      selectElement.value = Infinity;
    }
  }();
} else if (location.href.includes(`outlook.live.com/`)) {
  ~async function(){
    while (!select(`.GssDD`))
      await new Promise(requestAnimationFrame);
    while (!select(`.GssDD`)){
      select(`.GssDD`).remove();
      await new Promise(requestAnimationFrame);
    }
  }();
} else  if (location.href.includes(`ambr.top/`)) {
  ~async function(){
    while (!select(`[name="Advertisment"]`))
      await new Promise(requestAnimationFrame);
    while (select(`[name="Advertisment"]`)){
      select(`[name="Advertisment"]`).remove();
      await new Promise(requestAnimationFrame);
    }
  }();
} else  if (location.href.includes(`login.beanfun.com/`)) {
  const p=new URLSearchParams(location.search)
  if(p.get(`display_mode`) && p.get(`display_mode`)!=`4`){
    p.set(`display_mode`, 4);
    open(location.origin+location.pathname+`?`+p, `_self`)
  }
}
// 《新楓之谷》x《為美好的世界獻上祝福！》合作活動
~async function(){
  if (Date.now()>=1715788800000) return;
  const MSTWxKonoSuba3url = 'https://tw-event.beanfun.com/maplestory/event/E20240410/login.aspx';
  if (location.href==MSTWxKonoSuba3url) return;
  var day = new Date();
  day.setHours(5);
  day.setMinutes(3);
  day.setSeconds(30);
  if(new Date()>day) day.setDate(day.getDate()+1);
  console.log(`將在以下時間開啟《新楓之谷》x《為美好的世界獻上祝福！》合作活動頁面`)
  console.log(day);
  
  setTimeout(function() {
    // https://stackoverflow.com/a/25937500/13189986
    const tab = window.open(MSTWxKonoSuba3url, '_blank');
    
    // https://stackoverflow.com/a/43291970/13189986
    tab.localStorage.openpages = Date.now();
    tab.addEventListener('storage', e => {
        if(e.key == "openpages")
            tab.localStorage.page_available = Date.now();
        else if(e.key == "page_available")
            tab.close();
    }, false);
  }, day.getTime() - Date.now());
}();