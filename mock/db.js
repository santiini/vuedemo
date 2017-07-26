/**
 * 数据源
 */
import Mock from 'mockjs';

module.exports = {
  // get请求;
    getComment: Mock.mock({
        "error": 0,
        "message": "success",
        "result|40": [{
            "author": "@name",
            "comment": "@cparagraph",
            "date": "@datetime"
        }]
    }),
    // post请求;
    addComment: Mock.mock({
      "error": 0,
      "message": "success",
      "result": []
    })
};
