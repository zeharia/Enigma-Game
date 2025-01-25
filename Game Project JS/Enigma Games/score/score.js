let users = JSON.parse(localStorage.getItem('users')); 
let currentScore = localStorage.getItem('getTime');

let lastUserIndex = users.length - 1; 
users[lastUserIndex].time = currentScore;

localStorage.setItem('users', JSON.stringify(users));

const sortedUsers=users.sort((a,b)=>a.time-b.time);

const userContainer=document.createElement('div');
userContainer.id='user-list';
sortedUsers.forEach(user => {
    const userDiv=document.createElement('div');
    userDiv.classList.add('user-item');

    const nameDiv=document.createElement('div');
    nameDiv.textContent=user.name;
    nameDiv.classList.add('user-name');

    const timeDiv=document.createElement('div');
    timeDiv.textContent=`Time  : ${ user.time}`;
    timeDiv.classList.add('user-time');

    userDiv.appendChild(nameDiv);
    userDiv.appendChild(timeDiv);

    userContainer.appendChild(userDiv);
});
document.body.appendChild(userContainer);
