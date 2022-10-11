export const isNull = (obj) => {
  return Object.prototype.toString.call(obj) === "[object Null]"
}
export const isNullObj = (obj) => {
  return JSON.stringify(obj)==='{}'
}
// svg转rul
export const svgTransUrl = (svg) => {
  // 将被设置到 dataset 中的属性还原出来
  svg = svg.replace(/data-(.*?=(['"]).*?\2)/g, '$1');

  // 将被设置到 data-xlink-href 的属性还原出来
  svg = svg.replace(/xlink-href=/g, 'xlink:href=');

  // 将 dataset 中被变成 kebab-case 写法的 viewBox 还原出来
  svg = svg.replace(/view-box=/g, 'viewBox=');

  // 清除 SVG 中不应该显示的 title、desc、defs 元素
  svg = svg.replace(/<(title|desc|defs)>[\s\S]*?<\/\1>/g, '');

  // 为非标准 XML 的 SVG 添加 xmlns，防止视图层解析出错
  if (!/xmlns=/.test(svg)) svg = svg.replace(/<svg/, "<svg xmlns='http://www.w3.org/2000/svg'");

  // 对 SVG 中出现的浮点数统一取最多两位小数，缓解数据量过大问题
  svg = svg.replace(/\d+\.\d+/g, (match) => parseFloat(parseFloat(match).toFixed(2)));

  // 清除注释，缓解数据量过大的问题
  svg = svg.replace(/<!--[\s\S]*?-->/g, '');

  // 模拟 HTML 的 white-space 行为，将多个空格或换行符换成一个空格，减少数据量
  svg = svg.replace(/\s+/g, " ");

  // 对特殊符号进行转义，这里参考了 https://github.com/bhovhannes/svg-url-loader/blob/master/src/loader.js
  svg = svg.replace(/[{}\|\\\^~\[\]`"<>#%]/g, function (match) {
    return '%' + match[0].charCodeAt(0).toString(16).toUpperCase();
  });

  // 单引号替换为 \'，由于 kbone 的 bug，节点属性中的双引号在生成 outerHTML 时不会被转义导致出错
  // 因此 background-image: url( 后面只能跟单引号，所以生成的 URI 内部也就只能用斜杠转义单引号了
  svg = svg.replace(/'/g, "\\'");

  // 最后添加 mime 头部，变成 Webview 可以识别的 Data URI
  return 'data:image/svg+xml,' + svg.trim();

}

/**
 * 获取距离指定时间还有多少天
 * @param {String | Number | Date} dateTime 日期时间
 * @example
 * ```javascript
 *     getDistanceSpecifiedTime('2019/02/02 02:02:00');
 *     getDistanceSpecifiedTime(1549036800000);
 *     getDistanceSpecifiedTime(new Date("2019/2/2 00:00:00"));
 * ```
 */

export const getDistanceSpecifiedTime = (year, month, day) => {
  const dateTime=`${year}/${month}/${day} 00:00:00`
  // 指定日期和时间
  var EndTime = new Date(dateTime);
  // 当前系统时间
  var NowTime = new Date();
  var t = EndTime.getTime() - NowTime.getTime();
  var d = Math.floor(t / 1000 / 60 / 60 / 24);
  if (d < 0) {
   return  getDistanceSpecifiedTime(year + 1, month, day)
  } else {
    return d
  }
}
