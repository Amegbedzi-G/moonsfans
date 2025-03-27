// User database (simulated local storage)
const users = JSON.parse(localStorage.getItem('users')) || [];

// Login form submission handler
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate login credentials
    const user = users.find(u => u.email === username && u.password === password);

    if (user) {
        // Successful login - redirect to home page
        window.location.href = '/html/home.html';
    } else {
        // Failed login - show error message
        alert('Invalid email or password. Please try again or sign up.');
    }
});

// Password toggle functionality
const passwordInput = document.getElementById('password');
const togglePassword = document.querySelector('.toggle-password');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
});

// Remember me functionality
const rememberCheckbox = document.getElementById('remember');
rememberCheckbox.addEventListener('change', function() {
    if (this.checked) {
        localStorage.setItem('rememberedEmail', document.getElementById('username').value);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
});

// Populate remembered email if exists
window.addEventListener('load', function() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('username').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
});

// Sign up form submission handler (for sign-up.html)
const signupForm = document.querySelector('form[action$="home.html"]');
if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check if email already exists
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            alert('An account with this email already exists. Please sign in.');
            return;
        }

        // Create new user
        const newUser = { email, password };
        users.push(newUser);
        
        // Save to local storage
        localStorage.setItem('users', JSON.stringify(users));

        // Redirect to home page
        window.location.href = '/html/home.html';
    });
}