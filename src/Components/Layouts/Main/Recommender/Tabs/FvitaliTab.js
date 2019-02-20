import React, { Component, Fragment} from 'react'
import VideoRenderer from './VideoRenderer'
import LoadingBar from '../../LoadingBar'
import YouTubeSearch from 'youtube-search'
import axios from 'axios'

class Fvitali extends Component {
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
    if (prevProps.video !== this.props.video) {
      this.setState({
        videos: []
      })
      this.getVideos()
    }
  }

  handleResult(video, info) {
    for(var key in info) {
        if (info.hasOwnProperty(key)) video[key] = info[key]
    }
    this.setState(prevState => ({
      videos: [...prevState.videos, video]
    }))
  }

  handleYouTubeSearch(video) {
    var opts = {
      maxResults: 1,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      type: "video",
    }

    YouTubeSearch(video.videoID, opts, function(err, results) {
      if(err) {
        // console.log(err)
        return console.log("Il video " + video.videoID + " non è disponibile.")
      }
      this.handleResult(results[0], video)
    }.bind(this))
  }

  generateVideoList(videos) {
    videos.map(
      function(i) {
        this.handleYouTubeSearch(i)
      }.bind(this)
    )
  }

  getVideos() {
    if(this.props.video) {
      var id = this.props.video.id
      axios.get('http://site1825.tw.cs.unibo.it/TW/globpop', {
        params: {
          id: id
        }
      })
      .then(function (response) {
        //console.dir(response.data.recommended)
        this.generateVideoList(response.data.recommended)
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        // always executed
      })
    } else {
      axios.get('http://site1825.tw.cs.unibo.it/TW/globpop')
      .then(function (response) {
        //console.dir(response.data.recommended)
        this.generateVideoList(response.data.recommended)
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        // always executed
      })
    }
  }

  handleVideoSelection(video) {
    this.props.handleVideoSelection(video, this.props.tabName)
  }

  render() {
    var videos = null
    if(this.state.videos.length > 0){
        videos = this.state.videos
    }

    if(videos) {
      var list = videos.map(
        function(i) {
          if(i) {
            return (
              <VideoRenderer
                video = {i}
                suggestion = {i.prevalentReason}
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
    else {
      return (
        <Fragment>
          <LoadingBar />
        </Fragment>
      )
    }
  }
}

export default Fvitali
