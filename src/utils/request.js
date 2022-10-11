// import { request as requestTaro, getStorageSync }  from '@tarojs/taro';
import  { getStorageSync,request as requestTaro, } from '@tarojs/taro'
// 微信小程序云托管平台调用
export const request = async ({ url, data, method = 'POST' }, successFunc, errFunc) => {
  try {
    var c1 = new wx.cloud.Cloud({
      resourceEnv: 'prod-9gwmebk88bbc8c00'
    })
    c1.init()
    const cookie = getStorageSync('Cookies')
    const r = await c1.callContainer({
      path: url, // 填入业务自定义路径
      header: {
        'Cookie': cookie,
        'X-WX-SERVICE': 'springboot-4p6l', // 填入服务名称
      },
      // 其余参数同 wx.request
      method: method,
      data,
    })
    successFunc(r?.data)
  } catch (error) {
    errFunc && errFunc()
  }
  
}


const requestParams = (successFunc, errFunc) => {
  const cookie = getStorageSync('Cookies')
  return {
    credentials: 'include',
    header: {
      'Cookie': cookie,
      'content-type': 'application/json'
    },
    success: function (res) {
      successFunc(res.data)
    },
    fail: (er) => {
      console.log(er);
      errFunc && errFunc(null, er)
    }
  }
}
export const requestCom = ({ url, data, method = 'POST' }, successFunc, errFunc) => {
  const tempParams = requestParams(successFunc, errFunc)
  requestTaro({
    url: `${url}`, //仅为示例，并非真实的接口地址
    data,
    method,
    ...tempParams
  });
}

// export const requestReadFile = ({ url, data, method = 'POST' }, successFunc) => {
//   const tempParams = requestParams(successFunc)
//   requestTaro({
//     url, //仅为示例，并非真实的接口地址
//     data,
//     method,
//     ...tempParams
//   });
// }