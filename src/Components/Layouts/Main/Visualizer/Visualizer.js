import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Video from './Video'
import VideoInfo from './VideoInfo'
import VideoContent from './VideoContent'
import axios from 'axios'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

class Visualizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video: null,
      info: null,
      comments: null
    }
    this.getVideoInfo = this.getVideoInfo.bind(this)
    this.getComments = this.getComments.bind(this)
  }

  componentDidMount() {
     this.setState(
       {video: this.props.video},
     )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.video !== this.props.video) {
      this.setState(
        {
          video: this.props.video,
          info: null,
          comments: null
        }
      )
      this.getVideoInfo()
      this.getComments()
   }
  }

  getVideoInfo() {
    if(this.props.video) {
      var id = this.props.video.id
      axios.get('/info', {
        params: {
          id: id
        }
      })
      .then(function (response) {
        console.log(response)
        this.setState({ info: response })
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        // always executed
        if(this.state.video.id !== id) {
          this.setState({ info: null })
          this.getVideoInfo()
        }
      }.bind(this))
    }
  }

  getComments() {
    if(this.props.video) {
      var id = this.props.video.id
      axios.get('/comments', {
        params: {
          id: id
        }
      })
      .then(function (response) {
        console.log(response)
        this.setState({ comments: response })
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        // always executed
        if(this.state.video.id !== id) {
          this.setState({ comments: null })
          this.getComments()
        }
      }.bind(this))
    }
  }

  render() {
    const { classes } = this.props

    var id = ""
    var title = ""
    if(this.state.video) {
      id = this.state.video.id
      title = this.state.video.title
    }

    var description = null
    if(this.state.info) {
      description = this.state.info.data.description
    }

    var comments = null
    if(this.state.comments)
      if(this.state.comments.data.comments)
        comments = this.state.comments.data.comments

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Video id={id}/>
          </Grid>
          <Grid item xs={12} >
            <VideoInfo id={id} title={title}/>
          </Grid>
          <Grid item xs={12} >
            <VideoContent
              id = {id}
              comments = {comments}
              description = {description}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

Visualizer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Visualizer)
