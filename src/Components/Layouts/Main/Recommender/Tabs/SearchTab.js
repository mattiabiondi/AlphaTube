import React, { Component, Fragment} from 'react'
import VideoRenderer from './VideoRenderer'
import LoadingBar from '../../LoadingBar'

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      videos: null
    }
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  componentDidMount() {
     this.setState({videos: this.props.videos})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videos !== this.props.videos) {
      this.setState({
        videos: this.props.videos
      })
    }
  }

  handleVideoSelection(videoId) {
    this.props.handleVideoSelection(videoId)
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
          <LoadingBar />
        </Fragment>
      )
    }
  }
}

export default Search
