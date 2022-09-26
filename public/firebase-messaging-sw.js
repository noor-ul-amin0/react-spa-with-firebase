// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDruuyugXS8SAb-5t5YgY05Jv0aOpsWFlY",
  authDomain: "dev-project-c4ac4.firebaseapp.com",
  projectId: "dev-project-c4ac4",
  storageBucket: "dev-project-c4ac4.appspot.com",
  messagingSenderId: "849068006077",
  appId: "1:849068006077:web:30aa24f2966f74b337f5d4",
  measurementId: "G-SYTVRF0TVB",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
