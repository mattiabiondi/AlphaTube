import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    display: 'inline-block'
  },
  content: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
})

class Info extends Component {
  render() {
    const { classes } = this.props

    return (
      <Typography className={classes.content}>
        <div>
          Song: <Typography className={classes.heading}>{this.props.song}</Typography>
          <br/>
          Artist: <Typography className={classes.heading}>{this.props.artist}</Typography>
          <br/>
          Album: <Typography className={classes.heading}>{this.props.album}</Typography>
          <br/>
          Year: <Typography className={classes.heading}>{this.props.year}</Typography>
          <br/>
          Genre: <Typography className={classes.heading}>{this.props.genre}</Typography>
          <br/>
          YouTube: <Typography className={classes.heading}>{this.props.id}</Typography>
        </div>
      </Typography>
    )
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Info)
