import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FetchComments from 'youtube-comment-api'

class Comments extends Component {
  render() {
    const { classes } = this.props

    const comments = FetchComments(this.props.id)

    var prova = null
    if(typeof(comments) !== 'undefined' && comments != null)
      if(typeof(comments[0]) !== 'undefined' && comments[0] != null)
        prova = comments[0].text

    return (
      <div>
        {prova}
      </div>
    )
  }
}



export default Comments
