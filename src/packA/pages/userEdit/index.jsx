
import { useState } from 'react'
import Taro, { navigateBack } from '@tarojs/taro';
import { View, Image, Button, Form, Input } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux';
import { modifyUserInfo } from '@/actions/home'
import './index.scss'


export default () => {
  const { homeData } = useSelector(state => state);
  const { userInfoData } = homeData;
  const { avatarUrl, birthday } = userInfoData || {};
  const tempbirthday = birthday ? birthday.split('-') : []
  const initYear = tempbirthday[0] || new Date().getFullYear();;
  const initMonth = tempbirthday[1] || new Date().getMonth() + 1;
  const initDay = tempbirthday[2] || new Date().getDate();
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dateInfo, setDateInfo] = useState({
    dateStr: `${initYear}-${initMonth}-${initDay}`,
    dateParam: {
      year: initYear,
      month: initMonth,
      day: initDay
    },
    dateType: 1,  //1:阴历；2:农历
    showYear: true //是否展示年
  })
  const showDatePickerPlus = () => {
    setShow(!show)
  }
  const closeDatePickerPlus = (e) => {
    setShow(!show)

  }
  const submit = (e) => {
    setDateInfo(e.detail)
    setShow(false)
  }
  const formSubmit = () => {
    const { year, month, day } = dateInfo.dateParam
    setLoading(true)
    modifyUserInfo({
      birthday: `${year}-${month}-${day}`
      // birthday: `2022-4-5`
    }, (res) => {
      setLoading(false)
      if (res.code == 200) {
        navigateBack({
          url: '/pages/my/index',
        });
      } else {
        Taro.showToast({
          title: '修改不成功',
          icon: 'error',
          duration: 2000
        })
      }
    })

  }
  return <View>
    <View className='editor-info-box flex-justify-center'>
      <View className='editor-item'>
        <Image className='avatar' src={avatarUrl} />
      </View>

      <Form
        onSubmit={formSubmit}
      >
        <View className='editor-item' onClick={showDatePickerPlus}>
          <Button className='button-none button-none-birthday' name='born' size='mini'   >{dateInfo.dateStr || ' 请填写你的生日'}</Button>
        </View>
        <Button formType='submit' loading={loading} className='edit-btn button-none'>保存生日</Button>

      </Form>
    </View>
    <datepicker-plus
      onSubmit={submit}
      onClose={closeDatePickerPlus}
      showDatePickerPlus={show}
      initDate={dateInfo.dateStr}
      showYear={dateInfo.showYear}
      dateType={dateInfo.dateType}
    ></datepicker-plus>
  </View>
}