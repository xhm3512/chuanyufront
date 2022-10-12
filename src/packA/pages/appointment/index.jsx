import { useState } from 'react'
import { View } from '@tarojs/components'
import { AtTabBar, AtList } from 'taro-ui'
import { surl } from '@/constants';
import ListItem from './listItem';
import './index.scss'

const arr = [
  {
    id: 1,
    title: '全部',
    thumb: surl,
    note: '描述信息'
  },
  {
    id: 2,
    title: '待服务',
    thumb: surl,
    note: '描述信息'
  },
  {
    id: 3,
    title: '已完成',
    thumb: surl,
    note: '描述信息'
  },
  {
    id: 4,
    title: '未使用',
    thumb: surl,
    note: '描述信息'
  },
]

export default () => {
  const [current, setCurrent] = useState(0)

  const handleClick = (value) => {
    setCurrent(value)
  }

  const tabList = [{ title: '全部' }, { title: '待服务', dot: true }, { title: '已完成' }, { title: '未使用', text: 8, dot: true }]
  return (
    <View className='appointment-box'>
      <AtTabBar
        className='tabbar'
        tabList={tabList}
        onClick={handleClick}
        current={current}
      />
      <View className='content'>
        <AtList>
          {
            arr.map(item => <ListItem key={item.id} info={item} />)
          }
        </AtList>
      </View>
    </View>
  )
}