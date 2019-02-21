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

  getRecentVideos() {
    var videos = localStorage.getItem('recent')
    if (videos) {
      videos = JSON.parse(videos)
      this.setState({
        videos: videos
      })
    } else {
      this.setState({
        videos: []
      })
    }
    //console.dir(videos)
  }

  handleVideoSelection(video) {
    this.props.handleVideoSelection(video, this.props.tabName)
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
              suggestion = {this.props.tabName}
              views = {i.timesWatched}
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
