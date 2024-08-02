~async function (){
    /*  console.log(`Start run vj script...`);
      const end = Date.now() + 1e2;
      while(Date.now() < end) await new Promise(requestAnimationFrame);*/
    
      // https://www.30secondsofcode.org/js/s/prefers-color-scheme/
      const prefersDarkColorScheme = () =>
        window &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    
      // https://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
      var link,cssId = 'myCss';  // you could encode the css path itself to generate id..
      if (!document.getElementById(cssId)&&prefersDarkColorScheme()){
          var head  = document.getElementsByTagName('head')[0];
          link  = document.createElement('link');
          link.id   = cssId;
          link.rel  = 'stylesheet';
          link.type = 'text/css';
          link.href = 'https://anime1.me/wp-content/themes/basic-shop-child/css/dark.min.css?ver=9';
          link.media = 'all';
          head.appendChild(link);
      }
    
      // https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => event.matches? 
          head.appendChild(link):
          link.remove()
      );
    
      let eq = `link[href="/wp-content/themes/basic-shop-child/css/custom.css"]`;
      if(document.querySelector(eq))
        document.querySelector(eq).remove();
    
      // trying to make right/left key better
      window.addEventListener('keydown', async event => {
        if (event.defaulPrevented) return;
        console.log(event.key,event.keyCode);
        console.log(document.activeElement.duration);
        switch (event.key.toLowerCase()) {
          case 'arrowleft': event.preventDefault();
              return document.activeElement.duration+=5;
          case 'arrowright': event.preventDefault();
              return document.activeElement.duration-=5;
        }
      });
      
      while(!document.querySelector(`body[style]`))
        await new Promise(requestAnimationFrame);
      document.body.style.removeProperty(`margin-bottom`)
      document.querySelector(`.header-nav`).style.display=`none`
      
      const iframe_video = () => {
        const iv = document.querySelector(`iframe`).contentWindow.document.querySelector(`video`);
        return iv ? iv : document.querySelector(`video`);
      };
      
      while(!iframe_video())
        await new Promise(requestAnimationFrame);
    
      if(!window.video_fill_sw){
        window.video_fill_sw = async function(){
          for(let i = 0; i<3; i++){
            hint(`${3-i}秒後開始播放`)
            const end = Date.now() + 1e3;
            while(Date.now() < end)
              await new Promise(requestAnimationFrame);
          }
          hint(`即將開始播放`);
          document.querySelector(`.vjs-big-play-button`).click();
          document.querySelector(`.vjs-fullscreen-control[title="Fullscreen"]`).click();
        }
      }
    
      window.addEventListener("keydown", event => {
        if (event.key === 'Enter' && event.altKey)
          video_fill_sw();
      })
      
      video_fill_sw(); toggleFullscreen();
      iframe_video().focus();
      iframe_video().addEventListener(`ended`, async event=>{
        for(let i = 0; i<3; i++){
          hint(`${3-i}秒後播放下一集`)
          const end = Date.now() + 1e3;
          while(Date.now() < end)
            await new Promise(requestAnimationFrame);
        }
        hint(`即將播放下一集`)
        $(`a:contains("下一集")`)[0].click()
      }, true);
      
      // https://stackoverflow.com/a/57065599/13189986
      iframe_video().addEventListener(`contextmenu`, event => {
        event.returnValue = true;
        (typeof event.stopPropagation === 'function') &&
          event.stopPropagation();
        (typeof event.cancelBubble === 'function') &&
          event.cancelBubble();
      }, true);
    }();