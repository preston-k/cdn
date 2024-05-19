function initializeFirebaseApp(config, appName) {
  if (!firebase.apps.some(app => app.name === appName)) {
    return firebase.initializeApp(config, appName)
  }
  return firebase.app(appName)
}

let blockFirebaseConfig = {
  apiKey: "AIzaSyD47p-Dpi12PHmBd9cZzwWaKjmrGyJM3LM",
  authDomain: "identity-and-access-mana-7c680.firebaseapp.com",
  projectId: "identity-and-access-mana-7c680",
  storageBucket: "identity-and-access-mana-7c680.appspot.com",
  messagingSenderId: "64440352376",
  appId: "1:64440352376:web:c62d303a5f79cf9302b78d"
}

const iamdb = initializeFirebaseApp(blockFirebaseConfig, 'iam')

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    console.log(data.ip)
    let dbip = data.ip.replace(/\./g, '_')
    iamdb.database().ref(`bans/${dbip}/status`).once('value').then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
        if (snapshot.val() == 'banned') {
          console.log('Banned')
          window.location.replace('https://prestonkwei.com/warn/banned')
        }
      } else {
        console.log('No data found')
        return
      }
    })
  })
  .catch(error => {
    console.error('Error fetching IP:', error)
  })