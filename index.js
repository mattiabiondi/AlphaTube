const express = require('express') // Web framework
const path = require('path') // Tool per lavorare con file o path
const app  = express() // Definizione di express
const fetchComments = require('youtube-comments-task') // Modulo per ottenere commenti da video di YouTube
const fetchVideoInfo = require('youtube-info') // Modulo per ottenere info da video di YouTube

app.use(express.static(path.join(__dirname, 'build'))) // Fornitura del nome della directory che contiene gli asset statici

app.get('/', (req, res) => { // Risposta fornita quando si effettua una GET alla root del sito
    res.sendFile(path.join(__dirname, 'build', 'index.html')) // La funzione ritorna un file ("/build/index.html")
})

app.get('/info/', (req, res) => { // Risposta fornita quando si effettua una GET a "/info"
  var id = req.query.id // Parametro della richiesta
  if (!id) {
    res.send({
      error: 'no ID' // Se la GET non ha parametri ritorna un errore
    })
    return
  }

  fetchVideoInfo(id).then(function (videoInfo) { // Esegue la funzione sulla base dell'ID fornito,
    res.send(videoInfo)                          // poi ritorna le info del video
  })
})

app.get('/comments/', (req, res) => { // Risposta fornita quando si effettua una GET a "/comments"
  var id = req.query.id // Parametro della richiesta
  if (!id) {
    res.send({
      error: 'no ID' // Se la GET non ha parametri ritorna un errore
    })
    return
  }

  fetchComments(id) // Esegue la funzione sulla base dell'ID fornito,
  .fork(e => { // La fork spawna una nuova istanza del processo Node.js. Questo permette all'applicazione di restare attiva, di non bloccarsi durante l'esecuzione della funzione
    res.send({
      error: e
    })
  }, p => {
    res.send({ // La risposta viene fornita sotto forma di due parametri
      comments: p.comments,
      next_page: p.nextPageToken,
    })
  })
})

app.listen(8000) // La porta su cui l'app è in ascolto
