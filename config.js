import firebase from 'firebase' 




//sql'deki bağlantı gibi
const firebaseConfig = {
  apiKey: "AIzaSyDsmSyNkW0MlLmMLErjbkqxrhULaftJ3bg",
  authDomain: "todo-a0720.firebaseapp.com",
  projectId: "todo-a0720",
  storageBucket: "todo-a0720.appspot.com",
  messagingSenderId: "1023309305973",
  appId: "1:1023309305973:web:de501710b5bef05f0e803c",
  measurementId: "G-82VWWQN6R9"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export {firebase};