import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const submitComplaint = async (complaintData) => {
  //console.log(complaintData)
  try {
    const response = await axios.post(`${API_URL}/complaints/proof`, complaintData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('서버 오류:', error.response.status, error.response.data);
      throw new Error(`서버 오류: ${error.response.data.message || '알 수 없는 오류가 발생했습니다.'}`);
    } else {
      throw new Error(`인증 신고 접수 도중 문제가 발생했습니다. : ${error.message}`);
    }
  }
};