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

  componentDidMount() {
     this.setState({
       video: '',
       response: ''
      })
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
    // resource = resource.replace(/ /g,'_')
    var query = `SELECT ?abstract WHERE {
                <` + resource + `> dbo:abstract ?abstract
                FILTER (langMatches(lang(?abstract),'en'))
                }`
    var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
    if(resource){
      axios.get(url)
      .then(function (response) {
        if(response.data.results.bindings.length) {
          this.setState ({ response: response.data.results.bindings[0].abstract.value })
        }
        else {
          this.setState ({ response: '' })
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
    }
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
