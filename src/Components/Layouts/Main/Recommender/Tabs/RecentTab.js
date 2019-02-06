import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import VideoRenderer from './VideoRenderer'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import YouTubeSearch from 'youtube-search'

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit,
    width: '100%',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

class Recent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: []
    }
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
    this.deleteCookie = this.deleteCookie.bind(this)
  }

  componentDidMount() {
    this.getRecentVideos()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.video !== this.props.video) {
      this.setState({
        videos: []
      })
      this.getRecentVideos()
    }
  }

  deleteCookie() {
    document.cookie = "recent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    this.setState({
      videos: []
    })
  }

  getRecentCookie() {
    var term = "recent="
    var decodedCookie = decodeURIComponent(document.cookie)
    var cookieArray = decodedCookie.split(';')
    for(var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i]
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1)
      }
      if (cookie.indexOf(term) === 0) {
        return cookie.substring(term.length, cookie.length)
      }
    }
    return ""
  }

  cleanVideos(videos) {
    var videosCleaned = [...new Set(videos)]
    return videosCleaned
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

  getRecentVideos() {
    var recentCookie = this.getRecentCookie()
    if(recentCookie !== "") {
      var videos = JSON.parse(recentCookie)
      videos = this.cleanVideos(videos)
      videos.map(
        function(i) {
          this.handleYouTubeSearch(i)
        }.bind(this)
      )
    }
  }

  handleVideoSelection(videoId) {
    this.props.handleVideoSelection(videoId)
  }

  render() {
    const { classes } = this.props

    var videos = null
    if(this.state.videos.length > 0) {
      videos = this.state.videos
    }

    var recentCookie = this.getRecentCookie()
    var recentVideos = null
    if(recentCookie !== "") {
      recentVideos = JSON.parse(recentCookie)
    }

    if(videos && recentVideos) {
      if(videos[0].id !== recentVideos[0]) {
        console.dir("video: " + videos[0].id)
        console.dir("cookie: " + recentVideos[0])
        console.dir("state: " + this.state.videos[0].id)
        // qua c'è un problema
      }
    }

    if(videos) {
      var list = videos.map(
        function(i) {
          return (
            <VideoRenderer
              video = {i}
              suggestion = {"Recent music video."}
              handleVideoSelection = {this.handleVideoSelection}
            />
          )
        }.bind(this)
      )

      return (
        <Fragment>
          <Button
            onClick = {this.deleteCookie}
            variant = "contained"
            color = "secondary"
            className = {classes.button}>
              Clear history
            <DeleteIcon className={classes.rightIcon} />
          </Button>
          {list}
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <Button
            onClick = {this.deleteCookie}
            variant = "contained"
            color = "secondary"
            className = {classes.button}>
              Clear history
            <DeleteIcon className={classes.rightIcon} />
          </Button>
        </Fragment>
      )
    }
  }
}

Recent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Recent)
