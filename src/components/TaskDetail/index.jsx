import { useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import detailSvgs from '@/constants/svg/detail'
import { getDistanceSpecifiedTime } from '@/utils/tools';
import { backUrl } from '@/constants/backUrl'
import OprateItem from './OprateItem'
import './index.scss'

export default ({ currentItem, isShowShareBtn = true, onHandleClick, isPoster }) => {
  const tempData = currentItem?.[0]
  const { taskName, showDate, taskType } = tempData || {}
  useEffect(() => {
    onHandleClick([tempData?.id])
  }, [])
  const currentYear = tempData.needYear ? tempData.year : (new Date()).getFullYear();
  const distanceDay = getDistanceSpecifiedTime(currentYear, tempData.month, tempData.day)
  return <View className='task-detail-one-box'>
    <View className='mask'></View>
    <Image className='back' src={backUrl[taskType.code] || backUrl.default}></Image>
    <View className='space'></View>
    <View className='item-box-wrap'>
      <View className='item item-title'>{taskName || ''}</View>
      {
        distanceDay == 0 ? <View className='item'>
          <View>就是</View>
          <Text className='item-time'>今天</Text>
        </View>
          : <view className='item'>还有<Text className='item-time'>{distanceDay}</Text>天</view>
      }

      <View className='item'>{showDate}</View>
    </View>
    <View className='item-oprate flex-justify-row'>
      {
        taskType.code==='BIRTHDAY' ?
        <OprateItem
          url={detailSvgs.unscrambleUrl}
          text='星座解读'
          type='unscramble'
          data={tempData}
        /> : <View></View>
      }
      {
        isShowShareBtn && <View className='flex-justify-center'>
          {
            isPoster && <OprateItem
              url={detailSvgs.downloadUrl}
              text='生成海报'
              type='poster'
              data={tempData}
            />
          }
          <OprateItem
            url={detailSvgs.forwardshareUrl}
            text='转发'
            type='share'
            data={tempData}
          />
          <OprateItem
            url={detailSvgs.morethreeUrl}
            text='更多'
            type='more'
            data={tempData}
          />
        </View>
      }
    </View>
  </View>
}