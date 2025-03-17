import{_ as i,c as e,o as s,aj as l}from"./chunks/framework.BEJz7Xfi.js";const k=JSON.parse('{"title":"Pong Game","description":"Classic paddle-and-ball game testing reflexes and timing","frontmatter":{"layout":"doc","title":"Pong Game","description":"Classic paddle-and-ball game testing reflexes and timing"},"headers":[],"relativePath":"guide/games/pong.md","filePath":"guide/games/pong.md"}'),t={name:"guide/games/pong.md"};function n(r,a,h,d,o,p){return s(),e("div",null,a[0]||(a[0]=[l(`<h1 id="pong-game" tabindex="-1">Pong Game <a class="header-anchor" href="#pong-game" aria-label="Permalink to &quot;Pong Game&quot;">​</a></h1><p>A classic paddle-and-ball game testing reflexes and timing. Players must defend their side while trying to score points.</p><h2 id="game-mechanics" tabindex="-1">Game Mechanics <a class="header-anchor" href="#game-mechanics" aria-label="Permalink to &quot;Game Mechanics&quot;">​</a></h2><ul><li>Control a paddle to hit the ball</li><li>Score points by getting the ball past the opponent</li><li>First to reach the target score wins</li></ul><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h2><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> captcha</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CaptchaSDK</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  gameType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;pong&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  difficulty: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;medium&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  config: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    paddleSpeed: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ballSpeed: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    winScore: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><h3 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h3><ul><li><code>paddleSpeed</code>: Movement speed of the paddle (1-10)</li><li><code>ballSpeed</code>: Speed of the ball (1-10)</li><li><code>winScore</code>: Points needed to win (1-5)</li></ul><h2 id="difficulty-levels" tabindex="-1">Difficulty Levels <a class="header-anchor" href="#difficulty-levels" aria-label="Permalink to &quot;Difficulty Levels&quot;">​</a></h2><h3 id="easy" tabindex="-1">Easy <a class="header-anchor" href="#easy" aria-label="Permalink to &quot;Easy&quot;">​</a></h3><ul><li>Slower ball movement</li><li>Larger paddle size</li><li>More forgiving hit detection</li><li>Target score: 2 points</li></ul><h3 id="medium" tabindex="-1">Medium <a class="header-anchor" href="#medium" aria-label="Permalink to &quot;Medium&quot;">​</a></h3><ul><li>Balanced ball speed</li><li>Standard paddle size</li><li>Normal hit detection</li><li>Target score: 3 points</li></ul><h3 id="hard" tabindex="-1">Hard <a class="header-anchor" href="#hard" aria-label="Permalink to &quot;Hard&quot;">​</a></h3><ul><li>Faster ball movement</li><li>Smaller paddle size</li><li>Precise hit detection required</li><li>Target score: 4 points</li></ul><h2 id="security-features" tabindex="-1">Security Features <a class="header-anchor" href="#security-features" aria-label="Permalink to &quot;Security Features&quot;">​</a></h2><ul><li>Dynamic ball trajectory patterns</li><li>Timing-based behavioral analysis</li><li>Anti-automation measures</li><li>Pattern recognition for bot detection</li></ul><h2 id="accessibility" tabindex="-1">Accessibility <a class="header-anchor" href="#accessibility" aria-label="Permalink to &quot;Accessibility&quot;">​</a></h2><ul><li>Keyboard controls support</li><li>High contrast mode available</li><li>Adjustable game speed</li><li>Audio feedback options</li></ul>`,19)]))}const g=i(t,[["render",n]]);export{k as __pageData,g as default};
