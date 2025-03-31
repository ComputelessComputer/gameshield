import*as d from'pixi.js';var v=class{constructor(e){this.isRunning=false;this.startTime=0;this.container=e.container,this.difficulty=e.difficulty||"medium",this.onComplete=e.onComplete,this.onError=e.onError,this.size=this.parseSize(e.size),this.app=new d.Application({width:this.size,height:this.size,backgroundColor:1710618,antialias:true,resolution:window.devicePixelRatio||1}),this.container.appendChild(this.app.view),this.makeResponsive();}parseSize(e){if(typeof e=="number")return e;if(e.endsWith("px"))return parseInt(e,10);if(e.endsWith("%")){let t=parseInt(e,10);return Math.min(this.container.clientWidth,this.container.clientHeight)*t/100}return 400}makeResponsive(){let e=()=>{let t=Math.min(this.container.clientWidth,this.container.clientHeight),i=Math.min(t,500);this.app.renderer.resize(i,i);let a=i/this.size;this.app.stage.scale.set(a);};e(),window.addEventListener("resize",e),this.size=this.app.renderer.width;}init(){this.app.ticker.add(this.update,this);}start(){this.isRunning||(this.isRunning=true,this.startTime=Date.now(),this.app.ticker.start());}pause(){this.isRunning&&(this.isRunning=false,this.app.ticker.stop());}resume(){this.isRunning||(this.isRunning=true,this.app.ticker.start());}destroy(){this.pause(),this.app.view.parentNode&&this.app.view.parentNode.removeChild(this.app.view),this.app.destroy(true,{children:true,texture:true,baseTexture:true});}complete(e,t,i){this.pause();let a=Date.now()-this.startTime,s={success:e,score:t,timeTaken:a,data:i};this.onComplete&&this.onComplete(s);}handleError(e){console.error("Game error:",e),this.onError&&this.onError(e);}};var m=class extends v{constructor(t){super(t);this.paddleWidth=15;this.paddleHeight=80;this.ballSize=15;this.ballSpeed=5;this.ballVelocity={x:0,y:0};this.paddleSpeed=8;this.aiPaddleSpeed=4;this.score=0;this.maxScore=5;this.gameAreaPadding=20;this.keys={};this.mouseY=null;this.touchY=null;this.handleKeyDown=t=>{this.keys[t.key]=true;};this.handleKeyUp=t=>{this.keys[t.key]=false;};this.handleMouseMove=t=>{let i=this.app.view.getBoundingClientRect();this.mouseY=(t.clientY-i.top)*(this.size/i.height);};this.handleTouchMove=t=>{if(t.touches.length>0){let i=this.app.view.getBoundingClientRect();this.touchY=(t.touches[0].clientY-i.top)*(this.size/i.height),t.preventDefault();}};this.handleTouchEnd=()=>{this.touchY=null;};this.adjustDifficulty(t.difficulty||"medium"),this.init();}adjustDifficulty(t){switch(t){case "easy":this.ballSpeed=4,this.aiPaddleSpeed=3,this.maxScore=3;break;case "medium":this.ballSpeed=5,this.aiPaddleSpeed=4,this.maxScore=5;break;case "hard":this.ballSpeed=6,this.aiPaddleSpeed=5,this.maxScore=7;break}}init(){super.init(),this.createGameElements(),this.setupEventListeners(),this.reset();}createGameElements(){this.paddle=new d.Graphics,this.paddle.beginFill(16777215),this.paddle.drawRect(0,0,this.paddleWidth,this.paddleHeight),this.paddle.endFill(),this.paddle.x=this.gameAreaPadding,this.paddle.y=(this.size-this.paddleHeight)/2,this.app.stage.addChild(this.paddle),this.aiPaddle=new d.Graphics,this.aiPaddle.beginFill(16777215),this.aiPaddle.drawRect(0,0,this.paddleWidth,this.paddleHeight),this.aiPaddle.endFill(),this.aiPaddle.x=this.size-this.paddleWidth-this.gameAreaPadding,this.aiPaddle.y=(this.size-this.paddleHeight)/2,this.app.stage.addChild(this.aiPaddle),this.ball=new d.Graphics,this.ball.beginFill(16777215),this.ball.drawRect(0,0,this.ballSize,this.ballSize),this.ball.endFill(),this.ball.x=(this.size-this.ballSize)/2,this.ball.y=(this.size-this.ballSize)/2,this.app.stage.addChild(this.ball);let t=new d.TextStyle({fontFamily:"Arial",fontSize:24,fill:16777215,align:"center"});this.scoreText=new d.Text(`Score: 0/${this.maxScore}`,t),this.scoreText.x=(this.size-this.scoreText.width)/2,this.scoreText.y=10,this.app.stage.addChild(this.scoreText);}setupEventListeners(){window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),this.container.addEventListener("mousemove",this.handleMouseMove),this.container.addEventListener("touchmove",this.handleTouchMove),this.container.addEventListener("touchend",this.handleTouchEnd);}removeEventListeners(){window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),this.container.removeEventListener("mousemove",this.handleMouseMove),this.container.removeEventListener("touchmove",this.handleTouchMove),this.container.removeEventListener("touchend",this.handleTouchEnd);}reset(){this.score=0,this.updateScoreText(),this.ball.x=(this.size-this.ballSize)/2,this.ball.y=(this.size-this.ballSize)/2;let t=Math.random()*Math.PI/4-Math.PI/8+(Math.random()>.5?0:Math.PI);this.ballVelocity.x=Math.cos(t)*this.ballSpeed,this.ballVelocity.y=Math.sin(t)*this.ballSpeed,this.paddle.y=(this.size-this.paddleHeight)/2,this.aiPaddle.y=(this.size-this.paddleHeight)/2,this.keys={},this.mouseY=null,this.touchY=null;}updateScoreText(){this.scoreText.text=`Score: ${this.score}/${this.maxScore}`,this.scoreText.x=(this.size-this.scoreText.width)/2;}update(t){this.isRunning&&(this.updatePlayerPaddle(),this.updateAIPaddle(),this.updateBall(),this.checkCollisions(),this.checkScoring());}updatePlayerPaddle(){if((this.keys.ArrowUp||this.keys.w)&&(this.paddle.y-=this.paddleSpeed),(this.keys.ArrowDown||this.keys.s)&&(this.paddle.y+=this.paddleSpeed),this.mouseY!==null){let t=this.mouseY-this.paddleHeight/2;this.paddle.y+=(t-this.paddle.y)*.2;}if(this.touchY!==null){let t=this.touchY-this.paddleHeight/2;this.paddle.y+=(t-this.paddle.y)*.2;}this.paddle.y=Math.max(this.gameAreaPadding,Math.min(this.size-this.paddleHeight-this.gameAreaPadding,this.paddle.y));}updateAIPaddle(){let t=this.ball.y+this.ballSize/2-this.paddleHeight/2,a=(1-(this.difficulty==="hard"?.9:this.difficulty==="medium"?.7:.5))*(Math.random()*100-50),s=t+a;this.aiPaddle.y<s?this.aiPaddle.y+=Math.min(this.aiPaddleSpeed,s-this.aiPaddle.y):this.aiPaddle.y>s&&(this.aiPaddle.y-=Math.min(this.aiPaddleSpeed,this.aiPaddle.y-s)),this.aiPaddle.y=Math.max(this.gameAreaPadding,Math.min(this.size-this.paddleHeight-this.gameAreaPadding,this.aiPaddle.y));}updateBall(){this.ball.x+=this.ballVelocity.x,this.ball.y+=this.ballVelocity.y,(this.ball.y<=this.gameAreaPadding||this.ball.y+this.ballSize>=this.size-this.gameAreaPadding)&&(this.ballVelocity.y=-this.ballVelocity.y,this.ball.y<=this.gameAreaPadding?this.ball.y=this.gameAreaPadding:this.ball.y+this.ballSize>=this.size-this.gameAreaPadding&&(this.ball.y=this.size-this.ballSize-this.gameAreaPadding));}checkCollisions(){if(this.ball.x<=this.paddle.x+this.paddleWidth&&this.ball.x+this.ballSize>=this.paddle.x&&this.ball.y+this.ballSize>=this.paddle.y&&this.ball.y<=this.paddle.y+this.paddleHeight){this.ball.x=this.paddle.x+this.paddleWidth,this.ballVelocity.x=-this.ballVelocity.x;let i=(this.ball.y+this.ballSize/2-(this.paddle.y+this.paddleHeight/2))/(this.paddleHeight/2);this.ballVelocity.y=i*this.ballSpeed;let a=.2,s=Math.sqrt(this.ballVelocity.x*this.ballVelocity.x+this.ballVelocity.y*this.ballVelocity.y),o=(s+a)/s;this.ballVelocity.x*=o,this.ballVelocity.y*=o;}if(this.ball.x+this.ballSize>=this.aiPaddle.x&&this.ball.x<=this.aiPaddle.x+this.paddleWidth&&this.ball.y+this.ballSize>=this.aiPaddle.y&&this.ball.y<=this.aiPaddle.y+this.paddleHeight){this.ball.x=this.aiPaddle.x-this.ballSize,this.ballVelocity.x=-this.ballVelocity.x;let i=(this.ball.y+this.ballSize/2-(this.aiPaddle.y+this.paddleHeight/2))/(this.paddleHeight/2);this.ballVelocity.y=i*this.ballSpeed;}}checkScoring(){this.ball.x+this.ballSize>this.size&&(this.score++,this.updateScoreText(),this.score>=this.maxScore?this.complete(true,this.score):this.resetBall()),this.ball.x<0&&this.resetBall();}resetBall(){this.ball.x=(this.size-this.ballSize)/2,this.ball.y=(this.size-this.ballSize)/2;let t=Math.random()*Math.PI/4-Math.PI/8+(Math.random()>.5?0:Math.PI);this.ballVelocity.x=Math.cos(t)*this.ballSpeed,this.ballVelocity.y=Math.sin(t)*this.ballSpeed;}destroy(){this.removeEventListeners(),super.destroy();}};var y=class{static createGame(e,t){if(e==="random"){let i=["pong","snake","breakout","dino-run"];e=i[Math.floor(Math.random()*i.length)];}switch(e){case "pong":return new m(t);case "snake":return this.createPlaceholderGame(e,t);case "breakout":return this.createPlaceholderGame(e,t);case "dino-run":return this.createPlaceholderGame(e,t);default:throw new Error(`Unsupported game type: ${e}`)}}static createPlaceholderGame(e,t){return console.warn(`Game type '${e}' not fully implemented yet. Using placeholder.`),new m(t)}};var b=class{constructor(e={}){this.isTracking=false;this.startTime=0;this.mousePositions=[];this.clickEvents=[];this.keyEvents=[];this.gameEvents=[];this.handleMouseMove=e=>{this.isTracking&&(this.mousePositions.length===0||Date.now()-this.mousePositions[this.mousePositions.length-1].timestamp>=50)&&this.mousePositions.push({x:e.clientX,y:e.clientY,timestamp:Date.now()});};this.handleMouseClick=e=>{this.isTracking&&this.clickEvents.push({x:e.clientX,y:e.clientY,timestamp:Date.now()});};this.handleKeyDown=e=>{this.isTracking&&this.keyEvents.push({key:e.key,timestamp:Date.now()});};this.handleTouchStart=e=>{if(!this.isTracking||!e.touches[0])return;let t=e.touches[0];this.clickEvents.push({x:t.clientX,y:t.clientY,timestamp:Date.now()});};this.handleTouchMove=e=>{if(!this.isTracking||!e.touches[0])return;let t=e.touches[0];(this.mousePositions.length===0||Date.now()-this.mousePositions[this.mousePositions.length-1].timestamp>=50)&&this.mousePositions.push({x:t.clientX,y:t.clientY,timestamp:Date.now()});};this.handleTouchEnd=e=>{this.isTracking&&this.gameEvents.push({type:"touchend",timestamp:Date.now()});};this.options={movementSmoothnessThreshold:e.movementSmoothnessThreshold??.6,reactionTimeThreshold:e.reactionTimeThreshold??200,interactionDensityThreshold:e.interactionDensityThreshold??.5,patternVariabilityThreshold:e.patternVariabilityThreshold??.7};}startTracking(e){this.isTracking||(this.isTracking=true,this.startTime=Date.now(),this.mousePositions=[],this.clickEvents=[],this.keyEvents=[],this.gameEvents=[],e.addEventListener("mousemove",this.handleMouseMove),e.addEventListener("mousedown",this.handleMouseClick),e.addEventListener("keydown",this.handleKeyDown),e.addEventListener("touchstart",this.handleTouchStart),e.addEventListener("touchmove",this.handleTouchMove),e.addEventListener("touchend",this.handleTouchEnd));}stopTracking(e){this.isTracking&&(this.isTracking=false,e.removeEventListener("mousemove",this.handleMouseMove),e.removeEventListener("mousedown",this.handleMouseClick),e.removeEventListener("keydown",this.handleKeyDown),e.removeEventListener("touchstart",this.handleTouchStart),e.removeEventListener("touchmove",this.handleTouchMove),e.removeEventListener("touchend",this.handleTouchEnd));}recordGameEvent(e,t){this.isTracking&&this.gameEvents.push({type:e,timestamp:Date.now(),data:t});}analyze(){let e=this.calculateMovementSmoothness(),t=this.calculateReactionTime(),i=this.calculateInteractionDensity(),a=this.calculatePatternVariability(),s=[e/this.options.movementSmoothnessThreshold,this.options.reactionTimeThreshold/(t.average||this.options.reactionTimeThreshold),i.eventsPerSecond/this.options.interactionDensityThreshold,a/this.options.patternVariabilityThreshold].filter(r=>!isNaN(r)&&isFinite(r)),o=Math.min(s.reduce((r,n)=>r+n,0)/s.length,1);return {isHuman:o>=.7,confidence:o,movementSmoothness:e,reactionTime:t,interactionDensity:{eventsPerSecond:i.eventsPerSecond,pattern:i.pattern},patternVariability:a}}calculateMovementSmoothness(){if(this.mousePositions.length<3)return 0;let e=0,t=0;for(let a=1;a<this.mousePositions.length-1;a++){let s=this.mousePositions[a-1],o=this.mousePositions[a],h=this.mousePositions[a+1],r={x:o.x-s.x,y:o.y-s.y},n={x:h.x-o.x,y:h.y-o.y},l=Math.sqrt(r.x*r.x+r.y*r.y),u=Math.sqrt(n.x*n.x+n.y*n.y);if(l===0||u===0)continue;let P=(r.x*n.x+r.y*n.y)/(l*u),x=Math.acos(Math.max(-1,Math.min(1,P)));e+=x,t+=l;}if(t===0)return 0;let i=1-e/t/Math.PI;return Math.max(0,Math.min(1,i))}calculateReactionTime(){let e=[];for(let a=0;a<this.gameEvents.length;a++){let s=this.gameEvents[a],o=[...this.clickEvents,...this.keyEvents].filter(h=>h.timestamp>s.timestamp).sort((h,r)=>h.timestamp-r.timestamp)[0];if(o){let h=o.timestamp-s.timestamp;h>=100&&h<=2e3&&e.push(h);}}if(e.length===0)return {average:0,variance:0};let t=e.reduce((a,s)=>a+s,0)/e.length,i=e.reduce((a,s)=>a+Math.pow(s-t,2),0)/e.length;return {average:t,variance:i}}calculateInteractionDensity(){let e=[...this.mousePositions,...this.clickEvents,...this.keyEvents].sort((n,l)=>n.timestamp-l.timestamp);if(e.length<2)return {eventsPerSecond:0,pattern:"uncertain"};let t=(e[e.length-1].timestamp-e[0].timestamp)/1e3;if(t===0)return {eventsPerSecond:0,pattern:"uncertain"};let i=e.length/t,a=[];for(let n=1;n<e.length;n++)a.push(e[n].timestamp-e[n-1].timestamp);let s=a.reduce((n,l)=>n+l,0)/a.length,o=a.reduce((n,l)=>n+Math.pow(l-s,2),0)/a.length,h=Math.min(1,o/(s*s)),r;return h<.1?r="bot":h>.3?r="human":r="uncertain",{eventsPerSecond:i,pattern:r}}calculatePatternVariability(){if(this.mousePositions.length<10)return 0;let e=0,t={x:0,y:0};for(let s=1;s<this.mousePositions.length;s++){let o=this.mousePositions[s-1],h=this.mousePositions[s],r={x:Math.sign(h.x-o.x),y:Math.sign(h.y-o.y)};(t.x!==0||t.y!==0)&&(r.x!==t.x||r.y!==t.y)&&e++,t=r;}let i=this.mousePositions.length-1;return Math.min(e/(i*.5),1)}};var p=class{static generateToken(e){let t={sub:e.sub,gameResult:e.gameResult,behaviorMetrics:e.behaviorMetrics,iat:Date.now(),exp:Date.now()+3e5},i=this.encodeTokenData(t);return `${this.TOKEN_PREFIX}${i}`}static encodeTokenData(e){let t=JSON.stringify(e);return btoa(t)}static validateTokenFormat(e){return !(!e||typeof e!="string"||!e.startsWith(this.TOKEN_PREFIX)||e.length<=this.TOKEN_PREFIX.length)}static extractTokenData(e){if(!this.validateTokenFormat(e))return null;try{let t=e.substring(this.TOKEN_PREFIX.length),i=atob(t);return JSON.parse(i)}catch(t){return console.error("Error extracting token data:",t),null}}};p.TOKEN_PREFIX="GS_";function A(c){let t={...{gameType:"random",size:"400px",difficulty:"medium"},...c},i=new b,a=T(),s=null,o=()=>{s=y.createGame(t.gameType,{container:t.container,size:t.size,difficulty:t.difficulty,onComplete:h,onError:r}),i.startTracking(t.container),s.init(),s.start();},h=n=>{if(!s)return;i.stopTracking(t.container);let l=i.analyze(),u=p.generateToken({sub:a,gameResult:n,behaviorMetrics:l});if(n.success&&l.isHuman)t.onSuccess&&t.onSuccess(u);else if(t.onFailure){let g=n.success?"Behavior analysis indicates bot-like behavior":"Game not completed successfully";t.onFailure(g);}},r=n=>{console.error("GameShield error:",n),i.stopTracking(t.container),t.onFailure&&t.onFailure(`Error: ${n.message}`);};return o(),{reset:()=>{s&&(i.stopTracking(t.container),s.destroy()),o();},destroy:()=>{s&&(i.stopTracking(t.container),s.destroy(),s=null);}}}function T(){return "gs_"+Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)}export{b as BehaviorAnalyzer,y as GameFactory,p as TokenManager,A as createGameShield};//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map