const express = require('express') // Web framework
var cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path') // Tool per lavorare con file o path
const app  = express() // Definizione di express
const fetchComments = require('youtube-comments-task') // Modulo per ottenere commenti da video di YouTube
const fetchVideoInfo = require('youtube-info') // Modulo per ottenere info da video di YouTube
const fs = require('file-system')
const axios = require('axios')

app.use(express.static(path.join(__dirname, 'build'))) // Fornitura del nome della directory che contiene gli asset statici

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

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

app.get('/globalpop/', (req, res) => {
  var recommender = ["1829", "1828", "1838", "1839", "1846", /*"1822",*/ "1847", "1831", "1827", "1848", /*"1824",*/ /*"1830",*/ /*"1836",*/ "1850", /*"1849",*/ "1851", "1861", "1823", "1863", "1834", "1904", "1906", "1901", "1862", /*"1859",*/ /*"1841",*/ "1905", "1864"]
  var n = 0
  var videos = []
  var id = req.query.id
  if (!id) {
    recommender.forEach(function(number) {
      axios.get('http://site' + number + '.tw.cs.unibo.it/globpop')
      .then(function (response) {
        if(response.data.recommended) {
          response.data.recommended.forEach(function(video) {
            videos.push(video)
          })
        }
      })
      .catch(function (error) {
        console.log(number)
      })
      .then(function () {
        n += 1
        if(n === recommender.length) {
          res.send({
            videos: videos
          })
        }
      })
    })
  } else {
    recommender.forEach(function(number) {
      axios.get('http://site' + number + '.tw.cs.unibo.it/globpop', {
        params: {
          id: id
        }
      })
      .then(function (response) {
        if(response.data.recommended) {
          response.data.recommended.forEach(function(video) {
            videos.push(video)
          })
        }
      })
      .catch(function (error) {
        //console.log(error)
      })
      .then(function () {
        n += 1
        if(n === recommender.length) {
          res.send({
            videos: videos
          })
        }
      })
    })
  }

})


app.get('/globpop/', (req, res) => { // Risposta fornita quando si effettua una GET a "/globpop"
  var id = req.query.id // Parametro della richiesta
  if (!id) { // Se non c'è l'ID, devo far tornare la popolarità locale assoluta
    var filePath = path.join(__dirname, 'LAP.json')
    var readable = fs.createReadStream(filePath)
    readable.pipe(res)
  } else {
    var filePath = path.join(__dirname, 'LRP.json')
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err
      var localRelPop = JSON.parse(data)
      localRelPop.site = "site1858.tw.cs.unibo.it"
      localRelPop.recommender = id
      localRelPop.lastWatched = new Date()

      var temp = []
      localRelPop.recommended.forEach(
        function(video) {
          if(video.id === id) {
            temp = video.videosWatched
          }
        }
      )
      localRelPop.recommended = temp

      res.send(localRelPop)
    })
  }
})

app.post('/setlocalabspop/', function(req, res) {
    var data = req.body.data
    data = JSON.stringify(data)
    var filePath = path.join(__dirname, 'LAP.json')
    fs.writeFile(filePath, data, function(err) {
      if (err) {
         res.status(500).jsonp(
           {
             error: 'Failed to write file',
             debug: err
           }
         )
      } else {
        res.status(200).jsonp(
          {
            message: 'OK',
          }
        )
      }
    })
})

app.post('/setlocalrelpop/', function(req, res) {
    var prevVideo = req.body.params.prevVideo // id del video precedente
    var video = req.body.params.video // id del video attuale

    var filePath = path.join(__dirname, 'LRP.json') // path del file LRP
    fs.readFile(filePath, 'utf8', (err, data) => { // leggo il file LRP
      if (err) throw err
      var localRelPop = JSON.parse(data) // lo converto a JSON
      var toAdd1 = true // boolean che controlla che il video precedente sia stato visto o meno. Nel caso non sia stato visto, bisogna aggiungerlo
      localRelPop.recommended.forEach( // per ogni elemento di recommended (AKA i video visti prima del video attuale)
        function(i) {
          if(i.id === prevVideo) { // controllo che il video precedente sia già presente nell'array
            toAdd1 = false // se esiste, non devo aggiungerlo
            var toAdd2 = true // boolean che controlla che il video attuale sia già stato visto dopo il video precedente
            i.videosWatched.forEach( // per ogni elemento di videosWatched (AKA visti visti dopo il precedente)
              function(obj) {
                if(obj.videoID === video) { // controllo che il video attuale sia già stato visto dopo il precedenete
                  toAdd2 = false // se esiste, non devo aggiungerlo ma solo aumentare di 1 le views
                  obj.timesWatched += 1 // aumento di 1 le views
                }
              }
            )
            if(toAdd2) { // se questo è true, è perchè il video attuale non è mai stato visto dopo il video precedente
              var vid = { // creo un oggetto "vid" con 1 singola view
                videoID: video,
                timesWatched: 1,
                prevalentReason: "Local relative popularity",
                lastSelected: new Date()
              }
            }
            i.videosWatched.push(vid) // aggiungo questo oggetto "vid" all'array di video visti dopo il precedente
          }
        }
      )
      if(toAdd1) { // se questo è true, il video precedente non è mai stato visto prima di qualunque altro video
        var vid1 = { // creo un oggetto per identificare il video precedente
          id: prevVideo,
          videosWatched: []
        }
        var vid2 = { // creo un oggetto per il video attuale
          videoID: video,
          timesWatched: 1,
          prevalentReason: "Local relative popularity",
          lastSelected: new Date()
        }
        vid1.videosWatched.push(vid2) // aggiungo il video attuale all'array di video visti dopo il precedente, creando la relazione
        localRelPop.recommended.push(vid1) // aggiungo il video precedente all'array di video visti prima di qualcosa
      }

      localRelPop = JSON.stringify(localRelPop) // converto l'oggetto in JSON

      fs.writeFile(filePath, localRelPop, function(err) { // scrivo il file
        if (err) {
           res.status(500).jsonp(
             {
               error: 'Failed to write file',
               debug: err
             }
           )
        } else {
          res.status(200).jsonp(
            {
              message: 'OK',
            }
          )
        }
      })
    })
})

app.listen(8000) // La porta su cui l'app è in ascolto
