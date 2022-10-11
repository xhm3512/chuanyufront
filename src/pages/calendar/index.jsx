import { useState, useEffect } from 'react'
import {navigateTo} from '@tarojs/taro';
import { View } from '@tarojs/components';
import { calendarInitData } from '@/constants/utils';
import {  currentTaskList } from '@/actions/calendar'

export default () => {
  const { year, month, day, header, next, prev, days_addon, week_title, title_type, more, lunar, cs, style, activeType } = calendarInitData
  const [taskLists, setTaskList] = useState([]);

  useEffect(() => {
    currentTaskList(`${year}-${month}`, (val) => {
      setTaskList(val) 
    }); //获取展示当月对应的任务
  }, [])

  const nextMonth = (event) => {
    setTaskList([])
    const { currentYear,currentMonth } = event.detail;
    currentTaskList(`${currentYear}-${currentMonth}`, (val) => {
      setTaskList(val) 
    }); //获取展示当月对应的任务
    // submitCalendarClick(event.detail)
  }
  const prevMonth = (event) => {
    setTaskList([])
    const { currentYear,currentMonth } = event.detail;
    currentTaskList(`${currentYear}-${currentMonth}`, (val) => {
      setTaskList(val) 
    }); //获取展示当月对应的任务
    // submitCalendarClick(event.detail)
  }
  const dateChange = (event) => {

  }
  const dayClick = (event) => {
    const ids = event.detail.item?.taskIds.join(',')
    if (event.detail.item.taskIds.length == 1) {
     navigateTo({
        url: `/packA/pages/taskDetailList/index?ids=${ids}`,
      });
    } else {
    navigateTo({
        url: `/packA/pages/taskDetailList/index?ids=${ids}`,
      });
    }
  }
//  获取当月日历
const submitCalendarClick = (detail) => {
  const { monthArr: arr } = detail
  const tempArr = [];
  let flag = false;
  for (let i = 0; i < arr.length; i++) {
    const itemArr = arr[i];
    for (let j = 0; j < itemArr.length; j++) {
      const item = itemArr[j]
      const { day: day1, lunarDay2, lunarMonth2, lunarYear, month: month1, year: year1 } = item;
      if (day1 == 1 || flag) {
        if (day1 == 1 && flag) break;
        if (day1 == 1) flag = true;
        tempArr.push({
          yangliDay: day1,
          yangliMonth: month1,
          yangliYear: year1,
          yinliDay: lunarDay2,
          yinliMonth: lunarMonth2,
          yinliYear: lunarYear
        })
      }
    }
  }
  // submitCalendar(tempArr, `${currentYear}-${currentMonth}`);

}
  return <View>
    <view className='plugin'>
      <calendar
        year={year}
        month={month}
        day={day}
        header={header}
        next={next}
        prev={prev}
        addon='mixed'
        daysAddon={days_addon}
        weeks={week_title}
        weeksType={title_type}
        showMoreDays={more}
        lunar={lunar}
        cellSize={cs}
        daysColor={taskLists}
        activeType={activeType}
        // nextMonth='hi'
        onFfff={nextMonth}
        onDddd={prevMonth}
        onDateChange={dateChange}
        onEeee={dayClick}
      />

    </view>
  </View>
}