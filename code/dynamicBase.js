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
    <p class='network-status-main'>You are back online! We are syncing your changes</p>
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
console.log('loaded')
