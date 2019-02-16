import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import InfoRenderer from './InfoRenderer'
import Fade from '@material-ui/core/Fade'
import parseTitle from 'get-artist-title'
import axios from 'axios'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(18),
  },
  content: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
})

class VideoInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      song: '',
      artist: '',
      checked: false,
      tags: null
    }

  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState(
        {
          checked: true
        }
      )
      this.getData(this.props.id)
    }
  }

  // getArtistAndTitle(title){
  //   let song=''
  //   let data = getTitle(title)
  //   if(data){
  //     if(data[0] != null) {
  //       song = data[1]
  //       song=song.split('(')[0]
  //       if(song[song.length-1]===" "){
  //         song = song.substr(0, song.length-1)
  //       }
  //       this.setState({
  //         song: song,
  //         artist: data[0]
  //       })
  //     }
  //     else {
  //       song=this.props.title
  //     }
  //   }
  // }



  // getDBResource() {
  //   var tags = this.state.tags
  //   var resources = null
  //   for(var i=0; i<(tags.length); i++) {
  //     if ( resources == null) {
  //       tags[i]=tags[i].replace(/ /g,'_')
  //       // console.log("posizione "+i+": "+tags[i])
        // var query= `SELECT DISTINCT ?s   WHERE {
        //
        //             ?s rdf:type dbo:MusicalArtist.
        //
        //             FILTER regex(str(?s), "` + tags[i] + `", "i").
        //
        //             }`
  //       var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
  //       axios.get(url)
  //       .then(function (response) {
  //         if(response.data.results.bindings[i] !== null) {
  //           console.dir(response.data.results.bindings)
  //           resources = response.data.results.bindings
  //         }
  //       }.bind(this))
  //       .catch(function (error) {
  //         console.log('error')
  //       })
  //     }
  //   }
  //   // console.dir(resources)
  //   console.log(' ')
  // }

  getData(id) {
    let song = ''
    let artist = ''
    let info = parseTitle(this.props.title)
    var key=process.env.REACT_APP_YOUTUBE_API_KEY
    var url= "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + id + "&key=" + key + "&format=json"

    axios.get(url)
    .then(function (response) {
      this.setState({
        tags : response.data.items[0].snippet.tags
      })
      // Qui parte la flowchart: se il parsing del titolo youtube ha dato risultati va su query1, altrimenti prova coi tag
      if(info) {
        song = info[1]
        song = song.split('(')[0]
        if(song[song.length-1]==" "){
          song = song.substr(0, song.length-1)
        }
        artist = info[0]
        this.setState({
          song: song,
          artist: artist
        })
        this.query1()
      }
      else {
        console.log('parse nullo, lavorare sui tag:')
        console.dir(this.state.tags)
      }

      }.bind(this))
      .catch(function (error) {
        console.log('error')
      })
  }

  query1() {
    var song = this.state.song
    song = song.replace(/ /g,'_')
    var query = `SELECT DISTINCT ?s   WHERE {

                  {?s rdf:type dbo:MusicalWork.}

                  FILTER regex(str(?s), "` + song + `", "i").

                  }`
    var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
    axios.get(url)
    .then(function (response) {
      // console.log(response.data.results.bindings)
    }.bind(this))
    .catch(function (error) {
      console.log('error')
    })

  }

  // sparqlURL(song) {
  //   song=song.replace(/ /g,'_')
  //   console.log(song)
  //   var query = `SELECT ?abstract ?album ?date ?genre
  //   WHERE {
  //     dbr:`+song+` dbo:abstract ?abstract.
  //     dbr:`+song+` dbo:album ?album.
  //     dbr:`+song+` dbo:releaseDate ?date.
  //     dbr:`+song+` dbo:genre ?genre.
  //     FILTER (langMatches(lang(?abstract),'en'))
  //   }`
  //     console.log(query)
  //     return query
  // }


  // queryDB(query) {
  //   var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
  //   axios.get(url)
  //   .then(function (response) {
  //     console.log('ciao')
  //     console.dir(response)
  //     return(response)
  //   }.bind(this))
  //   .catch(function (error) {
  //     console.log('error')
  //   })
  // }


  render() {
    const { classes } = this.props
    return (
      <Fade in={this.state.checked}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {this.props.artist + " - " + this.props.title}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <InfoRenderer song={this.state.song} artist={this.state.artist} album="" year="" genre="" id={this.props.id}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Fade>
    )
  }
}

VideoInfo.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(VideoInfo)
