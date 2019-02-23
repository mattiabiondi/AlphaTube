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
      video: null,
      prevVideo: null,
      resource: null,
    }
    this.setRecentVideos = this.setRecentVideos.bind(this)
    this.getRecentVideos = this.getRecentVideos.bind(this)
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
    this.updateLocalRelPop = this.updateLocalRelPop.bind(this)
    this.push = this.push.bind(this)
    this.handleResource = this.handleResource.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.videos !== this.props.videos) {
      scrollToComponent(this.Recommender, {
        offset: 0,
        align: 'top',
        duration: 0,
      })
    }

    if (prevProps.video !== this.props.video) {
      this.handleVideoSelection(this.props.video, "Starting list")
    }

    if(prevState.video !== this.state.video) {
      this.setState({ prevVideo: prevState.video })
    }

    window.onpopstate = (e) => {
      this.handleVideoSelection(e.state, e.state.reason)
    }
  }

  push() {
    if(this.state.video) {
      window.history.pushState(this.state.video, "", "")
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
    this.setLocalAbsPop(video)
    this.updateLocalRelPop(video) // aggiorniamo la popolarità relativa
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

  handleVideoSelection(video, reason) {
    var vid = video
    vid.reason = reason
    this.setState({ video: vid })
    //questo assegnamento fa si che lo stato attuale della cronologia corrisponda al video visualizzato
    this.state.video=vid
  }

  handleResource(resource) {
    this.setState({ resource: resource })
  }

  updateLocalAbsPop(localAbsPop, video) {
    localAbsPop.site = "site1858.tw.cs.unibo.it"
    localAbsPop.recommender = "site1858"
    localAbsPop.lastWatched = new Date()

    var toAdd = true
    localAbsPop.recommended.forEach(
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
        prevalentReason: video.reason,
        lastSelected: new Date()
      }
      localAbsPop.recommended.push(vid)
    }

    //console.dir(localAbsPop)

    axios.post('/setlocalabspop', {
      data: localAbsPop,
    })
    .then(function (response) {
      // console.log(response); // risposta del post (200 OK)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  setLocalAbsPop(video) {
    var localAbsPop = null
    axios.get('/globpop')
    .then(function (response) {
      localAbsPop = response.data
      this.updateLocalAbsPop(localAbsPop, video)
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }

  updateLocalRelPop(video) {
    if(this.state.prevVideo) { // evitiamo di fare post se siamo al primo video
      axios.post('/setlocalrelpop', {
        params: {
          prevVideo: this.state.prevVideo.id, // id del video precedente
          video: video.id, // id del video attuale
          reason: video.reason
        }
      })
      .then(function (response) {
        //console.log(response); // risposta del post (200 OK)
      })
      .catch(function (error) {
        console.log(error);
      })
    }
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
              handleResource = {this.handleResource}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Recommender
              ref = {(section) => { this.Recommender = section }}
              videos = {this.props.videos}
              video = {this.state.video}
              handleVideoSelection = {this.handleVideoSelection}
              push = {this.push}
              resource = {this.state.resource}
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
