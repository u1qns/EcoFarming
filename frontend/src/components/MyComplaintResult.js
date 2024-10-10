import React from "react";
import "./MyComplaintResult.css";


const MyComplaintResult = ({ complaints }) => {
  return (
    <div className="MyComplaintResult">
      {complaints.length === 0 ? (
        <div className="no-complaint">
          <p className="no-complaint-message">현재 신고된 내역이 없습니다.</p>
        </div>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint.complaintId} className="complaint-card">
            <div className="complaint-content">
              <div className="image">
                <img
                  src={complaint.photoUrl} // 임시 이미지
                  alt="Complaint icon"
                />
              </div>
              <div className="details">
                <div className="complaint-header">
                  <h2>{complaint.title}</h2>
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
                        complaint.isApproved === false
                          ? "fail"
                          : complaint.isApproved === true
                          ? "pass"
                          : ""
                      }`}
                    >
                      {
                        complaint.isApproved === true
                          ? "통과"
                          : complaint.isApproved === false
                          ? "불통"
                          : "신고 검토 중" // null인 경우
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyComplaintResult;
