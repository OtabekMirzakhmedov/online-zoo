import { getPets, getCameras, getPetById } from '../../src/api';
import type { Pet, Camera } from '../../src/types';


let allPets: Pet[] = [];
let allCameras: Camera[] = [];
let currentAnimalIndex = 0;
let currentVideoIndex = 0;


const fallbacks: Record<string, string[]> = {
    '1': ['https://www.youtube.com/embed/Pj1EqwE1K7Y', 'https:
    '2': ['https://www.youtube.com/embed/14wzP_85J2s', 'https:
    '3': ['https://www.youtube.com/embed/rgXwE1GivIQ', 'https:
    '4': ['https://www.youtube.com/embed/p1o1tJqG_fU', 'https:
};

function getVideosForPet(petId: number): string[] {
    return fallbacks[String(petId)] || ['https:
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

    const sidePanel = document.getElementById('sidePanel');
    const sidePanelToggle = document.getElementById('sidePanelToggle');
    const sidePanelList = document.getElementById('sidePanelList');
    const animalTitle = document.getElementById('animalTitle');
    const mainVideo = document.getElementById('mainVideo');
    const carouselTrack = document.getElementById('carouselTrack');
    const animalFact = document.getElementById('animalFact');
    const didYouKnowBox = document.querySelector('.did-you-know__box');
    
    
    const mapModalOverlay = document.getElementById('mapModalOverlay');
    const mapModalClose = document.getElementById('mapModalClose');
    let leafletMap: any = null;

    if (sidePanelToggle && sidePanel) {
        sidePanelToggle.addEventListener('click', () => {
            sidePanel.classList.toggle('collapsed');
        });
    }
    
    
    const createLoader = () => {
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = '<div class="loader"></div>';
        return loader;
    };
    
    const showError = (container: HTMLElement) => {
        container.innerHTML = '<div class="error-message">Something went wrong. Please, refresh the page</div>';
    };

    
    const openMapModal = () => {
        if (!mapModalOverlay) return;
        mapModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        
        if (!leafletMap && (window as any).L) {
            
            leafletMap = (window as any).L.map('mapContainer').setView([0, 0], 2);
            (window as any).L.tileLayer('https:
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(leafletMap);
            
            
            setTimeout(() => {
                leafletMap.invalidateSize();
            }, 300);
        } else if (leafletMap) {
            leafletMap.invalidateSize();
        }
    };
    
    const closeMapModal = () => {
        if (!mapModalOverlay) return;
        mapModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    const viewMapInlineBtn = document.getElementById('viewMapInlineBtn');
    if (viewMapInlineBtn) {
        viewMapInlineBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openMapModal();
        });
    }
    
    if (mapModalClose) {
        mapModalClose.addEventListener('click', closeMapModal);
    }
    
    if (mapModalOverlay) {
        mapModalOverlay.addEventListener('click', (e) => {
            if (e.target === mapModalOverlay) closeMapModal();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mapModalOverlay?.classList.contains('active')) {
            closeMapModal();
        }
    });

    const sidePanelScrollDown = document.getElementById('sidePanelScrollDown');
    
    let sidePanelSlideIndex = 0;
    
    if (sidePanelScrollDown && sidePanelList) {
        sidePanelScrollDown.addEventListener('click', () => {
            const listItems = sidePanelList.querySelectorAll('.side-animal');
            if (listItems.length === 0) return;
            
            
            const itemHeight = (listItems[0] as HTMLElement).offsetHeight;
            const containerHeight = sidePanelList.parentElement?.offsetHeight || 0;
            const visibleItemsCount = Math.floor(containerHeight / itemHeight);
            
            
            if (sidePanelSlideIndex < listItems.length - visibleItemsCount) {
                sidePanelSlideIndex++;
            } else {
                
                sidePanelSlideIndex = 0;
            }
            
            sidePanelList.style.transform = `translateY(-${sidePanelSlideIndex * itemHeight}px)`;
        });
    }

    async function fetchData() {
        if (!sidePanelList || !animalTitle || !mainVideo || !carouselTrack) return;
        
        const sideLoader = createLoader();
        const mainLoader = createLoader();
        
        sidePanelList.appendChild(sideLoader);
        document.querySelector('.zoo-content')?.classList.add('position-relative');
        document.querySelector('.zoo-content')?.appendChild(mainLoader);

        try {
            const [petsRes, camsRes] = await Promise.all([getPets(), getCameras()]);
            
            allPets = (petsRes as any).data || petsRes;
            allCameras = (camsRes as any).data || camsRes;

            sideLoader.remove();
            mainLoader.remove();
            
            if (allPets.length > 0) {
                initSidePanel();
                await selectPet(0);
            }
        } catch (error) {
            sideLoader.remove();
            mainLoader.remove();
            if (sidePanelList) showError(sidePanelList);
            const contentDir = document.querySelector('.zoo-content');
            if (contentDir) showError(contentDir as HTMLElement);
        }
    }

    function initSidePanel() {
        if (!sidePanelList) return;
        sidePanelList.innerHTML = '';
        allPets.forEach((pet, index) => {
            const li = document.createElement('li');
            li.className = `side-animal ${index === currentAnimalIndex ? 'active' : ''}`;
            
            const cam = allCameras.find(c => c.petId === pet.id);
            const animalText = cam ? cam.text : `Live ${pet.commonName} Cams`;

            const iconMap: Record<number, string> = {
                1: 'Panda.svg',
                2: 'Lemur.svg',
                3: 'Gorilla.svg',
                4: 'Alligator.svg',
                5: 'Eagle.svg',
                6: 'Coala.svg',
                7: 'Lion.svg',
                8: 'tiger.svg'
            };
            const iconFile = iconMap[pet.id] || 'Panda.svg';

            li.innerHTML = `
                <div class="side-animal__icon-wrapper">
                    <div class="side-animal__icon" style="-webkit-mask-image: url('../../assets/images/map/${iconFile}'); mask-image: url('../../assets/images/map/${iconFile}');"></div>
                </div>
                <div class="side-animal__info">
                    <span class="side-animal__name">${animalText}</span>
                </div>
            `;
            li.addEventListener('click', () => {
                selectPet(index);
            });
            sidePanelList.appendChild(li);
        });
    }

    async function selectPet(index: number) {
        currentAnimalIndex = index;
        currentVideoIndex = 0;
        
        
        if (sidePanelList) {
            const items = sidePanelList.querySelectorAll('.side-animal');
            items.forEach((item, i) => {
                if (i === currentAnimalIndex) item.classList.add('active');
                else item.classList.remove('active');
            });
        }

        const pet = allPets[currentAnimalIndex];
        
        
        const cam = allCameras.find(c => c.petId === pet.id);
        if (animalTitle) animalTitle.textContent = cam ? cam.text : `Live ${pet.commonName} Cams`;
        
        updateMainVideo();
        renderThumbnails();
        
        
        const animalTopCard = document.getElementById('didYouKnowTop');
        const animalShortFact = document.getElementById('animalShortFact');
        const animalDetailsBlock = document.getElementById('animalDetailsBlock');
        const animalLongText = document.getElementById('animalLongText');
        const animalDetailImg = document.getElementById('animalDetailImg') as HTMLImageElement;
        
        const ids = ['valCommonName', 'valScientificName', 'valType', 'valSize', 'valDiet', 'valHabitat', 'valRange'];
        
        if (animalTopCard) {
            const factLoader = createLoader();
            animalTopCard.appendChild(factLoader);
            
            try {
                const detailRes = await getPetById(pet.id);
                const petDetail = (detailRes as any).data || detailRes;
                
                if (animalShortFact) animalShortFact.textContent = petDetail.description || pet.description;
                
                if (animalDetailImg) {
                    animalDetailImg.src = `../../assets/images/pets/${pet.id}.jpg`;
                    animalDetailImg.alt = petDetail.commonName || pet.name;
                }
                
                const setVal = (id: string, val: string | undefined) => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = val || 'N/A';
                };
                
                setVal('valCommonName', petDetail.commonName);
                setVal('valScientificName', petDetail.scientificName);
                setVal('valType', petDetail.type);
                setVal('valSize', petDetail.size);
                setVal('valDiet', petDetail.diet);
                setVal('valHabitat', petDetail.habitat);
                setVal('valRange', petDetail.range);
                
                if (animalLongText) {
                    animalLongText.textContent = petDetail.detailedDescription || petDetail.description || pet.description;
                }
            } catch (error) {
                showError(animalTopCard as HTMLElement);
            } finally {
                factLoader.remove();
            }
        }
    }

    function updateMainVideo() {
        const pet = allPets[currentAnimalIndex];
        const videos = getVideosForPet(pet.id);
        
        if (mainVideo) {
            (mainVideo as HTMLIFrameElement).src = videos[currentVideoIndex];
        }

        if (carouselTrack) {
            const thumbs = carouselTrack.querySelectorAll('.carousel-thumbnail');
            thumbs.forEach((thumb, index) => {
                if (index === currentVideoIndex) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
        }
    }

    function renderThumbnails() {
        const pet = allPets[currentAnimalIndex];
        const videos = getVideosForPet(pet.id);
        
        if (!carouselTrack) return;
        carouselTrack.innerHTML = '';

        videos.forEach((videoUrl, index) => {
            const videoIdMatch = videoUrl.match(/embed\/([^?]+)/);
            const videoId = videoIdMatch ? videoIdMatch[1] : '';
            const thumbUrl = `https:

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

    const prevViewBtn = document.getElementById('prevView');
    const nextViewBtn = document.getElementById('nextView');

    if (prevViewBtn) {
        prevViewBtn.addEventListener('click', () => {
            if (currentVideoIndex > 0) {
                currentVideoIndex--;
                updateMainVideo();
            }
        });
    }

    if (nextViewBtn) {
        nextViewBtn.addEventListener('click', () => {
            const pet = allPets[currentAnimalIndex];
            const videos = getVideosForPet(pet.id);
            if (currentVideoIndex < videos.length - 1) {
                currentVideoIndex++;
                updateMainVideo();
            }
        });
    }


    const donateNowBtn = document.getElementById('donateNowBtn');
    const donationAmountBtn = document.getElementById('donationAmountBtn');
    const footerDonate = document.querySelector('.footer__donate');

    if (donateNowBtn) {
        donateNowBtn.addEventListener('click', () => {
            if (typeof (window as any).openDonationPopup === 'function') {
                (window as any).openDonationPopup();
            }
        });
    }

    if (donationAmountBtn) {
        donationAmountBtn.addEventListener('click', () => {
            if (typeof (window as any).openCarePopup === 'function') {
                (window as any).openCarePopup();
            }
        });
    }

    if (footerDonate) {
        footerDonate.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof (window as any).openCarePopup === 'function') {
                (window as any).openCarePopup();
            }
        });
    }

    
    fetchData();
});
