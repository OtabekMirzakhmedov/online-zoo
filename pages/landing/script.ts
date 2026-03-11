import { getPets, getFeedback } from '../../src/api';
import { Pet, Feedback } from '../../src/types';
import { PaginatedResponse } from '../../src/api';

declare global {
    interface Window {
        openCarePopup?: () => void;
        openDonationPopup?: () => void;
    }
}

document.addEventListener('DOMContentLoaded', async () => {

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
            burgerMenu.setAttribute('aria-expanded', String(isOpen));
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

    const grid = document.getElementById('petsGrid');
    const prevButton = document.getElementById('petsPrev');
    const nextButton = document.getElementById('petsNext');

    if (!grid) {
        return;
    }
    grid.innerHTML = '<div class="loader-container"><div class="loader"></div></div>';

    let pets: Pet[] = [];
    let startIndex = 0;

    const getVisibleCount = () => {
        if (window.innerWidth <= 640) return 1;
        if (window.innerWidth <= 1200) return 2;
        return 4;
    };

    const renderPets = () => {
        if (pets.length === 0) return;

        const visibleCount = getVisibleCount();
        const items = [];
        for (let i = 0; i < visibleCount; i++) {
            const index = (startIndex + i) % pets.length;
            items.push(pets[index]);
        }

        grid.innerHTML = items.map((pet) => {
            const getRandomPetImage = () => {
                const randomId = Math.floor(Math.random() * 8) + 1;
                return `../../assets/images/pet${randomId}.png`;
            };
            const petImage = getRandomPetImage();

            return `
                <article class="pets-card" data-href="../animal/index.html" tabindex="0" role="link" aria-label="Open ${pet.commonName}">
                    <div class="pets-card__media">
                        <img class="pets-card__image" src="${petImage}" alt="${pet.commonName}">
                        <div class="pets-card__name">${pet.name || pet.commonName}</div>
                    </div>
                    <div class="pets-card__body">
                        <h3 class="pets-card__title">${pet.commonName}</h3>
                        <p class="pets-card__text">${pet.description || ''}</p>
                        <a class="pets-card__link" href="../animal/index.html">
                            View live cam
                            <img src="../../assets/icons/icon-arrow-white.svg" alt="">
                        </a>
                    </div>
                </article>
            `;
        }).join('');

        grid.querySelectorAll('.pets-card').forEach((card) => {
            card.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                if (target.closest('.pets-card__link')) {
                    return;
                }
                const href = card.getAttribute('data-href');
                if (href) {
                    window.location.href = href;
                }
            });
            card.addEventListener('keydown', (e: Event) => {
                const event = e as KeyboardEvent;
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    const href = card.getAttribute('data-href');
                    if (href) {
                        window.location.href = href;
                    }
                }
            });
        });
    };

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (pets.length === 0) return;
            const visibleCount = getVisibleCount();
            startIndex = (startIndex - visibleCount + pets.length) % pets.length;
            renderPets();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (pets.length === 0) return;
            const visibleCount = getVisibleCount();
            startIndex = (startIndex + visibleCount) % pets.length;
            renderPets();
        });
    }

    window.addEventListener('resize', () => {
        if (pets.length > 0) renderPets();
    });

    const usersCardsGrid = document.getElementById('usersCardsGrid');
    const usersPrevButton = document.getElementById('usersPrev');
    const usersNextButton = document.getElementById('usersNext');

    if (usersCardsGrid) {
        usersCardsGrid.innerHTML = '<div class="loader-container"><div class="loader"></div></div>';
    }

    let feedbackCards: Feedback[] = [];
    let feedbackStartIndex = 0;

    const getFeedbackColumns = () => {
        if (window.innerWidth <= 640) return 1;
        return 2;
    };

    const getFeedbackRows = () => {
        if (window.innerWidth <= 640) return 1;
        return 2;
    };

    const getFeedbackVisibleCount = () => {
        return getFeedbackColumns() * getFeedbackRows();
    };

    const renderFeedbackCards = () => {
        if (!usersCardsGrid || feedbackCards.length === 0) {
            return;
        }

        const visibleCount = getFeedbackVisibleCount();
        const visibleCards = [];

        for (let i = 0; i < visibleCount; i++) {
            const index = (feedbackStartIndex + i) % feedbackCards.length;
            visibleCards.push(feedbackCards[index]);
        }

        usersCardsGrid.innerHTML = visibleCards.map((card) => {
            return `
                <article class="users-opinion__card">
                    <img class="users-opinion__quote" src="../../assets/icons/icon-users-quote.svg" alt="" aria-hidden="true">
                    <h3 class="users-opinion__card-title">${card.city}, ${card.month} ${card.year}</h3>
                    <p class="users-opinion__card-text">${card.text}</p>
                    <p class="users-opinion__card-author">${card.name}</p>
                </article>
            `;
        }).join('');
    };

    if (usersPrevButton) {
        usersPrevButton.addEventListener('click', () => {
            if (feedbackCards.length === 0) return;
            const step = getFeedbackVisibleCount();
            feedbackStartIndex = (feedbackStartIndex - step + feedbackCards.length) % feedbackCards.length;
            renderFeedbackCards();
        });
    }

    if (usersNextButton) {
        usersNextButton.addEventListener('click', () => {
            if (feedbackCards.length === 0) return;
            const step = getFeedbackVisibleCount();
            feedbackStartIndex = (feedbackStartIndex + step) % feedbackCards.length;
            renderFeedbackCards();
        });
    }

    window.addEventListener('resize', () => {
        if (feedbackCards.length > 0) renderFeedbackCards();
    });

    try {
        const [petsResponse, feedbackResponse] = await Promise.all([
            getPets(),
            getFeedback()
        ]);

        const pRes = petsResponse as PaginatedResponse<Pet[]>;
        if (petsResponse && !pRes.error) {
            pets = pRes.data || (petsResponse as Pet[]);
            console.log('--- Fetched Pets Data ---', pets);
            renderPets();
        } else {
            throw new Error('Pets API Error');
        }

        const fRes = feedbackResponse as PaginatedResponse<Feedback[]>;
        if (feedbackResponse && !fRes.error) {
            feedbackCards = fRes.data || (feedbackResponse as Feedback[]);
            renderFeedbackCards();
        } else {
            throw new Error('Feedback API Error');
        }

    } catch (error) {
        console.error('Failed to load API data:', error);
        const errorHtml = '<div class="error-message">Something went wrong. Please, refresh the page</div>';
        if (grid) grid.innerHTML = errorHtml;
        if (usersCardsGrid) usersCardsGrid.innerHTML = errorHtml;
    }


    const donationButton = document.querySelector('.donation__button');
    const payFeedCta = document.querySelector('.pay-feed__cta');
    const footerDonate = document.querySelector('.footer__donate');


    if (donationButton) {
        donationButton.addEventListener('click', () => {
            if (typeof window.openCarePopup === 'function') {
                window.openCarePopup();
            }
        });
    }


    if (payFeedCta) {
        payFeedCta.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof window.openDonationPopup === 'function') {
                window.openDonationPopup();
            }
        });
    }


    if (footerDonate) {
        footerDonate.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof window.openCarePopup === 'function') {
                window.openCarePopup();
            }
        });
    }

    document.querySelectorAll('.care-love__card').forEach((card) => {
        card.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target && target.closest('.care-love__feed-link')) {
                return;
            }
            window.location.href = '../animal/index.html';
        });
        card.addEventListener('keydown', (e: Event) => {
            const event = e as KeyboardEvent;
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.location.href = '../animal/index.html';
            }
        });
    });

    const careLoveCarousel = document.getElementById('careLoveCarousel');
    const careLoveTrack = document.getElementById('careLoveTrack');
    const careLoveDots = document.getElementById('careLoveDots');

    if (careLoveCarousel && careLoveTrack && careLoveDots) {
        const slides = careLoveTrack.querySelectorAll('.care-love__carousel-slide');
        const totalSlides = slides.length;
        let currentSlide = 0;

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'care-love__carousel-dot';
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            careLoveDots.appendChild(dot);
        }

        const dots = careLoveDots.querySelectorAll('.care-love__carousel-dot');

        const updateDots = () => {
            dots.forEach((dot, index) => {
                dot.classList.toggle('care-love__carousel-dot--active', index === currentSlide);
            });
        };

        const goToSlide = (index: number) => {
            currentSlide = index;
            careLoveTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
        };

        updateDots();

        let touchStartX = 0;
        let touchEndX = 0;

        careLoveCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        careLoveCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentSlide < totalSlides - 1) {
                    goToSlide(currentSlide + 1);
                } else if (diff < 0 && currentSlide > 0) {
                    goToSlide(currentSlide - 1);
                }
            }
        });
    }

});
