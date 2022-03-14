# 프로젝트 설명

 - 맨체스터 유나이티드 쇼핑몰의 DB 및 API 기능을 구현 한 것입니다


# 배포주소

 - youngdogg.shop (배포 예정)


# 사용 기술

 - node.js, typescript, mysql, Docker, Git, GCP 

# ERD
![MU ERD](https://user-images.githubusercontent.com/40794138/158095552-46e49b19-a9a6-4b2e-83af-35f4d5f114f5.png)


# 파이프라인
![image](https://user-images.githubusercontent.com/40794138/158095362-7cce929b-2ab9-4c1e-b5f4-188d38ef6f99.png)


# API 설계
 - 각 클래스마다
 - Create : create클래스명
 - Read :  Fetch클래스명
 - Update : update클래스명
 - Delete : delete클래스명

# 프로젝트 설치 방법 & 실행 방법
 - 프로젝트를 다운 받는다
 - 독커 실행 및 터미널에 docker-compose build 입력
 - docker-compose up 

# 폴더 구조
![00](https://user-images.githubusercontent.com/40794138/158096215-8b4b5e1c-d85f-46bb-bf4b-911ad8ee8edc.png)


# .env 설정 

GOOGLE_CLIENTID=1070270045707-499lvtikj73bap9f9svtueqrfjb4ibak.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:3000/login/google

NAVER_CLIENTID=6oFQwzJ3qXQPqTtvTiaK
NAVER_CLIENT_SECRET=crlNk57G6n
NAVER_CALLBACK_URL=http://localhost:3000/login/naver

KAKAO_CLIENTID=8c3717e31ce62caabdd2dc39d19a3bc3
KAKAO_CLIENT_SECRET=QW2u86ynT58fXwvaNzq4Wn7Jw8E6D7A8
KAKAO_CALLBACK_URL=http://localhost:3000/login/kakao

IAMPORT_API_KEY=4999111427588900
IAMPORT_SECRET=bf2bb4733a20403036b552f1f50332b4a6a1e79999bb48a79ea903b2262279c22a61c415d43fb26c

GOOGLE_KEY_FILE_NAME=gcp-file-storage.json
GOOGLE_PROJECTID=codecampproj
GOOGLE_BUCKET=codecamp_bucket

ACCESS_TOKEN_KEY=myAccessKey
REFRESH_TOKEN_KEY=myRefreshKey
 
