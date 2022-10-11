import { url } from '@/constants/utils'
import { getDistanceSpecifiedTime } from '@/utils/tools';
import { request } from '../utils/request';

//获得指定ids的事件详情
export const getIdsTaskList = (param, callback) => {
  request({
    method: 'POST',
    data:param,
    url: `${url}/task/ids`
  }, (res) => {
    const data = res?.data || []
    const tempData = JSON.parse(JSON.stringify(data))
    const currentYear = (new Date()).getFullYear();
    tempData?.forEach(item => {
      const { year, month, day, taskType, taskCalendarType } = item
      if (taskType.needYear) {//'2019/02/02 02:02:00'
        item.distanceDay = getDistanceSpecifiedTime(year, month, day)
      } else {
        if (taskCalendarType.code == 2) {//阴历
          item.distanceDay = getDistanceSpecifiedTime(currentYear, month, day)
        } else {//农历
          item.distanceDay = getDistanceSpecifiedTime(currentYear, month, day)
        }
      }
    })
    tempData?.sort((a, b) => a.distanceDay - b.distanceDay)
    callback && callback(tempData)
  })
}