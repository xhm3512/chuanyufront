import { useEffect, useState } from "react";
import { View, Image, Button } from '@tarojs/components'
import { useSelector } from 'react-redux';
import { navigateTo, useShareAppMessage } from '@tarojs/taro';
import svgs from '@/constants/svg'
import { surl } from '@/constants';
import { pageIndexShare } from '@/constants/share'
import './index.scss'


export default () => {
  const { homeData } = useSelector(state => state);
  const { userInfoData } = homeData;
  const { avatarUrl } = userInfoData || {};
  // 当前页面右上角分享到个人和按钮事件设置
  useShareAppMessage(res => {
    if (res.from === 'button') {
      return pageIndexShare()
    }
    // 当前页面右上角分享到朋友圈设置
    return pageIndexShare()
  })
  const onUserEditClick = () => {
    navigateTo({
      url: '/packA/pages/appointment/index',
    });
  }
 
  useEffect(() => {
    wx.login({
      success(res) {
        console.log(2222, res);

      }
    })
  }, [])
  return <View className='my-box'>
    <View className='user-list-item flex-justify-row'>
      <View className='user-item'>
        <Image className='avatar' src={surl} /> 瓶子里的时光
      </View>
      <View>设置</View>
    </View>
    
    <View className='my-list-item flex-justify-row' onClick={onUserEditClick}>
      <View className='flex-item demo-text-1'>我的预约</View>
      <View className='flex-item demo-text-1'>
        <Image className='more-img' src={svgs.moreUrl} />
      </View>
    </View>
    <button className='my-list-item flex-justify-row button-none' open-type='contact'>
      <View className='flex-item demo-text-1'>联系客服</View>
      <View className='flex-item demo-text-1'>
        <Image className='more-img' src={svgs.moreUrl} />
      </View>
    </button>
    <Button className='my-list-item flex-justify-row button-none' openType='share' id='1'>
      <View className='flex-item demo-text-1'>推荐给朋友</View>
      <View className='flex-item demo-text-1'>
        <Image className='more-img' src={svgs.moreUrl} />
      </View>
    </Button>
  </View>
}