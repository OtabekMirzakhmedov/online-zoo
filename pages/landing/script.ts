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

    const pets = [
        {
            id: 1,
            name: 'Lucas',
            title: 'Giant Panda',
            text: 'Native to central China, giant pandas have a penchant for bamboo.',
            image: '../../assets/images/pet1.png',
        },
        {
            id: 2,
            name: 'Andy',
            title: 'Madagascan Lemur',
            text: 'Lemurs are tree-dwelling primates found in Madagascar.',
            image: '../../assets/images/pet2.png',
            badge: '51 > 33',
        },
        {
            id: 3,
            name: 'Glen',
            title: 'Gorilla in Congo',
            text: 'Forest gorillas live in the tropical forests of Central Africa.',
            image: '../../assets/images/pet3.png',
        },
        {
            id: 4,
            name: 'Mike',
            title: 'Chinese Alligator',
            text: 'From river basins in China, these small alligators are rare.',
            image: '../../assets/images/pet4.png'
        },
        {
            id: 5,
            name: 'Sam & Lora',
            title: 'West End Bald Eagles',
            text: 'Soar above rivers and forests, eagles are a sight to see.',
            image: '../../assets/images/pet5.png'
        },
        {
            id: 6,
            name: 'Liz',
            title: 'Australian Koala',
            text: 'The elevated walkways bring you to eye level with the koalas.',
            image: '../../assets/images/pet6.png'
        },
        {
            id: 7,
            name: 'Shake',
            title: 'African Lion',
            text: 'Lions roam the savannas and grasslands of Africa in prides.',
            image: '../../assets/images/pet7.png'
        },
        {
            id: 8,
            name: 'Serja',
            title: 'Sumatran Tiger',
            text: 'A rare tiger from Sumatra’s forests with distinctive stripes.',
            image: '../../assets/images/pet8.png'
        },
    ];

    const grid = document.getElementById('petsGrid');
    const prevButton = document.getElementById('petsPrev');
    const nextButton = document.getElementById('petsNext');

    if (!grid) {
        return;
    }

    let startIndex = 0;

    const getVisibleCount = () => {
        if (window.innerWidth <= 640) return 1;
        if (window.innerWidth <= 1200) return 2;
        return 4;
    };

    const renderPets = () => {
        const visibleCount = getVisibleCount();
        const items = [];
        for (let i = 0; i < visibleCount; i++) {
            const index = (startIndex + i) % pets.length;
            items.push(pets[index]);
        }

        grid.innerHTML = items.map((pet) => {
            return `
                <article class="pets-card" data-href="../animal/index.html" tabindex="0" role="link" aria-label="Open ${pet.title}">
                    <div class="pets-card__media">
                        <img class="pets-card__image" src="${pet.image}" alt="${pet.title}">
                        <div class="pets-card__name">${pet.name}</div>
                    </div>
                    <div class="pets-card__body">
                        <h3 class="pets-card__title">${pet.title}</h3>
                        <p class="pets-card__text">${pet.text}</p>
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
                const target = event.target;
                if (target.closest('.pets-card__link')) {
                    return;
                }
                const href = card.getAttribute('data-href');
                if (href) {
                    window.location.href = href;
                }
            });
            card.addEventListener('keydown', (event) => {
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
            const visibleCount = getVisibleCount();
            startIndex = (startIndex - visibleCount + pets.length) % pets.length;
            renderPets();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const visibleCount = getVisibleCount();
            startIndex = (startIndex + visibleCount) % pets.length;
            renderPets();
        });
    }

    window.addEventListener('resize', () => {
        renderPets();
    });

    renderPets();

    const feedbackCards = [
        {
            location: 'New Jersey, June 2020',
            text: 'I am writing to thank you for your mission is to bring people closer to nature! Like myself, children were very impressed by the opportunity to explore the life of incredible animals in real-time.',
            author: 'Karen Maithlan',
            quoteIcon: '../../assets/icons/icon-users-quote.svg'
        },
        {
            location: 'Toronto, November 2020',
            text: 'We enjoy the live streams every week because they bring our family closer to wildlife. Children stay engaged, ask smart questions, and better understand how animals live in their natural rhythm.',
            author: 'Carol Larsen',
            quoteIcon: '../../assets/icons/icon-users-quote.svg'
        },
        {
            location: 'London, February 2021',
            text: 'This project is a fantastic way to discover wild animals from home and still feel connected to nature. The camera quality is clear, and the educational value is noticeable for every age group.',
            author: 'C. Stockman',
            quoteIcon: '../../assets/icons/icon-users-quote.svg'
        },
        {
            location: 'Amsterdam, June 2020',
            text: 'Thank you to the team for creating such a thoughtful and reliable wildlife experience online. We can observe behaviors in detail and discuss habitats with children in a way that feels real.',
            author: 'Tomas Ray',
            quoteIcon: '../../assets/icons/icon-users-quote.svg'
        },
        {
            location: 'Berlin, August 2021',
            text: 'Watching these live feeds has become a regular part of our school activities and nature lessons. Students are focused, curious, and much more interested in animal care and conservation topics.',
            author: 'Monica Hale',
            quoteIcon: '../../assets/icons/icon-users-quote.svg'
        },
        {
            location: 'Chicago, July 2021',
            text: 'Our family enjoys the streams together because the website is simple and the cameras are stable. The children now talk about ecosystems more often and connect what they see to classroom topics.',
            author: 'David Wynn',
            quoteIcon: '../../assets/icons/icon-users-quote.svg'
        },
        {
            location: 'Oslo, October 2021',
            text: 'The platform helps us stay connected to wildlife in a calm and meaningful format. It is easy to navigate, rich in visual detail, and very useful for teaching children about animal behavior.',
            author: 'A. Norberg',
            quoteIcon: '../../assets/icons/icon-users-quote.svg'
        },
        {
            location: 'Madrid, October 2021',
            text: 'I appreciate the educational mission and the quality of work behind every camera view. The children in our class were excited, attentive, and eager to learn more after each session.',
            author: 'Lara Sanz',
            quoteIcon: '../../assets/icons/icon-users-quote.svg'
        },
        {
            location: 'Prague, January 2022',
            text: 'Stream quality is strong and the overall experience feels carefully designed for learning. It is one of the few websites we revisit every week because it consistently offers meaningful content.',
            author: 'Jan Novak',
            quoteIcon: '../../assets/icons/icon-users-quote.svg'
        },
        {
            location: 'Lisbon, April 2022',
            text: 'We discovered species we had never seen before and learned how each animal behaves over time. The experience feels calm, informative, and genuinely inspiring for both kids and adults.',
            author: 'Rui Costa',
            quoteIcon: '../../assets/icons/icon-users-quote.svg'
        },
        {
            location: 'Seoul, September 2022',
            text: 'The interface is simple, fast, and clear, which makes regular viewing very convenient. Thank you for opening this world to everyone and helping families explore nature together online.',
            author: 'Hana Kim',
            quoteIcon: '../../assets/icons/icon-users-quote.svg'
        },
        {
            location: 'Dublin, December 2022',
            text: 'This is a brilliant project with practical educational value and excellent presentation. I recommend it to anyone who wants to learn about wildlife through real-time observation and guided discovery.',
            author: 'Paul Byrne',
            quoteIcon: '../../assets/icons/icon-users-quote.svg'
        }
    ];

    const usersCardsGrid = document.getElementById('usersCardsGrid');
    const usersPrevButton = document.getElementById('usersPrev');
    const usersNextButton = document.getElementById('usersNext');
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
        if (!usersCardsGrid) {
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
                    <img class="users-opinion__quote" src="${card.quoteIcon}" alt="" aria-hidden="true">
                    <h3 class="users-opinion__card-title">${card.location}</h3>
                    <p class="users-opinion__card-text">${card.text}</p>
                    <p class="users-opinion__card-author">${card.author}</p>
                </article>
            `;
        }).join('');
    };

    if (usersPrevButton) {
        usersPrevButton.addEventListener('click', () => {
            const step = getFeedbackVisibleCount();
            feedbackStartIndex = (feedbackStartIndex - step + feedbackCards.length) % feedbackCards.length;
            renderFeedbackCards();
        });
    }

    if (usersNextButton) {
        usersNextButton.addEventListener('click', () => {
            const step = getFeedbackVisibleCount();
            feedbackStartIndex = (feedbackStartIndex + step) % feedbackCards.length;
            renderFeedbackCards();
        });
    }

    window.addEventListener('resize', () => {
        renderFeedbackCards();
    });

    renderFeedbackCards();


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
            const target = event.target;
            if (target.closest('.care-love__feed-link')) {
                return;
            }
            window.location.href = '../animal/index.html';
        });
        card.addEventListener('keydown', (event) => {
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

        const goToSlide = (index) => {
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
