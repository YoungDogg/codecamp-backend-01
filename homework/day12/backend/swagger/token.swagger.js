/**
 * @swagger
 * /token:
 *  get:
 *      summary: 토큰 가져오기
 *      tags: [Token]
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
 * /token:
 *  post:
 *      summary: 토큰 추가하기
 *      tags: [Token]
 *      requestBody:
 *               required: true
 *               content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *                                  required: true
 *                                  example: 111222
 *                              phone:
 *                                  type: string
 *                                  required: true
 *                                  example : 01011112222
 *                              isAuth:
 *                                  type: string
 *                                  required: false
 *                                  example : false 
 *      responses:
 *          '200':
 *                  description: 트루 리턴
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: boolean
 *                            example: true
 */

/**
 * @swagger
 * /token:
 *  patch:
 *      summary: 토큰 수정하기
 *      tags: [Token]
 *      requestBody:
 *               required: true
 *               content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *                                  required: true
 *                                  example: 111222
 *                              phone:
 *                                  type: string
 *                                  required: true
 *                                  example : 01011112222
 *      responses:
 *          '200':
 *                  description: user의 _id 리턴
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: string
 *                            example: 61ee1b7272a81036fc429a05
 */