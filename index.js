const express = require('express')
const path = require('path')
const app  = express()
const fetchComments = require('youtube-comments-task')

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/comments/', (req, res) => {
  var id = req.query.id
  if (!id) {
    res.send({
      error: 'no ID'
    })
    return
  }

  fetchComments(id)
  .fork(e => {
    res.send({
      error: e
    })
  }, p => {
    res.send({
      comments: p.comments,
      next_page: p.nextPageToken,
    })
  })
})

app.listen(8000)