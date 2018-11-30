import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Drawer from './Drawer/Drawer'
import Search from './Search'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
})

class SearchAppBar extends Component {
  constructor(props){
      super(props);

      this.handleResults = this.handleResults.bind(this)
  }

  handleResults(results) {
    this.props.handleResults(results)
  }

  render() {
  const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Drawer />

            <Typography className={classes.title} variant="title" color="inherit" noWrap>
              &alpha;Tube
            </Typography>

            <div className={classes.grow} />
            <Search handleResults={this.handleResults}/>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SearchAppBar)
