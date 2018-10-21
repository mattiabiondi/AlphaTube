import React from 'react'
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

function Visualizer(props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Video />
        </Grid>
        <Grid item xs={12} >
          <VideoInfo />
        </Grid>
        <Grid item xs={12} >
          <VideoContent />
        </Grid>
      </Grid>
    </div>
  )
}

Visualizer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Visualizer)
