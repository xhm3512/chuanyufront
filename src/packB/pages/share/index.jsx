
import { useState, useEffect } from 'react'
import { getCurrentInstance, reLaunch } from '@tarojs/taro';
import { View, Button } from '@tarojs/components'
import 'taro-ui/dist/style/components/toast.scss'
import { getShareDetail } from '@/actions/share'
import TaskLists from '@/components/TaskLists'
import TaskDetail from '@/components/TaskDetail'
import Loading from '@/components/Loading'
import SaveBtn from './SaveBtn'
import './index.scss'


export default () => {

  const param = getCurrentInstance().router.params;

  const shardId = param.shardId
  const [idsList, setIdsList] = useState([])
  useEffect(() => {
    getShareDetail(shardId, (data) => {
      setIdsList(data)
    })
  }, [])

  // 当前分享id,数组形式：[1,2]
  const onClick = (data) => {
    // setShareList(data)
  }
  const onBtnClick = () => {
    // if (!status) {
    //   return false;
    // }
    reLaunch({
      url: '/pages/index/index',
    });
  }
  if (idsList?.length < 1) {
    return <Loading />
  } else if (idsList?.length > 1) {
    return <>
      <View className='share-people'>来自{idsList?.[0]?.source || '微信好友'}的分享</View>
      <TaskLists list={idsList} onHandleClick={onClick} isShowShareBtn={false} />
      <SaveBtn shardId={shardId} />
      <Button
        className='go-index-btn button-none'
        onClick={onBtnClick}
      >进入首页</Button>
    </>
  } else {
    return <>
      <View className='share-people'>来自{idsList?.[0]?.source || '微信好友'}的分享</View>
      <TaskDetail currentItem={idsList} onHandleClick={onClick} isShowShareBtn={false} />
      <View></View>
      <SaveBtn shardId={shardId} />
      <Button
        className='go-index-btn button-none'
        onClick={onBtnClick}
      >进入首页</Button>
    </>
  }

}