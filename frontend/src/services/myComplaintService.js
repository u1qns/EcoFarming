import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchComplaints  = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/my-page/complaints`);
    console.log(JSON.stringify(response))
    return response.data;
  } catch (error) {
    throw new Error('나의 신고 리스트를 가져오는 도중 문제가 발생했습니다.');
  }
};