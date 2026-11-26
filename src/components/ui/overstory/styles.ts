export const OVS_CSS = `
.ovs-root{--ovs-ink:#10150d;--ovs-ink2:#4b5546;--ovs-paper:#f4f6f0;--ovs-card:#ffffff;--ovs-mist:#e6eff5;--ovs-line:rgba(16,21,13,.12);--ovs-bark:#3b3424;--ovs-leaf2:#6f9a2a;--ovs-forest:#0e1a10;--ovs-hero-ink:#0f130c;--ovs-sans:"Inter Display","Inter","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;--ovs-serif:"Bodoni Moda","Didot","Bodoni 72","Playfair Display","Libre Caslon Display","Times New Roman","Liberation Serif",serif;position:relative;min-height:var(--ovs-h);background:var(--ovs-paper);color:var(--ovs-ink);font-family:var(--ovs-sans);font-size:16px;line-height:1.5;-webkit-font-smoothing:antialiased;overflow-x:clip;isolation:isolate;text-align:left}
.ovs-root[data-scheme="dark"]{--ovs-ink:#edf1e6;--ovs-ink2:#a5b09d;--ovs-paper:#0b110e;--ovs-card:#121a16;--ovs-mist:#131d2c;--ovs-line:rgba(237,241,230,.13);--ovs-bark:#8a7a5c;--ovs-leaf2:#5f8a3a;--ovs-forest:#060c08;--ovs-hero-ink:#f3f4ec}
.ovs-root[data-season="autumn"]{--ovs-leaf2:#c9702a;--ovs-bark:#4a3020}
.ovs-root[data-season="blossom"]{--ovs-leaf2:#d98aa9;--ovs-bark:#4a3036}
.ovs-root *,.ovs-root *::before,.ovs-root *::after{box-sizing:border-box}
.ovs-root :where(h1,h2,h3,p,ul,ol,dl,dd,figure,blockquote){margin:0;padding:0}
.ovs-root :where(ul,ol){list-style:none}
.ovs-root :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
.ovs-root :where(a){color:inherit;text-decoration:none}
.ovs-root :where(a,button,input):focus-visible{outline:2px solid var(--ovs-accent);outline-offset:3px;border-radius:6px}
.ovs-svg{display:block;max-width:none;flex:none}
.ovs-cv{display:block;max-width:none;width:100%;height:100%}
.ovs-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.ovs-skip{position:absolute;left:16px;top:-60px;z-index:100;background:var(--ovs-ink);color:var(--ovs-paper);padding:10px 16px;border-radius:999px;transition:top .2s}
.ovs-skip:focus{top:12px}
.ovs-wrap{width:100%;max-width:1240px;margin:0 auto;padding:0 clamp(20px,4vw,48px)}

/* nav */
.ovs-nav{position:sticky;top:0;z-index:60;height:84px;margin-bottom:-84px;display:flex;align-items:center;padding:0 clamp(12px,2.4vw,28px);transition:transform .6s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.ovs-root[data-navhide] .ovs-nav{transform:translateY(-110%)}
.ovs-nav-in{pointer-events:auto;width:100%;max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:20px;height:60px;padding:0 10px 0 18px;border-radius:999px;border:1px solid rgba(255,255,255,.5);background:rgba(255,255,255,.3);backdrop-filter:blur(16px) saturate(1.3);-webkit-backdrop-filter:blur(16px) saturate(1.3);transition:background .5s,border-color .5s,box-shadow .5s;color:var(--ovs-hero-ink)}
.ovs-root[data-scheme="dark"] .ovs-nav-in{background:rgba(8,14,30,.34);border-color:rgba(255,255,255,.12)}
.ovs-root[data-solid] .ovs-nav-in{background:color-mix(in oklab,var(--ovs-paper) 72%,transparent);border-color:var(--ovs-line);box-shadow:0 10px 40px -18px rgba(10,20,8,.35);backdrop-filter:blur(18px) saturate(1.4);-webkit-backdrop-filter:blur(18px) saturate(1.4);color:var(--ovs-ink)}
.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-nav-in{background:transparent;border-color:transparent;backdrop-filter:none;-webkit-backdrop-filter:none;box-shadow:none;color:#f6f8f0;text-shadow:0 1px 14px rgba(0,0,0,.35)}
.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-brandmark{color:#f6f8f0}
.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-nav-cta{background:#f6f8f0;color:#10150d;text-shadow:none}
.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-links{background:rgba(14,22,10,.26);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)}
.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-links a{opacity:.92}
.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-links a[data-on]{background:rgba(255,255,255,.16)}
.ovs-brand{display:flex;align-items:center;gap:10px;font-weight:600;font-size:18px;letter-spacing:-.02em}
.ovs-brandmark{width:26px;height:26px;color:var(--ovs-accent)}
.ovs-root[data-scheme="dark"] .ovs-brandmark{color:var(--ovs-soft)}
.ovs-links{display:flex;gap:4px;margin:0 auto;padding:4px;border-radius:999px}
.ovs-links a{position:relative;padding:8px 14px;border-radius:999px;font-size:14.5px;font-weight:500;opacity:.78;transition:opacity .3s,background .4s}
.ovs-links a:hover{opacity:1}
.ovs-links a[data-on]{opacity:1;background:color-mix(in oklab,currentColor 9%,transparent)}
.ovs-nav-end{display:flex;align-items:center;gap:8px}
.ovs-icon-btn{width:42px;height:42px;border-radius:999px;display:grid;place-items:center;transition:background .3s}
.ovs-icon-btn:hover{background:color-mix(in oklab,currentColor 10%,transparent)}
.ovs-icon-btn .ovs-svg{width:19px;height:19px}
.ovs-burger{display:none;flex-direction:column;justify-content:center;align-items:center;gap:5px}
.ovs-burger span{display:block;width:18px;height:1.6px;background:currentColor;border-radius:2px;transition:transform .4s}
.ovs-burger[aria-expanded="true"] span:first-child{transform:translateY(3.3px) rotate(45deg)}
.ovs-burger[aria-expanded="true"] span:last-child{transform:translateY(-3.3px) rotate(-45deg)}
.ovs-sheet{position:fixed;inset:0;z-index:55;background:var(--ovs-paper);padding:110px 28px 40px;display:flex;flex-direction:column;gap:6px}
.ovs-sheet[hidden]{display:none}
.ovs-sheet a{font-size:clamp(34px,9vw,52px);font-weight:500;letter-spacing:-.04em;display:flex;align-items:baseline;gap:14px;animation:ovs-in .7s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 60ms)}
.ovs-sheet a span{font-size:13px;letter-spacing:0;color:var(--ovs-ink2)}
.ovs-sheet .ovs-btn{font-size:16px;letter-spacing:0;margin-top:24px;align-self:flex-start}
@keyframes ovs-in{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}

/* buttons */
.ovs-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:44px;padding:0 20px;border-radius:999px;font-size:14.5px;font-weight:550;white-space:nowrap;transition:background .3s,color .3s,box-shadow .3s,border-color .3s}
.ovs-btn .ovs-arrow{width:15px;height:15px;transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.ovs-btn:hover .ovs-arrow{transform:translateX(4px)}
.ovs-btn-dark{background:var(--ovs-ink);color:var(--ovs-paper)}
.ovs-btn-dark:hover{box-shadow:0 12px 30px -12px color-mix(in oklab,var(--ovs-ink) 70%,transparent)}
.ovs-btn-line{border:1px solid var(--ovs-line);background:transparent}
.ovs-btn-line:hover{border-color:var(--ovs-ink)}
.ovs-btn-lime{background:var(--ovs-soft);color:#10150d}
.ovs-btn-lime:hover{box-shadow:0 12px 34px -10px var(--ovs-soft)}
.ovs-btn-glass{background:rgba(255,255,255,.42);border:1px solid rgba(255,255,255,.6);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);color:#10150d}
.ovs-root[data-scheme="dark"] .ovs-btn-glass{background:rgba(10,16,30,.4);border-color:rgba(255,255,255,.18);color:#eef1e8}
.ovs-btn-xl{height:56px;padding:0 28px;font-size:16px}
.ovs-btn[disabled]{opacity:.6;cursor:progress}

/* hero */
.ovs-hero{position:relative;height:calc(var(--ovs-h) * 2.3)}
.ovs-root[data-still] .ovs-hero{height:auto}
.ovs-stage{position:sticky;top:0;height:var(--ovs-h);min-height:560px;overflow:hidden;display:grid;place-items:center;color:var(--ovs-hero-ink)}
.ovs-canopy{position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#7ea9d6,#bcd6ec 60%,#dce9f3)}
.ovs-root[data-scheme="dark"] .ovs-canopy{background:linear-gradient(180deg,#08102a,#1d2c5a 60%,#3e3466)}
.ovs-photo{background:#6f8a3a}
.ovs-root[data-scheme="dark"] .ovs-photo{background:#0b1226}
.ovs-photo .ovs-layer{inset:-3%}
.ovs-photo::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(120% 95% at 50% 48%,rgba(8,18,4,0) 52%,rgba(8,18,4,.3) 100%),linear-gradient(180deg,rgba(8,18,4,.22),rgba(8,18,4,0) 16%,rgba(8,18,4,0) 80%,rgba(8,18,4,.3))}
.ovs-pcv{object-fit:cover}
.ovs-fore .ovs-zoom{opacity:0}
.ovs-sway-p{animation:ovs-breathe 16s ease-in-out infinite alternate}
@keyframes ovs-breathe{0%{transform:scale(1) rotate(-.25deg)}100%{transform:scale(1.035) rotate(.35deg)}}
.ovs-skybox{position:absolute;inset:-4%;will-change:transform}
.ovs-skycv{image-rendering:auto}
.ovs-layer{position:absolute;inset:-6%;will-change:transform,opacity}
.ovs-zoom{position:absolute;inset:0;will-change:transform}
.ovs-sway{position:absolute;inset:0;transform-origin:50% 50%;animation:ovs-sway 9s ease-in-out infinite alternate}
.ovs-sway-0{animation-duration:13s}
.ovs-sway-1{animation-duration:11s;animation-direction:alternate-reverse}
.ovs-sway-2{animation-duration:9s}
.ovs-sway-3{animation-duration:7.5s;animation-direction:alternate-reverse}
@keyframes ovs-sway{0%{transform:rotate(-.45deg) scale(1.005)}50%{transform:rotate(.15deg) translate(.3%,-.2%)}100%{transform:rotate(.5deg) scale(1.012)}}
.ovs-falls{position:absolute;inset:0;pointer-events:none;perspective:600px}
.ovs-fall{position:absolute;left:0;top:0;width:22px;height:22px;opacity:0;visibility:hidden}
.ovs-fall .ovs-svg{width:22px;height:22px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.15))}
.ovs-copy{position:relative;z-index:2;text-align:center;padding:0 20px;display:flex;flex-direction:column;align-items:center;will-change:transform}
.ovs-root[data-photo] .ovs-copy::before{content:"";position:absolute;left:-14%;right:-14%;top:-24%;bottom:-26%;z-index:-1;border-radius:50%;background:radial-gradient(closest-side,rgba(220,233,246,.66),rgba(220,233,246,.34) 58%,rgba(220,233,246,0));filter:blur(14px);pointer-events:none}
.ovs-root[data-photo][data-scheme="dark"] .ovs-copy::before{background:radial-gradient(closest-side,rgba(18,22,52,.6),rgba(18,22,52,.3) 58%,rgba(18,22,52,0))}
.ovs-status{display:inline-flex;align-items:center;gap:10px;font-size:13px;font-weight:500;padding:7px 14px 7px 12px;border-radius:999px;background:rgba(255,255,255,.45);border:1px solid rgba(255,255,255,.6);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);margin-bottom:26px}
.ovs-root[data-scheme="dark"] .ovs-status{background:rgba(8,14,30,.4);border-color:rgba(255,255,255,.14)}
.ovs-status i{width:8px;height:8px;border-radius:50%;background:#4cbb3f;box-shadow:0 0 0 0 rgba(76,187,63,.6);animation:ovs-pulse 2.2s infinite}
@keyframes ovs-pulse{0%{box-shadow:0 0 0 0 rgba(76,187,63,.55)}70%{box-shadow:0 0 0 9px rgba(76,187,63,0)}100%{box-shadow:0 0 0 0 rgba(76,187,63,0)}}
.ovs-h1{font-size:clamp(38px,4.9vw,82px);line-height:1.06;letter-spacing:-.04em;font-weight:500;text-shadow:0 1px 24px rgba(255,255,255,.3)}
.ovs-root[data-scheme="dark"] .ovs-h1{text-shadow:0 2px 30px rgba(0,0,0,.35)}
.ovs-line{display:block;overflow:hidden;padding:.04em .08em .1em;margin:-.04em 0 -.1em}
.ovs-line>span{display:inline-block;transform-origin:0 100%}
.ovs-morph{display:inline-block;position:relative;vertical-align:bottom;font-family:var(--ovs-serif);font-weight:400;letter-spacing:.005em;transition:none;white-space:nowrap;perspective:400px}
.ovs-morph-word{display:inline-block;white-space:nowrap;transform:scaleX(.8);transform-origin:0 50%}
.ovs-ch{display:inline-block;transform-origin:50% 50% -.4em;backface-visibility:hidden}
.ovs-trusted{margin-top:clamp(24px,3vw,40px);font-size:clamp(12.5px,.95vw,14px);font-weight:500;letter-spacing:-.005em;opacity:.9}
.ovs-logos{margin-top:18px;display:flex;flex-direction:column;align-items:center;gap:16px}
.ovs-logo-row{display:flex;flex-wrap:wrap;justify-content:center;column-gap:clamp(22px,2.8vw,40px);row-gap:14px}
.ovs-logo-row>span{display:flex}
.ovs-logo{display:inline-flex;align-items:center;gap:8px;font-size:clamp(16px,1.5vw,22px);line-height:1;transition:opacity .4s,transform .5s cubic-bezier(.2,.8,.2,1);cursor:default}
.ovs-logo .ovs-svg{height:1.15em;width:auto}
.ovs-logo-heavy{font-weight:700;letter-spacing:-.04em}
.ovs-logo-sans{font-weight:500;letter-spacing:-.03em}
.ovs-logo-serif{font-family:var(--ovs-serif);font-weight:400;letter-spacing:-.01em}
.ovs-logos:hover .ovs-logo{opacity:.4}
.ovs-logos .ovs-logo:hover{opacity:1;transform:translateY(-3px)}
.ovs-cue{position:absolute;z-index:2;bottom:26px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:12px;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:550;padding:10px 18px 10px 14px;border-radius:999px;background:rgba(255,255,255,.4);border:1px solid rgba(255,255,255,.55);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);white-space:nowrap}
.ovs-root[data-scheme="dark"] .ovs-cue{background:rgba(8,14,30,.4);border-color:rgba(255,255,255,.14)}
.ovs-root[data-photo] .ovs-cue{background:transparent;border-color:transparent;backdrop-filter:none;-webkit-backdrop-filter:none;color:#f6f8f0;text-shadow:0 1px 12px rgba(0,0,0,.45);font-size:11px;letter-spacing:.2em}
.ovs-cue-line{width:1px;height:18px;background:linear-gradient(currentColor,transparent);position:relative;overflow:hidden}
.ovs-cue-line::after{content:"";position:absolute;left:0;top:-40%;width:1px;height:40%;background:var(--ovs-paper);animation:ovs-drip 2.2s cubic-bezier(.6,0,.2,1) infinite}
@keyframes ovs-drip{to{top:110%}}
.ovs-veil{position:absolute;left:0;right:0;top:0;height:200%;z-index:3;pointer-events:none;transform:translateY(50%);background:radial-gradient(60% 18% at 22% 50%,var(--ovs-mist) 30%,transparent 70%),radial-gradient(50% 16% at 78% 52%,var(--ovs-mist) 30%,transparent 70%),linear-gradient(180deg,transparent 0%,color-mix(in oklab,var(--ovs-mist) 70%,transparent) 38%,var(--ovs-mist) 50%,var(--ovs-mist) 100%);display:flex;align-items:center;justify-content:center}
.ovs-above{margin-top:52%;font-family:var(--ovs-serif);font-size:clamp(28px,4vw,56px);letter-spacing:-.02em;color:var(--ovs-ink);opacity:0}
.ovs-root[data-still] .ovs-veil{display:none}

/* sections */
.ovs-sec{position:relative;padding:clamp(90px,12vw,170px) 0}
.ovs-kicker{display:flex;gap:14px;align-items:center;font-size:13px;font-weight:500;letter-spacing:.02em;color:var(--ovs-ink2);margin-bottom:22px}
.ovs-kicker-n{font-variant-numeric:tabular-nums;color:var(--ovs-accent);font-weight:600}
.ovs-root[data-scheme="dark"] .ovs-kicker-n{color:var(--ovs-soft)}
.ovs-kicker-light{color:rgba(237,241,230,.7)}
.ovs-kicker-light .ovs-kicker-n{color:var(--ovs-soft)}
.ovs-h2{font-size:clamp(34px,4.6vw,68px);line-height:1.02;letter-spacing:-.045em;font-weight:500;max-width:15em}
.ovs-h2-wide{max-width:18em}
.ovs-w{display:inline-block;overflow:hidden;vertical-align:top;padding:.06em .02em .12em;margin:-.06em -.02em -.12em}
.ovs-w>span{display:inline-block;transform-origin:0 100%}
.ovs-lede{font-size:clamp(16px,1.25vw,18.5px);color:var(--ovs-ink2);max-width:28em;line-height:1.55}
.ovs-head{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;flex-wrap:wrap;margin-bottom:clamp(44px,6vw,80px)}
.ovs-head-side{display:flex;flex-direction:column;gap:22px;align-items:flex-start}

/* manifesto */
.ovs-manifesto{background:linear-gradient(180deg,var(--ovs-mist),var(--ovs-paper) 62%);padding-top:clamp(70px,9vw,130px)}
.ovs-man{font-size:clamp(28px,4.1vw,62px);line-height:1.14;letter-spacing:-.04em;font-weight:500;max-width:21em}
.ovs-pic{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;height:.92em;margin:0 .22em .1em 0;border-radius:999px;transform-origin:50% 50%}
.ovs-pic-team{gap:0;padding:0 .08em}
.ovs-pic-team i{width:.92em;height:.92em;border-radius:50%;display:grid;place-items:center;font-style:normal;letter-spacing:0;color:#10150d;border:.06em solid var(--ovs-paper);margin-left:-.18em}
.ovs-pic-team b{font-size:.27em;font-weight:650}
.ovs-pic-team i:nth-child(1){background:var(--ovs-soft);margin-left:0}
.ovs-pic-team i:nth-child(2){background:#a9c6e4}
.ovs-pic-team i:nth-child(3){background:#e8c58c}
.ovs-pic-chart{width:1.9em;background:var(--ovs-accent);color:var(--ovs-soft);padding:.16em .26em}
.ovs-pic-chart .ovs-svg{width:100%;height:100%}
.ovs-pic-leaf{width:.92em;background:var(--ovs-ink)}
.ovs-pic-leaf .ovs-svg{width:62%;height:62%;color:var(--ovs-soft)}
.ovs-stats{margin-top:clamp(70px,9vw,120px);display:grid;grid-template-columns:repeat(4,1fr);gap:28px}
.ovs-stat{position:relative;padding-top:22px;display:flex;flex-direction:column;gap:6px}
.ovs-stat-rule{position:absolute;left:0;right:0;top:0;height:1px;background:var(--ovs-ink);opacity:.2;transform-origin:0 50%}
.ovs-stat dd{font-size:clamp(40px,4.6vw,66px);letter-spacing:-.05em;font-weight:500;line-height:1;font-variant-numeric:tabular-nums}
.ovs-stat dt{font-size:14px;color:var(--ovs-ink2);max-width:15em}

/* services */
.ovs-svc-list{position:relative}
.ovs-svc-prev{position:absolute;left:0;top:0;z-index:4;width:240px;height:160px;pointer-events:none;border-radius:16px;box-shadow:0 30px 60px -20px rgba(10,20,8,.4);overflow:hidden;visibility:hidden;opacity:0}
.ovs-svc-art{position:absolute;inset:0;clip-path:inset(100% 0 0 0);transition:clip-path .6s cubic-bezier(.7,0,.2,1)}
.ovs-svc-art[data-on]{clip-path:inset(0 0 0 0)}
.ovs-svc-art .ovs-svg{width:240px;height:160px}
.ovs-svc-row{--ovs-rule:1;position:relative;border-top:1px solid transparent}
.ovs-svc-row::before{content:"";position:absolute;left:0;right:0;top:-1px;height:1px;background:var(--ovs-line);transform:scaleX(var(--ovs-rule));transform-origin:0 50%}
.ovs-svc-row:last-child{border-bottom:1px solid var(--ovs-line)}
.ovs-svc-row::after{content:"";position:absolute;inset:0;background:color-mix(in oklab,var(--ovs-soft) 26%,transparent);transform:scaleY(0);transform-origin:50% 100%;transition:transform .55s cubic-bezier(.7,0,.2,1);z-index:-1}
.ovs-svc-row:hover::after,.ovs-svc-row[data-open]::after{transform:scaleY(1)}
.ovs-svc-h button{width:100%;display:grid;grid-template-columns:70px 1fr auto 40px;align-items:center;gap:20px;padding:clamp(22px,2.6vw,34px) 10px;text-align:left}
.ovs-svc-n{font-size:14px;color:var(--ovs-ink2);font-variant-numeric:tabular-nums}
.ovs-svc-t{font-size:clamp(26px,3.4vw,50px);letter-spacing:-.045em;font-weight:500;line-height:1.05;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.ovs-svc-row:hover .ovs-svc-t,.ovs-svc-row[data-open] .ovs-svc-t{transform:translateX(14px)}
.ovs-svc-time{font-size:14px;color:var(--ovs-ink2)}
.ovs-plus{position:relative;width:40px;height:40px;border-radius:50%;border:1px solid var(--ovs-line);transition:transform .5s cubic-bezier(.2,.8,.2,1),background .3s,border-color .3s;justify-self:end}
.ovs-plus::before,.ovs-plus::after{content:"";position:absolute;left:50%;top:50%;width:13px;height:1.6px;background:currentColor;transform:translate(-50%,-50%)}
.ovs-plus::after{transform:translate(-50%,-50%) rotate(90deg)}
.ovs-root [aria-expanded="true"] .ovs-plus{transform:rotate(135deg);background:var(--ovs-ink);color:var(--ovs-paper);border-color:var(--ovs-ink)}
.ovs-fold{display:grid;grid-template-rows:0fr;transition:grid-template-rows .6s cubic-bezier(.2,.8,.2,1)}
.ovs-fold>div{overflow:hidden;min-height:0}
.ovs-root [data-open]>.ovs-fold{grid-template-rows:1fr}
.ovs-svc-body{display:grid;grid-template-columns:70px 1fr;gap:20px;padding:0 10px 34px}
.ovs-svc-body p{grid-column:2;font-size:clamp(16px,1.3vw,19px);color:var(--ovs-ink2);max-width:34em}
.ovs-svc-body ul{grid-column:2;display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}
.ovs-svc-body li{font-size:13.5px;padding:6px 13px;border-radius:999px;background:var(--ovs-card);border:1px solid var(--ovs-line)}

/* work */
.ovs-work{position:relative;background:var(--ovs-paper)}
.ovs-work-stage{padding:clamp(60px,8vw,110px) 0}
.ovs-work[data-h] .ovs-work-stage{position:sticky;top:0;height:var(--ovs-h);min-height:640px;overflow:hidden;display:flex;flex-direction:column;justify-content:center;padding:96px 0 40px}
.ovs-work-head{display:flex;justify-content:space-between;align-items:flex-end;gap:30px;margin-bottom:clamp(30px,4vw,48px)}
.ovs-work-head .ovs-h2{font-size:clamp(34px,4.2vw,62px)}
.ovs-work-meter{display:none;flex-direction:column;align-items:flex-end;gap:12px;min-width:180px}
.ovs-work[data-h] .ovs-work-meter{display:flex}
.ovs-work-count{font-variant-numeric:tabular-nums;font-size:14px;font-weight:500}
.ovs-work-track{width:180px;height:2px;background:var(--ovs-line);border-radius:2px;overflow:hidden}
.ovs-work-track i{display:block;height:100%;background:var(--ovs-ink);transform:scaleX(0);transform-origin:0 50%}
.ovs-track{display:flex;flex-direction:column;gap:28px;padding:0 clamp(20px,4vw,48px)}
.ovs-work[data-h] .ovs-track{flex-direction:row;width:max-content;padding-left:max(clamp(20px,4vw,48px),calc((100vw - 1240px) / 2 + 48px));padding-right:clamp(20px,4vw,48px);will-change:transform}
.ovs-card{flex:none;display:flex;flex-direction:column;width:100%;border-radius:28px;overflow:hidden;background:var(--ovs-card);border:1px solid var(--ovs-line);transform-origin:50% 100%}
.ovs-work[data-h] .ovs-card{width:min(64vw,760px);height:min(calc(var(--ovs-h) - 370px),540px);min-height:360px}
.ovs-card-link{display:flex;flex-direction:column;flex:1;min-height:0}
.ovs-card-art{position:relative;flex:1;min-height:260px;overflow:hidden;background:radial-gradient(120% 90% at 80% 10%,var(--t1),var(--t2));display:flex;align-items:center;justify-content:center;padding:28px}
.ovs-root[data-scheme="dark"] .ovs-card-art{background:radial-gradient(120% 90% at 80% 10%,color-mix(in oklab,var(--t2) 60%,#000),color-mix(in oklab,var(--t2) 22%,#000))}
.ovs-card-sun{position:absolute;right:-60px;top:-60px;width:220px;height:220px;border-radius:50%;background:radial-gradient(rgba(255,255,255,.75),transparent 70%);transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.ovs-card:hover .ovs-card-sun{transform:translate(-40px,30px) scale(1.3)}
.ovs-card-meta{display:grid;grid-template-columns:1fr auto;gap:8px 30px;padding:22px 26px 24px;align-items:end}
.ovs-card-client{grid-column:1/-1;display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px}
.ovs-card-client .ovs-svg{height:18px;width:auto}
.ovs-card-client span{font-weight:400;color:var(--ovs-ink2);margin-left:6px;font-size:14px}
.ovs-card-title{font-size:clamp(19px,1.7vw,24px);letter-spacing:-.03em;font-weight:500;line-height:1.2;max-width:22em}
.ovs-card-metric{text-align:right;display:flex;flex-direction:column;align-items:flex-end}
.ovs-card-metric b{font-size:clamp(30px,3vw,44px);letter-spacing:-.05em;font-weight:500;line-height:1;color:var(--ovs-accent)}
.ovs-root[data-scheme="dark"] .ovs-card-metric b{color:var(--ovs-soft)}
.ovs-card-metric span{font-size:12.5px;color:var(--ovs-ink2);max-width:15em}
.ovs-card-next{background:var(--ovs-soft);color:#10150d;border-color:transparent}
.ovs-work[data-h] .ovs-card-next{width:min(40vw,440px)}
.ovs-card-next .ovs-card-link{align-items:flex-start;justify-content:space-between;padding:34px;gap:40px;min-height:300px}
.ovs-card-next .ovs-brandmark{width:64px;height:64px;color:#10150d;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.ovs-card-next:hover .ovs-brandmark{transform:rotate(180deg)}
.ovs-card-next-t{font-size:clamp(36px,3.6vw,56px);letter-spacing:-.05em;line-height:1;font-weight:500}
.ovs-card-next .ovs-btn-dark{background:#10150d;color:#f4f6f0}
.ovs-mock{position:relative;width:min(100%,520px);border-radius:16px;background:var(--ovs-card);box-shadow:0 40px 80px -30px rgba(10,20,8,.45),0 0 0 1px rgba(0,0,0,.05);overflow:hidden;transition:transform .9s cubic-bezier(.2,.8,.2,1)}
.ovs-card:hover .ovs-mock{transform:translateY(-8px)}
.ovs-mk-bar{display:flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-bottom:1px solid var(--ovs-line)}
.ovs-mk-bar i{width:8px;height:8px;border-radius:50%;background:var(--ovs-line)}
.ovs-mk-bar span{margin-left:10px;font-size:11px;color:var(--ovs-ink2)}
.ovs-mk-body{display:flex;min-height:190px}
.ovs-mk-side{width:52px;border-right:1px solid var(--ovs-line);display:flex;flex-direction:column;gap:10px;padding:14px 12px}
.ovs-mk-side span{height:8px;border-radius:4px;background:var(--ovs-line)}
.ovs-mk-side span[data-on]{background:var(--ovs-accent)}
.ovs-mk-main{flex:1;padding:16px;display:flex;flex-direction:column;gap:9px;min-width:0}
.ovs-mk-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.ovs-mk-kpis div{border:1px solid var(--ovs-line);border-radius:10px;padding:8px 10px;display:flex;flex-direction:column}
.ovs-mk-kpis span{font-size:10px;color:var(--ovs-ink2)}
.ovs-mk-kpis b{font-size:17px;letter-spacing:-.03em;font-weight:600}
.ovs-mk-chart{width:100%;height:96px}
.ovs-bubble{align-self:flex-start;max-width:82%;font-size:11.5px;line-height:1.35;padding:8px 11px;border-radius:12px 12px 12px 4px;background:var(--ovs-mist)}
.ovs-bubble-me{align-self:flex-end;background:var(--ovs-ink);color:var(--ovs-paper);border-radius:12px 12px 4px 12px}
.ovs-mk-wave{display:flex;align-items:center;gap:3px;height:32px;margin-top:2px}
.ovs-mk-wave i{flex:1;border-radius:2px;background:var(--ovs-accent);opacity:.7}
.ovs-mk-sm{font-size:10.5px;color:var(--ovs-ink2)}
.ovs-mk-h{font-size:16px;font-weight:600;letter-spacing:-.02em}
.ovs-mk-line{height:7px;border-radius:4px;background:var(--ovs-line)}
.ovs-mk-chips{display:flex;gap:6px}
.ovs-mk-chips span{font-size:10px;padding:4px 8px;border-radius:999px;background:color-mix(in oklab,var(--ovs-soft) 45%,transparent)}
.ovs-mock-phone{width:220px;border-radius:30px;padding:16px 16px 20px;display:flex;flex-direction:column;gap:8px;border:6px solid #10150d}
.ovs-phone-notch{width:70px;height:16px;border-radius:999px;background:#10150d;align-self:center;margin:-6px 0 6px}
.ovs-mk-big{font-size:24px;letter-spacing:-.04em;font-weight:600}
.ovs-phone-split{display:flex;gap:4px;height:8px;margin-bottom:6px}
.ovs-phone-split span{border-radius:4px;background:var(--ovs-accent)}
.ovs-phone-split span+span{background:#b48aa8}
.ovs-mk-row{display:flex;align-items:center;gap:8px;font-size:12px;padding:7px 0;border-top:1px solid var(--ovs-line)}
.ovs-mk-row i{width:9px;height:9px;border-radius:3px}
.ovs-mk-row b{margin-left:auto;font-weight:600}

/* process */
.ovs-process{background:linear-gradient(180deg,var(--ovs-paper),color-mix(in oklab,var(--ovs-soft) 14%,var(--ovs-paper)))}
.ovs-proc-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,6vw,90px);margin-top:clamp(40px,6vw,80px)}
.ovs-tree-col{position:relative}
.ovs-tree-stick{position:sticky;top:max(100px,calc(50svh - 280px));height:min(560px,70svh);display:flex;align-items:center;justify-content:center}
.ovs-tree{width:auto;height:min(560px,70svh)}
.ovs-steps{display:flex;flex-direction:column}
.ovs-step{min-height:min(68svh,560px);display:flex;flex-direction:column;justify-content:center;gap:14px;opacity:.28;transition:opacity .7s;border-top:1px solid var(--ovs-line);padding:30px 0}
.ovs-step.ovs-on{opacity:1}
.ovs-root[data-still] .ovs-step{opacity:1;min-height:0}
.ovs-step-k{display:flex;align-items:baseline;gap:12px;font-size:14px}
.ovs-step-k span{color:var(--ovs-ink2);font-variant-numeric:tabular-nums}
.ovs-step-k b{font-family:var(--ovs-serif);font-weight:400;font-size:22px;color:var(--ovs-accent)}
.ovs-root[data-scheme="dark"] .ovs-step-k b{color:var(--ovs-soft)}
.ovs-step-k em{font-style:normal;margin-left:auto;color:var(--ovs-ink2)}
.ovs-step h3{font-size:clamp(34px,3.8vw,56px);letter-spacing:-.045em;font-weight:500;line-height:1}
.ovs-step p:last-child{font-size:clamp(16px,1.3vw,19px);color:var(--ovs-ink2);max-width:28em}

/* quotes */
.ovs-shade{position:relative;overflow:hidden;background:var(--ovs-forest);color:#edf1e6;padding:clamp(100px,13vw,180px) 0}
.ovs-shade-photo{position:absolute;inset:-6%;background-size:cover;background-position:center;transform:rotate(180deg);filter:blur(2px) brightness(.34) saturate(.85);pointer-events:none}
.ovs-root[data-season="autumn"] .ovs-shade-photo{filter:blur(2px) brightness(.34) saturate(1.1) sepia(.35) hue-rotate(-18deg)}
.ovs-root[data-season="blossom"] .ovs-shade-photo{filter:blur(2px) brightness(.36) saturate(.6) hue-rotate(250deg)}
.ovs-shade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,var(--ovs-forest),color-mix(in oklab,var(--ovs-forest) 40%,transparent) 30%,color-mix(in oklab,var(--ovs-forest) 55%,transparent) 70%,var(--ovs-forest));pointer-events:none}
.ovs-dapple{position:absolute;inset:0;pointer-events:none;z-index:1}
.ovs-dapple i{position:absolute;border-radius:50%;filter:blur(50px);background:radial-gradient(var(--ovs-soft),transparent 65%);opacity:.22;mix-blend-mode:screen;animation:ovs-dap 18s ease-in-out infinite alternate}
.ovs-dapple i:nth-child(1){width:520px;height:420px;left:-120px;top:-120px}
.ovs-dapple i:nth-child(2){width:380px;height:380px;right:6%;top:20%;animation-duration:23s;animation-direction:alternate-reverse}
.ovs-dapple i:nth-child(3){width:300px;height:260px;left:35%;bottom:-80px;animation-duration:15s}
.ovs-dapple i:nth-child(4){width:200px;height:200px;right:30%;top:-40px;animation-duration:12s;opacity:.3}
@keyframes ovs-dap{0%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,40px) scale(1.15)}100%{transform:translate(-40px,70px) scale(.9)}}
.ovs-quote-wrap{position:relative;z-index:2}
.ovs-quote blockquote p{font-size:clamp(28px,3.9vw,58px);line-height:1.12;letter-spacing:-.04em;font-weight:500;max-width:20em;min-height:3.4em}
.ovs-quote figcaption{display:flex;align-items:center;gap:16px;margin-top:clamp(34px,4vw,52px);font-size:15px}
.ovs-quote figcaption>span:nth-child(2){display:flex;flex-direction:column}
.ovs-quote figcaption b{font-weight:600}
.ovs-quote figcaption>span:nth-child(2)>span{color:rgba(237,241,230,.65)}
.ovs-avatar{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--ovs-soft),var(--ovs-accent));color:#10150d;font-weight:700;letter-spacing:-.02em}
.ovs-quote-mark{margin-left:18px;padding-left:18px;border-left:1px solid rgba(237,241,230,.2);opacity:.75}
.ovs-quote-mark .ovs-svg{height:24px;width:auto}
.ovs-quote-nav{display:flex;align-items:center;gap:18px;margin-top:clamp(40px,5vw,64px)}
.ovs-round{width:50px;height:50px;border-radius:50%;border:1px solid rgba(237,241,230,.25);display:grid;place-items:center;transition:background .3s,color .3s}
.ovs-round:hover{background:#edf1e6;color:#10150d}
.ovs-round .ovs-svg{width:16px;height:16px}
.ovs-dots{display:flex;gap:8px}
.ovs-dots button{position:relative;width:46px;height:3px;border-radius:3px;background:rgba(237,241,230,.22);overflow:hidden}
.ovs-dots button[aria-current]{background:rgba(237,241,230,.35)}
.ovs-dots i{position:absolute;inset:0;background:var(--ovs-soft);transform-origin:0 50%;animation:ovs-prog 7s linear forwards}
.ovs-dots i[data-paused]{animation-play-state:paused}
@keyframes ovs-prog{from{transform:scaleX(0)}to{transform:scaleX(1)}}

/* pricing */
.ovs-seg{position:relative;display:inline-flex;padding:4px;border-radius:999px;background:var(--ovs-card);border:1px solid var(--ovs-line)}
.ovs-seg button{position:relative;z-index:1;height:38px;padding:0 18px;border-radius:999px;font-size:14px;font-weight:500;transition:color .4s;display:inline-flex;align-items:center;gap:8px}
.ovs-seg button[aria-pressed="true"]{color:var(--ovs-paper)}
.ovs-seg em{font-style:normal;font-size:11.5px;padding:2px 7px;border-radius:999px;background:var(--ovs-soft);color:#10150d}
.ovs-seg-pill{position:absolute;top:4px;bottom:4px;left:4px;width:96px;border-radius:999px;background:var(--ovs-ink);transition:transform .55s cubic-bezier(.7,0,.2,1),width .55s cubic-bezier(.7,0,.2,1)}
.ovs-seg[data-q] .ovs-seg-pill{transform:translateX(96px);width:calc(100% - 104px)}
.ovs-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:stretch}
.ovs-plan{position:relative;display:flex;border-radius:26px;background:var(--ovs-card);border:1px solid var(--ovs-line);transform-style:preserve-3d;overflow:hidden}
.ovs-plan::before{content:"";position:absolute;inset:0;background:radial-gradient(300px circle at var(--mx,50%) var(--my,0%),color-mix(in oklab,var(--ovs-soft) 30%,transparent),transparent 60%);opacity:0;transition:opacity .5s;pointer-events:none}
.ovs-plan:hover::before{opacity:1}
.ovs-plan[data-featured]{background:var(--ovs-forest);color:#edf1e6;border-color:transparent}
.ovs-plan-ring{position:absolute;inset:-60%;background:conic-gradient(from 0deg,transparent 0 70%,var(--ovs-soft) 85%,transparent 100%);animation:ovs-spin 6s linear infinite;opacity:.9}
@keyframes ovs-spin{to{transform:rotate(1turn)}}
.ovs-plan-in{position:relative;flex:1;padding:30px;display:flex;flex-direction:column;gap:18px;border-radius:25px;margin:1.5px;background:inherit}
.ovs-plan[data-featured] .ovs-plan-in{background:var(--ovs-forest)}
.ovs-plan-name{display:flex;align-items:center;justify-content:space-between;font-weight:600;font-size:16px}
.ovs-plan-name span{font-size:12px;font-weight:600;padding:4px 10px;border-radius:999px;background:var(--ovs-soft);color:#10150d}
.ovs-plan-price{display:flex;align-items:baseline;gap:6px;font-size:clamp(40px,3.8vw,56px);letter-spacing:-.05em;font-weight:500;line-height:1;font-variant-numeric:tabular-nums}
.ovs-plan-price small{font-size:15px;letter-spacing:0;opacity:.6;font-weight:400}
.ovs-plan-text{font-size:15px;opacity:.72}
.ovs-plan ul{display:flex;flex-direction:column;gap:11px;padding:20px 0;border-top:1px solid var(--ovs-line);flex:1}
.ovs-plan[data-featured] ul{border-color:rgba(237,241,230,.15)}
.ovs-plan li{display:flex;gap:10px;font-size:14.5px;align-items:flex-start}
.ovs-plan li .ovs-svg{width:16px;height:16px;margin-top:3px;color:var(--ovs-accent)}
.ovs-root[data-scheme="dark"] .ovs-plan li .ovs-svg,.ovs-plan[data-featured] li .ovs-svg{color:var(--ovs-soft)}
.ovs-plan .ovs-btn{width:100%;height:50px}
.ovs-plan[data-featured] .ovs-btn-line{border-color:rgba(237,241,230,.3)}

/* faq */
.ovs-faq-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(40px,7vw,110px);align-items:start}
.ovs-faq-card{margin-top:40px;padding:26px;border-radius:22px;background:var(--ovs-card);border:1px solid var(--ovs-line);display:flex;flex-direction:column;gap:18px;align-items:flex-start}
.ovs-faq-card p{color:var(--ovs-ink2);font-size:15px}
.ovs-acc-item{border-top:1px solid var(--ovs-line)}
.ovs-acc-item:last-child{border-bottom:1px solid var(--ovs-line)}
.ovs-acc-item h3 button{width:100%;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:26px 0;text-align:left;font-size:clamp(18px,1.6vw,23px);letter-spacing:-.025em;font-weight:500}
.ovs-acc-item .ovs-plus{width:34px;height:34px;flex:none}
.ovs-acc-item p{padding:0 50px 28px 0;color:var(--ovs-ink2);font-size:16px;max-width:36em}

/* finale */
.ovs-fin{position:relative;height:calc(var(--ovs-h) * 1.9);background:var(--ovs-paper)}
.ovs-root[data-still] .ovs-fin{height:auto}
.ovs-fin-stage{position:sticky;top:0;height:var(--ovs-h);min-height:600px;display:grid;place-items:center}
.ovs-window{--ovs-wi:0%;--ovs-wr:0px;position:absolute;inset:0;clip-path:inset(var(--ovs-wi) round var(--ovs-wr));overflow:hidden;display:grid;place-items:center;color:var(--ovs-hero-ink)}
.ovs-fin-copy{position:relative;z-index:2;text-align:center;display:flex;flex-direction:column;align-items:center;gap:22px;padding:0 24px;max-width:980px}
.ovs-fin-h{font-size:clamp(40px,6vw,96px);line-height:1;letter-spacing:-.05em;font-weight:500;text-shadow:0 1px 30px rgba(255,255,255,.3)}
.ovs-root[data-scheme="dark"] .ovs-fin-h{text-shadow:0 2px 30px rgba(0,0,0,.4)}
.ovs-fin-copy>p{font-size:clamp(16px,1.3vw,19px);max-width:30em;font-weight:500;opacity:.85}
.ovs-fin-actions{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:8px}

/* footer */
.ovs-foot{position:relative;background:var(--ovs-forest);color:#edf1e6;padding-top:clamp(70px,8vw,110px);overflow:hidden}
.ovs-foot-top{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:60px}
.ovs-news label{display:block;font-size:clamp(22px,2vw,30px);letter-spacing:-.035em;line-height:1.15;font-weight:500;max-width:15em}
.ovs-news-row{display:flex;gap:8px;margin-top:26px;padding:6px;border-radius:999px;background:rgba(237,241,230,.07);border:1px solid rgba(237,241,230,.14);max-width:460px}
.ovs-news input{flex:1;min-width:0;background:transparent;border:0;color:inherit;font:inherit;font-size:15px;padding:0 16px;outline:none}
.ovs-news input::placeholder{color:rgba(237,241,230,.45)}
.ovs-news-row:focus-within{border-color:var(--ovs-soft)}
.ovs-news-msg{min-height:24px;margin-top:10px;font-size:14px;color:rgba(237,241,230,.7)}
.ovs-news-msg[data-state="invalid"],.ovs-news-msg[data-state="error"]{color:#f3a98f}
.ovs-news-msg[data-state="done"]{color:var(--ovs-soft)}
.ovs-foot-cols{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.ovs-foot-cols p{font-size:13px;color:rgba(237,241,230,.5);margin-bottom:16px}
.ovs-foot-cols ul{display:flex;flex-direction:column;gap:9px}
.ovs-foot-cols a{font-size:15px;position:relative;background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .5s cubic-bezier(.2,.8,.2,1);padding-bottom:2px}
.ovs-foot-cols a:hover{background-size:100% 1px}
.ovs-clock{display:flex;align-items:center;gap:8px;font-size:15px;font-variant-numeric:tabular-nums}
.ovs-clock i{width:7px;height:7px;border-radius:50%;background:#4cbb3f;animation:ovs-pulse 2.2s infinite}
.ovs-wordmark-box{container-type:inline-size;width:100%;margin-top:clamp(44px,7vw,96px)}
.ovs-wordmark{display:flex;justify-content:center;align-items:baseline;direction:ltr;font-size:clamp(48px,min(28vw,calc(140vw / var(--ovs-brand-len,5))),360px);font-size:clamp(48px,min(32cqw,calc(152cqw / var(--ovs-brand-len,5))),360px);line-height:1.04;letter-spacing:0;font-weight:600;overflow:hidden;padding:.08em 0 .14em;user-select:none}
.ovs-wordmark span{display:inline-block;background:linear-gradient(180deg,var(--ovs-soft),color-mix(in oklab,var(--ovs-soft) 40%,var(--ovs-forest)) 94%);-webkit-background-clip:text;background-clip:text;color:transparent}
.ovs-wordmark span+span{margin-left:-.04em}
.ovs-foot-bottom{display:flex;justify-content:space-between;align-items:center;gap:12px 20px;flex-wrap:wrap;padding-top:22px;padding-bottom:26px;border-top:1px solid rgba(237,241,230,.12);font-size:13.5px;color:rgba(237,241,230,.6)}
.ovs-top{display:inline-flex;align-items:center;gap:8px;color:#edf1e6;font-size:13.5px}
.ovs-top .ovs-svg{width:14px;height:14px;transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.ovs-top:hover .ovs-svg{transform:translateY(-4px)}

/* responsive */
@media (max-width:1020px){.ovs-links{display:none}.ovs-burger{display:flex}.ovs-nav-in{justify-content:space-between}.ovs-plans{grid-template-columns:1fr;max-width:520px}.ovs-stats{grid-template-columns:repeat(2,1fr);row-gap:40px}.ovs-foot-top{grid-template-columns:1fr}.ovs-svc-time{display:none}.ovs-svc-h button{grid-template-columns:44px 1fr 40px}.ovs-svc-body{grid-template-columns:44px 1fr}}
@media (max-width:820px){.ovs-proc-grid{grid-template-columns:1fr}.ovs-tree-col{display:none}.ovs-step{opacity:1;min-height:0}.ovs-faq-grid{grid-template-columns:1fr}.ovs-foot-cols{grid-template-columns:repeat(2,1fr);row-gap:36px}.ovs-card-meta{grid-template-columns:1fr}.ovs-card-metric{text-align:left;align-items:flex-start}.ovs-svc-prev{display:none}}
@media (max-width:560px){.ovs-root[data-photo] .ovs-copy::before{left:-4%;right:-4%;top:-14%;bottom:-14%}.ovs-nav-cta{display:none}.ovs-logo-row{column-gap:20px}.ovs-h1{font-size:clamp(36px,10.4vw,56px)}.ovs-quote figcaption{flex-wrap:wrap}.ovs-mock-phone{width:190px}.ovs-mk-kpis b{font-size:14px}.ovs-acc-item p{padding-right:0}.ovs-wordmark-box{margin-top:36px}.ovs-wordmark{padding:.06em 0 .12em}.ovs-foot-bottom{font-size:13px;padding-top:18px;padding-bottom:22px}}
@media (prefers-reduced-motion:reduce){.ovs-sway,.ovs-sway-p,.ovs-status i,.ovs-clock i,.ovs-dapple i,.ovs-plan-ring,.ovs-cue-line::after,.ovs-sheet a{animation:none}.ovs-dots i{animation:none;transform:scaleX(1)}.ovs-fold,.ovs-svc-art,.ovs-svc-row::after,.ovs-svc-t,.ovs-seg-pill,.ovs-nav,.ovs-mock,.ovs-card-sun{transition:none}}
`

// The canopy photo: looking up through plane trees into a gap of sky. Adobe Stock
// #303147850 (free collection), licensed through the owner's Adobe account,
// cropped, graded toward summer green and encoded as AVIF (1600 x 900).
// Pass your own with the `photo` prop.
