
import { useState, useEffect } from 'react'
import Taro,{ getCurrentInstance, setNavigationBarTitle, reLaunch } from '@tarojs/taro';
import { View, Form, Input, Button, Text, Picker } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux';
import { tipDay, editorinitData } from '@/constants/utils'
import { addTaskEvent, upDateTaskEvent } from '@/actions/addEvent'
import { getTaskListAction } from '@/actions/home'
import { seeTaskEvent } from '@/actions/detail'
import './index.scss'

export default () => {
  const dispatch = useDispatch()
  const param = getCurrentInstance().router.params;
  const { homeData } = useSelector(state => state);
  const { taskListsData, taskTypesData, sendTypesData } = homeData
  const currentTaskId = param.id;
  const currentTask = taskListsData?.list?.find((item => item.id == currentTaskId)) || {} //获取当前编辑任务信息
  const currentTypeCode = param.type;
  const currentType = taskTypesData?.find(item => item.code == currentTypeCode)
  const [name, setName] = useState('') //任务名
  const [dateInfo, setDateInfo] = useState({  //出生日期
    ...editorinitData({})
  })
  const [tipType, setTipType] = useState([]) //发送类型
  const [tipDayText, setTipDayText] = useState(0) //提醒(天数)展示0,1,3,5,7
  const [remark, setRemark] = useState('') //备注内容
  const [show, setShow] = useState(false) //出生日期事件选择弹窗是否展示
  const [loading, setLoading] = useState(false) //提交按钮loading
  // 设置页面头部标题
  const setHeaderTitle = (chName) => {
    setNavigationBarTitle({
      title: (chName || '纪念日')
    })
  }
  useEffect(() => {
    if (currentTaskId) { //修改任务，初始化数据
      seeTaskEvent(currentTaskId, (res) => {
        const { taskName, showDate, sendType, advanceDay, taskRemark, taskType, open, taskCalendarType, year, month, day } = res;
        setHeaderTitle(taskType.chName)
        setName(taskName)
        setDateInfo({
          ...editorinitData({
            year, month, day, showDate,
            // showYear://是否展示年和需要年 ，0:不显示，1:显示
            dateType: taskCalendarType.code  //1:阳历/公历；2:阴历/农历
          })
        })
        setTipType(sendType)
        setTipDayText(open == 1 ? advanceDay : -1)
        setRemark(taskRemark)
      })
    } else { //新建任务，初始化数据
      setTipType(sendTypesData)
      setDateInfo({
        ...editorinitData({
          dateType: 1,
          showYear: 1
        })
      })
      setHeaderTitle((currentType?.chName || '纪念日'))
    }
  }, [])
  // 新建玩跳转到首页
  const onClick = () => {
    getTaskListAction(dispatch, () => {
      reLaunch({
        url: '/pages/index/index',
      });
    })
  }
  // 提交增加内容
  const formSubmit = (e) => {
    const { taskName, sendType, advanceDay, taskRemark } = e.detail.value;
    setLoading(true)
    const { year, month, day } = dateInfo.dateParam;
    const currentChoiceDay = tipDay[+advanceDay].day; //当前选中需要提交天数
    const tempParams = {
      taskName, //任务名称
      sendType, //发送类型
      taskCalendarType: dateInfo.dateType, //公历/农历
      advanceDay: currentChoiceDay > -1 ? currentChoiceDay : '', //提前几天
      open: currentChoiceDay > -1 ? 1 : 0,
      taskRemark, //备注
      taskType: currentTypeCode || currentTask?.code, //任务类型:生日等
      year: dateInfo.showYear ? year : 0, //年
      month, //月
      day,//日
      showDate: dateInfo.dateStr, //提交原始数据
    }
    if (currentTaskId) { //修改
      upDateTaskEvent(currentTaskId, tempParams,
        (res) => {
          if (res.code == 200) {
            setLoading(false)
            onClick()
          } else {
            Taro.showToast({
              title: '修改失败',
              icon: 'error',
              duration: 2000
            })
          }
        })
    } else { //新建
      addTaskEvent(tempParams, (res) => {
        if (res.code == 200) {
          setLoading(false)
          onClick()
        } else {
          Taro.showToast({
            title: '添加失败',
            icon: 'error',
            duration: 2000
          })
        }
      })
    }
  }
  // 表单重置
  const formReset = () => {

  }
  // 日历弹窗确认
  const submit = (e) => {
    setDateInfo(e.detail)
    setShow(false)
  }
  // 打开日历弹窗
  const showDatePickerPlus = () => {
    setShow(!show)
  }
  // 关闭日历弹窗
  const closeDatePickerPlus = (e) => {
    setShow(!show)

  }
  // 提醒类型
  const onChange = (e) => {
    // setSelector(e.detail.value)
  }
  // 提前天数
  const onAdvanceDayChange = (e) => {
    setTipDayText(tipDay[e.detail.value].day)

  }
  // 名称
  const onNameInput = (e) => {
    setName(e.detail.value)
  }
  // 备注
  const onRemarkInput = (e) => {
    setRemark(e.detail.value)
  }
  const getCurrentChoiceDay = (day) => {
    return tipDay.find(item => item.day == day).value
  }

  if (currentTaskId && !name) return <View>loading...</View>
  return <View className='add-event-box'>
    <Form
      onSubmit={formSubmit}
      onReset={formReset}
    >
      <View className='form-item flex-justify-row-left' >
        <Text> 姓名：</Text>
        <Input
          className='item-input'
          type='text'
          name='taskName'
          focus placeholder='请输入名称'
          value={name}
          onInput={onNameInput}
        />
      </View>
      <View className='form-item flex-justify-row-left'>
        出生日期：
        <Button className='born-day button-none item-input' name='showDate' onClick={showDatePickerPlus}  >{dateInfo.dateStr}</Button>
      </View>
      {/* <View className='form-item flex-justify-row-left'>
        提醒类型：
        <CheckboxGroup
          name='sendType'
          onChange={onChange}
          className='item-input'
        >
          {tipType?.map((item, i) => {
            return (
              <Label className='checkbox-list__label' for={i} key={i}>
                <Checkbox className='checkbox-list__checkbox' value={item.code} checked={item.isChecked}>{item.name}</Checkbox>
              </Label>
            )
          })}
        </CheckboxGroup>

      </View> */}
      <View className='form-item flex-justify-row-left'>
        提前提醒天数：
        <Picker name='advanceDay' className='item-input' mode='selector' range={tipDay} onChange={onAdvanceDayChange} rangeKey='value'>
          <View> {getCurrentChoiceDay(tipDayText)}</View>
        </Picker>

      </View>
      <View className='form-item flex-justify-row-left'>
        备注：
        <Input
          className='item-input'
          type='text'
          name='taskRemark'
          placeholder='请输入备注'
          value={remark}
          onInput={onRemarkInput}
        />
      </View>
      {/* <View className='form-item flex-justify-row-left'>
        是否置顶：
        <Switch name='top' className='form-switch'></Switch>
      </View> */}
      <Button
        loading={loading}
        disabled={loading}
        type='primary'
        formType='submit'
        className='btn button-none btn-submit'
      >确认添加事件</Button>
      <Button className='btn button-none btn-reset' formType='reset'>重置</Button>
    </Form>
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