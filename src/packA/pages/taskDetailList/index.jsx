
import { useState, useEffect } from 'react'
import { getCurrentInstance, useShareAppMessage } from '@tarojs/taro';
import { getIdsTaskList } from '@/actions/taskDetailList'
import TaskLists from '@/components/TaskLists'
import TaskDetail from '@/components/TaskDetail'
import Loading from '@/components/Loading'
import { isNullObj } from '@/utils/tools'
import { pageIndexShare, pageIndexTaskShare } from '@/constants/share'
import { shareEventList } from '@/actions/share'
import Err from '@/components/Err'
import './index.scss'

export default () => {
  const param = getCurrentInstance().router.params;
  const idsArr = param.ids.split(',')
  const [idsList, setIdsList] = useState([])
  const [shareList, setShareList] = useState([])

  useEffect(() => {
    getIdsTaskList(idsArr, (data) => {
      setIdsList(data)
    })
  }, [])


  // 当前页面右上角分享到个人和按钮事件设置
  useShareAppMessage(async res => {
    return new Promise((resolve) => {
      shareEventList(shareList, (shareRes) => {
        if (res.from === 'button') {
          return resolve(pageIndexTaskShare(shareRes.data))
        }
        // 当前页面右上角分享到朋友圈设置
        return resolve(pageIndexShare())
      })
    })
  })
  // 当前分享id,数组形式：[1,2]
  const onClick = (data) => {
    setShareList(data)
  }
  if (idsList?.length < 1) {
    return <Loading />
  } else if (idsList?.length > 1) {
    return <TaskLists list={idsList} onHandleClick={onClick} />
  } else {
    return <>
      {
        isNullObj(idsList)
          ? <Err />
          :<TaskDetail currentItem={idsList} onHandleClick={onClick} isPoster />
      }
    </>
  }
}