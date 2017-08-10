/**
 * axios API
 */
import axios, { _axios } from 'utils/axios'


/**
 * 获取照片墙;
 * @param {any} id
 * @returns
 */
function getPhotos(id = 31, page) {
    return axios({
        url:  'http://cnpcportal.sinoapps.cn/Service_Meeting_MeetingInfo/GetPhotoListPage',
        method: 'get',
        params: {
            id,
            pageIndex: page,
            pageSize: 10,
            orderBy: 'CreateTime',
            sort: true
        }
    })
}

export {
  getPhotos
}
