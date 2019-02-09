import React, { Component } from 'react'
import PropTypes from 'prop-types' // Componente utile per il typechecking
import AppBar from '@material-ui/core/AppBar' // Componenti della libreria grafica Material UI
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Drawer from './Drawer/Drawer'
import Search from './Search'

const styles = theme => ({ // Tema di questo componente
  root: {
    width: '100%', // Dimensione della AppBar (tutto schermo)
  },
  grow: {
    flexGrow: 1, // Proprietà derivata dal CSS che specifica quanto il componente deve crescere di dimensioni rispetto agli altri componenti flessibili adiacenti
  },
  menuButton: {
    marginLeft: -12, // Margini del Button secondo il material design
    marginRight: 20,
  },
  title: {
    display: 'none', // Page title nascosto
    [theme.breakpoints.up('sm')]: { // Dimensioni predefinite di schermo che hanno esigenze particolari (sm = 600px in su)
      display: 'block',
    },
  },
})

class SearchAppBar extends Component {
  constructor(props){
      super(props);
      this.handleResults = this.handleResults.bind(this) // Il binding permette alle funzioni di riferirsi a "this"
      this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  handleResults(results) { // La funzione non fa altro che passare il parametro contenente i risultati alla funzione della classe superiore
    this.props.handleResults(results) // "this" è qua definito perchè abbiamo fatto il binding nel costruttore.
  }

  handleVideoSelection(video) { // La funzione passa il video selezionato dalla lista iniziale alla funzione della classe superiore
    this.props.handleVideoSelection(video)
  }

  render() {
  const { classes } = this.props // equivalente di "const classes = this.props.classes"

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Drawer handleVideoSelection = {this.handleVideoSelection}/>
            <Typography className={classes.title} variant="title" color="inherit" noWrap> {/* Titolo dell'App mostrato in alto a sinistra dell'AppBar */}
              &alpha;Tube
            </Typography>
            <div className={classes.grow} /> {/* Contenitore che "schiaccia" la Search */}
            <Search handleResults={this.handleResults}/>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

SearchAppBar.propTypes = { // Controllo sui props, si accerta che le classi siano definite
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SearchAppBar) // Esporta il componente assieme al tema
