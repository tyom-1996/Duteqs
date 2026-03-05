// ===== HEADER & MOBILE MENU HTML COMPONENT =====
// Usage: <script src="js/header-component.js" data-theme="light|dark" data-modifier="about|magazin"></script>
// - data-theme="light"  → white logo + white icons (for index.html only)
// - data-theme="dark"   → dark logo + dark icons (all other pages)
// - data-modifier       → optional CSS modifier class: "about" or "magazin"

(function () {
    // Inject header CSS
    if (!document.querySelector('link[href*="css/header.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/header.css';
        document.head.appendChild(link);
    }

    const script = document.currentScript;
    const theme = script.getAttribute('data-theme') || 'dark';
    const modifier = script.getAttribute('data-modifier') || '';

    const isLight = theme === 'light';

    // Theme-dependent assets
    const searchIcon = isLight ? 'svg/search.svg' : 'svg/search-dark.svg';
    const hamburgerIcon = isLight ? 'svg/hamburger.svg' : 'svg/hamburger-dark.svg';

    // Logo: light theme = white logo on desktop only, dark on mobile
    //        dark theme  = always dark logo
    const logoHTML = isLight
        ? `<picture>
                    <source media="(min-width: 769px)" srcset="images/header_white_logo.webp">
                    <img src="images/dark_logo.webp" alt="Sergio Dallini" width="247" height="40">
                </picture>`
        : `<img src="images/dark_logo.webp" alt="Sergio Dallini" width="247" height="40">`;

    // Header class
    const headerClass = modifier ? `header header--${modifier}` : 'header';

    // Search bar (all pages)
    const searchBarHTML = `<div class="header__search-bar" id="search-bar">
            <input type="text" class="header__search-input" id="search-input" placeholder="Введите запрос">
           </div>`;

    // ===== HEADER HTML =====
    const headerHTML = `
    <header class="${headerClass}" id="header">
        <nav class="header__nav">
            <a href="index.html" class="header__logo" id="logo" aria-label="Sergio Dallini Home">
                ${logoHTML}
            </a>
            <ul class="header__menu" id="nav-menu">
                <li><a href="magazin_men.html" class="header__link">мужчины</a></li>
                <li><a href="magazin_women.html" class="header__link">женщины</a></li>
                <li><a href="magazin_child.html" class="header__link">дети</a></li>
                <li><a href="obrazi.html" class="header__link">образы</a></li>
            </ul>
            <div class="header__actions" id="header-actions">
                <button class="header__search-btn" id="search-btn" aria-label="Поиск">
                    <img src="${searchIcon}" alt="Поиск" width="24" height="24">
                </button>
                <button class="header__hamburger" id="hamburger-btn" aria-label="Открыть меню">
                    <img src="${hamburgerIcon}" alt="Меню" class="header__hamburger-icon" width="51" height="23">
                </button>
            </div>
        </nav>
        ${searchBarHTML}
    </header>

    <!-- ===== MOBILE MENU OVERLAY ===== -->
    <div class="mobile-menu" id="mobile-menu">
        <div class="mobile-menu__left">
            <button class="mobile-menu__close mobile-menu__close--mobile" aria-label="Закрыть меню">
                <img src="svg/close.svg" alt="Закрыть" width="24" height="24">
            </button>
            <div class="mobile-menu__logo">
                <img src="images/logo_img.webp" alt="Sergio Dallini">
            </div>
            <nav class="mobile-menu__nav" id="mobile-nav">
                <a href="magazin.html" class="mobile-menu__link">Каталог</a>
                <a href="index.html" class="mobile-menu__link">Главная</a>
                <a href="obrazi.html" class="mobile-menu__link">Образы</a>
                <a href="about.html" class="mobile-menu__link">О бренде</a>
                <a href="clients.html" class="mobile-menu__link">Оплата и доставка</a>
                <a href="faq.html" class="mobile-menu__link">FAQ</a>
            </nav>
        </div>
        <div class="mobile-menu__right">
            <button class="mobile-menu__close" id="mobile-menu-close" aria-label="Закрыть меню">
                <img src="svg/close.svg" alt="Закрыть" width="24" height="24">
            </button>
            <div class="mobile-menu__image">
                <img src="images/modal_img.webp" alt="" class="mobile-menu__img">
                <div class="mobile-menu__image-overlay"></div>
                <div class="mobile-menu__dots">
                    <span class="mobile-menu__dot mobile-menu__dot--active"></span>
                    <span class="mobile-menu__dot"></span>
                    <span class="mobile-menu__dot"></span>
                </div>
            </div>
        </div>
    </div>`;

    // Inject the HTML right where this script tag is placed
    script.insertAdjacentHTML('afterend', headerHTML);
})();
