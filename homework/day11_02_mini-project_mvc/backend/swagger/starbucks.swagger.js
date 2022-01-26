/**
 * @openapi
 * /starbucks:
 *   get:
 *     summary : 커피목록 가져오기
 *     tags: [Starbucks]
 *     description: 스타벅스사이트(https://www.starbucks.co.kr/menu/drink_list.do)에서 크롤링으로 10개의 이름, 이미지 데이터를 가져온 것을 보여준다.
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
 *                              example: 나이트로 바닐라 크림
 *                          img:
 *                              type: string
 *                              example: https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg 
 */