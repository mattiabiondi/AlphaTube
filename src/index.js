import React from 'react' // Importazione della libreria React
import ReactDOM from 'react-dom' // Importazione della libreria ReactDOM, che permette di manipolare il DOM
import App from './Components/App' // Importazione del componenente padre dell'app, quello che racchiude tutto

ReactDOM.render(<App />, document.getElementById('root')) // Renderizza un componente di React all'interno del DOM nel container indicato
