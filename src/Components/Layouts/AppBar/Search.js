import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputBase from '@material-ui/core/InputBase' // Form minimale
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import YouTubeSearch from 'youtube-search' // Modulo per effettuare ricerche su YouTube

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
      super(props)
      this.state = { term: '' } // Termine di ricerca inizialmente nullo (stringa vuota)
      this.onChange = this.onChange.bind(this)
      this.onKeyDown = this.onKeyDown.bind(this)
  }

  onKeyDown(e) {
        if (e.keyCode === 13 ) { // keyCode 13 è il tasto Enter
          e.target.blur() // Toglie il focus dalla casella di ricerca, la tastiera su mobile si chiude
          this.props.handleResults(null) // Passa null in modo che i risultati precedenti vengano eliminati mentre aspetta i nuovi
          return this.handleYouTubeSearch(this.state.term) // Effettua una ricerca con il termine all'interno del form come parametro
        }
  }

  onChange(event) { // Funzione che aggiorna il termine di ricerca
      this.setState({ term: event.target.value })
  }

  handleYouTubeSearch(term) { // Funzione che effettua la ricerca
    var opts = { // Parametri opzionali per la ricerca
      maxResults: 20, // 20 risultati
      key: process.env.REACT_APP_YOUTUBE_API_KEY, // La nostra API Key
      type: "video", // Specifichiamo che vogliamo video e non playlist o canali
      videoCategoryId: 10, // Categoria 10 (music)
    }

    YouTubeSearch(term, opts, function(err, results) {
      if(err)
        return console.log(err)
      // console.dir(results) // Mostra in console i risultati della ricerca (un Array[20])
      this.props.handleResults(results) // Passa alla funzione della classe superiore i risultati
    }.bind(this))
  }

  render() {
    const { classes } = this.props

    return (
      <div className = {classes.search}>
        <div className = {classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder = "Search"
          classes = {{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value = {this.state.term}
          onChange = {this.onChange}
          onKeyDown = {this.onKeyDown}
        />
      </div>
    )
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Search)
