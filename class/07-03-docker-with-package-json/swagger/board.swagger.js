/**
 * @openapi
 * /boards:
 *   get:
 *     summary : 게시글 가져오기
 *     tags: [Board]
 *     parameters:
 *          -  in: query
 *             name: number
 *             type: int
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *              application/json: 
 *                  schema:
 *                      type: object
 *                      properties:
 *                          number:
 *                              type: int
 *                              example: 1
 *                          writer:
 *                              type: string
 *                              example: 철수
 *                          title:
 *                              type: string
 *                              example: 제목입니다
 *                          contents:
 *                              type: string
 *                              example: 내용입니다
 */

/**
 * @openapi
 * /boards:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
