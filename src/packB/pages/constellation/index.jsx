import { useState, useEffect } from 'react'
import { getCurrentInstance } from '@tarojs/taro';
import { View } from '@tarojs/components'
import readArr from './constants'
import './index.scss'

export default () => {
  const {month,day} = getCurrentInstance().router.params;
  const [current,setCurrent]=useState({})
  useEffect(() => {
    readArr.forEach(item => {
      const {startMonth,startDay,endMonth,endDay}=item
      if ((month >= startMonth || month <= endMonth) && (day >= startDay || day <= endDay)) {
        setCurrent(item)
      }
    })
  },[])
  return <View className='constellation-box'>
    <View className='title'>{current.start}</View>
    <View className='content'>{current.text}</View>
  </View>

}