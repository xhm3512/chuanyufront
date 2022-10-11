// export const url = 'https://springboot-yn5c-1675475-1309949721.ap-shanghai.run.tcloudbase.com/api'
export const url = '/api'

// 增加事件提醒天数
export const tipDay = [
  {
    value: '当天',
    day: 0,
  },
  {
    value: '提前一天',
    day: 1,
  },
  {
    value: '提前三天',
    day: 3,
  },
  {
    value: '提前五天',
    day: 5,
  },
  {
    value: '提前七天',
    day: 7,
  },
  {
    value: '不再提醒',
    day: -1,
  },
]

// 日历初始化数据
export const calendarInitData = {
  year: new Date().getFullYear(),      // 年份
  month: new Date().getMonth() + 1,    // 月份
  day: new Date().getDate(),           // 日期
  header: true,                        // 日历标题
  lunar: true,                        // 显示农历
  more: true,                          // 显示非当前月日期                
  week_title: true,                    // 显示周标题
  next: true,                          // 显示下个月
  prev: true,                          // 显示上个月
  cs: 60,                              // 单元格大小
  title_type: 'cn',                    // 周标题类型
  titleType: ['英文单字母', '英语简写', '中文简写'],
  title_index: 0,
  styleTask: [
    // { date:'2022-03-31' , other:'', otherColor:'#4ECA8E',badgeColor:'#4ECA8E', background: 'rgba(59,139,242,0.1)' },
    // { date:'2022-03-16' , color:'#fff', other:'生日', otherColor:'#4ECA8E',badgeColor:'#4ECA8E', background: 'rgba(59,139,242,0.1)', selectedColor:'#4C8AF6'},
    // { date:'2022-4-03' ,other:'3',other:'已完成',otherColor:'#4ECA8E', badgeColor:'#4ECA8E', background: 'rgba(59,139,242,0.1)' },
    // { date:'2020-9-04' ,other:'3',other:'已完成',otherColor:'#4ECA8E', badgeColor:'#4ECA8E', background: 'rgba(59,139,242,0.1)' },
    // { date:'2020-10-01' ,other:'3',other:'已完成',otherColor:'#4ECA8E', badgeColor:'#4ECA8E', background: 'rgba(59,139,242,0.1)' }
  ],
  activeType: '', // 日期背景效果
  days_addon: [],
  showAction: false,
  navH: 0,
  windowHeight: 0,
  top: 0,
  bottom: 0,
  showViewStyle: '22',
  buttonStyle: '',
}

export const editTaskMore = [
  {
    value: '编辑',
    type: 'editor'
  },
  {
    value: '删除',
    type: 'delete'
  },
  {
    value: '取消',
    type: 'cancel'
  }
]
// 新建、编辑初始化数据
export const editorinitData = ({year, month, day,dateType=1,showYear=1,showDate}) => {
  const initYear = year || new Date().getFullYear();
  const initMonth = month || new Date().getMonth() + 1;
  const initDay = day || new Date().getDate();
  return {
    dateParam: {
      year: initYear,
      month: initMonth,
      day: initDay
    },
    dateType,  //1:阳历/公历；2:阴历/农历
    showYear,//是否展示年和需要年 ，0:不显示，1:显示
    dateStr: showDate || `${initYear}-${initMonth}-${initDay}`,
  }
}
