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
      this.setState(prevState => ({
        videos: []
      }))
      this.getVideos()
    }
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
      this.handleResult(results[0])
    }.bind(this))
  }

  generateVideoList(videos) {
    videos.map(
      function(i) {
        this.handleYouTubeSearch(i.videoID)
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
        console.dir(response.data.recommended)
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

  handleVideoSelection(videoId) {
    this.props.handleVideoSelection(videoId)
  }

  render() {
    var videos = null
    if(this.state.videos.length > 0){
        videos = this.state.videos
        console.dir(videos)
      }

    if(videos) {
      var list = videos.map(
        function(i) {
          if(i) {
            return (
              <VideoRenderer
                video = {i}
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
