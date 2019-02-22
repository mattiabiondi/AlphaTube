import React, { Component, Fragment} from 'react'
import { withStyles } from '@material-ui/core/styles'
import LoadingBar from '../../../LoadingBar'
import renderHTML from 'react-render-html';
import axios from 'axios'

const styles = theme => ({
  root: {

  },
})

class Wikipedia extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wikipedia: '',
      response: ''
    }
    this.queryForAbstract = this.queryForAbstract.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.wikipedia !== this.props.wikipedia) {
      // this.setState(
      //   {
      //     wikipedia: this.props.wikipedia
      //   }
      // )
      this.queryForAbstract(this.props.wikipedia)
    }
  }

  queryForAbstract(resource) {
    console.log(resource)
    var query = `SELECT ?abstract WHERE {
                <http://dbpedia.org/resource/` + resource + `> dbo:abstract ?abstract
                FILTER (langMatches(lang(?abstract),'en'))
                }`
    var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
    console.log(url)
    axios.get(url)
    .then(function (response) {
      if(response) this.setState ({ response: response.data.results.bindings[0].abstract.value })
    }.bind(this))
    .catch(function (error) {
      console.log('error')
    })
  }

  render() {
    if(this.state.response) {
      return (
        <Fragment>
          {renderHTML('<style>a{color:#1ec38b}a:hover{color:#FFF}</style>')}
          {renderHTML(this.state.response)}
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <LoadingBar />
        </Fragment>
      )
    }
  }


}

export default withStyles(styles)(Wikipedia)
