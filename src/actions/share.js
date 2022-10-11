import { url } from '@/constants/utils'
import { request } from '../utils/request';


//新增事件
export const getShareDetail = (code, callBack) => {
  request({
    method: 'GET',
    url: `${url}/task/share/${code}`,
  }, (res) => {
    callBack && callBack(res.data)
  })
}


//保存分享任务
export const acceptTaskShare = (shareCode,callBack) => {
  request({
    method: 'POST',
    url: `${url}/task/accept/share/${shareCode}`,
  }, (res) => {
    callBack && callBack(res)
  })
}


export const shareEventList = (data,successFunc) => {
  request({
    method: 'POST',
    url: `${url}/task/share`,
    data,
  }, (res) => {
    successFunc(res) 
  })
}

