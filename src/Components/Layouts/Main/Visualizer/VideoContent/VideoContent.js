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
import Description from './Description/Description'
import Comments from './Comments/Comments'
import Wikipedia from './Wikipedia/Wikipedia'
import Fade from '@material-ui/core/Fade'

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
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      checked: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState(
        {
          checked: true,
          value: 0
        }
      )
   }
   if (prevProps.wikipedia !== this.props.wikipedia) {
     this.setState(
       {
         value: 2
       }
     )
    }
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    return (
      <Fade in={this.state.checked}>
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
          {this.state.value === 0 && <TabContainer><Description description = {this.props.description}/></TabContainer>}
          {this.state.value === 1 && <TabContainer><Comments comments = {this.props.comments}/></TabContainer>}
          {this.state.value === 2 && <TabContainer><Wikipedia wikipedia = {this.props.wikipedia}/></TabContainer>}
        </Paper>
      </Fade>
    )
  }
}

VideoContent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(VideoContent)
