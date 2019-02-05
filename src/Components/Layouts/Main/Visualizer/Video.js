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
      checked: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState(
        {
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
          />
        </Paper>
      </Fade>
    )
  }
}

Video.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Video);
