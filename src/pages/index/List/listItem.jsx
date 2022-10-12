import { View, Image, Button } from '@tarojs/components';
import { AtTag } from 'taro-ui'
import { navigateTo } from '@tarojs/taro';

export default ({ itemInfo }) => {
  const { title, picUrl, describe, price, id } = itemInfo;

  const onClick = () => {
    navigateTo({
      url: `/packA/pages/itemDetail/index?id=${id}`
    })
  }
  return <View className='item-list-box' onClick={onClick}>
    <View className='flex-justify-row-left'>
      <Image className='img' src={picUrl} />
      <View>
        <Image className='img' src={picUrl} />
        <Image className='img' src={picUrl} />
      </View>
    </View>
    <View className='right flex-justify-row'>
      <View>
        <View className='title'>
          <AtTag circle size='small' active type='primary' >自营</AtTag>
          {title}</View>
        <View className='describe'>{describe}</View>
        <View>{price}</View>
      </View>
      <View>
        <Button className='button' type='primary'>立即预约</Button>
      </View>
    </View>
  </View>
}
