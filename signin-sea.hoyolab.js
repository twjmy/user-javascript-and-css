~async function (
  blah = `.components-home-assets-__sign-content_---`,
  icon = `.mhy-hoyolab-account-block__avatar-icon`,
  // activeDay = blah+`actived-day---2GukeS`,
  signWrapper = blah + `sign-wrapper---38rWqB`
) {
  while (
    1 + document.querySelector(icon).src.indexOf(`data:image`) ||
    // !document.querySelector(activeDay)||
    !document.querySelector(signWrapper))
    await new Promise(resolve => requestAnimationFrame(resolve))
  document.querySelector(activeDay).click();
}();