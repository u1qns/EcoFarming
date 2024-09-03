import React from 'react';
import './Footer.css'; // 필요한 경우 스타일을 정의합니다.

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 My Website. All Rights Reserved.</p>
        <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
