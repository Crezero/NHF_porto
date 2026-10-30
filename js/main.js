'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const ICONS = {
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17c0 .6-.5 1-1 1.2C7.9 18.8 7 20.2 7 22M14 14.7V17c0 .6.5 1 1 1.2 1.2.6 2 2 2 3.8M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-1.8 5.4a2 2 0 0 1-1.3 1.3L7.8 16.2l1.8-5.4a2 2 0 0 1 1.3-1.3z"/>',
  languages: '<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>',
  arrow: '<path d="M7 7h10v10M7 17 17 7"/>',
  mail: '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
};
const svg = (p) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
const ext = (href, label, off) => href
  ? `<a class="link" href="${href}" target="_blank" rel="noopener noreferrer">${label}${svg(ICONS.arrow)}</a>`
  : `<span class="link off" aria-disabled="true" title="Add this URL in js/data.js">${off}</span>`;

/* ---------- Render content from data.js ---------- */
$('#legend').innerHTML = Object.entries(DATA.levels).map(([k, v]) => `<li class="chip ${k}">${v}</li>`).join('');
$('#skills-list').innerHTML = DATA.skills.map((g) => `
  <div class="group" data-reveal>
    <div><h3>${g.title}</h3><p class="muted">${g.note}</p></div>
    <ul class="chips">${g.items.map(([n, l], i) => `<li class="chip ${l}" style="--i:${i}">${n}<span class="sr">, ${DATA.levels[l]}</span></li>`).join('')}</ul>
  </div>`).join('');

const card = (p, i) => `
  <article class="card enter" style="--i:${i}">
    <div class="preview">${p.image ? `<img src="${p.image}" alt="${p.title} preview" loading="lazy">` : `<span aria-hidden="true">${p.mark}</span>`}</div>
    <div class="body">
      <div class="row"><h3>${p.title}</h3><span class="status ${p.status.replace(/\s/g, '-').toLowerCase()}">${p.status}</span></div>
      <p>${p.overview}</p>
      <p class="muted"><strong>Purpose:</strong> ${p.purpose}</p>
      <ul class="feat">${p.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      <ul class="tech" aria-label="Technologies and focus">${p.tech.map((t) => `<li>${t}</li>`).join('')}</ul>
      <div class="plinks">${ext(p.repo, 'Source code', 'Repository: not added yet')}${ext(p.demo, p.demoLabel || 'Live demo', `${p.demoLabel || 'Live demo'}: not added yet`)}</div>
    </div>
  </article>`;

const filters = $('#filters'), grid = $('#grid');
filters.innerHTML = ['All', ...DATA.categories].map((c) => `<button class="filter" aria-pressed="false">${c}</button>`).join('');
function show(c) {
  const list = DATA.projects.filter((p) => c === 'All' || p.categories.includes(c));
  $$('button', filters).forEach((b) => b.setAttribute('aria-pressed', b.textContent === c));
  grid.innerHTML = list.length ? list.map(card).join('') : `<p class="empty">No projects in ${c} yet. Add one in js/data.js.</p>`;
  $('#status').textContent = `${list.length} ${list.length === 1 ? 'project' : 'projects'} shown`;
}
filters.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) show(b.textContent); });
show('All');

$('#timeline').innerHTML = DATA.achievements.map((a, i) => `
  <li class="${a.featured ? 'hl' : ''}" data-reveal style="--i:${i}">
    <span class="marker">${svg(ICONS[a.icon])}</span>
    <div><p class="date">${a.date}</p><h3>${a.title}</h3><p>${a.detail}</p>
    ${a.stat ? `<p class="stat"><b data-count="${a.stat.value}">0</b><span>${a.stat.label}</span></p>` : ''}</div>
  </li>`).join('');

const socials = DATA.socials.map((s) => `<li>${ext(s.url, s.label, `${s.label}: not added yet`)}</li>`).join('');
$('#contact-actions').innerHTML =
  (DATA.email ? `<a class="btn primary" href="mailto:${DATA.email}">${svg(ICONS.mail)}Email me</a>`
    : '<p class="muted">Email not added yet. Set <code>email</code> in js/data.js to show an email button here.</p>')
  + `<ul class="socials">${socials}</ul>`;
$('#foot-socials').innerHTML = socials;
$('#year').textContent = new Date().getFullYear();

/* ---------- Photos: show a monogram until the image file exists ---------- */
$$('.photo').forEach((f) => {
  const img = $('img', f), miss = () => f.classList.add('empty-photo');
  img.addEventListener('error', miss);
  if (img.complete && !img.naturalWidth) miss();
});

/* ---------- Theme, menu, progress, active link ---------- */
const themeBtn = $('#theme');
const label = () => themeBtn.setAttribute('aria-label', `Switch to ${root.dataset.theme === 'dark' ? 'light' : 'dark'} theme`);
label();
themeBtn.addEventListener('click', () => {
  root.classList.add('theme-anim');
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('naufa-theme', root.dataset.theme); } catch (e) { /* storage unavailable */ }
  label();
  setTimeout(() => root.classList.remove('theme-anim'), 500);
});

const mb = $('.menu-btn'), links = $('#menu');
const setMenu = (o) => { links.classList.toggle('open', o); mb.setAttribute('aria-expanded', o); };
mb.addEventListener('click', () => setMenu(mb.getAttribute('aria-expanded') !== 'true'));
links.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

const bar = $('.progress');
let tick = false;
addEventListener('scroll', () => {
  if (tick) return;
  tick = true;
  requestAnimationFrame(() => {
    const h = root.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    tick = false;
  });
}, { passive: true });

const navLinks = $$('#menu a');
const spy = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  navLinks.forEach((a) => a.hash === '#' + e.target.id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').filter((s) => navLinks.some((a) => a.hash === '#' + s.id)).forEach((s) => spy.observe(s));

/* ---------- Scroll reveals and count-up ---------- */
$$('.section h2,.section .lead,.prose p,.facts div,.beyond div,.goals li,.contact>*,.about .photo,.tool').forEach((el) => {
  el.setAttribute('data-reveal', '');
  el.style.setProperty('--i', [...el.parentNode.children].indexOf(el));
});
function countUp(el) {
  const to = +el.dataset.count;
  if (reduce) { el.textContent = to; return; }
  const t0 = performance.now();
  (function f(t) {
    const k = Math.min((t - t0) / 1400, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(f);
  })(t0);
}
if (reduce) {
  $$('[data-reveal]').forEach((e) => e.classList.add('in'));
  $$('[data-count]').forEach(countUp);
} else {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    if (e.target.dataset.count) countUp(e.target); else e.target.classList.add('in');
    io.unobserve(e.target);
  }), { threshold: 0.15 });
  $$('[data-reveal],[data-count]').forEach((el) => io.observe(el));
}

/* ---------- Hero: headline reveal, typed phrases, typed code ---------- */
const h1 = $('#hero-title');
const title = h1.textContent;
h1.setAttribute('aria-label', title);
if (!reduce) {
  let n = 0;
  h1.innerHTML = title.split(' ').map((w) =>
    `<span class="w">${[...w].map((c) => `<span class="ch" aria-hidden="true" style="--i:${n++}">${c}</span>`).join('')}</span>`).join(' ');

  const phrases = ['algorithms', 'web interfaces', 'a pixel action game', 'AI and security', 'ideas that run'];
  const typed = $('#typed');
  (async () => {
    await sleep(1600);
    for (let i = 0; ; i++) {
      const w = phrases[i % phrases.length];
      for (let k = 0; k <= w.length; k++) { typed.textContent = w.slice(0, k); await sleep(70); }
      await sleep(1400);
      for (let k = w.length; k >= 0; k--) { typed.textContent = w.slice(0, k); await sleep(35); }
      await sleep(300);
    }
  })();

  const pre = $('#code');
  const lines = $$('div', pre).map((d) => d.textContent);
  pre.innerHTML = '';
  const cur = document.createElement('span');
  cur.className = 'cursor';
  (async () => {
    await sleep(900);
    for (const l of lines) {
      const d = document.createElement('div');
      if (l.startsWith('//')) d.className = 'c';
      pre.append(d);
      d.append(cur);
      for (const ch of l) { cur.before(ch); await sleep(18 + Math.random() * 30); }
      await sleep(140);
    }
  })();
}

/* ---------- Hero: interactive node network ---------- */
(() => {
  const c = $('#net'), x = c.getContext('2d'), host = c.parentElement;
  if (reduce || !x) return;
  let w, h, pts = [], run = false, raf = 0;
  const m = { x: -999, y: -999 };
  const size = () => {
    const r = host.getBoundingClientRect(), d = devicePixelRatio || 1;
    w = r.width; h = r.height;
    c.width = w * d; c.height = h * d;
    x.setTransform(d, 0, 0, d, 0, 0);
    pts = Array.from({ length: Math.min(80, Math.floor(w * h / 14000)) }, () => ({
      x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
    }));
  };
  size();
  addEventListener('resize', size);
  host.addEventListener('pointermove', (e) => { const r = c.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; });
  host.addEventListener('pointerleave', () => { m.x = -999; });
  function frame() {
    raf = 0;
    if (!run) return;
    x.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const dx = m.x - p.x, dy = m.y - p.y, d = Math.hypot(dx, dy);
      if (d < 140 && d > 1) { p.x += dx / d * .6; p.y += dy / d * .6; }
    }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      x.fillStyle = 'rgba(249,115,22,.7)';
      x.beginPath(); x.arc(a.x, a.y, 2, 0, 6.283); x.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) { x.strokeStyle = `rgba(249,115,22,${(1 - d / 120) * .35})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); }
      }
      const dm = Math.hypot(a.x - m.x, a.y - m.y);
      if (dm < 170) { x.strokeStyle = `rgba(251,146,60,${(1 - dm / 170) * .7})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(m.x, m.y); x.stroke(); }
    }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver(([e]) => { run = e.isIntersecting; if (run && !raf) frame(); }).observe(host);
})();

/* ---------- Ambient sound (opt-in, synthesized in the browser: no audio files) ---------- */
const sfx = (() => {
  let ac, master, wet, on = false, timer;
  const NOTES = [146.83, 174.61, 196, 220, 261.63, 293.66, 349.23, 392, 440]; // D minor pentatonic-ish
  function init() {
    ac = new (window.AudioContext || window.webkitAudioContext)();
    master = ac.createGain(); master.gain.value = 0; master.connect(ac.destination);
    const len = ac.sampleRate * 2.8, ir = ac.createBuffer(2, len, ac.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5); }
    wet = ac.createConvolver(); wet.buffer = ir;
    const wg = ac.createGain(); wg.gain.value = .6; wet.connect(wg); wg.connect(master);
    const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 500;
    const pg = ac.createGain(); pg.gain.value = .16; lp.connect(pg); pg.connect(master); pg.connect(wet);
    [73.42, 110, 146.83, 220.5].forEach((f, i) => {
      const o = ac.createOscillator(); o.type = i % 2 ? 'triangle' : 'sine'; o.frequency.value = f; o.detune.value = (i - 1.5) * 6; o.connect(lp); o.start();
    });
    const lfo = ac.createOscillator(), lg = ac.createGain(); lfo.frequency.value = .07; lg.gain.value = 220; lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
    const nb = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate), nd = nb.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    const ns = ac.createBufferSource(); ns.buffer = nb; ns.loop = true;
    const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 600; bp.Q.value = .7;
    const wn = ac.createGain(); wn.gain.value = .035;
    const l2 = ac.createOscillator(), l2g = ac.createGain(); l2.frequency.value = .11; l2g.gain.value = .025; l2.connect(l2g); l2g.connect(wn.gain); l2.start();
    ns.connect(bp); bp.connect(wn); wn.connect(master); ns.start();
    document.addEventListener('visibilitychange', () => { if (document.hidden) ac.suspend(); else if (on) ac.resume(); });
  }
  function bell(f, t = ac.currentTime, v = .09) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.frequency.value = f;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + 3);
    o.connect(g); g.connect(master); g.connect(wet); o.start(t); o.stop(t + 3.1);
  }
  function loop() {
    if (!on) return;
    if (!document.hidden) {
      bell(NOTES[Math.random() * NOTES.length | 0]);
      if (Math.random() < .3) bell(NOTES[Math.random() * NOTES.length | 0] * 2, ac.currentTime + .25, .05);
    }
    timer = setTimeout(loop, 1800 + Math.random() * 3200);
  }
  return {
    async toggle() {
      if (!ac) init();
      on = !on;
      await ac.resume();
      master.gain.cancelScheduledValues(ac.currentTime);
      master.gain.linearRampToValueAtTime(on ? .5 : 0, ac.currentTime + (on ? 2.5 : .8));
      clearTimeout(timer);
      if (on) loop();
      return on;
    },
    blip(f, d = .06, v = .04, type = 'triangle') {
      if (!on) return;
      const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain();
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g); g.connect(master); o.start(t); o.stop(t + d + .02);
    },
    tick() { this.blip(280 + Math.random() * 260, .045, .035, 'square'); },
    crit() { if (on) [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => bell(f, ac.currentTime + i * .09, .08)); },
    fail() { this.blip(110, .5, .12, 'sawtooth'); },
    lock() { if (on) [392, 587.33, 783.99].forEach((f, i) => bell(f, ac.currentTime + i * .12, .07)); },
  };
})();
const sb = $('#sound');
if (!(window.AudioContext || window.webkitAudioContext)) sb.hidden = true;
sb.addEventListener('click', async () => {
  const on = await sfx.toggle();
  sb.setAttribute('aria-pressed', on);
  sb.setAttribute('aria-label', `Turn ambient sound ${on ? 'off' : 'on'}`);
});

/* ---------- Fantasy embers (site-wide; click for a spark burst) ---------- */
(() => {
  const c = $('#embers'), x = c.getContext('2d');
  if (reduce || !x) { c.remove(); return; }
  let w, h, es = [], bs = [], t = 0;
  const mk = (fresh) => ({ x: Math.random() * w, y: fresh ? Math.random() * h : h + 10, r: .8 + Math.random() * 1.8, v: .25 + Math.random() * .45, s: Math.random() * 6.283, a: .3 + Math.random() * .5 });
  const size = () => {
    const d = devicePixelRatio || 1;
    w = innerWidth; h = innerHeight; c.width = w * d; c.height = h * d; x.setTransform(d, 0, 0, d, 0, 0);
    es = Array.from({ length: Math.min(40, w / 32 | 0) }, () => mk(true));
  };
  size();
  addEventListener('resize', size);
  addEventListener('click', (e) => {
    for (let i = 0; i < 10; i++) { const a = Math.random() * 6.283, v = 1 + Math.random() * 2.2; bs.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1, l: 1 }); }
  });
  const dot = (px, py, r, a) => { x.fillStyle = `rgba(251,146,60,${a})`; x.beginPath(); x.arc(px, py, r, 0, 6.283); x.fill(); };
  (function f() {
    if (!document.hidden) {
      t += .01; x.clearRect(0, 0, w, h);
      for (const e of es) {
        e.y -= e.v; e.x += Math.sin(t * 2 + e.s) * .3;
        if (e.y < -10) Object.assign(e, mk(false));
        const a = e.a * Math.min(1, e.y / (h * .5)) * (.65 + .35 * Math.sin(t * 6 + e.s));
        dot(e.x, e.y, e.r * 3, a * .15); dot(e.x, e.y, e.r, a);
      }
      bs = bs.filter((b) => b.l > 0);
      for (const b of bs) { b.x += b.vx; b.y += b.vy; b.vy += .04; b.l -= .025; dot(b.x, b.y, 1.6, b.l * .8); }
    }
    requestAnimationFrame(f);
  })();
})();

/* ---------- Beyond the Code: D&D dice ---------- */
(() => {
  const die = $('#die'), num = $('#die-n'), btn = $('#roll-btn'), adv = $('#adv'), hist = $('#history'), say = $('#roll-text'), sparks = $('#sparks');
  const verdicts = [[1, 'Critical fail. The bug was in the other file.'], [10, 'It runs, but not as planned. Time to debug.'], [19, 'A solid roll. Steady progress.'], [20, 'Natural 20. It compiled on the first try.']];
  const d20 = () => Math.ceil(Math.random() * 20);
  function burst() {
    sparks.innerHTML = '';
    for (let i = 0; i < 18; i++) {
      const s = document.createElement('i'), a = i / 18 * 6.283 + Math.random() * .4, d = 55 + Math.random() * 55;
      s.style.cssText = `--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px`;
      sparks.append(s);
    }
  }
  btn.addEventListener('click', async () => {
    const rolls = adv.checked ? [d20(), d20()] : [d20()], n = Math.max(...rolls);
    btn.disabled = true;
    die.classList.remove('rolling', 'crit', 'fail'); void die.getBoundingClientRect();
    if (!reduce) {
      die.classList.add('rolling');
      for (let i = 0; i < 14; i++) { num.textContent = d20(); sfx.tick(); await sleep(55 + i * 6); }
    }
    num.textContent = n;
    say.textContent = verdicts.find(([max]) => n <= max)[1];
    if (n === 20) { die.classList.add('crit'); if (!reduce) burst(); sfx.crit(); }
    if (n === 1) { die.classList.add('fail'); sfx.fail(); }
    const li = document.createElement('li');
    li.textContent = adv.checked ? `${n} (${rolls.join(', ')})` : n;
    if (n === 20) li.className = 'nat20'; else if (n === 1) li.className = 'nat1';
    hist.prepend(li);
    while (hist.children.length > 6) hist.lastChild.remove();
    btn.disabled = false;
  });
})();

/* ---------- Beyond the Code: ARG transmission ---------- */
(() => {
  const cp = $('#cipher'), meta = $('#tx-meta'), screen = cp.closest('.screen'), dial = $('#shift'), val = $('#shift-val');
  const shift = (s, k) => s.replace(/[a-z]/gi, (c) => { const b = c <= 'Z' ? 65 : 97; return String.fromCharCode(b + ((c.charCodeAt(0) - b - k) % 26 + 26) % 26); });
  const cipher = shift(cp.dataset.plain, -13);
  let locked = false;
  cp.textContent = cipher;
  dial.addEventListener('input', () => {
    const k = +dial.value, now = k === 13;
    val.textContent = k;
    cp.textContent = shift(cipher, k);
    if (now !== locked) {
      locked = now;
      screen.classList.toggle('locked', now);
      meta.textContent = `TRANSMISSION #13 // SIGNAL ${now ? 'LOCKED' : 'LOST'}`;
      if (now) sfx.lock();
    } else if (!now) sfx.blip(200 + k * 18, .04, .03, 'square');
  });
  $('#hint-btn').addEventListener('click', (e) => { $('#hint').hidden = false; e.currentTarget.hidden = true; });
})();
