let userDetails = {
  number: 9013941010,
  amount: 599
}


// HANDLE LINK SENT
const handleSubmit = () => {

  console.log(`Sent link to ${userDetails.number} for amount ${userDetails.amount}`)

  fetch("http://localhost:8080/submit",
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ amount: userDetails.amount, number: userDetails.number })
    })
    .then(res => console.log(res))
    .catch(err => console.log('No res'))
}


// CHECK OS [ANDROID, iOS, DESKTOP]
const checkOS = () => {
  if (navigator.platform === 'Android') {
    console.log(navigator.platform)
    console.log('android')
  }
  else if (['iOS', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)) {
    console.log(navigator.platform)
    document.getElementById('paytm').style.display = 'none';
    document.getElementById('bhim').style.display = 'none';
  }
  else {
    console.log(navigator.platform)
    document.getElementById('paytm').style.display = 'none';
    document.getElementById('bhim').style.display = 'none';
    document.getElementById('phonepe').style.display = 'none';
    document.getElementById('googlepay').style.display = 'none';
    document.getElementsByClassName('payment-btns')[0].innerHTML = '<p class="no-options subtext">No Payment Options Available</p>'
  }
}


// HANLDE UP PAY
const handlePay = (q) => {

  fetch('http://localhost:8080/send', {
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    method: "GET"
  })
    .then(res => console.log(res))
    .catch(err => console.log('UPI call triggered via ', q))
  console.log(`${q} clicked`)
}


// PHONE ELEMENT
let phoneInput = document.getElementById('phone')

// AMOUNT ELEMENT
let totalAmountEl = document.getElementsByClassName('total-amount')[0]


// ONLOAD
window.onload = () => {

  checkOS()

  phoneInput.addEventListener('keyup', (e) => {
    userDetails.number = phoneInput.value
    console.log(userDetails.number)
  })

  totalAmountEl.innerHTML = `₹${userDetails.amount}`
  document.getElementById('phone').value = userDetails.number
}