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
