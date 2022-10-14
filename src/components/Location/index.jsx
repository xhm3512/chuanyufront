import { useEffect } from "react";
import { View, Image } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import { getUserLocationAction } from '@/actions/home'

export default ({ local }) => {
  const dispatch = useDispatch()
  const { homeData } = useSelector(state => state);
  const { locationData } = homeData;
  useEffect(() => {
    getUserLocationAction(dispatch)
  }, [])
  return <View>{locationData} {local || '请输入服务地址'}</View>
}