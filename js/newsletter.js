// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('newsletter-name').value;
        const email = document.getElementById('newsletter-email').value;
        const consent = document.getElementById('consent-checkbox').checked;
        if (name && email && consent) {
            alert('Спасибо за подписку, ' + name + '!');
            newsletterForm.reset();
        }
    });
}

// ===== NEWSLETTER SCROLL TOGGLE (MOBILE) =====
const newsletterSection = document.getElementById('newsletter');
const newsletterScrollBtn = document.getElementById('newsletter-scroll-btn');
if (newsletterScrollBtn && newsletterSection) {
    const arrowUp = newsletterScrollBtn.querySelector('.newsletter__arrow-up');
    const arrowDown = newsletterScrollBtn.querySelector('.newsletter__arrow-down');
    let newsletterExpanded = false;

    newsletterScrollBtn.addEventListener('click', () => {
        newsletterExpanded = !newsletterExpanded;
        if (newsletterExpanded) {
            newsletterSection.classList.add('newsletter--expanded');
            arrowUp.style.display = 'none';
            arrowDown.style.display = 'block';
            newsletterScrollBtn.setAttribute('aria-label', 'Свернуть форму');
        } else {
            newsletterSection.classList.remove('newsletter--expanded');
            arrowUp.style.display = 'block';
            arrowDown.style.display = 'none';
            newsletterScrollBtn.setAttribute('aria-label', 'Раскрыть форму');
        }
    });
}
