import { useEffect } from "react";
import { View } from '@tarojs/components'

export default ({ successCallback, children }) => {

  // eslint-disable-next-line no-unused-vars
  const getUserProfile = (e) => {
    wx.getUserProfile({ //获取用户信息
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        successCallback && successCallback(res.userInfo)
      }
    })
  }

  return <View className='userinfo' onClick={getUserProfile}>
    {children}
  </View>
}