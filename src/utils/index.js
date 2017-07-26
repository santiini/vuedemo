/**
 * 业务相关的数据变量和函数;
 */
const domain = 'http://cnpcportal.sinoapps.cn';

/**
 * 返回的图片地址;
 * @param {any} url
 * @returns
 */
function getImage(url) {
    if (!url || url === '') return;
    return domain + url;
}

/**
 * mock模拟请求时，获取url中参数的方法;
 * @param {any} url
 * @returns
 */
function param2Obj(url) {
   const search = url.split('?')[1];
   if (!search) {
     return {}
   }
   return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
 }

export {
    getImage,
    param2Obj
}
