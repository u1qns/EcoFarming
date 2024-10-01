import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 처리 로직을 여기에 작성
    console.log("Email:", email);
    console.log("Password:", password);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
        </form>
      </div>

      {/* 로그인 버튼을 하단에 고정 */}
      <div className="footer">
        <button type="submit" className="auth-button" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;