import { navigateTo } from '@tarojs/taro';
import {  AtListItem } from 'taro-ui'

export default ({ info }) => {
  const { id, title, thumb } = info;
  const onClick = () => {
    navigateTo({
      url: `/packA/pages/appointmentDetail/index?id=${id}`,
    });
  }
  return <AtListItem
    key={id}
    title={title}
    arrow='right'
    thumb={thumb}
    onClick={onClick}
  />
}