import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios 추가
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./MyComplaintResult.css";

const MyComplaintResult = () => {
  const complaints = [
    {
      complaintId: 1,
      title: "플라스틱 줄이기",
      thumbPhotoUrl: "https://via.placeholder.com/150",
      complaintDate: "2024-09-01",
      description: "이상한 사진인거가틈",
      result: "통과",
    },
    {
      complaintId: 2,
      title: "일회용 컵 사용 안 하기",
      thumbPhotoUrl: "https://via.placeholder.com/150",
      complaintDate: "2024-09-05",
      description: "인증 제대로 안했음",
      result: "신고 검토 중",
    },
    {
      complaintId: 3,
      title: "안쓰는 콘센트 뽑기",
      thumbPhotoUrl: "https://via.placeholder.com/150",
      complaintDate: "2024-09-25",
      description: "인증 제대로 안했음!!!",
      result: "불통",
    },
  ];

  return (
    <div className="MyComplaintResult">
      {/* 신고가 하나도 없을 때 메시지 표시 */}
      {complaints.length === 0 ? (
        <p>신고한 내역이 없습니다.</p>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint.complaintId} className="complaint-card">
            <div className="complaint-content">
              <div className="image">
                <img
                  src={complaint.thumbPhotoUrl} // 임시 이미지
                  alt="Complaint icon"
                />
              </div>
              <div className="details">
                <div className="complaint-header">
                  <h2>{complaint.title}</h2>
                  <ChevronRight className="chevron-icon" />
                </div>
                <p className="date">
                  신고 일시:{" "}
                  {new Date(complaint.complaintDate).toLocaleDateString()}
                </p>
                <p className="time">신고 내용: {complaint.description}</p>
                <div className="stats">
                  <p className="stat-label">신고 결과:</p>
                  <div>
                    <p
                      className={`stat-value ${
                        complaint.result === "불통"
                          ? "fail"
                          : complaint.result === "통과"
                          ? "pass"
                          : ""
                      }`}
                    >
                      {complaint.result}
                    </p>
                  </div>
                </div>
                <button className="button">신고 취소하기</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyComplaintResult;
