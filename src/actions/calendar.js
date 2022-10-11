import { url } from '@/constants/utils'
import { request } from '../utils/request';

//提交日历数据
export const submitCalendar = (params, yearmonth, callBack) => {
  request({
    method: 'POST',
    data: params,
    url: `${url}/calendar/${yearmonth}`,
  }, (res) => {
    callBack && callBack(res)
  })
}
const isOneString = (str) => {
  return `${str}`.length > 1 ? str : `0${str}`
}
//获取某月任务
export const currentTaskList = (yearmonth, callBack) => {
  request({
    method: 'GET',
    url: `${url}/task/list/${yearmonth}`,
  }, (res) => {
    const data = res?.data || [];
    const tempData = []
    if (data?.length > 0) {
      const otherColor = {
        other: '生日', otherColor: '#FFB085',badgeColor: '#97DBAE'
      }
      data?.forEach(element => {
        const { yangLiYear, yangLiMonth, yangLiDay, taskIds } = element;
        tempData.push({
          ...otherColor,
          taskIds,
          date: `${yangLiYear}-${isOneString(yangLiMonth)}-${isOneString(yangLiDay)}`
        })
      });
    }
    callBack(tempData) ;
  })
}


