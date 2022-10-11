import { url } from '@/constants/utils'
import { request } from '../utils/request';
// 删除任务
export const deleteTaskOprate = (id,callback) => {
  request({
    method: 'DELETE',
    url: `${url}/task/${id}`,
  }, (res) => {
    callback(res)
  })
}

//查看任务
export const seeTaskEvent = (id,callBack) => {
  request({
    method: 'GET',
    url: `${url}/task/${id}`,
  }, (res) => {
    callBack && callBack(res?.data)
  })
}