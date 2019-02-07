import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import VideoRenderer from './VideoRenderer'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

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
    this.clearHistory = this.clearHistory.bind(this)
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

  clearHistory() {
    localStorage.removeItem('recent')
    this.setState({
      videos: []
    })
  }

  cleanVideos(videos) {
    var videosCleaned = [...new Set(videos)]
    return videosCleaned
  }

  getRecentVideos() {
    var videos = localStorage.getItem('recent')
    videos = JSON.parse(videos)
    videos = this.cleanVideos(videos)
    this.setState({
      videos: videos
    })
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
            onClick = {this.clearHistory}
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
            onClick = {this.clearHistory}
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
