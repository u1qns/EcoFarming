import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./LoginSignup.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/join`, formData);
      if (response.status === 201) {
        navigate('/login'); // 로그인 페이지로 이동
      }
    } catch (error) {
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="auth-page">
      <div className="header">
        <h1 className="title">회원가입</h1>
      </div>

      <div className="content">
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <div className="footer">
            <button type="submit" className="auth-button">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
