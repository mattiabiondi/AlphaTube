import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  content: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
})

function VideoInfo(props) {
  const { classes } = props
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>
          Informazioni sul video
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography className={classes.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

VideoInfo.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(VideoInfo)
