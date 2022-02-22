FROM node:16

WORKDIR /my_backend/
# 이거 추가, 패키지에 뭐 추가했을 때
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
# 얀 설치, 꽤나 무겁다.
RUN yarn install 

# 나머지 파일들 다 넣어주기
COPY . /my_backend/
#이게 있어야 빌드(포장)이 끝난다.
CMD yarn start:dev

