// ===== NEWSLETTER HTML COMPONENT =====
// Usage: <script src="js/newsletter-component.js"></script>
// Place this script tag where the newsletter section should appear in the HTML.

(function () {
    // Inject newsletter CSS
    if (!document.querySelector('link[href*="css/newsletter.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/newsletter.css';
        document.head.appendChild(link);
    }

    const script = document.currentScript;

    const newsletterHTML = `
        <section class="newsletter" id="newsletter">
            <div class="newsletter__bg-image">
                <img src="images/footer_img.webp" alt="" class="newsletter__bg newsletter__bg--desktop"
                    aria-hidden="true">
                <img src="images/footer_img2.webp" alt="" class="newsletter__bg newsletter__bg--mobile"
                    aria-hidden="true">
            </div>
            <div class="newsletter__form-wrapper">
                <div class="newsletter__title-row">
                    <h2 class="newsletter__title">Будь ближе к нам</h2>
                    <div class="newsletter__scroll-btn" id="newsletter-scroll-btn" aria-label="Раскрыть форму">
                        <img src="svg/arrow-scroll-up.svg" alt="Раскрыть" class="newsletter__arrow-up" width="48"
                            height="48">
                        <img src="svg/arrow-scroll-down.svg" alt="Свернуть" class="newsletter__arrow-down" width="48"
                            height="48" style="display:none;">
                    </div>
                </div>
                <p class="newsletter__text">Нравится наш бренд? Подпишись на нашу e-mail рассылку, чтобы получать
                    информацию о новых коллекциях, обновлениях и особых мероприятиях.</p>
                <form class="newsletter__form" id="newsletter-form">
                    <div class="newsletter__input-group">
                        <input type="text" name="name" class="newsletter__input" id="newsletter-name" placeholder="Имя"
                            required>
                    </div>
                    <div class="newsletter__input-group">
                        <input type="email" name="email" class="newsletter__input" id="newsletter-email"
                            placeholder="Ваш email" required>
                    </div>
                    <label class="newsletter__consent" id="consent-label">
                        <input type="checkbox" name="consent" class="newsletter__checkbox" id="consent-checkbox"
                            required>
                        <span class="newsletter__checkmark"></span>
                        <span class="newsletter__consent-text">Даю согласие на <a href="#"
                                class="newsletter__consent-link">обработку</a> своих персональных данных</span>
                    </label>
                    <button type="submit" class="btn btn--submit" id="newsletter-submit">
                        <span>Отправить</span>
                        <img src="svg/arrow-up-right-dark.svg" alt="" width="18" height="18">
                    </button>
                </form>
            </div>
        </section>`;

    script.insertAdjacentHTML('afterend', newsletterHTML);
})();
