import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Video from './Video'
import VideoInfo from './VideoInfo'
import VideoContent from './VideoContent'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

class Visualizer extends Component {
  render() {
    const { classes } = this.props

    const video = this.props.video
    var id = ""
    var title = ""
    var description = ""

    if(typeof(video) !== 'undefined' && video != null) {
      id = video.id
      title = video.title
      description = video.description
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Video id={id}/>
          </Grid>
          <Grid item xs={12} >
            <VideoInfo title={title} description={description}/>
          </Grid>
          <Grid item xs={12} >
            <VideoContent description={description}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Visualizer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Visualizer)
