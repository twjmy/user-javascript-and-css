function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen();
}

function toggleContentEditable() {
  if (document.documentElement.contentEditable == 'inherit') {
    document.documentElement.setAttribute('contenteditable', '');
    hint('按下 F2 即可結束網頁編輯模式');
  } else document.documentElement.contentEditable = 'inherit';
}

const userSelect = document.createElement("style");
userSelect.setAttribute('id', 'userSelect');
userSelect.innerHTML = `*{user-select: text !important;}`;

function toggleUserSelect() {
  if (!document.querySelector(`#userSelect`)) {
    document.documentElement.appendChild(userSelect);
    hint('按下 F4 即可結束網頁選取模式');
  } else userSelect.remove();
}

const el = document.createElement("div");
el.setAttribute('class', 'modal');
// https://jsfiddle.net/Tq5m3/43/
function hint(msg = null, duration = 1000) {
  el.removeAttribute('style')
  el.setAttribute('style', `
		background-color: rgba(0,0,0,0.5);
		color:white; 
		position: sticky;
		bottom:95%;
		padding:10px;
		font-weight:bold;
		text-align: center;
		z-index:2147483647;
    	`);
  el.innerHTML = msg;
  setTimeout(() => el.parentNode.removeChild(el), duration);
  document.body.appendChild(el);
}

addEventListener("keydown", (event) => {
  if (event.key === 'Enter' && event.altKey) toggleFullscreen();
  else if (event.key == "F2") toggleContentEditable();
  else if (event.key == "F4") toggleUserSelect();
});