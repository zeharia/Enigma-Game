const nameInput = document.querySelector('.name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordVerification = document.getElementById('PasswordVerification');
const submitButton = document.getElementById('submit');

const regexName = /^[a-zA-Z- ]+$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function checkName() {
    const messageName = document.getElementById('messag-name');
    nameInput.addEventListener('change', (e) => {
        if (regexName.test(e.target.value)) {
            messageName.textContent = 'Valid Name !';
            messageName.style.color = 'green';
        } else {
            messageName.textContent = 'put charachter only';
            messageName.style.color = 'red';
        }
    })
}
function checkEmail() {
    const messageEmail = document.getElementById('message-email');
    email.addEventListener('change', (e) => {
        if (regexEmail.test(e.target.value)) {
            messageEmail.textContent = 'Valid Email !';
            messageEmail.style.color = 'green';
        }
        else {
            messageEmail.textContent = 'put valid email';
            messageEmail.style.color = 'red';
        }
    });
}
function checkPassword() {
    const messagePassword = document.getElementById('message-password');
    password.addEventListener('change', (e) => {
        if (regexPassword.test(e.target.value)) {
            messagePassword.textContent = 'Valid Password';
            messagePassword.style.color = 'green';
        } else {
            messagePassword.textContent = "The password must be at least 8 characters long, contain at least 1 symbol, 1 uppercase letter, and 1 number";
            messagePassword.style.color = 'red';
        }
    })
}
function confirmPassword() {
    const messageConfirmPassword = document.getElementById('message-confirmPassword');
    passwordVerification.addEventListener('focus', (e) => {
        if (e.target.value === password.value) {
            messageConfirmPassword.textContent = 'Password match !'
            messageConfirmPassword.style.color = 'green';
        } else {
            messageConfirmPassword.textContent = 'Passwords do not match';
            messageConfirmPassword.style.color = 'red';
        }
    })
}
function createAccount() {
    submitButton.addEventListener('click', (e) => {
        if (!regexName.test(nameInput.value)) {
            alert("Please enter a valid name.");
            return;
        }
        if (!regexEmail.test(email.value)) {
            alert("Please enter a valid email.");
            return;
        }
        if (!regexPassword.test(password.value)) {
            alert("Please enter a valid password.");
            return;
        }
        if (password.value !== passwordVerification.value) {
            alert("Passwords do not match.");
            return;
        }
        const user = {
            name: nameInput.value,
            email: email.value,
            password: password.value,
            time:0
        };
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert("Account created successfully!");
        nameInput.value = '';
        email.value = '';
        password.value = '';
        passwordVerification.value = '';
        window.location.href = 'login.html';
    });
}
checkName();
checkEmail();
checkPassword();
confirmPassword();
createAccount();