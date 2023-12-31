import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain:  process.env.VUE_APP_AUTH_DOMAIN,
  projectId:  process.env.VUE_APP_PROJECT_ID,
 /* databaseURL:process.env.VUE_APP_DATABASE_URL,*/
  storageBucket:  process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId:  process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId:  process.env.VUE_APP_APP_ID,
 /* measurementId:  process.env.VUE_APP_MEASUREMENT_ID*/
})

export default function install (Vue){
  Object.defineProperty(Vue.prototype, '$firebase',{
    get(){
      return firebaseApp
    }
  })
} 