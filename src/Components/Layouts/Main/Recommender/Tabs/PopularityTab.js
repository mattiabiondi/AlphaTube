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

  handleYouTubeSearch(video) {
    var opts = {
      maxResults: 1,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      type: "video",
      videoCategoryId: 10,
    }

    YouTubeSearch(video.videoID, opts, function(err, results) {
      if(err)
        return console.log(err)
      if(results[0]) { // Controllo perchè a volte ritorna "undefined"
        results[0].prevalentReason = video.prevalentReason
        results[0].timesWatched = video.timesWatched
        this.handleResult(results[0])
      }
    }.bind(this))
  }

  generateVideos(data) {
    data.forEach(
      function(video) {
        this.handleYouTubeSearch(video)
      }.bind(this)
    )
  }

  sortByViews(a, b) { // ordina in base alle views
    const viewsA = a.timesWatched
    const viewsB = b.timesWatched

    var comparison = 0
    if (viewsA > viewsB) {
      comparison = -1
    } else if (viewsA < viewsB) {
      comparison = 1
    }
    return comparison
  }

  removeDuplicates(videos) {
    var temp = []
    videos.forEach(function(video) {
      var toAdd = true
      temp.forEach(function(i) {
        if(i.videoID === video.videoID) {
          toAdd = false
          i.timesWatched += 1
        }
      })
      if(toAdd) {
        temp.push(video)
      }
    })
    //console.dir(temp)
    return temp
  }

  getGlobalRelPopularity() {
    axios.get('/globalpop', {
      params: {
        id: this.props.video.id
      }
    })
    .then(function (response) {
      var videos = response.data.videos
      videos = this.removeDuplicates(videos)
      videos = videos.sort(this.sortByViews)
      this.generateVideos(videos)
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }

  getGlobalAbsPopularity() {
    axios.get('/globalpop')
    .then(function (response) {
      var videos = response.data.videos
      videos = this.removeDuplicates(videos)
      videos = videos.sort(this.sortByViews)
      //console.dir(videos)
      this.generateVideos(videos)
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }

  getLocalRelPopularity() {
    axios.get('/globpop', {
      params: {
        id: this.props.video.id
      }
    })
    .then(function (response) {
      this.generateVideos(response.data.recommended)
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
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
      if(this.state.relative) {
        this.getGlobalRelPopularity()
      } else {
        this.getGlobalAbsPopularity()
      }
    } else {
      if(this.state.relative) {
        this.getLocalRelPopularity()
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
    this.props.handleVideoSelection(video, this.props.tabName)
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
              suggestion = {i.prevalentReason}
              views = {i.timesWatched}
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
