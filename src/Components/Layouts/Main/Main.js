import React from 'react'
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

function Main(props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <Grid container
        spacing={8}
        direction="row">
        <Grid item xs={12} sm={6}>
          <Visualizer />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Recommender />
        </Grid>
      </Grid>
    </div>
  )
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Main)
