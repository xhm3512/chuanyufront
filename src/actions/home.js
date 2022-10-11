import { setStorage } from '@tarojs/taro';
import { url } from '@/constants/utils'
import { UESRINFO, TASKLISTS, TASKTYPES, SENDTYPES } from '@/constants';
import { request } from '@/utils/request';
import { getDistanceSpecifiedTime } from '@/utils/tools';

// 获取用户登录code
export const getUserLoginCodeAction = (code) => {
  // 携带code，获取登录凭证，存入storage
  request({
    method: 'GET',
    url: `${url}/user/getOpenId/${code}`
  }, (res) => {
    setStorage({
      key: "Cookies",
      data: res.data
    })
  })
};
// 校验用户是否存在，存在过就能获取获取用户信息
export const getUserInfoAction = (dispatch) => {
  request({
    method: 'GET',
    url: `${url}/user`
  }, (res) => {
    const data = res.data || {}
    dispatch({
      type: UESRINFO,
      data
    });
  })
};
// 新增用户
export const addUserInfoAction = (dispatch, params) => {
  request({
    method: 'POST',
    url: `${url}/user`,
    data: params,
  }, (res) => {
    dispatch({
      type: UESRINFO,
      data: params
    });
  })
};
// 修改用户信息
export const modifyUserInfo = (params,callback) => {
  request({
    method: 'PUT',
    url: `${url}/user`,
    data: params,
  }, (res) => {
    callback && callback(res)
  })
};

//获取任务类型列表
export const getTaskTypeAction = (dispatch) => {
  request({
    method: 'GET',
    url: `${url}/task/types`
  }, (res) => {
    const data = res?.data || {}
    const tempData = [];
    data?.forEach(item => {
      const tempItem = { ...item };
      tempItem.checked = false;
      tempData.push(tempItem)
    })
    dispatch({
      type: TASKTYPES,
      data: tempData
    });
  })
}


//获取事件列表
export const getTaskListAction = (dispatch, callback) => {
  request({
    method: 'GET',
    url: `${url}/task/list/1/1000`
  }, (res) => {
    const data = res?.data || {};
    const tempData = JSON.parse(JSON.stringify(data))
    const currentYear = (new Date()).getFullYear();
    tempData?.list?.forEach(item => {
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
    tempData?.list?.sort((a, b) => a.distanceDay - b.distanceDay)
    dispatch({
      type: TASKLISTS,
      data: tempData
    });
    callback && callback()
  })
}

//获取通知发送类型
export const getSengTypesAction = (dispatch, callback) => {
  request({
    method: 'GET',
    url: `${url}/task/send/types`
  }, (res) => {
    const data = res?.data || []
    dispatch({
      type: SENDTYPES,
      data
    });
    callback && callback()
  })
}
