FROM node:16

WORKDIR /myfolder/
# 이거 추가, 패키지에 뭐 추가했을 때
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
# 얀 설치, 꽤나 무겁다.
RUN yarn install 

# 소스코드만 바뀌었을 때
COPY . /myfolder/
#이게 있어야 빌드(포장)이 끝난다.
CMD yarn dev

