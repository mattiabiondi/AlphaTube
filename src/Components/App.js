import React, { Component, Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline' // Componente fornito da Material-UI per unificare lo stile dell'intero progetto (https://material-ui.com/style/css-baseline/)
import { AppBar, BottomNavigation } from './Layouts' // Importa i componenti definiti nella sotto-cartella 'Layouts'

export default class extends Component {
  render() {
    return (
      <Fragment> {/* A differenza dei 'div', i 'Fragment' non aggiungono nodi al DOM */}
        <CssBaseline/> {/* Utilizzo del componente di stile precedentemente importato */}
        <AppBar/>

        <BottomNavigation/>
      </Fragment>
    )
  }
}
