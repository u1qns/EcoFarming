importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: "AIzaSyCX_VBRWLI0XuID7YfmN1_8qB98crQlnVU",
  projectId: "ecofarming-5f846",
  messagingSenderId: "725037455405",
  appId: "1:725037455405:web:73836c0dce5a75b4c7c0a4"
};

const app = initializeApp(firebaseConfig);

self.addEventListener("install", function (e) {
  //console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  //console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  //console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  //console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  //console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
