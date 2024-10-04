import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';  // Axios import
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 서비스 워커 등록
serviceWorkerRegistration.register();

// Axios 전역 설정
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

// 인증이 필요 없는 경로 목록
const noAuthRoutes = [`${axios.defaults.baseURL}/join`, `${axios.defaults.baseURL}/login`, `${axios.defaults.baseURL}/challenges`];

// 요청 인터셉터 설정
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !noAuthRoutes.includes(config.url)) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axios.interceptors.response.use(
  (response) => response,  // 정상 응답은 그대로 처리
  async (error) => {
    const originalRequest = error.config;

    // 401 오류 시 재발급 시도
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 응답 메시지가 "access token expired"일 때만 재발급 요청
      if (error.response.data === "access token expired") {
        try {
          const reissueResponse = await axios.post('/reissue', {}, {
            withCredentials: true,
          });

          const newAccessToken = reissueResponse.headers['authorization'];
          if (newAccessToken) {
            localStorage.setItem('token', newAccessToken);

            // 기존 요청에 새로운 토큰을 설정하고 다시 시도
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } else {
            throw new Error('New access token not found in response');
          }

        } catch (reissueError) {
          console.log('Reissue failed', reissueError);
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('userId');
          window.location.href = '/login';
          return Promise.reject(reissueError);
        }
      }
    }

    return Promise.reject(error);
  }
);
