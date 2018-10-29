import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import YouTube from 'react-youtube';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
  },
})

class Video extends Component {
  render() {
    const { classes } = this.props
    const videos = this.props.videos
    var id = "MZ_fuULswHo"

    if(videos != null)
      id = videos[0].id

    const opts = {
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: false
      }
    }

    return (
      <Paper className={classes.root}>
        <YouTube
          videoId={id}
          opts={opts}
        />
      </Paper>
    )
  }
}

Video.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Video);
