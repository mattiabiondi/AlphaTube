import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { bottomItems } from './drawerItems'

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
})

class Drawer extends Component {
  state = {
    left: false,
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  }

  render() {
    const { classes } = this.props

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

    const sideList = (
      <div className={classes.list}>
        <List>{ bottomItems }</List>
      </div>
    )

    return (
      <div>
        <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Open drawer">
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
          {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}

Drawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles) (Drawer)
