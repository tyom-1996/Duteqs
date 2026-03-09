// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
let scrollTimer = null;

window.addEventListener('scroll', () => {
    // Background style based on scroll position
    if (window.scrollY > 80) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }

    // Hide header immediately on any scroll
    header.classList.add('header--hidden');

    // Clear previous timer
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }

    // Show header only after scrolling stops (300ms debounce)
    scrollTimer = setTimeout(() => {
        header.classList.remove('header--hidden');
    }, 300);
});

// ===== SEARCH BAR TOGGLE =====
const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');

if (searchBtn && searchBar && searchInput) {
    searchBtn.addEventListener('click', () => {
        searchBar.classList.toggle('header__search-bar--open');
        if (searchBar.classList.contains('header__search-bar--open')) {
            searchInput.focus();
        }
    });
}

// ===== MOBILE HAMBURGER MENU =====
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');

// ===== MOBILE MENU SWIPER =====
let mobileMenuSwiper = null;

function initMobileMenuSwiper() {
    if (mobileMenuSwiper) return; // already initialized
    if (typeof Swiper === 'undefined') return; // Swiper not loaded yet

    mobileMenuSwiper = new Swiper('#mobile-menu-swiper', {
        loop: true,
        speed: 600,
        grabCursor: true,
        touchEventsTarget: 'container',
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '#mobile-menu-pagination',
            clickable: true,
            bulletClass: 'mobile-menu__dot',
            bulletActiveClass: 'mobile-menu__dot--active',
        },
    });
}

function destroyMobileMenuSwiper() {
    if (mobileMenuSwiper) {
        mobileMenuSwiper.destroy(true, true);
        mobileMenuSwiper = null;
    }
}

function isMobileMenuOpen() {
    return mobileMenu.classList.contains('mobile-menu--open');
}

function openMobileMenu() {
    mobileMenu.classList.add('mobile-menu--open');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.classList.add('header__hamburger--active');

    // Initialize Swiper after menu is visible
    // Small delay to ensure the menu is rendered/visible
    setTimeout(() => {
        initMobileMenuSwiper();
    }, 100);
}

function closeMobileMenu() {
    mobileMenu.classList.remove('mobile-menu--open');
    document.body.style.overflow = '';
    hamburgerBtn.classList.remove('header__hamburger--active');
    destroyMobileMenuSwiper();
}

// Toggle on hamburger click (open ↔ close)
hamburgerBtn.addEventListener('click', () => {
    if (isMobileMenuOpen()) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

// Close button (X) inside the menu (right panel)
if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

// Close button (X) inside mobile-menu__left (mobile only)
const mobileCloseBtn = document.querySelector('.mobile-menu__close--mobile');
if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
}

// Close on nav link click
document.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen()) {
        closeMobileMenu();
    }
});

// Close when clicking the overlay on the right panel (not swiper slides)
const mobileMenuRight = document.querySelector('.mobile-menu__right');
if (mobileMenuRight) {
    const overlay = mobileMenuRight.querySelector('.mobile-menu__image-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
}

