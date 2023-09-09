// Initialize Firebase with your Firebase config
// const firebaseConfig = {
//     apiKey: 'YOUR_API_KEY',
//     authDomain: 'YOUR_AUTH_DOMAIN',
//     databaseURL: 'YOUR_DATABASE_URL',
//     projectId: 'YOUR_PROJECT_ID',
//     storageBucket: 'YOUR_STORAGE_BUCKET',
//     messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//     appId: 'YOUR_APP_ID'
// };

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
// //   import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
//   import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js';


const firebaseConfig = {
    apiKey: "AIzaSyDDWzSXanwJDh7da0BA4kaIwkPPOw-lh2A",
    authDomain: "impex-smart-deck.firebaseapp.com",
    databaseURL: "https://impex-smart-deck-default-rtdb.firebaseio.com",
    projectId: "impex-smart-deck",
    storageBucket: "impex-smart-deck.appspot.com",
    messagingSenderId: "228021069801",
    appId: "1:228021069801:web:8ca75b055795dcef424d78",
};
//   const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);


var database = firebase.database();
// console.log("hello");
// Reference to the Firebase database
// const dbRef = app.database().ref('/Manager/Status');
// database.ref('Manager').set({
//     Status: 'green'
//   });

// database.ref('Manager').on('value', function(snapshot) {
//     var data = snapshot.val();
//     console.log("hello");
//     console.log(data.Status);
//     const status = data.Status;
//     document.getElementById('status').textContent = status;
  
//   });



function updateStatus(status) {
    const statusElement = document.getElementById('status');
    const statusLedElement = document.getElementById('status-led');

    statusElement.textContent = status;

    // Remove all status classes and add the appropriate class based on status
    statusLedElement.classList.remove('loading', 'red', 'green', 'yellow');
    console.log(status);
    switch (status) {
        case 'Loading...':
            statusLedElement.classList.add('loading');
            break;
        case 'Busy':
            statusLedElement.classList.add('red');
            break;
        case 'Avilable':
            statusLedElement.classList.add('green');
            break;
        default:
            statusLedElement.classList.add('yellow');
            break;
    }
}



const dbRef = database.ref('Manager')
// dbRef.set({
//         Status: 'green'
//       });
// Listen for changes to the status and update the dashboard
// dbRef.on('value', (snapshot) => {
//     const status = snapshot.val();
//     console.log(status.Status);
//     document.getElementById('status').textContent = status.Status;
// });


// Listen for changes to the status and update the dashboard in real-time
dbRef.on('value', (snapshot) => {
    const status = snapshot.val();
    updateStatus(status.Status);
});

// Fetch and display the initial status when the page loads
dbRef.once('value', (snapshot) => {
    const status = snapshot.val();
    updateStatus(status.Status);
});