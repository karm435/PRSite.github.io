// Header: part of the yellow hero at the top of the home page, frosted once the page scrolls.
const header = document.querySelector('.header');

if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

// Mobile menu
const hamburger = document.querySelector('.header__hamburger');
const nav = document.querySelector('.header__nav');

if (hamburger && nav) {
  const setOpen = open => {
    nav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  };

  hamburger.addEventListener('click', () => setOpen(!nav.classList.contains('open')));

  // Close the menu after following a link or pressing Escape.
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setOpen(false);
      hamburger.focus();
    }
  });
}

// Scroll-triggered reveal. Content is visible without JS; see .js .reveal in style.css.
const revealed = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealed.forEach(el => observer.observe(el));
} else {
  revealed.forEach(el => el.classList.add('is-visible'));
}

// Email addresses are put together here so they never appear in the page source for scrapers.
function emailAddress(el) {
  return `${el.dataset.emailUser}@${el.dataset.emailDomain}`;
}

document.querySelectorAll('a[data-email-user]').forEach(link => {
  const address = emailAddress(link);
  link.href = `mailto:${address}`;
  link.textContent = address;
});

// Account deletion request: opens the visitor's email app with the request filled in.
const deleteForm = document.querySelector('.delete-form');

if (deleteForm) {
  deleteForm.addEventListener('submit', event => {
    event.preventDefault();
    const accountEmail = deleteForm.elements.email.value.trim();
    const subject = encodeURIComponent(deleteForm.dataset.emailSubject);
    const body = encodeURIComponent(`Please permanently delete the Parents Room Finder account for ${accountEmail}.`);
    window.location.href = `mailto:${emailAddress(deleteForm)}?subject=${subject}&body=${body}`;
  });
}
