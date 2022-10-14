import { useEffect, useState } from "react";
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import { getUserLocationAction } from '@/actions/home'
import './index.scss'

export default () => {
  const dispatch = useDispatch()
  const { homeData } = useSelector(state => state);
  const { locationData } = homeData;
  useEffect(() => {
    if (!locationData) getUserLocationAction(dispatch)
    Taro.chooseAddress({
      success: function (res) {
        console.log(2332, res);
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      },
      fail: () => {
        console.log(33);
      },
      complete: () => {
        console.log(3322);
      }
    })
  }, [])

  return <View >qweqw </View>
}