import React from 'react';
import './Navbar.css'; // 필요한 경우 스타일을 정의합니다.

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <p>챌린지</p>
        <ul className="navbar-menu">
          <li><a href="/">♡</a></li>
          <li><a href="/">+</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
