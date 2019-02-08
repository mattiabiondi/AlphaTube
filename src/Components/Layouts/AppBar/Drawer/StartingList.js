import React, { Component, Fragment } from 'react'
import LoadingBar from '../../Main/LoadingBar'
import YouTubeSearch from 'youtube-search'
import VideoRenderer from '../../Main/Recommender/Tabs/VideoRenderer'
import axios from 'axios'

class StartingList extends Component {
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
      if(err)
        return console.log(err)
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
    axios.get('http://site1825.tw.cs.unibo.it/video.json')
    .then(function (response) {
      console.dir(response.data)
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

export default StartingList
