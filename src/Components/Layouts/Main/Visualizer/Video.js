import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
  },
})

function Video(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      VIDEO
    </Paper>
  )
}

Video.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Video);
