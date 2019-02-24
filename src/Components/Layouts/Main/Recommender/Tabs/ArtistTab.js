import React, { Component, Fragment} from 'react'
import VideoRenderer from './VideoRenderer'
import LoadingBar from '../../LoadingBar'
import YouTubeSearch from 'youtube-search'
import axios from 'axios'

class Artist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: []
    }
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
    this.handleYouTubeSearch = this.handleYouTubeSearch.bind(this)
    this.removeDuplicates = this.removeDuplicates.bind(this)
    this.handleResult = this.handleResult.bind(this)
  }

  componentDidMount() {
    this.getVideos()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resource !== this.props.recource) {
      this.setState({
        videos: []
      })
      this.getVideos()
    }
  }

  getVideos() {
    var research = []
    if(this.props.resource) {
      var query = `SELECT DISTINCT ?artist ?song WHERE {
                  {<` + this.props.resource + `> dbo:artist ?artist.}
                  UNION
                  {<` + this.props.resource + `> dbo:musicalArtist ?artist.}
                  ?work dbo:artist ?artist.
                  ?work dbp:title ?song.
                }`
      var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
      axios.get(url)
      .then(function (response) {
        var chosenNumbers = []
        var videosToShow = 20
        if(videosToShow>response.data.results.bindings.length) videosToShow=response.data.results.bindings.length
        for(var i=0;i<(videosToShow*3);i++) {
          var num = Math.floor((Math.random() * (response.data.results.bindings.length-1)))
          chosenNumbers.push(num)
        }
        chosenNumbers = this.removeDuplicates(chosenNumbers)
        for(var i=0; i<(chosenNumbers.length); i++) {
        num = chosenNumbers[i]
        var song = ''
        var artist = ''
        if (response.data.results.bindings[num].song.type === "uri") {
          song = response.data.results.bindings[num].song.value.split('/')[4]
        }
        else {
          song = response.data.results.bindings[num].song.value.split('"')[0]
        }
        artist = response.data.results.bindings[num].artist.value.split('/')[4]
        research.push(song + " " + artist)
        }
        console.log(research)
        research.forEach (function(term) {
          this.handleYouTubeSearch(term)
        }.bind(this))
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
    }
  }

  removeDuplicates(array) {
    let uniqueArray = []
    for(let i = 0;i < array.length; i++){
        if(uniqueArray.indexOf(array[i]) == -1){
            uniqueArray.push(array[i])
        }
    }
    return uniqueArray
  }

  handleResult(video) {
    this.setState(prevState => ({
      videos: [...prevState.videos, video]
    }))
  }

  handleYouTubeSearch(term) {
    var opts = {
      maxResults: 1,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      type: "video",
      videoCategoryId: 10,
    }

    YouTubeSearch(term, opts, function(err, results) {
      if(err)
        return console.log(err)
      if(results[0])
        // this.handleResult(results[0])
    }.bind(this))
  }

  handleVideoSelection(video) {
    this.props.handleVideoSelection(video, this.props.tabName)
  }

  render() {
    // console.log(this.props.resource)
    var videos = null
    if(this.state.videos.length > 0) {
      videos = this.state.videos
    }

    if(videos) {
      var list = videos.map(
        function(i) {
          return (
            <VideoRenderer
              video = {i}
              suggestion = {this.props.tabName}
              handleVideoSelection = {this.handleVideoSelection}
            />
          )
        }.bind(this)
      )

      return (
        <Fragment>
          {list}
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <LoadingBar />
        </Fragment>
      )
    }
  }
}

export default Artist
