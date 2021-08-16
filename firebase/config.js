import firebase from "firebase/app";
import "firebase/auth"; // If you need it
import "firebase/firestore"; // If you need it
import "firebase/storage"; // If you need it
import "firebase/analytics"; // If you need it
import "firebase/performance"; // If you need it

var clientCredentials = {
  apiKey: "AIzaSyDdaRR02_MwgA7PDeLY5Pbzt42OMthTQdk",
  authDomain: "movie2-54939.firebaseapp.com",
  projectId: "movie2-54939",
  storageBucket: "movie2-54939.appspot.com",
  messagingSenderId: "177158799782",
  appId: "1:177158799782:web:9c2127b667d2528fc70f67",
  measurementId: "G-53YJF1BTB8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials)
  if (typeof window !== 'undefined') {
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    if ('measurementId' in clientCredentials) {
      firebase.analytics()
    }
  }
}
const auth = firebase.auth();
const db = firebase.firestore();
export { db, auth };
export default firebase;
