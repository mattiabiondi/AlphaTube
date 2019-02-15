import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Visualizer from './Visualizer/Visualizer'
import Recommender from './Recommender/Recommender'
import scrollToComponent from 'react-scroll-to-component'
import axios from 'axios'

const styles = theme => ({
  root: {
    width: '100%',
  },
})

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video: null
    }
    this.setRecentVideos = this.setRecentVideos.bind(this)
    this.getRecentVideos = this.getRecentVideos.bind(this)
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videos !== this.props.videos) {
      scrollToComponent(this.Recommender, {
        offset: 0,
        align: 'top',
        duration: 0,
      })
    }

    if (prevProps.video !== this.props.video) {
      this.handleVideoSelection(this.props.video)
    }
  }

  removeDuplicates(videos) {
    return videos.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos
    })
  }

  getRecentVideos() {
    var videos = localStorage.getItem('recent')
    if (videos) {
      videos = JSON.parse(videos)
    }
    return videos
  }

  setRecentVideos(video) {
    this.setLocalPop(video)
    var recentVideos = this.getRecentVideos()
    var history = []
    if(recentVideos) {
      history = recentVideos
    }
    history.unshift(video)
    history = this.removeDuplicates(history)
    history = JSON.stringify(history)
    localStorage.setItem('recent', history)
  }

  handleVideoSelection(video) {
    this.setState({ video: video })
  }

  updateLocalPop(localPop, video) {
    var toAdd = true
    localPop.recommended.forEach(
      function(i) {
        if(i.videoID === video.id) {
          toAdd = false
          i.timesWatched += 1
        }
      }
    )

    if(toAdd) {
      var vid = {
        videoID: video.id,
        timesWatched: 1,
        reasons: "to do",
        lastSelected:"to do"
      }
      localPop.recommended.push(vid)
    }

    console.dir(localPop)

    axios.post('/setlocalpop', {
      data: localPop,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  setLocalPop(video) {
    var localPop = null
    axios.get('/globpop')
    .then(function (response) {
      localPop = response.data
      this.updateLocalPop(localPop, video)
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Grid container
          spacing={8}
          direction="row">
          <Grid item xs={12} sm={6}>
            <Visualizer
              video = {this.state.video}
              setRecentVideos = {this.setRecentVideos}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Recommender
              ref = {(section) => { this.Recommender = section }}
              videos = {this.props.videos}
              video = {this.state.video}
              handleVideoSelection = {this.handleVideoSelection}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Main)
