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
  z-index: 99999;
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
  localStorage.setItem("contentEditable", "true");
  document.documentElement.setAttribute('contenteditable', '');
  hint('按下 F2 即可結束網頁編輯模式');
}
if (localStorage.getItem("userSelect")) {
  localStorage.setItem("userSelect", "true");
  document.documentElement.appendChild(userSelect);
  hint('按下 F4 即可結束網頁選取模式');
}
// toggleUserSelect();

const select = query => document.querySelector(query);
if (location.href.includes(`genshin.honeyhunterworld.com/`)){
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
}

if (location.href.includes(`outlook.live.com/`)){
  ~async function(){
    while (!select(`.GssDD`))
      await new Promise(requestAnimationFrame);
    select(`.GssDD`).remove();
    select(`.GssDD`).remove();
  }();
}