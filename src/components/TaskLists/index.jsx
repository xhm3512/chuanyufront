import { useState, useEffect } from "react";
import {navigateTo,showToast} from '@tarojs/taro';
import { View, Image, Button,Text } from '@tarojs/components'
import svgsHome from '@/constants/svg/home'
import svgs from '@/constants/svg'
import './index.scss'

export default ({ list, onHandleClick, isShowShareBtn = true }) => {
  const [isShare, setIsShare] = useState(false)
  const [shardId, setShareId] = useState([])
  useEffect(() => {
    onHandleClick && onHandleClick([])
  }, [])
  const onClick = (id) => {
    if (isShare) {
      const tempShare = [...shardId];
      const index = tempShare.indexOf(id)
      if (index > -1) {
        tempShare.splice(index, 1)
      } else {
        tempShare.push(id);
      }
      setShareId(tempShare)
      onHandleClick && onHandleClick(tempShare)
      return false
    }
   navigateTo({
      url: `/packA/pages/taskDetailList/index?ids=${id}`
    })
  }
  const onButtonClick = () => {
    if (isShare) {
      if (shardId.length < 1) {
        showToast({
          title: '请选择后再分享',
          icon: 'error',
          duration: 2000
        })
        return false
      }

    } else {
      setIsShare(true)
    }
  }
  const oncancelClick = () => {
    setShareId([])
    setIsShare(!isShare)
  }
  return <View>
    {list?.map((item) => (
      <View className='task-list-item flex-justify-row' key={item.item} onClick={() => onClick(item.id)}>
        <View className='flex-justify-row'>

          <View>
            <Image className='task-type-img' src={svgsHome[item.taskType.code]} />
          </View>
          <View>
            <View className='left-item'>{item.taskName}</View>
            <View className='left-item'>{item.showDate}</View>
            {/* <View>{`${item.year}-${item.month}-${item.day}`}</View> */}
          </View>
        </View>
        {
          isShowShareBtn && (
            isShare ? <View className={shardId.indexOf(item.id) > -1 ? 'radio-click' : 'radio'}></View>
              : <View className='flex-justify-row-left'>
              {/* {item.distanceDay==0 ? '就是今天' : `还有{item.distanceDay}天`} */}
                {item.distanceDay == 0 ? <View>就是<Text className='right-text'>今天</Text></View> : <View>还有<Text className='right-text'>{item.distanceDay}</Text>天</View>}
                <Image className='more-img' src={svgs.moreUrl} />
              </View>
          )
        }
      </View>
    ))}
    {
      isShowShareBtn && <View className='fix-share-btn'>

        {
          shardId.length > 0 ? <Button
            className='fix-share-go button-none'
            openType='share'
          >共享</Button>
            : <View className='fix-share' onClick={onButtonClick}>
              共享
            </View>
        }

        {
          isShare && <View className='fix-share' onClick={oncancelClick}>
            取消
          </View>
        }
      </View>
    }
  </View>
}