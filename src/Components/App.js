import React, { Component, Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline' // Componente fornito da Material-UI per unificare lo stile dell'intero progetto (https://material-ui.com/style/css-baseline/)
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { AppBar, Main } from './Layouts' // Importa i componenti definiti nella sotto-cartella 'Layouts'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#2b2b2b',
    },
    secondary: {
      main: '#1ec38b',
    },
  },
})

export default class extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Fragment> {/* A differenza dei 'div', i 'Fragment' non aggiungono nodi al DOM */}
          <CssBaseline/> {/* Utilizzo del componente di stile precedentemente importato */}
          <AppBar />
          <Main />
        </Fragment>
      </MuiThemeProvider>
    )
  }
}
