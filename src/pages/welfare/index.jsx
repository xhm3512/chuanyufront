
import { View, Image, Button } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import { navigateTo } from '@tarojs/taro';
import { surl } from '@/constants';
import './index.scss'

const arr = [
  {
    id: 1,
    title: '4小时日常保洁',
    picUrl: surl,
    describe: 'ww',
    price:238
  },
  {
    id: 2,
    title: '4小时深度保洁',
    picUrl: surl,
    price:358,
    describe: '适用范围：出租屋回收、长期闲置房入住、搬家入住等',
  },
  {
    id: 11,
    title: '4小时日常保洁',
    picUrl: surl,
    describe: 'ww',
    price:238
  },
  {
    id: 22,
    title: '4小时深度保洁',
    picUrl: surl,
    price:358,
    describe: '适用范围：出租屋回收、长期闲置房入住、搬家入住等',
  },
]
const onClick = (id) => {
  navigateTo({
    url: `/packA/pages/itemDetail/index?id=${id}`
  })
}
export default () => {
  return <View className='welfare-box'>
    <View className='title flex-justify-center'>新客限时特惠</View>
    <View className='content flex-justify-row'>
      {
        arr.map(item => <View className='item' key={item.id}  onClick={()=>onClick(item.id)}>
          <View>
            <Image className='img' src={item.picUrl} />
          </View>
          <View className='flex-justify-row detail'>
            <View className='price'>¥{item.price}</View>
            <View><AtTag circle size='small' active type='primary'>去预约</AtTag></View>
          </View>
        </View>)
      }
    </View>
  </View>
}