import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', credentials, {
        withCredentials: true  // This is important for cookies
      });
      const token = response.headers['authorization']; // 토큰은 헤더에 저장됨
      const { username, userId } = response.data;

      localStorage.setItem('token', token); // 로컬 스토리지에 토큰 저장
      localStorage.setItem('username', username);
      localStorage.setItem('userId', userId);

      window.location.href = '/';
      alert('로그인 성공!');
    } catch (error) {
      alert('로그인 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>이메일:</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>비밀번호:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
