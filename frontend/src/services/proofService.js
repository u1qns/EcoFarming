import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// API 호출을 통해 챌린지 가이드 데이터를 가져오는 함수
export const fetchProofGuide = async (challengeId) => {
    try {
        const response = await axios.get(`${API_URL}/proof/${challengeId}/guide`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch proof guide data: ' + error.message);
    }
};

// 챌린지 증명 사진 업로드
export const uploadProof = async (challengeId, photo) => {
    const formData = new FormData();
    formData.append('challengeId', challengeId);
    formData.append('photo', photo);

    try {
        const response = await axios.post(`${API_URL}/proof`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // 응답 데이터 반환
    } catch (error) {
        throw new Error('Failed to upload proof: ' + error.message);
    }
};