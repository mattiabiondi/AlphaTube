import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Visualizer from './Visualizer/Visualizer'
import Recommender from './Recommender/Recommender'
import scrollToComponent from 'react-scroll-to-component'

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

  componentDidUpdate(prevProps) {
    if (prevProps.videos !== this.props.videos) {
      scrollToComponent(this.Recommender, {
        offset: 0,
        align: 'top',
        duration: 0,
      })
    }
  }

  handleVideoSelection(video) {
    this.setState({ video: video })
  }

  render() {
    const { classes } = this.props

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
              ref = {(section) => { this.Recommender = section }}
              videos = {this.props.videos}
              video = {this.state.video}
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
