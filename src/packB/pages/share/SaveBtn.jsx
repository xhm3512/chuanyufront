import { useState, useEffect } from 'react'
import { reLaunch, getStorageSync } from '@tarojs/taro';
import { Button } from '@tarojs/components'
import { AtToast } from "taro-ui"
import { useDispatch, useSelector } from 'react-redux';
import { acceptTaskShare } from '@/actions/share'
import { addUserInfoAction, getUserLoginCodeAction, getUserInfoAction } from '@/actions/home'
import Login from '@/components/Login'
import { isNull } from '@/utils/tools'

export default ({ shardId }) => {
  const dispatch = useDispatch()
  const [isOpened, setIsOpened] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('success')
  const [message, setMessage] = useState('')
  const { homeData } = useSelector(state => state);
  const { userInfoData } = homeData;
  const statusText = {
    success: '保存成功',
    error: message || '保存失败',

  }
  // 获得登录code
  const handleLogin = () => {
    wx.login({
      success(res) {
        getUserLoginCodeAction(res?.code) //获得用户loginCode
        getUserInfoAction(dispatch) //判断用户是否注册

      }
    })
  }
  useEffect(() => {
    handleLogin()
  }, [])

  const onClick = () => {
    setStatus('loading')
    setLoading(true)
    setIsOpened(false)
    acceptTaskShare(shardId, (res) => {
      if (res.code === 200) {
        setIsOpened(true)
        setStatus('success')
      } else {
        setIsOpened(true)
        setStatus('error')
        setMessage(res.msg)
      }
      setLoading(false)
    })
  }
  const onBtnClick = () => {
    // if (!status) {
    //   return false;
    // }
    reLaunch({
      url: '/pages/index/index',
    });
  }
  const successLoginCallback = (userInfo) => {
    const cookie = getStorageSync('Cookies')
    userInfo.userCode = cookie;
    addUserInfoAction(dispatch, userInfo) //拿到用户信息，新增用户
  }
  if (isNull(userInfoData)) { //loading
    return <view></view>
  } else if (JSON.stringify(userInfoData) == "{}") {//未注册登录用户信息
    return <>
      <Login btnString='请先登录，在保存' successCallback={successLoginCallback} />
      <AtToast
        isOpened={isOpened}
        status={status}
        text={statusText[status]}
        onClick={onBtnClick}
        onClose={onBtnClick}
        icon='{icon}'
      ></AtToast>
    </>
  } else {
    return <>
      <Button
        className='share-btn button-none'
        onClick={onClick}
        loading={loading}
        disabled={loading}
      >保存</Button>
      <AtToast
        isOpened={isOpened}
        status={status}
        text={statusText[status]}
        onClick={onBtnClick}
        onClose={onBtnClick}
        icon='{icon}'
      ></AtToast>
    </>
  }

}