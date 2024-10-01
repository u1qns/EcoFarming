import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const submitComplaint = async (reportData) => {
  console.log(reportData)
  try {
    const response = await axios.post(`${API_URL}/complaints/proof`, reportData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // axios는 자동으로 JSON 변환을 해줍니다.
  } catch (error) {
    throw new Error('Network response was not ok');
  }
};