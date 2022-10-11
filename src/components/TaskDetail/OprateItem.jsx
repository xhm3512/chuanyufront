import { useState } from 'react';
import { navigateTo, navigateBack } from '@tarojs/taro';
import { View, Picker, Image, Button } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalAction } from "taro-ui"
import { useDispatch } from 'react-redux';
import { editTaskMore } from '@/constants/utils'
import { deleteTaskOprate } from '@/actions/detail'
import { getTaskListAction } from '@/actions/home'
import 'taro-ui/dist/style/components/modal.scss'
import Poster from './poster'
//type:more(更多),unscramble(解读),share(转发)
export default ({ url, text, type, data = {} }) => {
  const { id,month,day } = data;
  const dispatch = useDispatch()
  const [isOpened, setIsOpened] = useState(false)
  const goDetaileditor = () => {
    navigateTo({
      url: `/packA/pages/addEvent/index?id=${id}`
    })
  }
  const deleteTask = () => {
    deleteTaskOprate(id, (res) => {
      if (!res.data) alert('删除失败')
      getTaskListAction(dispatch, () => {
        navigateBack({
          url: `/pages/index/index`
        })
      })
    })
  }
  const onChangeOprate = (e) => {
    const current = editTaskMore[e.detail.value]
    switch (current.type) {
      case 'editor':
        goDetaileditor()
        break;
      case 'delete':
        setIsOpened(true)
        break;
      case 'cancel':
        break;
      default:
        break;
    }
  }
  const ItemDetail = () => {
    return <View
      className='flex-justify-center'
      onClick={() => {
        if (type !== 'unscramble') return false;
        navigateTo({
          url: `/packB/pages/constellation/index?month=${month}&day=${day}`
        })
      }}
    >
      <Image className='img' src={url} />
      <View className='text'>{text}</View>
    </View>
  }
  const onClose = () => {
    setIsOpened(!isOpened)
  }
  const onConfirm = () => {
    deleteTask()
  }
  const renderItem = (typeparam) => {
    switch (typeparam) {
      case 'more':
        return <Picker mode='selector' range={editTaskMore} rangeKey='value' onChange={onChangeOprate}>
          <ItemDetail />
        </Picker>
      case 'share':
        return <Button className='button-none' openType='share' >
          <ItemDetail />
        </Button>
      case 'unscramble':
        return <ItemDetail  />
      case 'poster':
        return <Poster data={data}>
             <ItemDetail />
           </Poster>
      default:
        break;
    }
  }
  return <>
    {renderItem(type)}
    <AtModal
      onClose={onClose}
      isOpened={isOpened}
    >
      <AtModalHeader>
        确认删除吗？
      </AtModalHeader>
      {/* <AtModalContent>

      </AtModalContent> */}
      <AtModalAction>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={onConfirm}>确定</Button>
      </AtModalAction>
    </AtModal>
  </>
}