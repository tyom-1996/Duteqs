// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
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

function isMobileMenuOpen() {
    return mobileMenu.classList.contains('mobile-menu--open');
}

function openMobileMenu() {
    mobileMenu.classList.add('mobile-menu--open');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.classList.add('header__hamburger--active');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('mobile-menu--open');
    document.body.style.overflow = '';
    hamburgerBtn.classList.remove('header__hamburger--active');
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

// Close when clicking the right panel (image area)
const mobileMenuRight = document.querySelector('.mobile-menu__right');
if (mobileMenuRight) {
    mobileMenuRight.addEventListener('click', (e) => {
        if (e.target.closest('.mobile-menu__close')) return;
        closeMobileMenu();
    });
}
