import { useEffect, useState } from "react";
import Taro, { CanvasContext } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Swiper from './Swiper'
import List from './List'
import './index.scss'

export default () => {
  useEffect(() => {
    Taro.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
      }
    })
  }, [])



  return <View className='index-swiper-box'>
    <View className='my-titile'>川渝阿姨保洁</View>
    <Swiper />
    <List />
  </View>
}