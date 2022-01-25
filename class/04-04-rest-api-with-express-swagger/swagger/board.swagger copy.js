/**
 * @swagger
 * /user:
 *  post:
 *      summary: 유저 추가하기
 *      tags: [User]
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
 *                              email:
 *                                  type: string
 *                                  required: true
 *                                  example : ala@gmail.com
 *      responses:
 *          '200':
 *                  description: user의 _id 리턴
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: string
 *                            example: 61ee1b7272a81036fc429a05
 */

