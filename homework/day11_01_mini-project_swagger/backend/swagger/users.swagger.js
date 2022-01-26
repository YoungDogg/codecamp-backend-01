/**
 * @openapi
 * /users:
 *   get:
 *     summary : 회원정보 가져오기
 *     tags: [Users]
 *     description: 모든 회원의 회원정보를 불러온다. 회원정보는 이름, 이메일, 주민번호, 휴대폰, 자주가는사이트, 비밀번호이다.
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: 홍길동
 *                          email:
 *                              type: string
 *                              example: osmf12@naver.com
 *                          personal:
 *                              type: string
 *                              example: 031123-*******
 *                          phone:
 *                              type: string
 *                              example: 01074870847
 *                          favoriteSite:
 *                              type: string
 *                              example: http://www.netflix.com
 *                          password:
 *                              type: string
 *                              example: password1234
 */

/**
 * @swagger
 * /users:
 *  post:
 *      summary: 회원정보  추가하기
 *      tags: [Users]
 *      requestBody:
 *               required: true
 *               content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  required: true
 *                                  example: 홍길동
 *                              email:
 *                                  type: string
 *                                  required: true
 *                                  example : osmf12@naver.com
 *                              personal:
 *                                  type: string
 *                                  required: true
 *                                  example : 031123-*******
 *                              phone:
 *                                  type: string
 *                                  required: true
 *                                  example : 01074870847
 *                              favoriteSite:
 *                                  type: string
 *                                  required: true
 *                                  example : http://www.netflix.com
 *                              password:
 *                                  type: string
 *                                  required: true
 *                                  example : password1234
 *      responses:
 *          '200':
 *                  description: user의 _id 리턴
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: string
 *                            example: 61ee1b7272a81036fc429a05
 *
 */
