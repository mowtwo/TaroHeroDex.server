const express = require('express')
const app = express()
const json = require('../HeroData.json')

app.use('/images', express.static('./images'))

app.get('/list', (req, res) => {
  res.json(json)
})

app.listen(3456, (err) => {
  if (err) throw err
  console.log(`server run at http://127.0.0.1:3456`)
})
