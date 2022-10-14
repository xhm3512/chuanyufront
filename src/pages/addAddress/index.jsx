import { useState } from 'react'
import { View, Text, Button } from '@tarojs/components';
import classNames from 'classnames';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { AtForm, AtSwitch, AtFloatLayout } from "taro-ui"
import SwiperWeek from "taro-swiper-week";
import Location from '@/components/Location'
import { editorinitData } from '@/utils/tools'
import { oppointmentTimeList } from '@/constants'
import './index.scss'

export default () => {
  const { id } = getCurrentInstance().router?.params || {};
  const { dateStr } = editorinitData;
  const [day, setDay] = useState(dateStr);
  const [local, setLocal] = useState({})
  const [open, setopen] = useState(false)
  const [active, setActive] = useState(4)
  const { cityName = '', countyName = '', detailInfo = '', telNumber = '', userName = '' } = local;
  console.log(333, id);
  const onClick = () => {
    // navigateTo({
    //   url: `/pages/location/index?id=${id}`,
    // });
    Taro.chooseAddress({
      success: function (res) {
        setLocal(res)
      },
      fail: () => {
        console.log(33);
      },
      complete: () => {
        console.log(3322);
      }
    })
  }
  const handleClose = () => {
    setopen(false)
  }
  const onOppointmentClick = () => {
    setopen(true)
  }
  const onChange = val => {
    setDay(val);
  };
  const onTimeClick = (index) => {
    setActive(index)
  }
  return <>
    <View className='add-address-box'>
      <View>{id}</View>
      <View onClick={onClick}>
        <Location local={`${cityName}${countyName}${detailInfo}`} />
        <View>{userName}{telNumber}</View>
      </View>
      <View onClick={onOppointmentClick}>预约时期</View>
      <AtFloatLayout isOpened={open} title='这是个标题' onClose={handleClose}>
        <SwiperWeek value={day} onChange={onChange} backgroundColor='blue' />
        <View className='time flex-justify-row-left-wrap'>
          {oppointmentTimeList.map((item, i) => <Text className={
            classNames('text', { 'time-active': active === i })
          } key={item} onClick={() => onTimeClick(i)}>{item}</Text>)}
        </View>
        <View className='flex-justify-row'>
          <View>368</View>
          <View>
            <Button>确定</Button>
          </View>
        </View>
      </AtFloatLayout>
      <View>备注</View>
      <AtSwitch title='上门前电话联系' />
    </View>
    <View className='flex-justify-row bottom-fix'>
      <View>355</View>
      <View>
      <Button>确认预约</Button>
      </View>
    </View>
  </>
}