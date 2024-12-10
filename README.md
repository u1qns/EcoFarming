## 목차
- [1. 프로젝트 개요](#-프로젝트-개요)
- [2. 주요 기능](#-주요-기능)
- [3. 주요 기술](#-주요-기술)
- [4. 기술 스택](#-기술-스택)
- [5. 시스템 아키텍처](#-시스템-아키텍처)
- [6. ERD](#-erd)
- [7. 프로젝트 구조](#-프로젝트-구조)
- [8. 시연 영상 및 자료](#-시연-영상-및-자료)

---

# 🌱 에코파밍 (Eco + Dofarming)

> "환경 문제 해결을 위한 참여형 챌린지 서비스입니다."

## 프로젝트 개요

### 🗓️ 프로젝트 진행 기간

**2024년 8월 19일 ~ 2024년 10월 11일 (7주)**  
  - 기획 : 2024년 8월 19일 ~ 2024년 8월 28일  
  - 개발 : 2024년 8월 29일 ~ 2024년 10월 4일  
  - 테스트 : 2024년 10월 4일 ~ 2024년 10월 11일  

---
### 👨‍💻 팀원 소개

| 팀원 이름 | 역할 및 담당 | 주요 작업 |
|-----------|-------------|-----------|
| **김수빈** | BE, FE | 인증샷 업로드, 관리자 FCM & MM 알림 처리 |
| **김재현** | BE, FE | Spring Batch를 통한 챌린지 정산 |
| **김태경** | AI | ResNet-50 AI 모델 학습, Flask 배포 |
| **이찬민** | BE, FE, Infra | 인증목록 조회 |
| **이지은** | Design, FE | 전체 페이지 디자인, 챌린지 상세페이지 구현 |
| **이효림** | BE, FE | 결제 프로세스 연동 및 UCC 제작 |

---

### 📚 기획 배경 및 문제 인식

### **기획 배경**
- 환경 보호 실천을 지속하기 어려운 현실을 개선하기 위해 **재미 요소**, **상금**, **함께하는 챌린지**를 제공하여 지속 가능성을 높이고자 함.

### **문제 인식**
- 지구의 온도는 사상 최고치를 기록하며 계속 상승 중.
- 환경 보호에 관심은 많지만, 많은 사람들은 지속적인 실천에 어려움을 겪음.

### **원인 분석**
- 환경 보호 활동은 혼자 실천하기엔 **재미와 동기부여가 부족함**.  
- **모두가 함께 참여하는 플랫폼**이 없어 참여의 장벽이 존재.

### **🎯 해결 방안**
- **사용자 동기부여 강화:**  상금, 챌린지 참여, 인증샷 공유 등을 통해 **재미와 동기부여**를 강화.  
- 환경 보호 활동을 **챌린지 형식**으로 구체화하여 지속 가능한 행동 유도.

---

## 🛠️ 주요 기능

### 챌린지 관리

- 챌린지 생성, 수정, 삭제 기능.
- 참여자 그룹 관리 및 챌린지 진행 상태 추적.
- **챌린지 규칙**:
    - 시작 후 수정 불가(악용 방지).
    - 성공/실패 여부는 AI 또는 사용자 투표로 판정.

### 인증 및 AI 판정

- 사진 인증 시스템.
- AI 기반 판정 및 사용자 신고 시스템으로 악용 보완.
- 정확도 낮은 판정은 관리자가 개입하여 최종 결정.

### 보상 및 기부

- 참여 시, 일정 금액 지정하여 납부.
- 성공 시, 원금+보상 지급.
- 실패 시, 참여율에 따라 납부금 반환.

### SNS 및 알림 서비스

- 챌린지 성공 사례 공유 기능.
- 진행 상황 알림 및 참여 독려 알림.

---

## 💡 주요 기술

### **Spring Batch**  
- 챌린지 자동 생성 기능
- **트랜잭션 관리:** 에러 발생 시 롤백 처리  
- **메모리 관리:** 대용량 데이터를 나누어 처리  
- **스케줄러:** 효율적인 관리 제공  

### **ResNet-50 (AI 모델)**  
- 인증샷 신고 검수 기능으로 관리자 편의 향상
- 불량 인증샷의 이미지 데이터 처리 및 검증 자동화

### **Firebase Cloud Messaging (FCM)**  
- 챌린지 시작 및 종료 알림 기능  
- **Redis를 이용한 기기별 토큰 관리**
---

## 🛠️ 기술 스택
### 협업 도구

| 도구           | 설명                   |
|----------------|------------------------|
| Jira           | 이슈 및 일정 관리              |
| GitLab         | 형상 관리              |
| Notion         | 문서화           |

### Backend

| 도구                   | 버전                      |
|----------------------|-------------------------|
| Java                 | openjdk version 17.0.2  |
| Spring Boot          | 3.3.3                   |
| Spring Batch         | 5.1.2                   |
| JPA                  | 2.6.7                   | 
| Python               | 3.9.18                  |
| MySQL                | 9.0.1                   |
| JWT (JSON Web Token) | 0.12.3                  |
| Redis                | 7.4.0                   |
| Lombok               | 1.18.24                 |  
| FCM                  | Firebase Cloud Messaging LTS | 

### Server

| 도구     | 사양                                       |
|----------|------------------------------------------|
| AWS EC2  | CPU: Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz |
| RAM      | 15GB                                     |
| OS       | Ubuntu                                   |

### Frontend

| 도구           | 버전       |
|----------------|------------|
| Node.js        | 18.13.0   |
| React          | 18.2.0    |
| Redux          | 8.0.5     |
| Axios          | 1.3.6     |
| ApexCharts     | 3.39.0    |
| ECharts        | 5.4.2     |
| Jwt-decode     | 3.1.2     |
| NPM            | 9.5.0     | 

### Service

| 도구    | 버전       |
|---------|------------|
| NginX   | 1.18.0    |
| Jenkins  | 2.462.2   |
| Docker   | 27.2.1    |
| Ubuntu   | 20.04.6 LTS |

---
## 📊 시스템 아키텍처
![image](https://github.com/user-attachments/assets/97de39ce-d0c0-4d84-9089-ea065e5c514e)

## 📈 ERD
![image](https://github.com/user-attachments/assets/e0e959ba-dc51-4b93-b125-59713d7d2d0f)

## 📂 프로젝트 구조

### 백엔드 프로젝트 구조
```
├── backend
│   ├── gradle
│   └── src
│       ├── main
│       │   ├── java
│       │   │   └── com.a101.ecofarming
│       │   │               ├── 🗂️ balanceGame
│       │   │               │   ├── entity
│       │   │               │   └── repository
│       │   │               ├── 🗂️ challenge
│       │   │               │   ├── batch
│       │   │               │   │   ├── config
│       │   │               │   │   ├── scheduler
│       │   │               │   │   └── tasklet
│       │   │               │   ├── controller
│       │   │               │   ├── dto
│       │   │               │   │   └── response
│       │   │               │   ├── entity
│       │   │               │   ├── repository
│       │   │               │   └── service
│       │   │               ├── 🗂️ challengeCategory
│       │   │               │   ├── entity
│       │   │               │   ├── repository
│       │   │               │   └── service
│       │   │               ├── 🗂️ challengeUser
│       │   │               │   ├── batch
│       │   │               │   │   ├── config
│       │   │               │   │   ├── processor
│       │   │               │   │   ├── reader
│       │   │               │   │   ├── scheduler
│       │   │               │   │   └── writer
│       │   │               │   ├── controller
│       │   │               │   ├── dao
│       │   │               │   ├── dto
│       │   │               │   │   └── response
│       │   │               │   ├── entity
│       │   │               │   ├── repository
│       │   │               │   └── service
│       │   │               ├── 🗂️ complaint
│       │   │               │   ├── controller
│       │   │               │   ├── dto
│       │   │               │   ├── entity
│       │   │               │   ├── repository
│       │   │               │   └── service
│       │   │               ├── 🗂️ global
│       │   │               │   ├── config
│       │   │               │   ├── entity
│       │   │               │   ├── exception
│       │   │               │   ├── notification
│       │   │               │   │   └── mattermost
│       │   │               │   │   └── fcm
│       │   │               │   └── security
│       │   │               │       ├── Controller
│       │   │               │       ├── config
│       │   │               │       ├── dto
│       │   │               │       ├── filter
│       │   │               │       ├── repository
│       │   │               │       ├── service
│       │   │               │       └── util
│       │   │               ├── 🗂️ proof
│       │   │               │   ├── controller
│       │   │               │   ├── dto
│       │   │               │   │   ├── request
│       │   │               │   │   └── response
│       │   │               │   ├── entity
│       │   │               │   ├── repository
│       │   │               │   └── service
│       │   │               └── 🗂️ user
│       │   │                   ├── controller
│       │   │                   ├── dto
│       │   │                   │   ├── request
│       │   │                   │   └── response
│       │   │                   ├── entity
│       │   │                   ├── repository
│       │   │                   └── service
│       │   └── resources
```

### 프론트엔드 프로젝트 구조 
```
├── frontend
│   ├── public
│   │   └── icons
│   └── src
│       ├── assets
│       │   └── images
│       ├── components
│       └── services
```

---
## 📹 시연 영상 및 자료

- **시연 영상:** [YouTube 링크](https://www.youtube.com/watch?v=ngiXBbhoRrc)  
- **발표 자료:** [MiriCanvas 링크](https://www.miricanvas.com/v/13qpik5)  
- **배포 링크:** https://ecofarming.lol
