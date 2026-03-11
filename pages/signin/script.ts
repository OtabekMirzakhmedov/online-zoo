import '../shared.css';

const loginBtn = document.getElementById('loginBtn');
const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;

if (loginBtn && emailInput) {
    loginBtn.addEventListener('click', (e) => {
        // Prevent default only if we actually have input
        if (emailInput.value) {
            e.preventDefault();
            // Create a fake name from the email (e.g. "alex@test.com" -> "Alex")
            const fakeName = emailInput.value.split('@')[0];
            const name = fakeName.charAt(0).toUpperCase() + fakeName.slice(1);
            
            localStorage.setItem('user', JSON.stringify({ name: name, email: emailInput.value }));
            window.location.href = '../landing/index.html';
        }
    });
}
