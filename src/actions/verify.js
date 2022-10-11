import { url } from '@/constants/utils'
import { request } from '../utils/request';

//获得验证码
export const getVerifyImg = (callBack) => {
  request({
    method: 'GET',
    url: `${url}/verify/code`,
  }, (res) => {
    callBack && callBack(res.data)
  })
}
// 发送邮箱验证信息
export const verifyEmailCode = (data,callBack) => {
  request({
    method: 'POST',
    url: `${url}/verify/send/email`,
    data
  }, (res) => {
    callBack && callBack(res)
  })
}