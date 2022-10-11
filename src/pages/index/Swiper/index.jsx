import { Swiper, SwiperItem, Image } from '@tarojs/components';
import { surl } from '../../../constants';
import './index.scss'

export default () => {




  return <Swiper
    className='index-swiper'
    indicatorColor='#999'
    indicatorActiveColor='#333'
    circular
    indicatorDots
  >
    <SwiperItem>
      <Image className='img' src={surl} />
    </SwiperItem>
    <SwiperItem>
      <Image className='img' src={surl} />

    </SwiperItem>
    <SwiperItem>
      <Image className='img' src={surl} />
    </SwiperItem>
  </Swiper>
}