import React, { Component, Fragment } from 'react'
import LoadingBar from '../../Main/LoadingBar'
import YouTubeSearch from 'youtube-search'
import VideoRenderer from '../../Main/Recommender/Tabs/VideoRenderer'
import axios from 'axios' // Clien HTTP basato sulle Promise

class StartingList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: []
    }
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  componentDidMount() {
    this.getVideos() // Appena il componente viene caricato, esegue la funzione
  }

  handleResult(video, info) { // Funzione che serve per fare un merge di due oggetti, quelli del JSON della lista di partenza e quelli risultanti dalla ricerca
    for(var key in info) {
        if (info.hasOwnProperty(key)) video[key] = info[key]
    }
    video.title = info.artist + " - " + info.title
    this.setState(prevState => ({
      videos: [...prevState.videos, video] // Equivale alla push, aggiunge un elemento all'Array
    }))
  }

  handleYouTubeSearch(video) {
    var opts = {
      maxResults: 1, // Un solo risultato, quello basato sull'ID specifico del video
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      type: "video",
    }

    YouTubeSearch(video.videoID, opts, function(err, results) {
      if(err) {
        //console.log(err)
        return console.log("Il video " + video.videoID + " non è disponibile.")
      }
      this.handleResult(results[0], video)
    }.bind(this))
  }

  generateVideoList(videos) { // Per ogni elemento di videos esegue una ricerca su YouTube per ottenere i video
    videos.map(
      function(i) {
        this.handleYouTubeSearch(i)
      }.bind(this)
    )
  }

  getVideos() {
    axios.get('http://site1825.tw.cs.unibo.it/video.json') // URL a cui fare richiesta per ottenere la lista
    .then(function (response) {
      //console.dir(response.data)
      this.generateVideoList(response.data)
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
    .then(function () {
      // always executed
    })
  }

  handleVideoSelection(video) {
    this.props.handleVideoSelection(video)
  }

  render() {
    var videos = null
    if(this.state.videos.length > 0) { // Se l'array non è vuoto
        videos = this.state.videos
    }

    if(videos) { // Per ogni oggetto renderizzo una Card (Material Design) con l'anteprima del video e la inserisco in una lista
      var list = videos.map(
        function(i) {
          if(i) {
            return (
              <VideoRenderer
                video = {i}
                suggestion = "Starting list"
                timesWatched = {i.timesWatched}
                handleVideoSelection = {this.handleVideoSelection}
              />
            )
          }
        }.bind(this)
      )

      return (
        <Fragment>
          {list}
        </Fragment>
      )
    }
    else { // Se la lista dei video è vuota mostro una barra di caricamento
      return (
        <Fragment>
          <LoadingBar />
        </Fragment>
      )
    }
  }
}

export default StartingList
