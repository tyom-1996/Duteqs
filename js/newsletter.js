// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    const nameInput = document.getElementById('newsletter-name');
    const emailInput = document.getElementById('newsletter-email');

    // Clear error state on input
    [nameInput, emailInput].forEach((input) => {
        if (!input) return;
        input.addEventListener('input', () => {
            input.closest('.newsletter__input-group').classList.remove('newsletter__input-group--error');
        });
    });

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let hasError = false;

        // Validate name
        if (!nameInput.value.trim()) {
            nameInput.closest('.newsletter__input-group').classList.add('newsletter__input-group--error');
            hasError = true;
        }

        // Validate email
        if (!emailInput.value.trim()) {
            emailInput.closest('.newsletter__input-group').classList.add('newsletter__input-group--error');
            hasError = true;
        }

        const consent = document.getElementById('consent-checkbox').checked;

        if (!hasError && consent) {
            alert('Спасибо за подписку, ' + nameInput.value + '!');
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
