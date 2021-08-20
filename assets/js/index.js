let userDetails = {
  number: 9013941010,
  amount: 599
}
let notifications = true


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

  console.log(/mobile|android/i.test(navigator.userAgent))
  if (/Android/.test(navigator.userAgent)) {
    console.log(navigator.platform)
    console.log('android')
  }
  else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    console.log('iOS')
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


// HANLDE UPI PAY
const handlePay = (q) => {

  fetch(`http://localhost:8080/${q}`, {
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

// Notification CheckBox
let notiCheck = document.getElementById('noti-check')

// ONLOAD
window.onload = () => {

  checkOS()

  phoneInput.addEventListener('keyup', (e) => {
    userDetails.number = phoneInput.value
    console.log(userDetails.number)
  })

  notiCheck.addEventListener('click', (e) => {
    if (e.target.checked) {
      notifications = true
      console.log('notifications on', notifications)
    }
    else {
      notifications = false
      console.log('notifications on', notifications)
    }
  })

  totalAmountEl.innerHTML = `₹${userDetails.amount}`
  document.getElementById('phone').value = userDetails.number
}