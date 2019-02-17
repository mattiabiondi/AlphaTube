import React, { Component, Fragment} from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import VideoRenderer from './VideoRenderer'
import YouTubeSearch from 'youtube-search'
import LoadingBar from '../../LoadingBar'
import axios from 'axios'

class Popularity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      global: false,
      relative: false,
      videos: [],
    }
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  componentDidMount() {
     this.getPopularity()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.video !== this.props.video || prevState.global !== this.state.global || prevState.relative !== this.state.relative) {
      this.setState({
        videos: []
      })
      this.getPopularity()
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

  generateVideos(data) {
    data.forEach(
      function(i) {
        this.handleYouTubeSearch(i.videoID)
      }.bind(this)
    )
  }

  getLocalAbsPopularity() {
    axios.get('/globpop')
    .then(function (response) {
      this.generateVideos(response.data.recommended)
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }

  getPopularity() {
    if (this.state.global) {

    } else {
      if(this.state.relative) {

      } else {
        this.getLocalAbsPopularity()
      }
    }

  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked })
    this.forceUpdate()
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
              suggestion = {"to do"}
              handleVideoSelection = {this.handleVideoSelection}
            />
          )
        }.bind(this)
      )

      return (
        <Fragment>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.global}
                  onChange={this.handleChange('global')}
                  value="global"
                />
              }
              label="Global"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.relative}
                  onChange={this.handleChange('relative')}
                  value="relative"
                />
              }
              label="Relative"
            />
          </FormGroup>
          {list}
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.global}
                  onChange={this.handleChange('global')}
                  value="global"
                />
              }
              label="Global"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.relative}
                  onChange={this.handleChange('relative')}
                  value="relative"
                />
              }
              label="Relative"
            />
          </FormGroup>
          <LoadingBar />
        </Fragment>
      )
    }
  }
}

export default Popularity
