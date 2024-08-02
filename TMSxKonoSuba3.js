// 2024/5/3 5:40 2024/5/4 5:04
~async function (){
  while (!document.querySelectorAll(`.menu-list__link`)[1])
    await new Promise(requestAnimationFrame);
  document.querySelectorAll(`.menu-list__link`)[1].click();

  while (!document.querySelector(`.menu-status__btn-login`))
    await new Promise(requestAnimationFrame);
  while (document.querySelector(`.menu-status__btn-login`).text!=`登出`) await new Promise(requestAnimationFrame);

  while (!document.querySelector(`.page2-content-info`))
    await new Promise(requestAnimationFrame);
  document.querySelector(`.page2-content-info`).scrollIntoView()

  if (document.querySelector(`.page2-content-info`).childNodes[0].innerHTML.match(/\d+/)[0]<1) {
    console.log(document.querySelector(`.page2-content-info`).childNodes[0]);
    const end = Date.now() + 5e2;
    while(Date.now() < end) await new Promise(requestAnimationFrame);
  }

  for (let i=0;
   i<=document.querySelector(`.page2-content-info`).childNodes[0].innerHTML.match(/\d+/)[0];
   i++){
    while (!document.querySelector(`.page2-content-btn--lottery`))
      await new Promise(requestAnimationFrame);
    document.querySelector(`.page2-content-btn--lottery`).click();
    // if(i==2) break;
    while (!document.querySelector(`.gbox-close`))
      await new Promise(requestAnimationFrame);
    document.querySelector(`.gbox-close`).click();
  }

  while (!document.querySelectorAll(`.page2-content-btn`)[2])
    await new Promise(requestAnimationFrame);
  document.querySelectorAll(`.page2-content-btn`)[2].click()
}();