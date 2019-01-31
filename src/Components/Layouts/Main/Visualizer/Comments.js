import React, { Component, Fragment} from 'react'
import CommentRenderer from './CommentRenderer'
import LoadingBar from './LoadingBar'

class Comments extends Component {
  render() {

    if(this.props.comments) {
      var list = this.props.comments.map(
        function(i) {
          return (
            <CommentRenderer
              author = {i.author}
              avatar = {i.authorThumb}
              text = {i.text}
              time = {i.time}
              likes = {i.likes}
            />
          )
        }
      )

      return (
        <Fragment>
          {list}
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

export default Comments
