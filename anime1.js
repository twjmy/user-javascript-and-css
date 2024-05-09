~async function () {
    /*  console.log(`Start run vj script...`);
      const end = Date.now() + 1e2;
      while(Date.now() < end) await new Promise(requestAnimationFrame);*/

    // https://www.30secondsofcode.org/js/s/prefers-color-scheme/
    const prefersDarkColorScheme = () =>
        window &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    // https://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
    var link, cssId = 'myCss';  // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId) && prefersDarkColorScheme()) {
        var head = document.getElementsByTagName('head')[0];
        link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://anime1.me/wp-content/themes/basic-shop-child/css/dark.min.css?ver=9';
        link.media = 'all';
        head.appendChild(link);
    }

    // https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => event.matches ?
        head.appendChild(link) :
        link.remove()
    );

    let eq = `link[href="/wp-content/themes/basic-shop-child/css/custom.css"]`;
    if (document.querySelector(eq))
        document.querySelector(eq).remove();

    // trying to make right/left key better
    window.addEventListener('keydown', async event => {
        if (event.defaulPrevented) return;
        console.log(event.key, event.keyCode);
        console.log(document.activeElement.duration);
        switch (event.key.toLowerCase()) {
            case 'arrowleft': event.preventDefault();
                return document.activeElement.duration += 5;
            case 'arrowright': event.preventDefault();
                return document.activeElement.duration -= 5;
        }
    });

    while (!document.querySelector(`body[style]`))
        await new Promise(requestAnimationFrame);
    document.body.style.removeProperty(`margin-bottom`)
}();