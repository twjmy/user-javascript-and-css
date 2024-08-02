~async function(){ // it doesn't work now
    while (!document.querySelector('.js-captcha'))
      await new Promise(requestAnimationFrame);
    url="https://lms2020.nchu.edu.tw/sys/libs/class/capcha/secimg.php?&charLens=1&codeType=num"
    while (document.querySelector('.js-captcha').src!=url){
      await new Promise(requestAnimationFrame);
      document.querySelector('.js-captcha').src=url;
    }
  }();
  ~async function(){
    while (!document.querySelector('#captcha .js-refresh-captcha'))
      await new Promise(requestAnimationFrame);
    $('#captcha .js-refresh-captcha').on('click', function() {
        $('#captcha .js-captcha').get(0).src = '/sys/libs/class/capcha/secimg.php?&charLens=6&codeType=num&t' + new Date();
        return false;
    });
  }();
  // ~async function(){
  //   while (!document.querySelector("#captcha > div > img"))
  //     await new Promise(requestAnimationFrame);
  //   document.querySelector("#captcha > div > img").src="https://lms2020.nchu.edu.tw/sys/libs/class/capcha/secimg.php?&charLens=1&codeType=num";
  // }();
  // https://www.readfog.com/a/1632825598249373696
  // https://github.com/naptha/tesseract.js