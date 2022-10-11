export default {
  pages: [
    // 'pages/constellation/index',
    'pages/index/index',
    'pages/calendar/index',
    'pages/my/index',
  ],
  "lazyCodeLoading": "requiredComponents",

  subpackages: [
    {
      root: 'packA',
      pages: [
        'pages/addEvent/index',
        'pages/userEdit/index',
        'pages/taskDetailList/index',
      ]
    },
    {
      root: 'packB',
      pages: [ 
        'pages/share/index',
        'pages/verify/index',
        'pages/constellation/index',
      ]
    }
  ],
  // window: {
  //   backgroundTextStyle: 'light',
  //   navigationBarBackgroundColor: '#fff',
  //   navigationBarTitleText: 'WeChat',
  //   navigationBarTextStyle: 'black'
  // },
  "usingComponents": {
    // "calendar": "components/calendar/index"
  },

  "tabBar": {
    'color': '#000000',
    'selectedColor': '#FFB085',
    'backgroundColor': '#FFF',
    'borderStyle': 'black',
    'list': [
      {
        'pagePath': 'pages/index/index',
        'text': '首页',
        'iconPath': './images/home.jpg',
        'selectedIconPath': './images/home1.jpg'
      },
      {
        'pagePath': 'pages/calendar/index',
        'text': '限时福利',
        'iconPath': './images/calendar.jpg',
        'selectedIconPath': './images/calendar1.jpg'
      },
      {
        'pagePath': 'pages/my/index',
        'text': '我的',
        'iconPath': './images/my.jpg',
        'selectedIconPath': './images/my1.jpg'
      },
    ]
  },
  "permission":{
    "scope.userLocation":{
      "desc": "获取地理位置信息的用途描述"
    }
  }
}
