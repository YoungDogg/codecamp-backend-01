# docker 확인은 powershell 에서 된다. ( 그 외에는 cmd가 된다...)


# WORKDIR /myfolder/ (. (내 파일들을 ) //myfolder/(독허컴퓨터 안에) 이 파일 만들어주고 시작하게 해줘
# COPY . /myfolder/    (. (내 파일들을 ) //myfolder/(독허컴퓨터 안에) 복사해줘

# CMD node index.js 

# 명령어
# 독허 실행기 : docker build .    // 점 꼭 찍어야 된다.
# 독허 이미지 보기 : docker images
# 독허 실행하기 :  docker run e9b280be4c3d(IMAGE ID)
# 독허 종료됐는지 확인 : docker ps 또는 docker ps -a (모두 보여줘)
# 독허 삭제 : docker rm (container ID)
# 독허 이미지 삭제 :  docker rmi (IMAGE ID)

FROM node:16

WORKDIR /myfolder/
COPY . /myfolder/

CMD node index.js