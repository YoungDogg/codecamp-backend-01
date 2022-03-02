FROM node:14 
# m1 때문에 이거 추가함

WORKDIR /my_backend/
COPY ./package.json /my_backend/
COPY ./yarn.lock /my_backend/ 
RUN yarn install 
 
COPY . /my_backend/ 
CMD yarn start:dev

