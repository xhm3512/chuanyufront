import { url } from '@/constants/utils'
import { request } from '@/utils/request';

//校验数据库是否存在
export const checkCalendar = (yearmonth,callBack) => {
  request({
    method: 'GET',
    url: `${url}/calendar/check/exist/${yearmonth}`,
  }, (res) => {
    callBack && callBack(res)
  })
}

//提交日历数据
export const submitCalendarData = (yearmonth,callBack) => {
  request({
    method: 'GET',
    url: `${url}/calendar//${yearmonth}`,
  }, (res) => {
    callBack && callBack(res)
  })
}