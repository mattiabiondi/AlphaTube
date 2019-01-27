import React, { Component, Fragment} from 'react'
import axios from 'axios'
import CommentRenderer from './CommentRenderer'

class Comments extends Component {

  constructor(props) {
    super(props)
    this.state = {
      comments: null
    }
  }

  handleResults(results) {
    this.setState({ comments: results })
  }

  componentDidMount() {
     this.getComments()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
       this.getComments()
    }
  }

  getComments() {
    axios.get('/comments', {
      params: {
        id: this.props.id
      }
    })
    .then(function (response) {
      console.log(response)
      this.handleResults(response)
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
    .then(function () {
      // always executed
    })
  }

  render() {
    var comments = null
    if(this.state.comments)
      if(this.state.comments.data.comments)
        comments = this.state.comments.data.comments

    if(comments) {
      var list = comments.map(
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

        </Fragment>
      )
    }
  }
}

export default Comments
