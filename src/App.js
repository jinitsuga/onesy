import "./App.css";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
console.log(database);

// adding ghost users

function App() {
  return <div className="App"></div>;
}

export default App;
