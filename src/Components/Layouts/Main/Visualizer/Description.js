import React, { Component, Fragment} from 'react'
import { withStyles } from '@material-ui/core/styles'
import LoadingBar from '../LoadingBar'
import renderHTML from 'react-render-html';

const styles = theme => ({
  root: {

  },
})

class Description extends Component {
  render() {

    if(this.props.description) {
      var description = this.props.description
      return (
        <Fragment>
          {renderHTML('<style>a{color:#1ec38b}a:hover{color:#FFF}</style>')}
          {renderHTML(description)}
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

export default withStyles(styles)(Description)
