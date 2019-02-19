import React, { Component, Fragment} from 'react'
import VideoRenderer from './VideoRenderer'
import YouTubeSearch from 'youtube-search'
import LoadingBar from '../../LoadingBar'

class Related extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: null
    }
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  componentDidMount() {
    this.handleYouTubeSearch()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.video !== this.props.video) {
      this.setState({ videos: null })
      this.handleYouTubeSearch()
    }
  }

  handleVideoSelection(video) {
    this.props.handleVideoSelection(video)
  }

  handleYouTubeSearch() {
    if(this.props.video) {
      var opts = {
        maxResults: 20,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        type: "video",
        videoCategoryId: 10,
        relatedToVideoId: this.props.video.id
      }

      YouTubeSearch(' ', opts, function(err, results) {
        if(err)
          return console.log(err)
        //console.dir(results)
        this.setState({ videos: results })
      }.bind(this))
    }
  }

  render() {
    var videos = null
    if(this.state.videos){
        videos = this.state.videos
      }

    if(videos) {
      var list = videos.map(
        function(i) {
          return (
            <VideoRenderer
              video = {i}
              suggestion = {"related video"}
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

export default Related
