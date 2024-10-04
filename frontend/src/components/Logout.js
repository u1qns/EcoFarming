import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.post('/logout');

      localStorage.removeItem('token'); // 토큰 삭제
      localStorage.removeItem('username');
      localStorage.removeItem('userId');

      document.cookie = 'refresh=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      
      alert('로그아웃 성공');
    } catch (error) {
      alert('로그아웃 실패');
      console.log(`${localStorage.getItem('token')}`);
    }
  };

  return (
    <button onClick={handleLogout}>로그아웃</button>
  );
};

export default Logout;
