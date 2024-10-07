import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// isAuthenticated 함수: 실제 인증 여부 확인 (예시로 localStorage 사용)
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // 로그인된 경우에만 true 반환
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
