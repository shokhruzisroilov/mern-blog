// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'mern-blog-73745.firebaseapp.com',
	projectId: 'mern-blog-73745',
	storageBucket: 'mern-blog-73745.appspot.com',
	messagingSenderId: '1064854046619',
	appId: '1:1064854046619:web:0cd15a6f3b07a1e3ba033e',
	measurementId: 'G-1PLK04EJXB',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
