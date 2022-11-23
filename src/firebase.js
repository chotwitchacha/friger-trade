import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


var firebaseConfig = {
  apiKey: "AIzaSyBJl9tVIZr7_Q6Q0Me93SRD_lPVGO__K2Y",
  authDomain: "finger-trade.firebaseapp.com",
  projectId: "finger-trade",
  storageBucket: "finger-trade.appspot.com",
  messagingSenderId: "258616183052",
  appId: "1:258616183052:web:da3f2006b95f625e326129"
};

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);