if (window.location.href.includes('.com')) {
  console.log = function() {}
}
const firebaseConfig = {
  apiKey: 'AIzaSyC2ZPhWKPAT6hahxFelmak8fax2NMFhA3I',
  authDomain: 'ipblocks.firebaseapp.com',
  projectId: 'ipblocks',
  storageBucket: 'ipblocks.appspot.com',
  messagingSenderId: '157404613040',
  appId: '1:157404613040:web:099482c8edc4b181b36e75'
}
firebase.initializeApp(firebaseConfig)
let database = firebase.database()


database.ref('/blocks/').once('value').then((snapshot) => {
  console.log(snapshot.val())
  
})