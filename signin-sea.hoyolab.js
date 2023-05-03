~async function (
  icon = `.mhy-hoyolab-account-block__avatar-icon`,
  blah = `.components-home-assets-__sign-content_---`,
  blahc = `.components-common-`,
  signWrapper = blah + `sign-wrapper---38rWqB`,
  mend = blah + `mend-btn---FhiXMP`,
  remind = blahc + `remind-__index_---remind-btn---1IIL1i`,
  finish = blahc + `task-__index_---task-finish---2y0qCh`,
  resign = blahc + `resign-modal-__index_---resign-btn---3oGNt6`,
  dialog = blahc + `common-dialog-__index_---sign-content---3PZVVu`,
) {
  while (
    !document.querySelector(signWrapper) ||
    document.querySelector(icon).src.indexOf(`data:image`) == 0
  ) await new Promise(requestAnimationFrame);
  document.querySelector(signWrapper).click();
  while (
    !document.querySelector(dialog) &&
    !document.querySelector(`.mhy-toast`) ||
    document.querySelector(`.miss-num`).innerHTML == 0
  ) await new Promise(requestAnimationFrame);
  ~function resignClick() {
    if (document.querySelector(mend))
      document.querySelector(mend).click();
    if (document.querySelector(resign))
      document.querySelector(resign).click();
  }();
  if (document.querySelector(remind))
    document.querySelector(remind).click();
  while (
    !document.querySelector(`.task-btn`)
  ) await new Promise(requestAnimationFrame)
  ~async function taskBtnClick(query) {
    while (
      document.querySelector(query) &&
      document.querySelectorAll(finish).length < 3
    ) for (const taskBtn of document.querySelectorAll(query)) {
      await new Promise(requestAnimationFrame);
      taskBtn.click();
    }
  }(`.task-btn`);
  resignClick();
}();
