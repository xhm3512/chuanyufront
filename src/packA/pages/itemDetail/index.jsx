import { useState } from 'react';
import { View, Button } from '@tarojs/components';
import { getCurrentInstance, navigateTo } from '@tarojs/taro';
import Login from '@/components/Login'
import { surl } from '@/constants';
import Swiper from './Swiper'
import './index.scss'

export default () => {
  const [name, setName] = useState('')
  const { id } = getCurrentInstance().router.params;
  const { title, price, describe } = {
    id: 1,
    title: '4小时日常保洁',
    picUrl: surl,
    describe: 'ww',
    price: 238
  }
  console.log(2434, id);
  const successCallback = (info) => {
    setName(info.nickName)
    console.log(222, info);
  }
  const onClick = () => {
    navigateTo({
      url: `/pages/addAddress/index?id=${id}`,
    });
  }
  return <View className='item-detail-box'>
    <Swiper />
    <View>{price}</View>
    <View>{title}-{describe}</View>
    <View>用户评价</View>
    <View className='detail'>商品介绍</View>
    <View className='fix'>
      {name ? <Button onClick={onClick}>立即预约</Button>
        :
        <Login successCallback={successCallback}>
          <Button>立即预约</Button>
        </Login>
      }
    </View>
  </View>
}