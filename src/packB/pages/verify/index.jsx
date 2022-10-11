import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Form, Text, Input, Image } from '@tarojs/components'
import { getVerifyImg, verifyEmailCode } from '@/actions/verify'
import './index.scss'

export default () => {
  const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
  const [imgCode, setImgCode] = useState('')
  useEffect(() => {
    getVerifyImg((code) => {
      setImgCode(code)
    })
  }, [])
  const formSubmit = (val) => {
    const { email, verifyCode } = val.detail.value
    if (!email) {
      Taro.showToast({
        title: '请输入邮箱',
        icon: 'error',
        duration: 2000
      })
    } else if (!verifyCode) {
      Taro.showToast({
        title: '请输入验证码',
        icon: 'error',
        duration: 2000
      })
    } else if (!reg.test(email)) {
      Taro.showToast({
        title: '邮箱格式不正确',
        icon: 'error',
        duration: 2000
      })
    } else {
      verifyEmailCode({verifyCode, email}, (res) => {
        if (res.code == 200) {
          Taro.showToast({
            title: '去邮箱进行验证',
            icon: 'success',
            duration: 2000
          })
        } else {
          Taro.showToast({
            title: '提交失败',
            icon: 'error',
            duration: 2000
          })
        }
      })
    }
  }
  return <View className='verify-box lex-justify-row'>
    <Form
      onSubmit={formSubmit}
    >
      <View className='flex-justify-row-left item'>
        <Text>邮箱：</Text>
        <Input
          className='item-input-email'
          type='text'
          name='email'
          focus placeholder='请输入正确的邮箱格式'
        // value={name}
        // onInput={onNameInput}
        />
      </View>
      <View className='flex-justify-row-left item'>
        <Text>验证码：</Text>
        <Input
          className='item-input'
          type='text'
          name='verifyCode'
          focus placeholder='验证码'
        // value={name}
        // onInput={onNameInput}
        />
        <View className='code-img' >{imgCode}</View>
      </View>
      <Button
        // loading={loading}
        type='primary'
        formType='submit'
        className='btn button-none btn-submit'
      >提交</Button>
    </Form>
  </View>
}