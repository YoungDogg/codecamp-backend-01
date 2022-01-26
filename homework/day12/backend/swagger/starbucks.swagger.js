/**
 * @swagger
 * /starbucks:
 *  get:
 *      summary: Starbucks 커피리스트 가져오기
 *      tags: [Starbucks]
 *      requestBody:
 *               required: false
 *               content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                               
 *      responses:
 *          '200':
 *                  description: 커피 목록 조회 
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: object
 *                            example: {name: 아메리카노, img : "http://www.starbucks.somethingImage.png"} 
 */
