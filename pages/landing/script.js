document.addEventListener('DOMContentLoaded', () => {
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

});
