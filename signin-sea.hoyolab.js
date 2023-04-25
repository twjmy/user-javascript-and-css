~async function (
  icon = `.mhy-hoyolab-account-block__avatar-icon`,
  blah = `.components-home-assets-__sign-content_---`,
  blahM = `.components-m-assets-__index_---`,
  uidM = blah + `nick-name---2I1pf3`,
  signWrapper = blah + `sign-wrapper---38rWqB`,
  signWrapperM = blahM + `sign-wrapper---3WcYRI`,
) {
  while (
    !document.querySelector(signWrapper) &&
    !document.querySelector(signWrapperM) ||
    1 + document.querySelector(icon).src.indexOf(`data:image`) &&
    !document.querySelector(uidM)
  ) await new Promise(resolve => requestAnimationFrame(resolve))
  document.querySelector(signWrapper).click();
  document.querySelector(signWrapperM).click();
}();