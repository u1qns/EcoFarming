import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { submitToken, subscribe, unsubscribe } from "../services/fcmService";
import axios from 'axios';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 푸시 알림 권한 요청 및 토큰 가져오기
export const requestPermission = async (userId) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림이 구독되었습니다.🥰");
      await getFCMToken(userId); // 토큰 요청
    } else {
      console.log("알림 권한이 허용되지 않았습니다. 😥");
    }
  } catch (error) {
    console.error("권한 요청 중 오류 발생:", error);
  }
};

// 푸시 알림 토큰 요청 함수
const getFCMToken = async (userId) => {
  
  if(localStorage.getItem("fcm:"+userId)) {
    return localStorage.getItem("fcm:"+userId);
  }

  try {

    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });

    if (token) {
      localStorage.setItem("fcm:"+userId, token);
      await submitToken({ token, userId, deviceId: localStorage.getItem("fcm") });
    } else {
      console.log('푸시 알림 토큰을 생성할 수 없습니다.');
    }
  } catch (error) {
    console.error('토큰 요청 중 오류 발생:', error);
  }
};

// 특정 토픽에 구독
export const subscribeToTopic = async (topic, userId) => {
  let request = {
    topic: topic,
    token : await getFCMToken(userId)
  }
  await subscribe(request)
      .then(response => {
          console.log('Successfully subscribed to topic:', response);
      })
      .catch(error => {
          console.error('Error subscribing to topic:', error);
      });
}

// 특정 토픽의 구독을 취소
export const unsubscribeFromTopic = async (topic, userId) => {
  let request = {
    topic: topic,
    token : await getFCMToken(userId)
  }
  await unsubscribe(request)
      .then(response => {
          console.log('Successfully unsubscribed to topic:', response);
      })
      .catch(error => {
          console.error('Error unsubscribing to topic:', error);
      });
};

export { messaging };
