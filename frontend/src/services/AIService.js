import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const submitAIResult = async (request) => {
    try {
        const response = await axios.post(`${API_URL}/complaints/proof/AI`, request);
        return response.data;
    } catch (error) {
        throw new Error('AI 결과 전송에 실패했습니다.' + error.message);
    }
};