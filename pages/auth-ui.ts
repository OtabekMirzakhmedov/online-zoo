import userIcon from '../assets/icons/icon-user.svg';

export function initAuthUI() {
    const userContainer = document.getElementById('userProfileContainer');
    if (!userContainer) return;

    
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (user) {
        
        userContainer.innerHTML = `
            <div class="user-profile" id="userProfileBtn" tabindex="0" role="button" aria-haspopup="true" aria-expanded="false">
                <span class="user-profile__name">${user.name}</span>
                <div class="user-profile__icon-wrapper">
                    <img class="user-profile__icon" src="${userIcon}" alt="User profile">
                </div>
            </div>
            <div class="user-popup" id="userPopup">
                <div class="user-popup__info">
                    <div class="user-popup__name">${user.name}</div>
                    <div class="user-popup__email">${user.email}</div>
                </div>
                <button class="user-popup__btn" id="signOutBtn">Sign Out</button>
            </div>
        `;

        const signOutBtn = document.getElementById('signOutBtn');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', () => {
                localStorage.removeItem('user');
                window.location.reload();
            });
        }

    } else {
        
        userContainer.innerHTML = `
            <div class="user-profile" id="userProfileBtn" tabindex="0" role="button" aria-haspopup="true" aria-expanded="false">
                <div class="user-profile__icon-wrapper">
                    <img class="user-profile__icon" src="${userIcon}" alt="User profile">
                </div>
            </div>
            <div class="user-popup" id="userPopup">
                <a href="../signin/index.html" class="user-popup__link">Sign In</a>
                <a href="../registration/index.html" class="user-popup__link">Registration</a>
            </div>
        `;
    }

    
    const userProfileBtn = document.getElementById('userProfileBtn');
    const userPopup = document.getElementById('userPopup');

    if (userProfileBtn && userPopup) {
        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = userProfileBtn.getAttribute('aria-expanded') === 'true';
            userProfileBtn.setAttribute('aria-expanded', String(!isExpanded));
            userPopup.classList.toggle('user-popup--visible');
        });

        
        document.addEventListener('click', (e) => {
            if (!userContainer.contains(e.target as Node)) {
                userProfileBtn.setAttribute('aria-expanded', 'false');
                userPopup.classList.remove('user-popup--visible');
            }
        });
    }
}
