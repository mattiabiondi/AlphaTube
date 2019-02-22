import React, { Component, Fragment} from 'react'
import { withStyles } from '@material-ui/core/styles'
import LoadingBar from '../LoadingBar'
import renderHTML from 'react-render-html';

const styles = theme => ({
  root: {

  },
})

class Wikipedia extends Component {
  render() {

    if(this.props.wikipedia) {
      var abstract = this.props.wikipedia
      return (
        <Fragment>
          {renderHTML('<style>a{color:#1ec38b}a:hover{color:#FFF}</style>')}
          {renderHTML(abstract)}
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
