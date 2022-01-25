/**
 * @swagger
 * /users:
 *  get:
 *      summary: 회원정보 가져오기
 *      tags: [Users]
 *      requestBody:
 *               required: false
 *               content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *      responses:
 *          '200':
 *                  description: true 리턴
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: boolean
 *                            example: true
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
 *                                  example: 아라
 *                              personal:
 *                                  type: string
 *                                  required: true
 *                                  example : 123456-1234567
 *                              phone:
 *                                  type: string
 *                                  required: true
 *                                  example : ala@gmail.com
 *                              favoriteSite:
 *                                  type: string
 *                                  required: true
 *                                  example : http://www.naver.com
 *                              password:
 *                                  type: string
 *                                  required: true
 *                                  example : 12345
 *                              og.title:
 *                                  type: string
 *                                  required: true
 *                                  example : 네이버입니다
 *                              og.description:
 *                                  type: string
 *                                  required: true
 *                                  example : http://www.naver.com
 *                              og.image:
 *                                  type: string
 *                                  required: true
 *                                  example : http://www.naver.com/s02309483.png
 *      responses:
 *          '200':
 *                  description: user의 _id 리턴
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: string
 *                            example: 61ee1b7272a81036fc429a05
 *          '422':
 *                  description: 핸드폰 번호 또는 토큰이 같지 않을 때 에러 발생
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: string
 *                            example: 에러!!! 핸드폰 번호가 인증되지 않았습니다. 
 * 
 */
