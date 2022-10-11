
import { View, Image, Button } from '@tarojs/components'
import { useSelector } from 'react-redux';
import { navigateTo, useShareAppMessage } from '@tarojs/taro';
import svgs from '@/constants/svg'
import { pageIndexShare } from '@/constants/share'
import './index.scss'


export default () => {
  const { homeData } = useSelector(state => state);
  const { userInfoData } = homeData;
  const { avatarUrl } = userInfoData || {};
  // 当前页面右上角分享到个人和按钮事件设置
  useShareAppMessage(res => {
    if (res.from === 'button') {
      return pageIndexShare()
    }
    // 当前页面右上角分享到朋友圈设置
    return pageIndexShare()
  })
  const onUserEditClick = () => {
    navigateTo({
      url: '/packA/pages/userEdit/index',
    });
  }
  const onEmailVerifyClick = () => {
    // navigateTo({
    //   url: '/packB/pages/verify/index',
    // });
  }

  return <View>
    <View className='user-list-item flex-justify-center'>
      <View className='user-item'>
        <Image className='avatar' src={avatarUrl} />

      </View>
      <View className='user-item'>
        <Image className='edit-img' src={svgs.edit} onClick={onUserEditClick} />
      </View>
    </View>
    <View className='my-list-item flex-justify-row' onClick={onUserEditClick}>
      <View className='flex-item demo-text-1'>个人信息</View>
      <View className='flex-item demo-text-1'>
        <Image className='more-img' src={svgs.moreUrl} />
      </View>
    </View>
    <View className='my-list-item flex-justify-row' onClick={onEmailVerifyClick}>
      <View className='flex-item demo-text-1'>纪念日提醒</View>
      <View className='flex-item demo-text-1 flex-justify-row'>
        <View className='verify-text'>
          {
            userInfoData?.emailVerify ?
              '已开通，早上09:00提醒 ' : '暂未开通'
          }
        </View>
        {/* &nbsp;<Image className='more-img' src={svgs.moreUrl} /> */}
      </View>
    </View>
    <Button className='my-list-item flex-justify-row button-none' openType='share' id='1'>
      <View className='flex-item demo-text-1'>推荐给朋友</View>
      <View className='flex-item demo-text-1'>
        <Image className='more-img' src={svgs.moreUrl} />
      </View>
    </Button>
    <button className='my-list-item flex-justify-row button-none' open-type='contact'>
      <View className='flex-item demo-text-1'>联系客服</View>
      <View className='flex-item demo-text-1'>
        <Image className='more-img' src={svgs.moreUrl} />
      </View>
    </button>
    <View className='my-list-item flex-justify-row'>
      <View className='flex-item demo-text-1'>当前版本</View>
      <View className='flex-item demo-text-1'>
        v1.0.0
      </View>
    </View>

  </View>
}