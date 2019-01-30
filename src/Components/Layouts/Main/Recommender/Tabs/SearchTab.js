import React, { Component, Fragment} from 'react'
import VideoRenderer from './VideoRenderer'

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      videos: null
    }
  }

  componentDidMount() {
     this.setState({videos: this.props.videos})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videos !== this.props.videos) {
     this.setState({videos: this.props.videos})
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
              title = {i.title}
              image = {i.thumbnails.high.url}
              imageTitle = {i.title}
              description = {i.description}
            />
          )
        }
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

export default Search
