import { View, Image } from '@tarojs/components';

export default ({ itemInfo }) => {
  const { title, picUrl, describe } = itemInfo;
  return <View className='item-list-box flex-justify-row-left'>
    <Image className='img' src={picUrl} />
    <View>
      <View>{title}</View>
      <View>{describe}</View>
    </View>
  </View>
}
