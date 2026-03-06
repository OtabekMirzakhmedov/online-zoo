document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burgerMenu');
    const headerNav = document.getElementById('headerNav');

    if (burgerMenu && headerNav) {
        const overlay = document.createElement('div');
        overlay.className = 'header__overlay';
        document.body.appendChild(overlay);

        const toggleMenu = () => {
            const isOpen = headerNav.classList.toggle('header__nav--open');
            burgerMenu.classList.toggle('header__burger--active');
            overlay.classList.toggle('header__overlay--visible');
            burgerMenu.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };

        burgerMenu.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        headerNav.querySelectorAll('.header__nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                if (headerNav.classList.contains('header__nav--open')) {
                    toggleMenu();
                }
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && headerNav.classList.contains('header__nav--open')) {
                toggleMenu();
            }
        });
    }

    const footerDonate = document.querySelector('.footer__donate');
    if (footerDonate) {
        footerDonate.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof window.openCarePopup === 'function') {
                window.openCarePopup();
            }
        });
    }
});
