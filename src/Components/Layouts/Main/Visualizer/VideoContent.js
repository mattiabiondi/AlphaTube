import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import DescriptionIcon from '@material-ui/icons/Description'
import CommentIcon from '@material-ui/icons/Comment'
import PublicIcon from '@material-ui/icons/Public'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
})

class VideoContent extends Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<DescriptionIcon />} label="DESCRIPTION" />
          <Tab icon={<CommentIcon />} label="COMMENTS" />
          <Tab icon={<PublicIcon />} label="WIKIPEDIA" />
        </Tabs>
        {value === 0 && <TabContainer>Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.</TabContainer>}
        {value === 1 && <TabContainer>Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet.</TabContainer>}
        {value === 2 && <TabContainer>Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.</TabContainer>}
      </Paper>
    )
  }
}

VideoContent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(VideoContent)
