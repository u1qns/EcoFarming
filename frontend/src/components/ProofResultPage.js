import React from "react";

const ProofResultPage = () => {
  return (
    <div>
      <h1>인증이 완료되었습니다!</h1>
      <p>감사합니다. 도전에 성공하셨습니다.</p>
      <button onClick={() => (window.location.href = "/")}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default ProofResultPage;
