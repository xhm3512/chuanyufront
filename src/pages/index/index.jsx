import { useState } from "react";
import { switchTab } from '@tarojs/taro';
import { AtCurtain } from 'taro-ui'
import { View, Image } from '@tarojs/components';
import Location from '@/components/Location';
import { surl } from '@/constants';
import Swiper from './Swiper';
import List from './List';

import './index.scss'
// import QQMapWX from '@/libs//qqmap-wx-jssdk.min.js'

export default () => {
  const [show, setShow] = useState(true);

  const onClose = () => {
    setShow(false)
  }
  const onClick = () => {
    setShow(false)
    switchTab({
      url: '/pages/welfare/index',
    });
  }
  return <View className='index-swiper-box'>
    <View className='my-titile'>川渝阿姨保洁</View>
    <Location />
    <Swiper />
    <List />
    <AtCurtain
      isOpened={show}
      onClose={onClose}
    >
      <Image
        style='width:100%;height:250px'
        src={surl}
        onClick={onClick}
      />
    </AtCurtain>
  </View>
}