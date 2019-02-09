import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FeedbackIcon from '@material-ui/icons/Feedback'
import Demo from './Demo'
import Info from './Info'

// Lista degli elementi del Drawer

class DrawerItems extends Component {
  constructor(props) {
    super(props)
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  handleVideoSelection(video) {
    this.props.handleVideoSelection(video)
  }

  render() {
    return (
      <div>
        <Demo handleVideoSelection = {this.handleVideoSelection} />
        <ListItem button>
          <ListItemIcon>
            <FeedbackIcon />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
        <Info />
      </div>
    )
  }
}

export default DrawerItems
