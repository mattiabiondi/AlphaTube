import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Visualizer from './Visualizer/Visualizer'
import Recommender from './Recommender/Recommender'

const styles = theme => ({
  root: {
    width: '100%',
  },
})

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video: null
    }

    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  handleVideoSelection(videoId) {
    this.setState({ video: videoId })
  }

  render() {
    const { classes } = this.props

    const videos = this.props.videos

    return (
      <div className={classes.root}>
        <Grid container
          spacing={8}
          direction="row">
          <Grid item xs={12} sm={6}>
            <Visualizer video = {this.state.video} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Recommender
              videos = {videos}
              handleVideoSelection = {this.handleVideoSelection}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Main)
