// Enhance controls only. The HTML and CSS keep all core content visible by default.
document.body.classList.add('js-enabled');

const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = [...document.querySelectorAll('.nav-link')];
const mobileLayout = window.matchMedia('(max-width: 860px)');

function closeMenu(returnFocus = false) {
  if (!hamburger || !navMenu) return;
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  if (returnFocus) hamburger.focus();
}

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.getAttribute('aria-expanded') !== 'true';
    hamburger.classList.toggle('active', open);
    navMenu.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });
  navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.querySelector('.logo a')?.addEventListener('click', () => closeMenu());
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) closeMenu();
  });
  document.addEventListener('focusin', event => {
    if (!header.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  mobileLayout.addEventListener('change', () => closeMenu());
}

const filterButtons = [...document.querySelectorAll('.filter-btn')];
const projectCards = [...document.querySelectorAll('.project-card')];
const projectStatus = document.getElementById('project-status');
const viewAll = document.getElementById('view-all-projects');

function filterProjects(filter) {
  let count = 0;
  projectCards.forEach(card => {
    const visible = filter === 'all' || (filter === 'featured' ? card.dataset.featured === 'true' : card.dataset.category === filter);
    card.hidden = !visible;
    if (visible) count += 1;
  });
  filterButtons.forEach(button => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  if (projectStatus) projectStatus.textContent = `Showing ${count} of ${projectCards.length} projects`;
  if (viewAll) viewAll.hidden = filter !== 'featured';
}

filterButtons.forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));
if (filterButtons.length && projectCards.length) filterProjects('featured');
viewAll?.addEventListener('click', () => {
  filterProjects('all');
  filterButtons.find(button => button.dataset.filter === 'all')?.focus();
});

// Only highlight navigation; observation never controls content visibility.
const linkedSections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
let scrollUpdatePending = false;
function updateNavigation() {
  const marker = window.innerHeight * .3;
  const current = [...linkedSections].reverse().find(section => section.getBoundingClientRect().top <= marker);
  navLinks.forEach(link => {
    const active = !!current && link.getAttribute('href') === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollUpdatePending = false;
}
window.addEventListener('scroll', () => {
  if (!scrollUpdatePending) {
    scrollUpdatePending = true;
    window.requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();

// Retain the existing chat provider, with its launch control in Contact.
const feedbackTrigger = document.getElementById('feedback-trigger');
if (feedbackTrigger && typeof MutationObserver !== 'undefined') {
  const connectFeedback = () => {
    const launcher = document.querySelector('body > button[aria-label="Open chat"]');
    if (!launcher) return;
    feedbackTrigger.hidden = false;
    feedbackTrigger.onclick = () => launcher.click();
    feedbackObserver.disconnect();
  };
  const feedbackObserver = new MutationObserver(connectFeedback);
  feedbackObserver.observe(document.body, { childList: true });
  connectFeedback();
}

const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contact-status');
if (contactForm) {
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (typeof emailjs === 'undefined') {
      contactStatus.textContent = 'Messaging is temporarily unavailable. Please use the direct email link above.';
      return;
    }
    const submit = contactForm.querySelector('button[type="submit"]');
    if (submit.disabled) return;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    contactStatus.textContent = '';
    try {
      // Preserve the existing EmailJS service, template, form contract, and public key.
      await emailjs.sendForm('service_yq7w8e7', 'template_okyox08', contactForm, 'uk3IvRaxju8DRuQZC');
      contactStatus.textContent = 'Thank you — your message has been sent.';
      contactForm.reset();
    } catch (error) {
      contactStatus.textContent = 'Your message could not be sent. Please try again or use the direct email link above.';
      console.error('EmailJS request failed', error);
    } finally {
      submit.disabled = false;
      submit.textContent = 'Send Message';
    }
  });
}
