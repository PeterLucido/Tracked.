import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Create a helper function to safely access the configuration
function getFirebaseConfig() {
  if (!Constants.expoConfig || !Constants.expoConfig.extra) {
    throw new Error('Firebase configuration is not defined in expoConfig.extra');
  }
  return {
    apiKey: Constants.expoConfig.extra.firebaseApiKey,
    authDomain: Constants.expoConfig.extra.firebaseAuthDomain,
    projectId: Constants.expoConfig.extra.firebaseProjectId,
    storageBucket: Constants.expoConfig.extra.firebaseStorageBucket,
    messagingSenderId: Constants.expoConfig.extra.firebaseMessagingSenderId,
    appId: Constants.expoConfig.extra.firebaseAppId,
    measurementId: Constants.expoConfig.extra.firebaseMeasurementId,
  };
}

// Initialize Firebase
const firebaseConfig = getFirebaseConfig();
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
