const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyBt8eEkHRTZOftnxWZAYNaLN9ZNodI3iuY",
  authDomain: "brickwind-519cc.firebaseapp.com",
  projectId: "brickwind-519cc",
  storageBucket: "brickwind-519cc.appspot.com",
  messagingSenderId: "922215668203",
  appId: "1:922215668203:web:6621ff73405e100edb21ae",
  measurementId: "G-L165R5P275",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = {
  storage,
};
