import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import YouTubeSearch from 'youtube-search'
const API_KEY = 'AIzaSyA_L8Z7CnCV2q9yIysVeafwklZRbwya1w8'

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 100,
      '&:focus': {
        width: 250,
      },
    },
  },
})

class Search extends Component {
  constructor(props){
      super(props);
      this.state = { term: '' };
      this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
      this.setState({ term: event.target.value });
      this.handleYTsearch(event.target.value)
  }

  handleYTsearch(term) {
    var opts = {
      maxResults: 10,
      key: API_KEY
    };

    YouTubeSearch(term, opts, function(err, results) {
      if(err)
        return console.log(err);
      console.dir(results);
      this.props.handleResults(results)
    }.bind(this))
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={this.state.term}
          onChange={this.onInputChange}
        />
      </div>
    )
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Search)
