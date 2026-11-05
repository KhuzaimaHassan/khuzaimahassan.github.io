const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

// Exercise the UI state and mail integration without sending a real message.
const script = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
class Element {
  constructor() {
    this.events = {}; this.attrs = {}; this.dataset = {}; this.hidden = false;
    this.disabled = false; this.textContent = ''; this.focused = false;
    const classes = new Set();
    this.classList = {
      add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c),
      toggle(c, force) { const on = force === undefined ? !classes.has(c) : force; on ? classes.add(c) : classes.delete(c); return on; }
    };
  }
  addEventListener(name, callback) { (this.events[name] ||= []).push(callback); }
  setAttribute(name, value) { this.attrs[name] = value; }
  getAttribute(name) { return this.attrs[name] ?? null; }
  removeAttribute(name) { delete this.attrs[name]; }
  focus() { this.focused = true; }
  async emit(name, event = {}) { for (const callback of this.events[name] || []) await callback(event); }
}

function setup(sender = () => Promise.resolve(), videoMode = null) {
  const header = new Element(), menu = new Element(), hamburger = new Element(), logo = new Element();
  hamburger.attrs['aria-expanded'] = 'false';
  const links = ['projects', 'experience', 'about', 'contact'].map(id => {
    const link = new Element(); link.attrs.href = `#${id}`; return link;
  });
  header.contains = target => [header, menu, hamburger, logo, ...links].includes(target);
  menu.querySelectorAll = () => links;
  const filters = ['featured', 'all', 'mlops', 'genai', 'ml', 'dataeng'].map(filter => {
    const button = new Element(); button.dataset.filter = filter; return button;
  });
  const categories = ['mlops', 'genai', 'genai', 'genai', 'genai', 'ml', 'mlops', 'genai', 'ml', 'dataeng'];
  const cards = categories.map((category, i) => {
    const card = new Element(); card.dataset.category = category;
    if (i < 4) card.dataset.featured = 'true'; return card;
  });
  const status = new Element(), viewAll = new Element(), contactStatus = new Element(), submit = new Element();
  const form = new Element(); form.resetCount = 0; form.reset = () => form.resetCount++;
  form.querySelector = () => submit;
  const sections = Object.fromEntries(links.map((link, i) => [link.attrs.href, { id: link.attrs.href.slice(1), top: 600 + i * 1000, getBoundingClientRect() { return { top: this.top }; } }]));
  const document = new Element(); document.body = new Element();
  const dialog = new Element(), video = new Element(), videoClose = new Element(), videoStatus = new Element(), external = new Element(), watch = new Element();
  dialog.id = 'project-video-dialog'; dialog.open = false;
  if (videoMode !== 'unsupported') dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; return dialog.emit('close'); };
  dialog.getBoundingClientRect = () => ({ left: 20, right: 700, top: 20, bottom: 400 });
  video.pauseCount = 0; video.loadCount = 0;
  video.pause = () => video.pauseCount++; video.load = () => video.loadCount++;
  watch.href = 'https://portfolio.example/media/quasar-walkthrough.mp4';
  const videoElements = videoMode ? { 'project-video-dialog': dialog, 'project-video': video, 'project-video-close': videoClose, 'project-video-status': videoStatus, 'project-video-external': external } : {};
  const lookup = { '.hamburger': hamburger, '.nav-menu': menu, '.logo a': logo, ...sections };
  document.querySelector = selector => lookup[selector];
  document.querySelectorAll = selector => ({ '.nav-link': links, '.filter-btn': filters, '.project-card': cards, '[data-project-video]': videoMode ? [watch] : [] })[selector] || [];
  document.getElementById = id => ({ header, 'project-status': status, 'view-all-projects': viewAll, contactForm: form, 'contact-status': contactStatus, ...videoElements })[id];
  const media = new Element();
  const window = new Element(); window.innerHeight = 800; window.matchMedia = () => media;
  window.requestAnimationFrame = callback => callback();
  const context = { document, window, console: { error() {} } };
  if (sender !== null) context.emailjs = { sendForm: sender };
  vm.runInNewContext(script, context);
  return { header, menu, hamburger, links, filters, cards, status, viewAll, form, contactStatus, submit, document, window, media, sections, dialog, video, videoClose, videoStatus, external, watch };
}

test('walkthrough loads only on normal activation and closing releases media and restores focus', async () => {
  const ui = setup(undefined, 'supported'); let prevented = false;
  assert.equal(ui.video.getAttribute('src'), null);
  await ui.watch.emit('click', { button: 0, preventDefault() { prevented = true; } });
  assert.equal(prevented, true); assert.equal(ui.dialog.open, true);
  assert.equal(ui.video.getAttribute('src'), ui.watch.href);
  assert.equal(ui.videoClose.focused, true);
  assert.equal(ui.document.body.classList.contains('video-modal-open'), true);
  await ui.videoClose.emit('click');
  assert.equal(ui.dialog.open, false); assert.equal(ui.video.getAttribute('src'), null);
  assert.equal(ui.video.pauseCount, 1); assert.equal(ui.video.loadCount, 1);
  assert.equal(ui.document.body.classList.contains('video-modal-open'), false);
  assert.equal(ui.watch.focused, true);
});

test('modified clicks and unsupported dialogs retain the ordinary video link', async () => {
  const ui = setup(undefined, 'supported');
  for (const event of [{ button: 1 }, { button: 0, ctrlKey: true }, { button: 0, metaKey: true }, { button: 0, shiftKey: true }, { button: 0, altKey: true }]) {
    await ui.watch.emit('click', { ...event, preventDefault() { assert.fail('must preserve normal link navigation'); } });
    assert.equal(ui.dialog.open, false);
  }
  const fallback = setup(undefined, 'unsupported');
  await fallback.watch.emit('click', { button: 0, preventDefault() { assert.fail('must preserve fallback'); } });
  assert.equal(fallback.watch.getAttribute('aria-haspopup'), null);
});

test('backdrop closes only outside the dialog; errors offer fallback and external playback pauses inline video', async () => {
  const ui = setup(undefined, 'supported');
  await ui.watch.emit('click', { button: 0, preventDefault() {} });
  await ui.video.emit('error'); assert.equal(ui.videoStatus.hidden, false);
  await ui.external.emit('click'); assert.equal(ui.video.pauseCount, 1);
  await ui.dialog.emit('click', { target: ui.dialog, clientX: 100, clientY: 100 });
  assert.equal(ui.dialog.open, true);
  await ui.dialog.emit('click', { target: ui.dialog, clientX: 10, clientY: 10 });
  assert.equal(ui.dialog.open, false);
  await ui.watch.emit('click', { button: 0, preventDefault() {} });
  assert.equal(ui.videoStatus.hidden, true);
});

test('featured starts with four cards; every category and All remains reachable', async () => {
  const ui = setup();
  assert.equal(ui.cards.filter(c => !c.hidden).length, 4);
  for (const [filter, count] of [['all', 10], ['mlops', 2], ['genai', 5], ['ml', 2], ['dataeng', 1], ['featured', 4]]) {
    await ui.filters.find(b => b.dataset.filter === filter).emit('click');
    assert.equal(ui.cards.filter(c => !c.hidden).length, count, filter);
    assert.equal(ui.status.textContent, `Showing ${count} of 10 projects`);
    assert.equal(ui.filters.filter(b => b.attrs['aria-pressed'] === 'true').length, 1);
  }
});

test('view-all reveals all ten and transfers focus to the All filter', async () => {
  const ui = setup(); await ui.viewAll.emit('click');
  assert.equal(ui.cards.filter(c => !c.hidden).length, 10);
  assert.equal(ui.viewAll.hidden, true);
  assert.equal(ui.filters[1].focused, true);
});

test('menu closes on navigation, Escape, outside click, focus exit and breakpoint changes', async () => {
  const ui = setup();
  for (const close of [() => ui.links[0].emit('click'), () => ui.document.emit('keydown', { key: 'Escape' }), () => ui.document.emit('click', { target: {} }), () => ui.document.emit('focusin', { target: {} }), () => ui.media.emit('change')]) {
    await ui.hamburger.emit('click'); assert.equal(ui.hamburger.attrs['aria-expanded'], 'true');
    await close(); assert.equal(ui.hamburger.attrs['aria-expanded'], 'false');
    assert.equal(ui.menu.classList.contains('active'), false);
  }
});

test('scroll highlighting tracks linked section order and aria-current', async () => {
  const ui = setup();
  ui.sections['#projects'].top = -700; ui.sections['#experience'].top = 100;
  await ui.window.emit('scroll');
  assert.equal(ui.links[1].attrs['aria-current'], 'location');
  assert.equal(ui.links[0].attrs['aria-current'], undefined);
});

test('successful contact submission preserves routing, restores button, and resets form', async () => {
  let args;
  const ui = setup((...values) => { args = values; return Promise.resolve(); });
  let prevented = false;
  await ui.form.emit('submit', { preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.deepEqual(args, ['service_yq7w8e7', 'template_okyox08', ui.form, 'uk3IvRaxju8DRuQZC']);
  assert.equal(ui.form.resetCount, 1); assert.match(ui.contactStatus.textContent, /has been sent/);
  assert.equal(ui.submit.disabled, false);
});

test('failed contact request preserves the form and allows retry', async () => {
  const ui = setup(() => Promise.reject(new Error('offline')));
  await ui.form.emit('submit', { preventDefault() {} });
  assert.equal(ui.form.resetCount, 0); assert.equal(ui.submit.disabled, false);
  assert.match(ui.contactStatus.textContent, /could not be sent/);
});

test('missing mail SDK prevents a fallback form navigation and offers direct email', async () => {
  const ui = setup(null); let prevented = false;
  await ui.form.emit('submit', { preventDefault() { prevented = true; } });
  assert.equal(prevented, true); assert.match(ui.contactStatus.textContent, /direct email/);
  assert.equal(ui.form.resetCount, 0);
});

test('a pending mail request cannot be submitted twice', async () => {
  let release, calls = 0;
  const ui = setup(() => { calls++; return new Promise(resolve => { release = resolve; }); });
  const first = ui.form.emit('submit', { preventDefault() {} });
  assert.equal(ui.submit.disabled, true);
  await ui.form.emit('submit', { preventDefault() {} });
  assert.equal(calls, 1); release(); await first;
  assert.equal(ui.submit.disabled, false);
});
