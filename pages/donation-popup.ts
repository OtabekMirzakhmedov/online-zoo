import { postDonation } from '../src/api';

(function () {
  
  const carePopupHTML = `
    <div class="care-popup" id="carePopup">
      <div class="care-popup__overlay"></div>
      <div class="care-popup__container">
        <button class="care-popup__close" type="button" aria-label="Close popup"></button>
        <img class="care-popup__image" src="../../assets/images/popup.png" alt="Human hand and dog paw touching">
        <div class="care-popup__body">
          <h2 class="care-popup__title">Together we care, save and protect!</h2>
          <p class="care-popup__text">
            Your most generous gift not only cares for countless animals, but it also offers hope and a vital lifeline to the world's most endangered wildlife relying on us to survive.
          </p>
          <div class="care-popup__amounts">
            <button class="care-popup__amount-btn" type="button" data-amount="20">$20</button>
            <button class="care-popup__amount-btn" type="button" data-amount="30">$30</button>
            <button class="care-popup__amount-btn" type="button" data-amount="50">$50</button>
            <button class="care-popup__amount-btn" type="button" data-amount="80">$80</button>
            <button class="care-popup__amount-btn" type="button" data-amount="100">$100</button>
            <button class="care-popup__amount-btn care-popup__amount-btn--other" type="button" data-amount="other">Other Amount</button>
          </div>
        </div>
      </div>
    </div>
  `;

  let carePopup: HTMLElement | null = null;

  function initCarePopup() {
    document.body.insertAdjacentHTML('beforeend', carePopupHTML);
    carePopup = document.getElementById('carePopup');
    if (!carePopup) return;

    const overlay = carePopup.querySelector('.care-popup__overlay');
    const closeBtn = carePopup.querySelector('.care-popup__close');
    const amountBtns = carePopup.querySelectorAll('.care-popup__amount-btn');

    overlay?.addEventListener('click', closeCarePopup);
    closeBtn?.addEventListener('click', closeCarePopup);

    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const amount = (btn as HTMLElement).dataset.amount;
        closeCarePopup();
        if (typeof (window as any).openDonationPopup === 'function') {
          (window as any).openDonationPopup(amount);
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && carePopup?.classList.contains('care-popup--open')) {
        closeCarePopup();
      }
    });
  }

  function openCarePopup() {
    if (!carePopup) return;
    carePopup.classList.add('care-popup--open');
    document.body.style.overflow = 'hidden';
  }

  function closeCarePopup() {
    if (!carePopup) return;
    carePopup.classList.remove('care-popup--open');
    document.body.style.overflow = '';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarePopup);
  } else {
    initCarePopup();
  }
  (window as any).openCarePopup = openCarePopup;

  
  const pets = [
    { id: 1,  name: 'Lukas the Panda' },
    { id: 2,  name: 'Andy the Lemur' },
    { id: 3,  name: 'Glen the Gorilla' },
    { id: 4,  name: 'Mike the Alligator' },
    { id: 5,  name: 'Sam & Lora the Eagles' },
    { id: 6,  name: 'Liz the Koala' },
    { id: 7,  name: 'Shake the Lion' },
    { id: 8,  name: 'Senja the Tiger' },
  ];

  
  const popupHTML = `
    <div class="donation-popup" id="donationPopup">
      <div class="donation-popup__overlay"></div>
      <div class="donation-popup__container">
        <div class="donation-popup__header">
          <h2 class="donation-popup__title">Make Your Donation</h2>
          <button class="donation-popup__close" type="button" aria-label="Close popup"></button>
        </div>
        <div class="donation-popup__body">

          <!-- Step 1 -->
          <div class="donation-popup__step donation-popup__step--active" data-step="1">
            <h3 class="donation-popup__section-title">Donation Information:</h3>

            <label class="donation-popup__label">
              <span>*</span> Choose your donation amount:
            </label>
            <div class="donation-popup__amounts">
              <button class="donation-popup__amount-btn" type="button" data-amount="10">$10</button>
              <button class="donation-popup__amount-btn" type="button" data-amount="20">$20</button>
              <button class="donation-popup__amount-btn" type="button" data-amount="30">$30</button>
              <button class="donation-popup__amount-btn" type="button" data-amount="50">$50</button>
              <button class="donation-popup__amount-btn" type="button" data-amount="80">$80</button>
              <button class="donation-popup__amount-btn" type="button" data-amount="100">$100</button>
            </div>

            <div class="donation-popup__other-amount">
              <button class="donation-popup__other-btn" type="button">
                <span class="donation-popup__btn-text-full">Other Amount</span>
                <span class="donation-popup__btn-text-short">Other</span>
              </button>
              <div class="donation-popup__other-input-wrap">
                <span class="donation-popup__currency-sign">$</span>
                <input class="donation-popup__other-input" type="text" inputmode="numeric" placeholder="0" id="donationOtherAmount">
              </div>
            </div>
            <div class="donation-popup__error" id="otherAmountError" style="display:none;">Please enter a valid amount (positive numbers only).</div>

            <div class="donation-popup__pet-row">
              <div class="donation-popup__pet-label">For Special Pet</div>
              <div class="donation-popup__pet-select-wrap">
                <select class="donation-popup__pet-select" id="donationPetSelect">
                  <option value="">Choose your favourite</option>
                  ${pets.map(pet => `<option value="${pet.id}">${pet.name}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="donation-popup__checkbox-wrap">
              <input class="donation-popup__checkbox" type="checkbox" id="donationRecurring">
              <label class="donation-popup__checkbox-label" for="donationRecurring">
                Make this a monthly recurring gift
              </label>
            </div>

            <div class="donation-popup__footer">
              <div class="donation-popup__steps-indicator">
                <span class="donation-popup__step-dot donation-popup__step-dot--active"></span>
                <span class="donation-popup__step-dot"></span>
                <span class="donation-popup__step-dot"></span>
              </div>
              <div class="donation-popup__footer-actions">
                <button class="donation-popup__next-btn" type="button" data-next="2" id="step1Next" disabled>
                  Next
                  <span class="donation-popup__btn-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="donation-popup__step" data-step="2">
            <h3 class="donation-popup__section-title">Billing Information:</h3>

            <div class="donation-popup__form-group">
              <label class="donation-popup__form-label" for="donationName">
                <span>*</span> Your Name
              </label>
              <input class="donation-popup__form-input" type="text" id="donationName" placeholder="First and last name" autocomplete="name">
              <div class="donation-popup__error" id="nameError" style="display:none;">Name must contain only letters and spaces.</div>
            </div>

            <div class="donation-popup__form-group">
              <label class="donation-popup__form-label" for="donationEmail">
                <span>*</span> Your Email Address
              </label>
              <input class="donation-popup__form-input" type="email" id="donationEmail" placeholder="Enter your email" autocomplete="email">
              <div class="donation-popup__error" id="emailError" style="display:none;">Please enter a valid email address.</div>
              <p class="donation-popup__form-note">
                You will receive emails from the Online Zoo, including updates and news on the latest discoveries and translations. You can unsubscribe at any time.
              </p>
            </div>

            <div class="donation-popup__footer">
              <div class="donation-popup__steps-indicator">
                <span class="donation-popup__step-dot donation-popup__step-dot--active"></span>
                <span class="donation-popup__step-dot donation-popup__step-dot--active"></span>
                <span class="donation-popup__step-dot"></span>
              </div>
              <div class="donation-popup__footer-actions">
                <button class="donation-popup__back-btn" type="button" data-back="1">Back</button>
                <button class="donation-popup__next-btn" type="button" data-next="3" id="step2Next" disabled>
                  Next
                  <span class="donation-popup__btn-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="donation-popup__step" data-step="3">
            <h3 class="donation-popup__section-title">Payment Information:</h3>

            <!-- Saved cards dropdown (injected if user is logged in and has saved cards) -->
            <div id="savedCardsSection" style="display:none;">
              <div class="donation-popup__form-group">
                <label class="donation-popup__form-label" for="savedCardsSelect">Use a saved card:</label>
                <div class="donation-popup__pet-select-wrap">
                  <select class="donation-popup__pet-select" id="savedCardsSelect">
                    <option value="">-- Select a saved card --</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="donation-popup__form-row donation-popup__form-row--payment">
              <div class="donation-popup__form-group">
                <label class="donation-popup__form-label" for="donationCard">
                  <span>*</span> Credit Card Number
                </label>
                <input class="donation-popup__form-input" type="text" id="donationCard" placeholder="1234 5678 9012 3456" maxlength="19" autocomplete="off">
                <div class="donation-popup__error" id="cardError" style="display:none;">Card number must be exactly 16 digits.</div>
              </div>

              <div class="donation-popup__form-group">
                <label class="donation-popup__form-label" for="donationCVV">
                  <span>*</span> CVV Number
                </label>
                <input class="donation-popup__form-input" type="text" id="donationCVV" placeholder="123" maxlength="3" autocomplete="off">
                <div class="donation-popup__error" id="cvvError" style="display:none;">CVV must be exactly 3 digits.</div>
              </div>
            </div>

            <div class="donation-popup__form-group">
              <label class="donation-popup__form-label" for="donationExpiry">
                <span>*</span> Expiration Date (MM/YY)
              </label>
              <input class="donation-popup__form-input donation-popup__form-input--half" type="text" id="donationExpiry" placeholder="MM/YY" maxlength="5" autocomplete="off">
              <div class="donation-popup__error" id="expiryError" style="display:none;">Please enter a valid future date in MM/YY format.</div>
            </div>

            <!-- Save card checkbox (injected if user is logged in) -->
            <div id="saveCardSection" style="display:none;">
              <div class="donation-popup__checkbox-wrap">
                <input class="donation-popup__checkbox" type="checkbox" id="saveCardCheckbox">
                <label class="donation-popup__checkbox-label" for="saveCardCheckbox">
                  Save card info for future donations
                </label>
              </div>
            </div>

            <div class="donation-popup__footer">
              <div class="donation-popup__steps-indicator">
                <span class="donation-popup__step-dot donation-popup__step-dot--active"></span>
                <span class="donation-popup__step-dot donation-popup__step-dot--active"></span>
                <span class="donation-popup__step-dot donation-popup__step-dot--active"></span>
              </div>
              <div class="donation-popup__footer-actions">
                <button class="donation-popup__back-btn" type="button" data-back="2">Back</button>
                <button class="donation-popup__next-btn donation-popup__next-btn--complete" type="button" id="completeDonationBtn" disabled>
                  Complete Donation
                  <span class="donation-popup__btn-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Notification Banner -->
    <div class="donation-notification" id="donationNotification" style="display:none;">
      <span class="donation-notification__message" id="donationNotificationMsg"></span>
      <button class="donation-notification__close" id="donationNotificationClose" aria-label="Close notification">×</button>
    </div>
  `;

  let popup: HTMLElement | null = null;

  
  function isValidName(val: string): boolean {
    return /^[a-zA-Z\s]+$/.test(val.trim()) && val.trim().length > 0;
  }

  function isValidEmail(val: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function isValidCard(val: string): boolean {
    return /^\d{16}$/.test(val.replace(/\s/g, ''));
  }

  function isValidCVV(val: string): boolean {
    return /^\d{3}$/.test(val);
  }

  function isValidExpiry(val: string): boolean {
    if (!/^\d{2}\/\d{2}$/.test(val)) return false;
    const [mm, yy] = val.split('/').map(Number);
    if (mm < 1 || mm > 12) return false;
    const now = new Date();
    const expDate = new Date(2000 + yy, mm - 1, 1);
    return expDate > now;
  }

  
  interface SavedCard {
    cardNumber: string;
    expiry: string;
    cvv: string;
  }

  function getSavedCards(): SavedCard[] {
    try {
      return JSON.parse(localStorage.getItem('savedCards') || '[]');
    } catch {
      return [];
    }
  }

  function saveCard(card: SavedCard) {
    const saved = getSavedCards();
    
    const exists = saved.some(c => c.cardNumber === card.cardNumber);
    if (!exists) {
      saved.push(card);
      localStorage.setItem('savedCards', JSON.stringify(saved));
    }
  }

  function maskCardNumber(num: string): string {
    const d = num.replace(/\D/g, '');
    return `${d.slice(0, 4)} **** **** ${d.slice(-4)}`;
  }

  
  function showNotification(msg: string, type: 'success' | 'error') {
    const notif = document.getElementById('donationNotification');
    const msgEl = document.getElementById('donationNotificationMsg');
    if (!notif || !msgEl) return;
    msgEl.textContent = msg;
    notif.className = `donation-notification donation-notification--${type}`;
    notif.style.display = 'flex';

    const timer = setTimeout(() => hideNotification(), 5000);
    notif.dataset.timer = String(timer);
  }

  function hideNotification() {
    const notif = document.getElementById('donationNotification');
    if (!notif) return;
    notif.style.display = 'none';
    if (notif.dataset.timer) clearTimeout(Number(notif.dataset.timer));
  }

  
  function checkStep1(popup: HTMLElement) {
    const amountBtns = popup.querySelectorAll('.donation-popup__amount-btn');
    const otherInput = popup.querySelector('#donationOtherAmount') as HTMLInputElement;
    const petSelect = popup.querySelector('#donationPetSelect') as HTMLSelectElement;
    const nextBtn = popup.querySelector('#step1Next') as HTMLButtonElement;

    const amountSelected = Array.from(amountBtns).some(b => b.classList.contains('donation-popup__amount-btn--active'));
    const otherVal = otherInput?.value.trim();
    const otherValid = otherVal ? /^\d+(\.\d+)?$/.test(otherVal) && parseFloat(otherVal) > 0 : false;
    const hasAmount = amountSelected || otherValid;
    const hasPet = petSelect?.value !== '';

    if (nextBtn) nextBtn.disabled = !(hasAmount && hasPet);
  }

  function checkStep2(popup: HTMLElement) {
    const nameInput = popup.querySelector('#donationName') as HTMLInputElement;
    const emailInput = popup.querySelector('#donationEmail') as HTMLInputElement;
    const nextBtn = popup.querySelector('#step2Next') as HTMLButtonElement;

    const nameOk = isValidName(nameInput?.value || '');
    const emailOk = isValidEmail(emailInput?.value || '');
    if (nextBtn) nextBtn.disabled = !(nameOk && emailOk);
  }

  function checkStep3(popup: HTMLElement) {
    const cardInput = popup.querySelector('#donationCard') as HTMLInputElement;
    const cvvInput = popup.querySelector('#donationCVV') as HTMLInputElement;
    const expiryInput = popup.querySelector('#donationExpiry') as HTMLInputElement;
    const completeBtn = popup.querySelector('#completeDonationBtn') as HTMLButtonElement;

    const cardOk = isValidCard(cardInput?.value || '');
    const cvvOk = isValidCVV(cvvInput?.value || '');
    const expiryOk = isValidExpiry(expiryInput?.value || '');
    if (completeBtn) completeBtn.disabled = !(cardOk && cvvOk && expiryOk);
  }

  
  function init() {
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    popup = document.getElementById('donationPopup');
    if (!popup) return;

    const overlay = popup.querySelector('.donation-popup__overlay');
    const closeBtn = popup.querySelector('.donation-popup__close');
    const amountBtns = popup.querySelectorAll('.donation-popup__amount-btn');
    const otherBtn = popup.querySelector('.donation-popup__other-btn');
    const otherInput = popup.querySelector('#donationOtherAmount') as HTMLInputElement;
    const otherAmountError = popup.querySelector('#otherAmountError') as HTMLElement;
    const petSelect = popup.querySelector('#donationPetSelect') as HTMLSelectElement;
    const backBtns = popup.querySelectorAll('[data-back]');
    const nextBtns = popup.querySelectorAll('[data-next]');

    overlay?.addEventListener('click', closePopup);
    closeBtn?.addEventListener('click', closePopup);

    
    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('donation-popup__amount-btn--active'));
        btn.classList.add('donation-popup__amount-btn--active');
        otherInput.value = '';
        otherAmountError.style.display = 'none';
        checkStep1(popup!);
      });
    });

    
    otherBtn?.addEventListener('click', () => otherInput.focus());

    
    otherInput.addEventListener('keydown', (e: KeyboardEvent) => {
      if (['e', 'E', '+', '-'].includes(e.key)) {
        e.preventDefault();
      }
    });

    otherInput.addEventListener('input', () => {
      if (otherInput.value) {
        amountBtns.forEach(b => b.classList.remove('donation-popup__amount-btn--active'));
      }
      const val = otherInput.value.trim();
      const valid = !val || (/^\d+(\.\d+)?$/.test(val) && parseFloat(val) > 0);
      otherAmountError.style.display = valid ? 'none' : 'block';
      checkStep1(popup!);
    });

    
    petSelect.addEventListener('change', () => checkStep1(popup!));

    
    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const nextStep = parseInt((btn as HTMLElement).dataset.next!);
        goToStep(nextStep);
      });
    });

    backBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const prevStep = parseInt((btn as HTMLElement).dataset.back!);
        goToStep(prevStep);
      });
    });

    
    const nameInput = popup.querySelector('#donationName') as HTMLInputElement;
    const emailInput = popup.querySelector('#donationEmail') as HTMLInputElement;
    const nameError = popup.querySelector('#nameError') as HTMLElement;
    const emailError = popup.querySelector('#emailError') as HTMLElement;

    nameInput.addEventListener('input', () => {
      checkStep2(popup!);
    });
    nameInput.addEventListener('blur', () => {
      nameError.style.display = isValidName(nameInput.value) ? 'none' : 'block';
    });

    emailInput.addEventListener('input', () => {
      checkStep2(popup!);
    });
    emailInput.addEventListener('blur', () => {
      emailError.style.display = isValidEmail(emailInput.value) ? 'none' : 'block';
    });

    
    const cardInput = popup.querySelector('#donationCard') as HTMLInputElement;
    const cardError = popup.querySelector('#cardError') as HTMLElement;

    cardInput.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key) && !/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    });

    cardInput.addEventListener('input', () => {
      let val = cardInput.value.replace(/\D/g, '').slice(0, 16);
      cardInput.value = val.replace(/(.{4})/g, '$1 ').trim();
      const ok = isValidCard(val);
      cardError.style.display = val.length > 0 && !ok ? 'block' : 'none';
      checkStep3(popup!);
    });

    
    const cvvInput = popup.querySelector('#donationCVV') as HTMLInputElement;
    const cvvError = popup.querySelector('#cvvError') as HTMLElement;

    cvvInput.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key) && !/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    });

    cvvInput.addEventListener('input', () => {
      cvvInput.value = cvvInput.value.replace(/\D/g, '').slice(0, 3);
      const ok = isValidCVV(cvvInput.value);
      cvvError.style.display = cvvInput.value.length > 0 && !ok ? 'block' : 'none';
      checkStep3(popup!);
    });

    
    const expiryInput = popup.querySelector('#donationExpiry') as HTMLInputElement;
    const expiryError = popup.querySelector('#expiryError') as HTMLElement;

    expiryInput.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key) && !/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    });

    expiryInput.addEventListener('input', () => {
      let val = expiryInput.value.replace(/\D/g, '').slice(0, 4);
      if (val.length >= 3) {
        val = val.slice(0, 2) + '/' + val.slice(2);
      }
      expiryInput.value = val;
      const ok = isValidExpiry(expiryInput.value);
      expiryError.style.display = expiryInput.value.length > 0 && !ok ? 'block' : 'none';
      checkStep3(popup!);
    });

    
    const completeBtn = popup.querySelector('#completeDonationBtn') as HTMLButtonElement;
    completeBtn.addEventListener('click', handleComplete);

    
    document.getElementById('donationNotificationClose')?.addEventListener('click', hideNotification);

    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popup?.classList.contains('donation-popup--open')) {
        closePopup();
      }
    });
  }

  async function handleComplete() {
    if (!popup) return;

    const amountBtns = popup.querySelectorAll('.donation-popup__amount-btn');
    const otherInput = popup.querySelector('#donationOtherAmount') as HTMLInputElement;
    const petSelect = popup.querySelector('#donationPetSelect') as HTMLSelectElement;
    const nameInput = popup.querySelector('#donationName') as HTMLInputElement;
    const emailInput = popup.querySelector('#donationEmail') as HTMLInputElement;
    const cardInput = popup.querySelector('#donationCard') as HTMLInputElement;
    const cvvInput = popup.querySelector('#donationCVV') as HTMLInputElement;
    const expiryInput = popup.querySelector('#donationExpiry') as HTMLInputElement;
    const recurringChk = popup.querySelector('#donationRecurring') as HTMLInputElement;
    const saveCardChk = popup.querySelector('#saveCardCheckbox') as HTMLInputElement;
    const completeBtn = popup.querySelector('#completeDonationBtn') as HTMLButtonElement;

    const activeBtn = popup.querySelector('.donation-popup__amount-btn--active');
    const amount = activeBtn
      ? (activeBtn as HTMLElement).dataset.amount!
      : otherInput.value.trim();

    const petId = parseInt(petSelect.value);
    const petName = pets.find(p => p.id === petId)?.name || '';

    completeBtn.disabled = true;
    completeBtn.textContent = 'Processing…';

    try {
      await postDonation({
        petId,
        petName,
        amount: parseFloat(amount),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        recurring: recurringChk.checked,
      });

      
      if (saveCardChk?.checked) {
        saveCard({
          cardNumber: cardInput.value.replace(/\s/g, ''),
          expiry: expiryInput.value,
          cvv: cvvInput.value,
        });
      }

      closePopup();
      showNotification(`Thank you for your donation of $${amount} to ${petName}!`, 'success');
    } catch {
      showNotification('Something went wrong. Please, try again later.', 'error');
    } finally {
      completeBtn.disabled = false;
      completeBtn.textContent = 'Complete Donation';
      checkStep3(popup!);
    }
  }

  function goToStep(step: number) {
    if (!popup) return;
    const steps = popup.querySelectorAll('.donation-popup__step');
    steps.forEach(s => {
      s.classList.remove('donation-popup__step--active');
      if (parseInt((s as HTMLElement).dataset.step!) === step) {
        s.classList.add('donation-popup__step--active');
      }
    });

    
    if (step === 3) {
      setupStep3ForUser();
    }
  }

  function setupStep3ForUser() {
    if (!popup) return;
    const userStr = localStorage.getItem('user');
    if (!userStr) return;

    
    const saveSection = popup.querySelector('#saveCardSection') as HTMLElement;
    if (saveSection) saveSection.style.display = 'block';

    
    const savedCards = getSavedCards();
    if (savedCards.length > 0) {
      const section = popup.querySelector('#savedCardsSection') as HTMLElement;
      const select = popup.querySelector('#savedCardsSelect') as HTMLSelectElement;
      if (section && select) {
        section.style.display = 'block';
        select.innerHTML = '<option value="">-- Select a saved card --</option>';
        savedCards.forEach((card, i) => {
          const opt = document.createElement('option');
          opt.value = String(i);
          opt.textContent = maskCardNumber(card.cardNumber);
          select.appendChild(opt);
        });

        select.onchange = () => {
          const idx = parseInt(select.value);
          if (!isNaN(idx) && savedCards[idx]) {
            const card = savedCards[idx];
            (popup!.querySelector('#donationCard') as HTMLInputElement).value =
              card.cardNumber.replace(/(.{4})/g, '$1 ').trim();
            (popup!.querySelector('#donationExpiry') as HTMLInputElement).value = card.expiry;
            (popup!.querySelector('#donationCVV') as HTMLInputElement).value = card.cvv;
            checkStep3(popup!);
          }
        };
      }
    }
  }

  function openPopup(preselectedAmount?: string) {
    if (!popup) return;
    popup.classList.add('donation-popup--open');
    document.body.style.overflow = 'hidden';
    goToStep(1);
    resetForm();

    if (preselectedAmount && preselectedAmount !== 'other') {
      const amountBtns = popup.querySelectorAll('.donation-popup__amount-btn');
      amountBtns.forEach(btn => {
        if ((btn as HTMLElement).dataset.amount === preselectedAmount) {
          btn.classList.add('donation-popup__amount-btn--active');
        }
      });
    }

    
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const nameInput = popup.querySelector('#donationName') as HTMLInputElement;
        const emailInput = popup.querySelector('#donationEmail') as HTMLInputElement;
        if (nameInput && user.name) nameInput.value = user.name;
        if (emailInput && user.email) emailInput.value = user.email;
      } catch {  }
    }

    checkStep1(popup);
    checkStep2(popup);
  }

  function closePopup() {
    if (!popup) return;
    popup.classList.remove('donation-popup--open');
    document.body.style.overflow = '';
  }

  function resetForm() {
    if (!popup) return;
    const amountBtns = popup.querySelectorAll('.donation-popup__amount-btn');
    amountBtns.forEach(b => b.classList.remove('donation-popup__amount-btn--active'));

    const inputs = popup.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        input.checked = false;
      } else {
        input.value = '';
      }
    });

    const selects = popup.querySelectorAll('select');
    selects.forEach(select => select.selectedIndex = 0);

    const errors = popup.querySelectorAll('.donation-popup__error');
    errors.forEach(e => ((e as HTMLElement).style.display = 'none'));

    
    const savedSection = popup.querySelector('#savedCardsSection') as HTMLElement;
    const saveSection = popup.querySelector('#saveCardSection') as HTMLElement;
    if (savedSection) savedSection.style.display = 'none';
    if (saveSection) saveSection.style.display = 'none';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  (window as any).openDonationPopup = openPopup;
})();
