import React, { Component, Fragment} from 'react'
import VideoRenderer from './VideoRenderer'
import YouTubeSearch from 'youtube-search'

class Related extends Component {

  constructor(props) {
    super(props)
    this.state = {
      videos: null
    }
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  componentDidMount() {
     if(this.props.video!== null) { this.setState({videos: this.handleYouTubeSearch()}) }
  }

  // ancora da fare l'aggiornamento
  // componentDidUpdate(prevProps) {
  //   if (prevProps.videos !== this.props.videos) {
  //    this.setState({videos: this.props.videos})
  //    this.handleYouTubeSearch()
  //  }
  // }

  handleVideoSelection(videoId) {
    this.props.handleVideoSelection(videoId)
  }

  handleYouTubeSearch() {
    var opts = {
      maxResults: 10,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      type: "video",
      videoCategoryId: 10,
      relatedToVideoId: this.props.video.id
    }

    YouTubeSearch(' ', opts, function(err, results) {
      if(err)
        return console.log(err)
      console.dir(results)
      this.setState({ videos: results })
    }.bind(this))
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

        </Fragment>
      )
    }
  }
}

export default Related
