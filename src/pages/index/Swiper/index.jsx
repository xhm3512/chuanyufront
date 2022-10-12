import { Swiper, SwiperItem, Image } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import { surl } from '@/constants';
import './index.scss'

const arr = [
  {
    id: 1,
    picUrl: surl,
    link:`/packA/pages/itemDetail/index?id=1`
  },
  {
    id: 2,
    picUrl: surl,
    link:`/packA/pages/itemDetail/index?id=2`
  },
  {
    id: 3,
    picUrl: surl,
    link:`/packA/pages/itemDetail/index?id=3`
  },
]
export default () => {

  const onClick = (url) => {
    navigateTo({
      url
    })
}


  return <Swiper
    className='index-swiper'
    indicatorColor='#999'
    indicatorActiveColor='#333'
    circular
    indicatorDots
  >
    {arr.map(item=><SwiperItem key={item.id} onClick={()=>onClick(item.link)}>
      <Image className='img' src={item.picUrl} />
    </SwiperItem>)}
  </Swiper>
}