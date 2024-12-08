const div = document.createElement('div')
if (window.location.href.includes('.com')) {
  console.log = function() {}
}
// DO NOT EDIT ANYTHING ABOVE ^^

// Check network status is below.

div.innerHTML = `
  <div class='network-status' id='networkstatus-offline'>
    <p class='network-status-main'>You're offline! Any changes will not be saved.</p>
  </div>
  <div class='network-status' id='networkstatus-online'>
    <p class='network-status-main'>You are back online! We are syncing your changes.</p>
  </div>
`
document.querySelector('body').appendChild(div)
const style = document.createElement('style')
style.textContent = `
  .network-status {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 50px;
    position: fixed;
    z-index: 9999999999999999999999999999999 !important;
    bottom: 10px;
    left: 10px;
    font-family: 'Poppins';
    color: white;
    font-size: 12px;
    border-radius: 5px;
    display: none;
  }
  .network-status-main {
    max-width: 95%;
  }
  #networkstatus-offline {
    background-color: #914901;
  }
  #networkstatus-online {
    background-color: #066606;
  }
`
document.head.appendChild(style)
let waitCount = 10000
window.addEventListener('online', () => {
  console.log('online')
  document.querySelector('#networkstatus-offline').style.display = 'none'
  document.querySelector('#networkstatus-online').style.display = 'flex'
  waitCount = 10000
  setTimeout(() => {
    document.querySelector('#networkstatus-online').style.display = 'none'
  }, waitCount)
  
})

window.addEventListener('offline', () => {
  console.log('offline')
  document.querySelector('#networkstatus-online').style.display = 'none'
  document.querySelector('#networkstatus-offline').style.display = 'flex'
})

if (window.location.href.includes('oauth.prestonkwei.com')) {
  console.log = function() {}
}
console.log('loaded')

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return ''
}

let cookie = getCookie('user-cookie')
let script = document.createElement('script')
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.4/pako.min.js'

script.onload = function() {
  let value
  if (!cookie) {
    value = { init: { ms: Date.now(), rd: new Date(), first: window.location.href }, id: crypto.randomUUID() }
    console.log('cookie doesnt exist, created!')
  } else {
    console.log('cookie exists')
    const decodedCookie = Uint8Array.from(atob(cookie), c => c.charCodeAt(0))
    value = JSON.parse(pako.inflate(decodedCookie, { to: 'string' }))
  }
  console.log(value)

// LAST DO NOT PUT ANYTHING AFTER THIS
value = btoa(String.fromCharCode(...pako.deflate(JSON.stringify(value))))
  document.cookie = `user-cookie=${value};domain=.prestonkwei.com;path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT`
 
}

document.head.appendChild(script)
