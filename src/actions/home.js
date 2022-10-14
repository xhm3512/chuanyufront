import Taro, { setStorage } from '@tarojs/taro';
import { url } from '@/constants/utils'
import { UESRINFO } from '@/constants';
import { request } from '@/utils/request';

const QQMapWX = require('../libs/qqmap-wx-jssdk1.2/qqmap-wx-jssdk');

const qqmapsdk = new QQMapWX({
  key: 'JMFBZ-FPYC5-IZXI3-Q6NIP-772LO-7VBQU'
});
// 获取当前城市
export const getUserLocationAction = (dispatch) => {
 
  Taro.getLocation({
    type: 'wgs84',
    success: function (res) {
      console.log(res);
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude,
        },
        // sig: '*************************', //签名校验，开启WebServiceAPI签名校验的必传参数
        success: function (result) {
          //获取当前地址成功
          const city = result.result.address_component.city;
          console.log(city)
          // 携带code，获取登录凭证，存入storage
          dispatch({
            type: 'location',
            data: city
          });
        },
        fail: function (error) {
          console.log(error)
        }
      })
    }
  })

};
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
export const modifyUserInfo = (params, callback) => {
  request({
    method: 'PUT',
    url: `${url}/user`,
    data: params,
  }, (res) => {
    callback && callback(res)
  })
};

