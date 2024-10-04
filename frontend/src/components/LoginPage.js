import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./LoginSignup.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', credentials, {
        withCredentials: true
      });
      const token = response.headers['authorization'];
      const { username, userId } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', userId);

      navigate('/');
      alert('로그인 성공!');
    } catch (error) {
      alert('로그인 실패');
    }
  };

  return (
    <div className="auth-page">
      <div className="header">
        <h1 className="title">로그인</h1>
      </div>

      <div className="content">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
        </form>
      </div>

      <div className="footer">
        <button type="submit" className="auth-button" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;