// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs,
    onSnapshot,
    doc,
    deleteDoc,
    getDoc, 
    updateDoc} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQtYfKlp_r1JOC5ZwBzTt38G0QHfJNC4Q",
  authDomain: "svelte-todo-api.firebaseapp.com",
  projectId: "svelte-todo-api",
  storageBucket: "svelte-todo-api.appspot.com",
  messagingSenderId: "725688327721",
  appId: "1:725688327721:web:de8721d5b9c65ad4b64638"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveTask = ( title, content ) => {
    addDoc(collection(db, 'tasks'), { title, content,  createdAt: Date.now() })
}

export const getTasks = getDocs(collection(db, 'tasks'))

export const onGetTasks = ( cb ) => onSnapshot(collection(db, 'tasks'), cb)

export const deleteTask = ( id ) => deleteDoc(doc(db, 'tasks', id))

export const getTask = ( id ) => getDoc(doc(db, 'tasks', id))

export const updateTask = ( id, newFields ) => updateDoc(doc(db, 'tasks', id), newFields)
