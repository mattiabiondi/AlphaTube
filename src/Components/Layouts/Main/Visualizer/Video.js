import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import YouTube from 'react-youtube'
import Fade from '@material-ui/core/Fade'


const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
  },
})

class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 0,
      checked: false
    }
    this.tracking = false
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.count = this.count.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState(
        {
          seconds:0,
          checked: true
        }
      )
    }
  }

  render() {
    const { classes } = this.props
    const opts = {
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: false
      }
    }

    return (
      <Fade in={this.state.checked}>
        <Paper className={classes.root}>
          <YouTube
            videoId={this.props.id}
            opts={opts}
            onPlay={
              this.startTimer
            }
            onPause={
              this.stopTimer
            }
          />
        </Paper>
      </Fade>
    )
  }

  startTimer() {
    if (this.tracking==false){
      this.tracking = true
      this.timer = setInterval(this.count, 1000)
    }
  }

  stopTimer() {
    this.tracking = false
    clearInterval(this.timer)
  }

  count() {
    var sec = this.state.seconds + 1
    this.setState({
      seconds: sec
    })
    console.log(this.state.seconds)
  }

}

Video.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Video);
