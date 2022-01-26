export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: '나만의 미니프로젝트 API 명세서!!',
        version: '1.0.0',
      },
    },
    apis: ['./swagger/*'], // index.js 기준으로 찾는다
  };