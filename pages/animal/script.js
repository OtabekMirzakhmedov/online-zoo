const animalsData = [
    {
        id: 'panda',
        name: 'Giant Pandas',
        title: 'Live Panda Cams',
        icon: '../../assets/images/pet1.png',
        videos: [
            'https://www.youtube.com/embed/Pj1EqwE1K7Y',
            'https://www.youtube.com/embed/nLnw2_q5iMk',
            'https://www.youtube.com/embed/yWIfpM-5DkQ'
        ],
        fact: "Giant pandas spend 10-16 hours a day eating, mostly bamboo! Despite their diet, their digestive system is that of a carnivore, which is why they have to eat so much to get the nutrients they need."
    },
    {
        id: 'eagle',
        name: 'Eagles',
        title: 'Live Eagle Cams',
        icon: '../../assets/images/pet2.png',
        videos: [
            'https://www.youtube.com/embed/14wzP_85J2s',
            'https://www.youtube.com/embed/9BqM3E32C2A',
            'https://www.youtube.com/embed/8tU4rG5c4mU'
        ],
        fact: "Eagles have incredible eyesight. They can spot prey from over 2 miles away, and their vision is about 4 to 8 times stronger than that of the average human."
    },
    {
        id: 'gorilla',
        name: 'Gorillas',
        title: 'Live Gorilla Cams',
        icon: '../../assets/images/pet3.png',
        videos: [
            'https://www.youtube.com/embed/rgXwE1GivIQ',
            'https://www.youtube.com/embed/8vBmt8bU-yE',
            'https://www.youtube.com/embed/O344B6Ond4I'
        ],
        fact: "Gorillas belong to a small group of primates capable of recognizing themselves in an mirror and can be taught sign language to communicate with humans."
    },
    {
        id: 'alligator',
        name: 'Alligators',
        title: 'Live Alligator Cams',
        icon: '../../assets/images/pet4.png',
        videos: [
            'https://www.youtube.com/embed/p1o1tJqG_fU',
            'https://www.youtube.com/embed/l5mZz_w591U',
            'https://www.youtube.com/embed/R2sZ1zQZ8K4'
        ],
        fact: "Alligators have been described as 'living fossils' because they have survived on Earth in the same form for 200 million years, pre-dating the extinction of the dinosaurs."
    }
];

let currentAnimalIndex = 0;
let currentVideoIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const sidePanel = document.getElementById('sidePanel');
    const sidePanelToggle = document.getElementById('sidePanelToggle');
    const sidePanelList = document.getElementById('sidePanelList');

    const animalTitle = document.getElementById('animalTitle');
    const mainVideo = document.getElementById('mainVideo');
    const carouselTrack = document.getElementById('carouselTrack');
    const animalFact = document.getElementById('animalFact');

    const prevViewBtn = document.getElementById('prevView');
    const nextViewBtn = document.getElementById('nextView');

    // Toggle Side Panel
    sidePanelToggle.addEventListener('click', () => {
        sidePanel.classList.toggle('collapsed');
    });

    // Initialize Side Panel Items
    function initSidePanel() {
        sidePanelList.innerHTML = '';
        animalsData.forEach((animal, index) => {
            const li = document.createElement('li');
            li.className = `side-animal ${index === currentAnimalIndex ? 'active' : ''}`;
            li.innerHTML = `
                <img src="${animal.icon}" alt="${animal.name}" class="side-animal__icon">
                <div class="side-animal__info">
                    <span class="side-animal__name">${animal.name}</span>
                </div>
            `;
            li.addEventListener('click', () => {
                currentAnimalIndex = index;
                currentVideoIndex = 0; // reset video index
                updateActiveAnimal();
                renderContent();
            });
            sidePanelList.appendChild(li);
        });
    }

    // Update active class in side panel
    function updateActiveAnimal() {
        const items = sidePanelList.querySelectorAll('.side-animal');
        items.forEach((item, index) => {
            if (index === currentAnimalIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Render Main Content
    function renderContent() {
        const animal = animalsData[currentAnimalIndex];

        animalTitle.textContent = animal.title;
        animalFact.textContent = animal.fact;

        updateMainVideo();
        renderThumbnails();
    }

    // Update main video based on current indices
    function updateMainVideo() {
        const animal = animalsData[currentAnimalIndex];
        mainVideo.src = animal.videos[currentVideoIndex];

        // Update active thumbnail outline
        const thumbs = carouselTrack.querySelectorAll('.carousel-thumbnail');
        thumbs.forEach((thumb, index) => {
            if (index === currentVideoIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // Render video thumbnails in carousel
    function renderThumbnails() {
        const animal = animalsData[currentAnimalIndex];
        carouselTrack.innerHTML = '';

        animal.videos.forEach((videoUrl, index) => {
            // Extract youtube ID for thumbnail
            const videoIdMatch = videoUrl.match(/embed\/([^?]+)/);
            const videoId = videoIdMatch ? videoIdMatch[1] : '';
            const thumbUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

            const img = document.createElement('img');
            img.src = thumbUrl;
            img.className = `carousel-thumbnail ${index === currentVideoIndex ? 'active' : ''}`;
            img.alt = `View ${index + 1}`;

            img.addEventListener('click', () => {
                currentVideoIndex = index;
                updateMainVideo();
            });

            carouselTrack.appendChild(img);
        });
    }

    // Carousel Navigation
    prevViewBtn.addEventListener('click', () => {
        const animal = animalsData[currentAnimalIndex];
        if (currentVideoIndex > 0) {
            currentVideoIndex--;
            updateMainVideo();
        }
    });

    nextViewBtn.addEventListener('click', () => {
        const animal = animalsData[currentAnimalIndex];
        if (currentVideoIndex < animal.videos.length - 1) {
            currentVideoIndex++;
            updateMainVideo();
        }
    });

    // Initialize Page
    initSidePanel();
    renderContent();
});
