const agent = require('superagent')
const json = require('../HeroData.json')
const fs = require('fs/promises')

console.log(`共${json.data.length}个记录，开始下载`)
function awaitS() {
  return new Promise((r) =>
    setTimeout(() => {
      r()
    }, 500),
  )
}

;(async () => {
  for (const index in json.data) {
    const item = json.data[index]
    console.log(`第${parseInt(index) + 1}个下载开始...[${item.cnName}]`)
    const imageName = item.enName + '.png'
    const res = await agent.get(item.image)
    console.log('下载完成，保存中...')
    await fs.writeFile('./images/' + imageName, res.body, 'binary')
    console.log('保存完成，正在更新配置数据')
    item.localImage = 'images/' + imageName
    console.log('500ms后开始下一个...')
    await awaitS()
  }
  console.log('全部下载完成，正在更新配置文件')
  await fs.writeFile('./HeroData.json', JSON.stringify(json), {
    encodin: 'utf8',
  })
})()
