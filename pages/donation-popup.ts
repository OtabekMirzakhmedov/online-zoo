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

  let carePopup = null;

  function initCarePopup() {
    document.body.insertAdjacentHTML('beforeend', carePopupHTML);
    carePopup = document.getElementById('carePopup');

    if (!carePopup) return;

    const overlay = carePopup.querySelector('.care-popup__overlay');
    const closeBtn = carePopup.querySelector('.care-popup__close');
    const amountBtns = carePopup.querySelectorAll('.care-popup__amount-btn');

    overlay.addEventListener('click', closeCarePopup);
    closeBtn.addEventListener('click', closeCarePopup);

    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const amount = btn.dataset.amount;
        closeCarePopup();
        if (typeof window.openDonationPopup === 'function') {
          window.openDonationPopup(amount);
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && carePopup.classList.contains('care-popup--open')) {
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

  window.openCarePopup = openCarePopup;

  const pets = [
    { id: 'panda', name: 'Lukas the Panda' },
    { id: 'lemur', name: 'Andy the Lemur' },
    { id: 'gorilla', name: 'Glen the Gorilla' },
    { id: 'alligator', name: 'Mike the Alligator' },
    { id: 'eagle', name: 'Sam & Lora the eagles family' },
    { id: 'koala', name: 'Liz the Koala' },
    { id: 'lion', name: 'Shake the Lion' },
    { id: 'tiger', name: 'Senja the Tiger' }
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
              <input class="donation-popup__other-input" type="number" placeholder="" min="1">
            </div>

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
                <button class="donation-popup__next-btn" type="button" data-next="2">
                  Next
                  <span class="donation-popup__btn-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>


          <div class="donation-popup__step" data-step="2">
            <h3 class="donation-popup__section-title">Billing Information:</h3>

            <div class="donation-popup__form-group">
              <label class="donation-popup__form-label" for="donationName">
                <span>*</span> Your Name
              </label>
              <input class="donation-popup__form-input" type="text" id="donationName" placeholder="First and last name">
            </div>

            <div class="donation-popup__form-group">
              <label class="donation-popup__form-label" for="donationEmail">
                <span>*</span> Your Email Address
              </label>
              <input class="donation-popup__form-input" type="email" id="donationEmail" placeholder="Enter your email">
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
                <button class="donation-popup__next-btn" type="button" data-next="3">
                  Next
                  <span class="donation-popup__btn-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>


          <div class="donation-popup__step" data-step="3">
            <h3 class="donation-popup__section-title">Payment Information:</h3>

            <div class="donation-popup__form-row donation-popup__form-row--payment">
              <div class="donation-popup__form-group">
                <label class="donation-popup__form-label" for="donationCard">
                  <span>*</span> Credit Card Number
                </label>
                <input class="donation-popup__form-input" type="text" id="donationCard" placeholder="">
              </div>

              <div class="donation-popup__form-group">
                <label class="donation-popup__form-label" for="donationCVV">
                  <span>*</span> CVV Number
                </label>
                <input class="donation-popup__form-input" type="text" id="donationCVV" placeholder="" maxlength="4">
              </div>
            </div>

            <div class="donation-popup__form-group">
              <label class="donation-popup__form-label">
                <span>*</span> Expiration Date
              </label>
              <div class="donation-popup__form-row donation-popup__form-row--expiry">
                <div class="donation-popup__select-wrap">
                  <select class="donation-popup__form-select" id="donationExpMonth">
                    <option value="">Month</option>
                    <option value="01">01 - January</option>
                    <option value="02">02 - February</option>
                    <option value="03">03 - March</option>
                    <option value="04">04 - April</option>
                    <option value="05">05 - May</option>
                    <option value="06">06 - June</option>
                    <option value="07">07 - July</option>
                    <option value="08">08 - August</option>
                    <option value="09">09 - September</option>
                    <option value="10">10 - October</option>
                    <option value="11">11 - November</option>
                    <option value="12">12 - December</option>
                  </select>
                </div>
                <div class="donation-popup__select-wrap">
                  <select class="donation-popup__form-select" id="donationExpYear">
                    <option value="">Year</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                  </select>
                </div>
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
                <button class="donation-popup__next-btn donation-popup__next-btn--complete" type="button" data-complete>
                  Complete Donation
                  <span class="donation-popup__btn-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  let popup = null;
  let currentStep = 1;
  let selectedAmount = null;

  function init() {
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    popup = document.getElementById('donationPopup');

    if (!popup) return;

    const overlay = popup.querySelector('.donation-popup__overlay');
    const closeBtn = popup.querySelector('.donation-popup__close');
    const amountBtns = popup.querySelectorAll('.donation-popup__amount-btn');
    const otherBtn = popup.querySelector('.donation-popup__other-btn');
    const otherInput = popup.querySelector('.donation-popup__other-input');
    const nextBtns = popup.querySelectorAll('[data-next]');
    const backBtns = popup.querySelectorAll('[data-back]');
    const completeBtn = popup.querySelector('[data-complete]');

    overlay.addEventListener('click', closePopup);
    closeBtn.addEventListener('click', closePopup);

    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('donation-popup__amount-btn--active'));
        btn.classList.add('donation-popup__amount-btn--active');
        selectedAmount = btn.dataset.amount;
        otherInput.value = '';
      });
    });

    otherBtn.addEventListener('click', () => {
      otherInput.focus();
    });

    otherInput.addEventListener('input', () => {
      if (otherInput.value) {
        amountBtns.forEach(b => b.classList.remove('donation-popup__amount-btn--active'));
        selectedAmount = otherInput.value;
      }
    });

    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const nextStep = parseInt(btn.dataset.next);
        goToStep(nextStep);
      });
    });

    backBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const prevStep = parseInt(btn.dataset.back);
        goToStep(prevStep);
      });
    });

    completeBtn.addEventListener('click', () => {
      alert('Thank you for your donation!');
      closePopup();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popup.classList.contains('donation-popup--open')) {
        closePopup();
      }
    });
  }

  function goToStep(step) {
    currentStep = step;
    const steps = popup.querySelectorAll('.donation-popup__step');
    steps.forEach(s => {
      s.classList.remove('donation-popup__step--active');
      if (parseInt(s.dataset.step) === step) {
        s.classList.add('donation-popup__step--active');
      }
    });
  }

  function openPopup(preselectedAmount) {
    if (!popup) return;
    popup.classList.add('donation-popup--open');
    document.body.style.overflow = 'hidden';
    goToStep(1);
    resetForm();

    if (preselectedAmount && preselectedAmount !== 'other') {
      const amountBtns = popup.querySelectorAll('.donation-popup__amount-btn');
      amountBtns.forEach(btn => {
        if (btn.dataset.amount === preselectedAmount) {
          btn.classList.add('donation-popup__amount-btn--active');
          selectedAmount = preselectedAmount;
        }
      });
    }
  }

  function closePopup() {
    if (!popup) return;
    popup.classList.remove('donation-popup--open');
    document.body.style.overflow = '';
  }

  function resetForm() {
    selectedAmount = null;
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.openDonationPopup = openPopup;
})();
