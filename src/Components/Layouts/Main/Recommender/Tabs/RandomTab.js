import React, { Component, Fragment} from 'react'
import VideoRenderer from './VideoRenderer'
import LoadingBar from '../../LoadingBar'
import YouTubeSearch from 'youtube-search'
import randomWords from 'random-words'

class Random extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: []
    }
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  componentDidMount() {
     this.generateRandomVideos()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.video !== this.props.video) {
      this.setState({
        videos: []
      })
      this.generateRandomVideos()
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

  generateRandomVideos() {
    for (var i = 0; i < 20; i++) {
      var term = randomWords()
      this.handleYouTubeSearch(term)
    }
  }

  handleVideoSelection(video) {
    this.props.handleVideoSelection(video)
  }

  render() {
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
              suggestion = {"random music video"}
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

export default Random
