import { url } from '@/constants/utils'
import { request } from '../utils/request';

//新增事件
export const addTaskEvent = (params,callBack) => {
  request({
    method: 'POST',
    url: `${url}/task`,
    data:params
  }, (res) => {
    callBack && callBack(res)
  })
}


//修改任务
export const upDateTaskEvent = (id,params,callBack) => {
  request({
    method: 'PUT',
    url: `${url}/task/${id}`,
    data:params
  }, (res) => {
    callBack && callBack(res)
  })
}