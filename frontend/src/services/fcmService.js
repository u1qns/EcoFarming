import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const submitToken = async (request) => {
    console.log(request);
    try {
        const response = await axios.post(`${API_URL}/fcm/token`, request);
        return response.data;   
    } catch (error) {
        throw new Error('FCM 토큰 저장에 실패했습니다.');
    }
};

export const subscribe = async (request) => {
    console.log(request);
    try {
        const response = await axios.post(`${API_URL}/fcm/subscribe`, request);
        return response.data;   
    } catch (error) {
        throw new Error('FCM 구독에 실패했습니다.');
    }
};

export const unsubscribe = async (request) => {
    console.log(request);
    try {
        const response = await axios.post(`${API_URL}/fcm/unsubscribe`, request);
        return response.data;   
    } catch (error) {
        throw new Error('FCM 구독 취소에 실패했습니다.');
    }
};
