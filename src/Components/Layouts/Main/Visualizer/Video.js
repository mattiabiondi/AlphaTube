import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'


const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

function Video(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      VIDEO
    </Paper>
  )
}

Video.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Video);
