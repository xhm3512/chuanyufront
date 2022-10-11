import { nlDate, nlMonth, nlDay1, nlDay2 } from './constans'
import { dayCus, monthCus } from './tools'
// 公历日期 1900年 - 今天
const glYear = [];
for (let i = 1900; i <= 2049; i++) {
    glYear.push(i)
}
// 公历月份
const glMonth = [];
for (let i = 1; i <= 12; i++) {
    glMonth.push(i < 10 ? ('0' + i) : i)
}
// 公历天份 28天
const glDay28 = [];
for (let i = 1; i <= 28; i++) {
    glDay28.push(i < 10 ? ('0' + i) : i)
}
// 公历天份 29天
const glDay29 = [];
for (let i = 1; i <= 29; i++) {
    glDay29.push(i < 10 ? ('0' + i) : i)
}
// 公历天份 30天
const glDay30 = [];
for (let i = 1; i <= 30; i++) {
    glDay30.push(i < 10 ? ('0' + i) : i)
}
// 公历天份 31天
const glDay31 = [];
for (let i = 1; i <= 31; i++) {
    glDay31.push(i < 10 ? ('0' + i) : i)
}

/**
 * 公历年月日处理
 */
function glDateHandler(arr) {
    let indexArr = arr
    let data = {
        "yearCol": glYear,
        "monthCol": glMonth,
        "dayCol": []
    }
    if (arr[1] == 0 || arr[1] == 2 || arr[1] == 4 || arr[1] == 6 || arr[1] == 7 || arr[1] == 9 || arr[1] == 11)
        data.dayCol = glDay31
    else if (arr[1] != 1)
        data.dayCol = glDay30
    else {
        let year = glYear[arr[0]];
        data.dayCol = glDay28;
        // 判断闰年
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            data.dayCol = glDay29;
        }
    }
    return data;
}

/**
 * 农历年月日处理
 */
function nlDateHandler(arr) {
    let indexArr = arr
    let data = {
        "yearCol": [],
        "monthCol": [],
        "dayCol": []
    }
    for (let i = 0; i < nlDate.length; i++) {
        data.yearCol.push(nlDate[i].y)
        if (indexArr[0] == i) {
            for (let j = 0; j < nlDate[i].m.length; j++) {
                data.monthCol.push(nlDate[i].m[j].n)
                if (indexArr[1] == j) {
                    if (nlDate[i].m[j].d == 29)
                        data.dayCol = nlDay1
                    else
                        data.dayCol = nlDay2
                }
            }
        }
    }
    return data;
}

/**
 * 公历月日处理 不带年份
 */
function glDateHandlerNoYear(arr) {
    let indexArr = arr
    let data = {
        "monthCol": [],
        "dayCol": []
    }
    data.monthCol = glMonth
    if (arr[0] == 0 || arr[0] == 2 || arr[0] == 4 || arr[0] == 6 || arr[0] == 7 || arr[0] == 9 || arr[0] == 11)
        data.dayCol = glDay31
    else if (arr[0] != 1)
        data.dayCol = glDay30
    else
        data.dayCol = glDay29
    return data;
}

/**
 * 农历月日处理 不带年份
 */
function nlDateHandlerNoYear() {
    let data = {
        "monthCol": nlMonth,
        "dayCol": nlDay2
    }
    return data;
}

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// eslint-disable-next-line no-undef
Component({
    behaviors: [],
    properties: {
        // 控制是否显示日期选择组件的flag
        showDatePickerPlus: {
            type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
            // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
            observer: function (newVal, oldVal) {
                if (newVal != oldVal) {
                    if (newVal)
                        this.showDatePickerPlus()
                    else
                        this.closeDatePickerPlus()
                }
            }
        },
        initDate: {
            type: String,
            value: formatTime(new Date())
        },
        showYear: {
            type: Number,
            value: formatTime(new Date())
        },
        dateType: {
            type: Number,
            value: formatTime(new Date())
        }
    },
    // 私有数据，可用于模版渲染
    data: {
        datePickerAttr: {
            showYear: 1,
            dateType: 1,
        },
        nlDateMutiIndex: [90, 0, 0],
        nlDateNoYearMutiIndex: [0, 0],
        glDateMutiIndex: [90, 0, 0],
        glDateNoYearMutiIndex: [0, 0],
        glYears: [],
        glMonths: [],
        glMonthsNoYear: [],
        glDays: [],
        glDaysNoYear: [],
        nlYears: [],
        nlMonths: [],
        nlMonthsNoYear: [],
        nlDays: [],
        nlDaysNoYear: [],
        animationData: {},// 动画
        showDatePickerPlus: false,
    },

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
        /**
         * 初始化阴阳历数据
         */
        let nlDate = nlDateHandler(this.data.nlDateMutiIndex);
        let nlDateNoYear = nlDateHandlerNoYear(this.data.nlDateNoYearMutiIndex);
        let glDateMutiIndex = this.data.glDateMutiIndex;
        let glDateNoYearMutiIndex = this.data.glDateNoYearMutiIndex;
        let [y, m, d] = this.data.initDate.split('-');
        glDateMutiIndex = [glYear.indexOf(parseInt(y)), parseInt(m) - 1, parseInt(d) - 1];
        let glDate = glDateHandler(glDateMutiIndex);
        glDateNoYearMutiIndex = [parseInt(m) - 1, parseInt(d) - 1];
        let glDateNoYear = glDateHandlerNoYear(glDateNoYearMutiIndex);
        this.setData({
            // glDateMutiIndex: glDateMutiIndex,
            glDateNoYearMutiIndex: glDateNoYearMutiIndex,
            glYears: glDate.yearCol,
            glMonths: glDate.monthCol,
            glDays: glDate.dayCol,
            glMonthsNoYear: glDateNoYear.monthCol,
            glDaysNoYear: glDateNoYear.dayCol,
            // nlDateMutiIndex:glDateMutiIndex,
            nlYears: nlDate.yearCol,
            nlMonths: nlDate.monthCol,
            nlDays: nlDate.dayCol,
            nlMonthsNoYear: nlDateNoYear.monthCol,
            nlDaysNoYear: nlDateNoYear.dayCol,
            datePickerAttr: {
                showYear: this.data.showYear,
                dateType: this.data.dateType,
            },
        })
        if (this.data.dateType == 1) {
            this.setData({
                glDateMutiIndex: glDateMutiIndex,
            })
        }
        if (this.data.dateType == 2) {
            this.setData({
                nlDateMutiIndex: glDateMutiIndex,
            })
        }
    },
    moved: function () {
    },
    detached: function () {
    },
    methods: {
        /**
         * 切换阴阳历类型
         */
        toggleDateType: function () {
            let dateType = this.data.datePickerAttr.dateType == 1 ? 2 : 1;
            this.setData({
                ['datePickerAttr.dateType']: dateType
            })
        },
        /**
         * 切换是否显示年份
         */
        toggleShowYear: function () {
            let showYear = this.data.datePickerAttr.showYear == 1 ? 0 : 1;
            this.setData({
                ['datePickerAttr.showYear']: showYear
            })
        },
        /**
         * 农历数据改变监听
         */
        bindDateNl: function (e) {
            let value = e.detail.value;
            let data = nlDateHandler(value);
            this.setData({
                nlDateMutiIndex: value,
                nlYears: data.yearCol,
                nlMonths: data.monthCol,
                nlDays: data.dayCol
            })
        },
        /**
         * 农历不带年份数据改变监听
         */
        bindDateNlNoYear: function (e) {
            let value = e.detail.value;
            let data = nlDateHandlerNoYear(value);
            this.setData({
                nlDateNoYearMutiIndex: value,
                nlMonthsNoYear: data.monthCol,
                nlDaysNoYear: data.dayCol
            })
        },
        /**
         * 公历数据改变监听
         */
        bindDateGl: function (e) {
            let value = e.detail.value;
            let data = glDateHandler(value);
            this.setData({
                glDateMutiIndex: value,
                glYears: data.yearCol,
                glMonths: data.monthCol,
                glDays: data.dayCol,
            })
        },
        /**
         * 公历不带年份数据改变监听
         */
        bindDateGlNoYear: function (e) {
            let value = e.detail.value;
            let data = glDateHandlerNoYear(value);
            this.setData({
                glDateNoYearMutiIndex: value,
                glMonthsNoYear: data.monthCol,
                glDaysNoYear: data.dayCol
            })
        },
        /**
         * 选择日期->确定
         */
        submitSelectDate: function () {
            let date = '';
            if (this.data.datePickerAttr.dateType == 1) {
                date = this.data.datePickerAttr.showYear == 1 ? (this.data.glYears[this.data.glDateMutiIndex[0]] + '-' + this.data.glMonths[this.data.glDateMutiIndex[1]] + '-' + this.data.glDays[this.data.glDateMutiIndex[2]]) : (this.data.glMonths[this.data.glDateNoYearMutiIndex[0]] + '-' + this.data.glDaysNoYear[this.data.glDateNoYearMutiIndex[1]])
            }
            else {
                date = this.data.datePickerAttr.showYear == 1 ? (this.data.nlYears[this.data.nlDateMutiIndex[0]] + this.data.nlMonths[this.data.nlDateMutiIndex[1]] + this.data.nlDays[this.data.nlDateMutiIndex[2]]) : (this.data.nlMonthsNoYear[this.data.nlDateNoYearMutiIndex[0]] + this.data.nlDaysNoYear[this.data.nlDateNoYearMutiIndex[1]])
            }
            const dateType = this.data.datePickerAttr.dateType;
            // dayCus, monthCus 
            const nlYear = this.data.nlYears[this.data.nlDateMutiIndex[0]].split('(')[0]
            this.closeDatePickerPlus();
            var myEventDetail = {
                dateParam: {
                    year: dateType == 1 ? this.data.glYears[this.data.glDateMutiIndex[0]] : +nlYear,
                    month: dateType == 1 ? +this.data.glMonths[this.data.glDateMutiIndex[1]] : monthCus[this.data.nlMonths[this.data.nlDateMutiIndex[1]]],
                    day: dateType == 1 ? this.data.glDays[this.data.glDateMutiIndex[2]] : dayCus[this.data.nlDays[this.data.nlDateMutiIndex[2]]]
                },
                dateStr: date,
                showYear: this.data.datePickerAttr.showYear,
                dateType: this.data.datePickerAttr.dateType
            } // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('submit', myEventDetail, myEventOption)
        },
        // 显示日期选择控件
        showDatePickerPlus: function () {
            var animation = wx.createAnimation({
                duration: 160,
                timingFunction: 'linear',
                delay: 0
            })
            this.animation = animation

            animation.translateY(280).step({ duration: 0 })

            this.setData({
                animationData: animation.export(),
                showDatePickerPlus: true
            })
            setTimeout(function () {
                animation.translateY(0).step()
                this.setData({
                    animationData: animation.export(),
                })
            }.bind(this), 160)
        },
        // 隐藏日期选择控件
        closeDatePickerPlus: function () {
            this.animation.translateY(280).step()
            this.setData({
                animationData: this.animation.export(),
            })
            setTimeout(function () {
                this.setData({
                    showDatePickerPlus: false,
                })
            }.bind(this), 120)
            this.triggerEvent('close', { dateType: this.data.datePickerAttr.dateType }, {})
        },
        onMyButtonTap: function () {
            this.setData({
                // 更新属性和数据的方法与更新页面数据的方法类似
            })
        },
        _propertyChange: function (newVal, oldVal) {

        }
    }

})