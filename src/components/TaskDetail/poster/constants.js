
export const rssConfig = ({url,name,time}) => {
  return {
    width: 750,
    height: 750,
    backgroundColor: '#fff',
    debug: false,
    blocks: [
      {
        x: 0,
        y: 0,
        width: 750,
        height: 750,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 0,
        // borderColor: '#ccc',
        backgroundColor: '#EFF3F5',
        borderRadius: 0,
      },
      {
        x: 40,
        y: 40,
        width: 670,
        height: 670,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 0,
        // borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 12,
      }
    ],
    texts: [
      {
        x: 80,
        y: 120,
        text: name,
        fontSize: 50,
        color: '#fff',
        opacity: 1,
        baseLine: 'middle',
        lineHeight: 48,
        lineNum: 2,
        textAlign: 'left',
        width: 580,
        zIndex: 999,
      },
      {
        x: 80,
        y: 220,
        text: time,
        fontSize: 40,
        color: '#fff',
        opacity: 1,
        baseLine: 'middle',
        lineHeight: 48,
        lineNum: 2,
        textAlign: 'left',
        width: 580,
        zIndex: 999,
      },
      {
        x: 80,
        y: 420,
        text: '记事儿管家，记住所有重要的日子',
        fontSize: 32,
        color: '#000',
        opacity: 1,
        baseLine: 'middle',
        lineHeight: 48,
        lineNum: 2,
        textAlign: 'left',
        width: 580,
        zIndex: 999,
      },
      {
        x: 80,
        y: 590,
        text: '长按扫描二维码体验更多丰富内容',
        fontSize: 24,
        color: '#666',
        opacity: 1,
        baseLine: 'middle',
        textAlign: 'left',
        lineHeight: 36,
        lineNum: 1,
        zIndex: 999,
      },
      {
        x: 80,
        y: 640,
        text: '分享来自 「 记事儿管家 」',
        fontSize: 24,
        color: '#666',
        opacity: 1,
        baseLine: 'middle',
        textAlign: 'left',
        lineHeight: 36,
        lineNum: 1,
        zIndex: 999,
      }
    ],
    images: [
      {
        url,
        width: 670,
        height: 320,
        y: 40,
        x: 40,
        borderRadius: 12,
        zIndex: 10,
        // borderRadius: 150,
        // borderWidth: 10,
        // borderColor: 'red',
      },
      {
        url: 'https://imagev2.xmcdn.com/storages/a828-audiofreehighqps/D5/30/GKwRIJEGKvGCAADHBAE6Z3El.jpg',
        width: 110,
        height: 110,
        y: 570,
        x: 560,
        borderRadius: 100,
        borderWidth: 0,
        zIndex: 10,
      },
    ],
    lines: [
      {
        startY: 540,
        startX: 80,
        endX: 670,
        endY: 541,
        width: 1,
        color: '#eee',
      }
    ]
  }
}