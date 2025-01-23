const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.querySelector('.login-btn');

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

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.name=== username && u.password === password);
    if (user) {
        window.location.href = '../game/index.html';
    } else {
        alert("You don't have an account. Please register to continue.");
        window.location.href = 'register.html';
    }
});
