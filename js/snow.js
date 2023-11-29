var snowStorm=function(o,a){this.autoStart=true;this.excludeMobile=true;this.flakesMax=128;this.flakesMaxActive=64;this.animationInterval=24;this.useGPU=true;this.className=null;this.flakeBottom=null;this.followMouse=true;this.snowColor="#fff";this.snowCharacter="&bull;";this.snowStick=true;this.targetElement=null;this.useMeltEffect=true;this.useTwinkleEffect=false;this.usePositionFixed=false;this.usePixelPosition=false;this.accessibility=true;this.freezeOnBlur=false;this.flakeLeftOffset=0;this.flakeRightOffset=0;this.flakeWidth=8;this.flakeHeight=8;this.vMaxX=3;this.vMaxY=2;this.zIndex=0;var r=this,l,t=navigator.userAgent.match(/msie/i),e=navigator.userAgent.match(/msie 6/i),i=navigator.userAgent.match(/mobile|opera m(ob|in)/i),s=t&&a.compatMode==="BackCompat",n=s||e,f=null,m=null,h=null,u=null,c=null,d=null,v=null,y=1,p=.6,k=6,g=false,x=false,b=function(){try{a.createElement("div").style.opacity="0.5"}catch(e){return false}return true}(),w=false,F=a.createDocumentFragment();l=function(){var e;function t(e){o.setTimeout(e,1e3/(r.animationInterval||20))}var i=o.requestAnimationFrame||o.webkitRequestAnimationFrame||o.mozRequestAnimationFrame||o.oRequestAnimationFrame||o.msRequestAnimationFrame||t;e=i?function(){return i.apply(o,arguments)}:null;var s;s=a.createElement("div");function l(e){var t=s.style[e];return t!==undefined?e:null}var n={transform:{ie:l("-ms-transform"),moz:l("MozTransform"),opera:l("OTransform"),webkit:l("webkitTransform"),w3:l("transform"),prop:null},getAnimationFrame:e};n.transform.prop=n.transform.w3||n.transform.moz||n.transform.webkit||n.transform.ie||n.transform.opera;s=null;return n}();this.timer=null;this.flakes=[];this.disabled=false;this.active=false;this.meltFrameCount=20;this.meltFrames=[];this.setXY=function(e,t,i){if(!e){return false}if(r.usePixelPosition||x){e.style.left=t-r.flakeWidth+"px";e.style.top=i-r.flakeHeight+"px"}else if(n){e.style.right=100-t/f*100+"%";e.style.top=Math.min(i,c-r.flakeHeight)+"px"}else{if(!r.flakeBottom){e.style.right=100-t/f*100+"%";e.style.bottom=100-i/h*100+"%"}else{e.style.right=100-t/f*100+"%";e.style.top=Math.min(i,c-r.flakeHeight)+"px"}}};this.events=function(){var l=!o.addEventListener&&o.attachEvent,s=Array.prototype.slice,n={add:l?"attachEvent":"addEventListener",remove:l?"detachEvent":"removeEventListener"};function e(e){var t=s.call(e),i=t.length;if(l){t[1]="on"+t[1];if(i>3){t.pop()}}else if(i===3){t.push(false)}return t}function t(e,t){var i=e.shift(),s=[n[t]];if(l){i[s](e[0],e[1])}else{i[s].apply(i,e)}}function i(){t(e(arguments),"add")}function a(){t(e(arguments),"remove")}return{add:i,remove:a}}();function E(e,t){if(isNaN(t)){t=0}return Math.random()*e+t}function z(e){return parseInt(E(2),10)===1?e*-1:e}this.randomizeWind=function(){var e;d=z(E(r.vMaxX,.2));v=E(r.vMaxY,.2);if(this.flakes){for(e=0;e<this.flakes.length;e++){if(this.flakes[e].active){this.flakes[e].setVelocities()}}}};this.scrollHandler=function(){var e;u=r.flakeBottom?0:parseInt(o.scrollY||a.documentElement.scrollTop||(n?a.body.scrollTop:0),10);if(isNaN(u)){u=0}if(!g&&!r.flakeBottom&&r.flakes){for(e=0;e<r.flakes.length;e++){if(r.flakes[e].active===0){r.flakes[e].stick()}}}};this.resizeHandler=function(){if(o.innerWidth||o.innerHeight){f=o.innerWidth-16-r.flakeRightOffset;h=r.flakeBottom||o.innerHeight}else{f=(a.documentElement.clientWidth||a.body.clientWidth||a.body.scrollWidth)-(!t?8:0)-r.flakeRightOffset;h=r.flakeBottom||a.documentElement.clientHeight||a.body.clientHeight||a.body.scrollHeight}c=a.body.offsetHeight;m=parseInt(f/2,10)};this.resizeHandlerAlt=function(){f=r.targetElement.offsetWidth-r.flakeRightOffset;h=r.flakeBottom||r.targetElement.offsetHeight;m=parseInt(f/2,10);c=a.body.offsetHeight};this.freeze=function(){if(!r.disabled){r.disabled=1}else{return false}r.timer=null};this.resume=function(){if(r.disabled){r.disabled=0}else{return false}r.timerInit()};this.toggleSnow=function(){if(!r.flakes.length){r.start()}else{r.active=!r.active;if(r.active){r.show();r.resume()}else{r.stop();r.freeze()}}};this.stop=function(){var e;this.freeze();for(e=0;e<this.flakes.length;e++){this.flakes[e].o.style.display="none"}r.events.remove(o,"scroll",r.scrollHandler);r.events.remove(o,"resize",r.resizeHandler);if(r.freezeOnBlur){if(t){r.events.remove(a,"focusout",r.freeze);r.events.remove(a,"focusin",r.resume)}else{r.events.remove(o,"blur",r.freeze);r.events.remove(o,"focus",r.resume)}}};this.show=function(){var e;for(e=0;e<this.flakes.length;e++){this.flakes[e].o.style.display="block"}};this.SnowFlake=function(e,t,i){var s=this;this.type=e;this.x=t||parseInt(E(f-20),10);this.y=!isNaN(i)?i:-E(h)-12;this.vX=null;this.vY=null;this.vAmpTypes=[1,1.2,1.4,1.6,1.8];this.vAmp=this.vAmpTypes[this.type]||1;this.melting=false;this.meltFrameCount=r.meltFrameCount;this.meltFrames=r.meltFrames;this.meltFrame=0;this.twinkleFrame=0;this.active=1;this.fontSize=10+this.type/5*10;this.o=a.createElement("div");this.o.innerHTML=r.snowCharacter;if(r.className){this.o.setAttribute("class",r.className)}this.o.style.color=r.snowColor;this.o.style.position=g?"fixed":"absolute";if(r.useGPU&&l.transform.prop){this.o.style[l.transform.prop]="translate3d(0px, 0px, 0px)"}this.o.style.width=r.flakeWidth+"px";this.o.style.height=r.flakeHeight+"px";this.o.style.fontFamily="arial,verdana";this.o.style.cursor="default";this.o.style.overflow="hidden";this.o.style.fontWeight="normal";this.o.style.zIndex=r.zIndex;if(r.accessibility){this.o.setAttribute("aria-hidden",r.accessibility)}F.appendChild(this.o);this.refresh=function(){if(isNaN(s.x)||isNaN(s.y)){return false}r.setXY(s.o,s.x,s.y)};this.stick=function(){if(n||r.targetElement!==a.documentElement&&r.targetElement!==a.body){s.o.style.top=h+u-r.flakeHeight+"px"}else if(r.flakeBottom){s.o.style.top=r.flakeBottom+"px"}else{s.o.style.display="none";s.o.style.top="auto";s.o.style.bottom="0%";s.o.style.position="fixed";s.o.style.display="block"}};this.vCheck=function(){if(s.vX>=0&&s.vX<.2){s.vX=.2}else if(s.vX<0&&s.vX>-.2){s.vX=-.2}if(s.vY>=0&&s.vY<.2){s.vY=.2}};this.move=function(){var e=s.vX*y,t;s.x+=e;s.y+=s.vY*s.vAmp;if(s.x>=f||f-s.x<r.flakeWidth){s.x=0}else if(e<0&&s.x-r.flakeLeftOffset<-r.flakeWidth){s.x=f-r.flakeWidth-1}s.refresh();t=h+u-s.y+r.flakeHeight;if(t<r.flakeHeight){s.active=0;if(r.snowStick){s.stick()}else{s.recycle()}}else{if(r.useMeltEffect&&s.active&&s.type<3&&!s.melting&&Math.random()>.998){s.melting=true;s.melt()}if(r.useTwinkleEffect){if(s.twinkleFrame<0){if(Math.random()>.97){s.twinkleFrame=parseInt(Math.random()*8,10)}}else{s.twinkleFrame--;if(!b){s.o.style.visibility=s.twinkleFrame&&s.twinkleFrame%2===0?"hidden":"visible"}else{s.o.style.opacity=s.twinkleFrame&&s.twinkleFrame%2===0?0:1}}}}};this.animate=function(){s.move()};this.setVelocities=function(){s.vX=d+E(r.vMaxX*.12,.1);s.vY=v+E(r.vMaxY*.12,.1)};this.setOpacity=function(e,t){if(!b){return false}e.style.opacity=t};this.melt=function(){if(!r.useMeltEffect||!s.melting){s.recycle()}else{if(s.meltFrame<s.meltFrameCount){s.setOpacity(s.o,s.meltFrames[s.meltFrame]);s.o.style.fontSize=s.fontSize-s.fontSize*(s.meltFrame/s.meltFrameCount)+"px";s.o.style.lineHeight=r.flakeHeight+2+r.flakeHeight*.75*(s.meltFrame/s.meltFrameCount)+"px";s.meltFrame++}else{s.recycle()}}};this.recycle=function(){s.o.style.display="none";s.o.style.position=g?"fixed":"absolute";s.o.style.bottom="auto";s.setVelocities();s.vCheck();s.meltFrame=0;s.melting=false;s.setOpacity(s.o,1);s.o.style.padding="0px";s.o.style.margin="0px";s.o.style.fontSize=s.fontSize+"px";s.o.style.lineHeight=r.flakeHeight+2+"px";s.o.style.textAlign="center";s.o.style.verticalAlign="baseline";s.x=parseInt(E(f-r.flakeWidth-20),10);s.y=parseInt(E(h)*-1,10)-r.flakeHeight;s.refresh();s.o.style.display="block";s.active=1};this.recycle();this.refresh()};this.snow=function(){var e=0,t=null,i,s;for(i=0,s=r.flakes.length;i<s;i++){if(r.flakes[i].active===1){r.flakes[i].move();e++}if(r.flakes[i].melting){r.flakes[i].melt()}}if(e<r.flakesMaxActive){t=r.flakes[parseInt(E(r.flakes.length),10)];if(t.active===0){t.melting=true}}if(r.timer){l.getAnimationFrame(r.snow)}};this.mouseMove=function(e){if(!r.followMouse){return true}var t=parseInt(e.clientX,10);if(t<m){y=-p+t/m*p}else{t-=m;y=t/m*p}};this.createSnow=function(e,t){var i;for(i=0;i<e;i++){r.flakes[r.flakes.length]=new r.SnowFlake(parseInt(E(k),10));if(t||i>r.flakesMaxActive){r.flakes[r.flakes.length-1].active=-1}}r.targetElement.appendChild(F)};this.timerInit=function(){r.timer=true;r.snow()};this.init=function(){var e;for(e=0;e<r.meltFrameCount;e++){r.meltFrames.push(1-e/r.meltFrameCount)}r.randomizeWind();r.createSnow(r.flakesMax);r.events.add(o,"resize",r.resizeHandler);r.events.add(o,"scroll",r.scrollHandler);if(r.freezeOnBlur){if(t){r.events.add(a,"focusout",r.freeze);r.events.add(a,"focusin",r.resume)}else{r.events.add(o,"blur",r.freeze);r.events.add(o,"focus",r.resume)}}r.resizeHandler();r.scrollHandler();if(r.followMouse){r.events.add(t?a:o,"mousemove",r.mouseMove)}r.animationInterval=Math.max(20,r.animationInterval);r.timerInit()};this.start=function(e){if(!w){w=true}else if(e){return true}if(typeof r.targetElement==="string"){var t=r.targetElement;r.targetElement=a.getElementById(t);if(!r.targetElement){throw new Error('Snowstorm: Unable to get targetElement "'+t+'"')}}if(!r.targetElement){r.targetElement=a.body||a.documentElement}if(r.targetElement!==a.documentElement&&r.targetElement!==a.body){r.resizeHandler=r.resizeHandlerAlt;r.usePixelPosition=true}r.resizeHandler();r.usePositionFixed=r.usePositionFixed&&!n&&!r.flakeBottom;if(o.getComputedStyle){try{x=o.getComputedStyle(r.targetElement,null).getPropertyValue("position")==="relative"}catch(e){x=false}}g=r.usePositionFixed;if(f&&h&&!r.disabled){r.init();r.active=true}};function H(){o.setTimeout(function(){r.start(true)},20);r.events.remove(t?a:o,"mousemove",H)}function M(){if(!r.excludeMobile||!i){H()}r.events.remove(o,"load",M)}if(r.autoStart){r.events.add(o,"load",M,false)}return this}(window,document);