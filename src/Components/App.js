import React, { Component, Fragment } from 'react' // Le parentesi graffe si usano quando la sorgente contiene una named export
import CssBaseline from '@material-ui/core/CssBaseline' // Componente fornito da Material-UI per unificare lo stile dell'intero progetto (https://material-ui.com/style/css-baseline/)
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles' // Componente che permette di customizzare il tema
import { AppBar, Main } from './Layouts' // Importa i componenti definiti nella sotto-cartella 'Layouts'

const theme = createMuiTheme({ // La costante theme in cui specifichiamo il tema
  typography: {
    useNextVariants: true, // La libreria Material-UI sta passando ad una nuova versione, questo serve per utilizzare la nuova tipografia
  },
  palette: { // Colori principali dell'applicazione
    type: 'dark', // Tema scuro, ovviamente
    primary: {
      main: '#2b2b2b', // Colore primario (grigio material)
    },
    secondary: {
      main: '#1ec38b', // Colore secondario (verde)
    },
  },
})

export default class extends Component {
  constructor(props) { // Costruttore della classe
    super(props) // super richiama il costruttore della classe padre. super(props) serve per poter utilizzare "this.props" all'interno del costruttore
    this.state = { // Lo stato del componente
      videos: null, // La lista dei video risultati dalla ricerca
      video: null // Il video selezionato per la visualizzazione
    }
  }

  handleResults = (results) => { // Funzione che gestisce i risultati della ricerca, impostandoli nella variabile di stato
    this.setState({ videos: results }) // La funzione è dichiarata qua perchè questo è il componente che collega l'appbar da cui si effettua la ricerca al main dove i risultati devono essere visualizzati
  }

  handleVideoSelection = (video) => { // Funzione che gestisce il video selezionato, impostandolo nella variabile di stato
    this.setState(
      {
        video: video,
        videos: null // Imposta la lista dei video della ricerca a null, in modo da nascondere i risultati della ricerca. Questo serve perchè si arriva a questa funzione solo dalla selezione dei video di partenza, quindi nessuna ricerca è stata effettuata.
      }
    )
  }

  render() { // Metodo responsabile della restituzione degli elementi che rappresentano questo componente
    return (
      <MuiThemeProvider theme={theme}> {/* Tema impostato come contenitore principale in modo che tutti i sotto componenti ne usufruiscano */}
        <Fragment> {/* A differenza dei 'div', i 'Fragment' non aggiungono nodi al DOM */}
          <CssBaseline/> {/* Utilizzo del componente di stile precedentemente importato */}
          {/* Componente della barra di stato */}
          {/* Passiamo a questo componente un parametro di nome 'handleResults' che si riferisce alla funzione dichiarata in questo componente */}
          <AppBar
            handleResults = {this.handleResults}
            handleVideoSelection = {this.handleVideoSelection}
          />
          {/* Componente dell'area principale di visualizzazione */}
          {/* Passiamo a Main sia la lista di video, sia il video selezionato */}
          <Main
            videos = {this.state.videos}
            video = {this.state.video}
          />
        </Fragment>
      </MuiThemeProvider>
    )
  }
}
