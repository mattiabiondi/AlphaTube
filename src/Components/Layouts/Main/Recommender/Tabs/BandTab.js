import React, { Component, Fragment} from 'react'
import VideoRenderer from './VideoRenderer'
import LoadingBar from '../../LoadingBar'
import YouTubeSearch from 'youtube-search'
import axios from 'axios'

class Band extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: []
    }
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
    this.removeDuplicates = this.removeDuplicates.bind(this)
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
                }LIMIT 20`
      var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
      axios.get(url)
      .then(function (response) {
        // console.dir(response.data.results.bindings)
        response.data.results.bindings.forEach(function(element) {
          var song = ''
          var artist = ''
          if (element.song.type === "uri") {
            song = element.song.value.split('/')[4]
          }
          else {
            song = element.song.value
          }
          artist = element.artist.value.split('/')[4]
          research.push(song + " " + artist)
        })
        console.log(research)
        this.generateVideoList(research)
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
    // for(var key in info) {
    //     if (info.hasOwnProperty(key)) video[key] = info[key]
    // }
    this.setState(prevState => ({
      videos: [...prevState.videos, video]
    }))
  }

  handleYouTubeSearch(research) {
    var opts = {
      maxResults: 1,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      type: "video",
    }
    YouTubeSearch(research, opts, function(err, results) {
      if(err) {
        console.log(err)
      }
      console.log(results[0])
      // this.handleResult(results[0])
    }.bind(this))
  }

  generateVideoList(research) {
    research.map(
      function(i) {
        this.handleYouTubeSearch(i)
      }.bind(this)
    )
  }

  handleVideoSelection(video) {
    this.props.handleVideoSelection(video, this.props.tabName)
  }

  render() {
    var videos = null
    if(this.state.videos.lenght > 0) {
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

export default Band
