~async function (
  icon = `.mhy-hoyolab-account-block__avatar-icon`,
  blah = `.components-home-assets-__sign-content_---`,
  blahc = `.components-common-`,
  signWrapper = blah + `sign-wrapper---38rWqB`,
  mend = blah + `mend-btn---FhiXMP`,
  remind = blahc + `remind-__index_---remind-btn---1IIL1i`,
  finish = blahc + `task-__index_---task-finish---2y0qCh`,
  resign = blahc + `resign-modal-__index_---resign-btn---3oGNt6`,
) {
  while (
    !document.querySelector(signWrapper) ||
    document.querySelector(icon).src.indexOf(`data:image`) == 0
  ) await new Promise(resolve => requestAnimationFrame(resolve))
  document.querySelector(signWrapper).click();
  while (
    document.querySelector(`.miss-num`).innerHTML == 0
  ) await new Promise(resolve => requestAnimationFrame(resolve))
  ~function resignC() {
    if (document.querySelector(mend))
      document.querySelector(mend).click();
    if (document.querySelector(resign))
      document.querySelector(resign).click();
  }();
  if (document.querySelector(remind))
    document.querySelector(remind).click();
  while (
    !document.querySelector(`.task-btn`)
  ) await new Promise(resolve => requestAnimationFrame(resolve))
  ~async function taskBtnClick(query) {
    while (
      document.querySelector(query) &&
      document.querySelectorAll(finish).length < 3
    ) for (const taskBtn of document.querySelectorAll(query)) {
      await new Promise(resolve => requestAnimationFrame(resolve))
      taskBtn.click();
    }
  }(`.task-btn`);
  resignC();
}();