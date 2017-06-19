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

export {
    getImage
}