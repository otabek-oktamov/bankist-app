'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// variables
let currentAccount;
let balance;
//users data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  userName:'js'
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  userName:'jd'
};



//all users
const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const login = document.querySelector('.login');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//display movements
const displayMovements = function (movement) {
  containerMovements.innerHTML = '';

  movement.forEach((mov, index) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //template
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
      </div>
`;
    // display movements
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//calc and display balance
const calcDisplayBalance = function (movement) {
   balance = movement.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${balance}€ `;
};

//clac and display summery
const calcDisplaySummary = function (acc) {
  //calc income
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur);
  //display income
  labelSumIn.textContent = `${income}€`;

  //calc outcome
  const outCome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur);
  //display out come
  labelSumOut.textContent = `${Math.abs(outCome)}€`;

  //calc interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((acc, cur) => acc + cur, 0);
  //display interest
  labelSumInterest.textContent = `${interest}€`;
};

/*//create username login
const createUserNames = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => {
        return name[0];
      })
      .join('');
  });
};
createUserNames(accounts);*/
//display UI and Message
const displayUIAndMessage = function () {
  containerApp.style.display = 'grid';
  setTimeout(function () {
    containerApp.style.opacity = 1;
  }, 300);
  labelWelcome.textContent = `Good ${currentTime()} ${
    currentAccount.owner.split(' ')[0]
  }`;
  inputLoginUsername.value = inputLoginPin.value = '';
};
const currentTime = function () {
  let time = new Date().getHours();
  if (time > 6 && time < 11) {
    return 'Morning';
  } else if (time > 11 && time < 18) {
    return 'Afternoon';
  }
  return 'Night';
};
//event handler

btnLogin.addEventListener('click', function (event) {
  //Prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and message
    displayUIAndMessage();
    displayMovements(currentAccount.movements);
    calcDisplaySummary(currentAccount);
    calcDisplayBalance(currentAccount.movements);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const ammount = Number(inputTransferAmount.value);
  const transferTo = inputTransferTo.value;

  const transferAcc = accounts.find(acc => acc.userName == transferTo);
if(ammount > 0 && ammount <=balance){
  console.log('k');
}
});

/*function createNewUser () {

}
createNewUser()*/
