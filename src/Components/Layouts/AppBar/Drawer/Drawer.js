import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import DrawerItems from './DrawerItems'

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
  constructor(props) {
    super(props)
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  state = {
    left: false,
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  }

  handleVideoSelection(video) {
    this.props.handleVideoSelection(video)
    this.setState({ // Dopo aver selezionato il video chiude il drawer
      left: false,
    })
  }

  render() {
    const { classes } = this.props

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent) // Se l'utente usa iOS evita che lo swype per chiudere/aprire il drawer chiuda la pagina

    const sideList = (
      <div className={classes.list}>
        <List><DrawerItems handleVideoSelection = {this.handleVideoSelection}/></List>
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
