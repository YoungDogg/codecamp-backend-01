/**
 * @openapi
 * /tokens/phone:
 *   get:
 *     summary : 휴대폰번호, 토큰, 번호인증확인값 목록 가져오기
 *     tags: [Token]
 *     description: 회원가입 창에서 휴대폰 인증전송 버튼이 눌리고 휴대폰으로 전송받은 토큰과 휴대폰 번호, 그리고 토큰인증을 했는지 판단하는 isAuth(true/false)를 보여준다.
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phone:
 *                              type: string
 *                              example: 01011112222
 *                          token:
 *                              type: string
 *                              example: 000222
 */

/**
 * @swagger
 * /tokens/phone:
 *  post:
 *      summary: 토큰 추가하기, isAuth는 추가하는 것이 아니다. 기본으로 false이며 인증완료 되면 true로 바뀐다.
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
 *                  description: 트루 리턴
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: boolean
 *                            example: true
 */

/**
 * @swagger 
 * /tokens/phone:
 *  patch:
 *      summary: 토큰 폰번호 수정하기 발급한 토큰과 입력토큰이 일치하는지 확인(swagger에선 입력값이 없으니 false리턴)
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
 *                  description: 트루 리턴
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: boolean
 *                            example: true
 */
