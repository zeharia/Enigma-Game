const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.querySelector('.loginButton');
const togglePassword = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');

const regexName = /^[a-zA-Z- ]+$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

loginButton.addEventListener('click', (e) => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === '') {
        alert('Please enter your username');
        return;
    } else if (password === '') {
        alert('Please enter your password');
        return;
    }
    if (!regexName.test(username)) {
        alert('Invalid username. It should only contain letters, spaces, or hyphens.');
        return;
    }
    if (!regexPassword.test(password)) {
        alert('Invalid password. It must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.');
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.name === username && u.password === password);
    if (user) {
        window.location.href = '../game/index.html';
    } else {
        alert("You don't have an account. Please register to continue.");
        window.location.href = 'register.html';
    }
}
);

togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    eyeIcon.classList.toggle('fa-eye');
    eyeIcon.classList.toggle('fa-eye-slash');
});
