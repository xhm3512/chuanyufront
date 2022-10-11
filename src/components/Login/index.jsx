import  { useEffect, useState } from "react";
import { View, Text } from '@tarojs/components'
import { AtButton } from "taro-ui";

export default ({ btnString = '登录', successCallback }) => {
  const [hasUserInfo, setHasUserInfo] = useState(false)
  const [canIUseGetUserProfile, setCanIUseGetUserProfile] = useState(false)
  useEffect(() => {
    if (wx.getUserProfile) {
      setCanIUseGetUserProfile(true)
    }
  }, [])
 
  // eslint-disable-next-line no-unused-vars
  const getUserProfile = (e) => {
    wx.getUserProfile({ //获取用户信息
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        setHasUserInfo(true)
        successCallback && successCallback(res.userInfo)
      }
    })
  }
  // eslint-disable-next-line no-unused-vars
  const getUserInfo = (e) => {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    setHasUserInfo(true)
  }
  return <View className='userinfo'>
    {
      hasUserInfo
        ? <View> </View>
        : <View className='login-button'>
          <View className='login-box'>
            {
              canIUseGetUserProfile
                // ? <button bindtap='getUserProfile'> 获取头像昵称 </button>
                ? <AtButton className='button-none' openType='getUserInfo' type='primary' full={false} size='small' onClick={getUserProfile}> {btnString} </AtButton>
                : <AtButton className=' button-none' openType='getUserInfo' type='primary' size='small' onClick={getUserInfo}> {btnString} </AtButton>
              // : <button open-type='getUserInfo' bindgetuserinfo='getUserInfo'> 获取头像昵称 </button>
            }
          </View>
        </View>
    }
  </View>
}