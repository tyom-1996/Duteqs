// ===== FOOTER HTML COMPONENT =====
// Usage: <script src="js/footer-component.js"></script>
// Place this script tag where the footer should appear in the HTML.

(function () {
    // Inject footer CSS
    if (!document.querySelector('link[href*="css/footer.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/footer.css';
        document.head.appendChild(link);
    }

    const script = document.currentScript;

    const footerHTML = `
    <footer class="footer" id="footer">
        <div class="footer__top">
            <!-- Contact Info -->
            <div class="footer__col footer__col--contact">
                <a href="tel:+74959010407" class="footer__link">+7 (495) 901 04 07</a>
                <a href="tel:+74952275770" class="footer__link">+7 (495) 227 57 70</a>
                <a href="mailto:info@dutexltd.ru" class="footer__link">info@dutexltd.ru</a>
            </div>

            <!-- Shop Links -->
            <div class="footer__col footer__col--shop">
                <a href="magazin_men.html" class="footer__link">Мужчины</a>
                <a href="magazin_women.html" class="footer__link">Женщины</a>
                <a href="magazin_child.html" class="footer__link">Дети</a>
                <a href="obrazi.html" class="footer__link">Образы</a>
                <a href="karzina.html" class="footer__link">Корзина</a>
            </div>

            <!-- Info Links -->
            <div class="footer__col footer__col--info">
                <a href="magazin.html" class="footer__link">Каталог</a>
                <a href="about.html" class="footer__link">О бренде</a>
                <a href="faq.html" class="footer__link">FAQ</a>
                <a href="clients.html" class="footer__link">Оплата и доставка</a>
            </div>

            <!-- Social Links -->
            <div class="footer__col footer__col--social">
                <a href="#" class="footer__link">Telegram</a>
                <a href="#" class="footer__link">Vk</a>
                <a href="#" class="footer__link">Whatsapp</a>
                <a href="#" class="footer__link">Pinterest</a>
            </div>
        </div>

        <div class="footer__middle">
            <span class="footer__slogan">Детали, которые тебя раскрывают</span>
                <a href="#" class="footer__link">Политика конфиденциальности</a>
                <a href="#" class="footer__link">Политика обработки персональных данных</a>
        </div>

        <div class="footer__bottom">
            <h2 class="footer__brand">Sergio Dallini</h2>
        </div>
    </footer>`;

    script.insertAdjacentHTML('afterend', footerHTML);
})();
