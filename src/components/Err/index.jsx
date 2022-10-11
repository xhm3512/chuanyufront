
import { View, Image } from '@tarojs/components'
import './index.scss'

export default () => {
  return <View className='no-list-box'>
    <Image
      className='img'
      src='https://imagev2.xmcdn.com/storages/a500-audiofreehighqps/DE/31/GMCoOSAGKwHSAAAivgE6cQTV.png' />
    <View className='text'>暂无数据</View>
  </View>
}