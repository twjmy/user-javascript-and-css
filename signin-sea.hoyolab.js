~async function(
activeDay=`.components-home-assets-__sign-content_---actived-day---2GukeS`,
icon=`.mhy-hoyolab-account-block__avatar-icon`,
more=`.components-home-assets-__sign-content_---more-icon---3LDx1D`
){
  while(
  !document.querySelector(more)||
  !document.querySelector(activeDay)||
  document.querySelector(icon).src.indexOf(`data:image`)+1)
    await new Promise(resolve=>requestAnimationFrame(resolve));
  document.querySelector(activeDay).click();
}();