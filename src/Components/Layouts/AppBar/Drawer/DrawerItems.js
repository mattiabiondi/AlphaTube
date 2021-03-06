import React, { Component } from 'react'
import Demo from './Demo'
import Feedback from './Feedback'
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
        <Feedback />
        <Info />
      </div>
    )
  }
}

export default DrawerItems
