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
    if(this.props.resource) {
      var query = `SELECT DISTINCT ?work   WHERE {
                  <` + this.props.resource + `> dbo:artist ?artist.
                  ?work dbo:artist ?artist
                  }`
      var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
      axios.get(url)
      .then(function (response) {
        console.log(response)
      }.bind(this))
      .catch(function (error) {
        console.log('error')
      })
    }
  }

  // handleResult(video, info) {
  //   for(var key in info) {
  //       if (info.hasOwnProperty(key)) video[key] = info[key]
  //   }
  //   this.setState(prevState => ({
  //     videos: [...prevState.videos, video]
  //   }))
  // }
  //
  // handleYouTubeSearch(video) {
  //   var opts = {
  //     maxResults: 1,
  //     key: process.env.REACT_APP_YOUTUBE_API_KEY,
  //     type: "video",
  //   }
  //
  // YouTubeSearch(video.videoID, opts, function(err, results) {
  //     if(err) {
  //       // console.log(err)
  //       return console.log("Il video " + video.videoID + " non è disponibile.")
  //     }
  //     this.handleResult(results[0], video)
  //   }.bind(this))
  // }
  //
  // generateVideoList(videos) {
  //   videos.map(
  //     function(i) {
  //       this.handleYouTubeSearch(i)
  //     }.bind(this)
  //   )
  // }

  handleVideoSelection(video) {
    this.props.handleVideoSelection(video, this.props.tabName)
  }

  render() {
    console.log(this.props.resource)
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

export default Artist
