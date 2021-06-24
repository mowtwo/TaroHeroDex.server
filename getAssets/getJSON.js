const agent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
console.log('开始获取数据')
agent.get('https://heroes.blizzard.cn/touch/heroes/').then((res) => {
  const $ = cheerio.load(res.text)
  const domList = $('#heroes_list .heroes_box').toArray()
  const saveJSON = { data: [] }
  const iconOffset = {}
  saveJSON.data = domList.map((item) => {
    const $this = $(item)
    const $nameSpan = $this.find('.heroes_name')
    const $img = $this.find('img')
    const $roleIcon = $this.find('.hero_icon')
    const role = $this.attr('data-role')
    if (!(role in iconOffset)) {
      iconOffset[role] = $roleIcon.css('background-position')
      // console.log($roleIcon.css('background-position'))
      console.log($roleIcon.css('width'))
    }
    return {
      enName: $this.attr('data-ename'),
      role: $this.attr('data-role'),
      game: $this.attr('data-game'),
      cnName: $nameSpan.text(),
      image: $img.attr('src'),
    }
  })
  console.log(`获取到${saveJSON.data.length}条数据`)
  console.log('开始存储到文件')
  // fs.writeFile(
  //   './iconsOffset.json',
  //   JSON.stringify(iconOffset),
  //   {
  //     encoding: 'utf8',
  //   },
  //   () => {},
  // )
  fs.writeFile(
    './HeroData.json',
    JSON.stringify(saveJSON),
    { encodin: 'utf8' },
    (err) => {
      if (err) throw err
      console.log('保存成功')
    },
  )
})
