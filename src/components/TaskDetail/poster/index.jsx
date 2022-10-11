import { useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import TaroCanvasDrawer from '@/components/taro-plugin-canvas';
import {backUrl} from '@/constants/backUrl'
import { rssConfig } from './constants'

export default ({ children, data = {} }) => {
  const [config, setConfig] = useState(null)  // 绘图配置文件
  const [canvasStatus, setCanvasStatus] = useState(false)
  const canvasDrawFunc = () => {
    setCanvasStatus(true)
    setConfig(rssConfig(
      {
        url: backUrl[data?.taskType?.code] || backUrl.default,
        name: data.taskName,
        time: data.showDate
      }
    ))
    Taro.showLoading({
      title: '绘制中...'
    })
  }
  const onCreateSuccess = (result) => {
    const { tempFilePath, errMsg } = result;
    Taro.hideLoading();
    if (errMsg === 'canvasToTempFilePath:ok') {
      setCanvasStatus(false)
      setConfig(null)

    } else {
      // 重置 TaroCanvasDrawer 状态，方便下一次调用
      setCanvasStatus(false)
      setConfig(null)
      Taro.showToast({ icon: 'none', title: errMsg || '出现错误' });
      console.log(errMsg);
    }
    // 预览
    Taro.previewImage({
      current: tempFilePath,
      urls: [tempFilePath]
    })
    saveToAlbum(tempFilePath)
  }
  const onCreateFail = () => {
    Taro.hideLoading();
    setCanvasStatus(false)
    setConfig(null)
  }
  const saveToAlbum = (url) => {
    const tempUrl=url.replace('http','https')
    const res = Taro.saveImageToPhotosAlbum({
      filePath: tempUrl,
    });
    if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.showToast({
        title: '保存图片成功',
        icon: 'success',
        duration: 2000,
      }); 
    }
  }
  return (
    <View>
      <View onClick={() => canvasDrawFunc(rssConfig)}>{children}</View>
      {
        // 由于部分限制，目前组件通过状态的方式来动态加载
        canvasStatus &&
        (<TaroCanvasDrawer
          config={config} // 绘制配置
          onCreateSuccess={onCreateSuccess} // 绘制成功回调
          onCreateFail={onCreateFail} // 绘制失败回调
        />
        )
      }
    </View>

  )
}