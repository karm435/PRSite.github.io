// Mobile hamburger toggle
const hamburger = document.querySelector('.header__hamburger');
const nav = document.querySelector('.header__nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  // Close nav when clicking a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// FAQ accordion
document.querySelectorAll('.faq__question').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const answer = button.nextElementSibling;

    // Close all
    document.querySelectorAll('.faq__question').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      btn.nextElementSibling.style.maxHeight = null;
    });

    // Open clicked (if was closed)
    if (!expanded) {
      button.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Scroll-triggered fade-in
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

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
    const body = encodeURIComponent(`Please permanently delete the Parent Room Finder account for ${accountEmail}.`);
    window.location.href = `mailto:${emailAddress(deleteForm)}?subject=${subject}&body=${body}`;
  });
}
