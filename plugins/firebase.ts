// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBO3w6Lk09WqknFgYBgKKfmQOuIU3jb0s8',
  authDomain: 'paveedev.firebaseapp.com',
  projectId: 'paveedev',
  storageBucket: 'paveedev.appspot.com',
  messagingSenderId: '78781065964',
  appId: '1:78781065964:web:3fc1f2b8a88ebab1d253c9',
  measurementId: 'G-0FZLG12SQH',
}

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  return {
    provide: {
      auth,
      firebase: 'yes',
    },
  }
})
