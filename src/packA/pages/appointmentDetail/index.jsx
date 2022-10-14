import { getCurrentInstance } from '@tarojs/taro';
import { View } from '@tarojs/components'

export default () => {
  const { id } = getCurrentInstance().router.params;
  return <View>{id}
    <div>添加地址</div>
  </View>
}