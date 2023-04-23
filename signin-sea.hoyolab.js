~async function (
  blah = `.components-home-assets-__sign-content_---`,
  icon = `.mhy-hoyolab-account-block__avatar-icon`,
  activeDay = blah + `actived-day---2GukeS`,
  more = blah + `more-icon---3LDx1D`
) {
  while (
    !document.querySelector(more) ||
    !document.querySelector(activeDay) ||
    document.querySelector(icon).src.indexOf(`data:image`) + 1)
    await new Promise(resolve => requestAnimationFrame(resolve));
  document.querySelector(activeDay).click();
}();