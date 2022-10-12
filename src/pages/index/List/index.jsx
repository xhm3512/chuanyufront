import { View } from '@tarojs/components';
import { surl } from '../../../constants';
import ListItem from './listItem'
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
]
export default () => {
  return <View>
    {
      arr.map(item => <ListItem key={item.id} itemInfo={item} />)
    }
  </View>
}