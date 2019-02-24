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
      abstract: '',
      song: '',
      artist: '',
      album: '',
      date: '',
      genre1: '',
      genre2: '',
      genre3: '',
      genre4: '',
      checked: false,
      tags: null
    }
    this.handleResource = this.handleResource.bind(this)
    this.handleWiki = this.handleWiki.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.setState(
        {
          checked: true,
        }
      )
      this.getData(this.props.id)
    }

    // if(prevState.song !== this.state.song) {
    //   this.props.handleWiki(this.state.song)
    // }
  }

  handleResource(resource) {
    this.props.handleResource(resource)
    this.props.handleWiki(this.state.song)
  }

  update1(resource) {
    //update delle info usato se esiste la risorsa dbpedia della canzone
    var query = `SELECT DISTINCT ?abstract ?artist ?album ?date ?genre
                WHERE {
                  <` + resource + `> dbo:abstract ?abstract.

                  {<` + resource + `> dbo:musicalArtist ?artist.}
                  UNION
                  {<` + resource + `> dbo:artist ?artist.}
                  UNION
                  {<` + resource + `> dbo:musicalBand ?artist.}

                  {<` + resource + `> dbo:album ?album.}
                  UNION
                  {?album dbp:title <` + resource + `>.}

                  {<` + resource + `> dbo:releaseDate ?date.}
                  UNION
                  {<` + resource + `> dbp:released ?date.}

                  <` + resource + `> dbo:genre ?genre.
                  FILTER (langMatches(lang(?abstract),'en'))
                }`
    var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
    axios.get(url)
    .then(function (response) {
      // console.log(response.data.results.bindings)
      resource = resource.split('/')[4]
      var abstract = response.data.results.bindings[0].abstract.value
      var artist = response.data.results.bindings[0].artist.value
      artist = artist.split('/')[4]
      // artist = artist.replace('_',' ')
      var album = response.data.results.bindings[0].album.value
      album = album.split('/')[4]
      // album = album.replace('_',' ')
      var date = response.data.results.bindings[0].date.value
      var genre1 = response.data.results.bindings[0].genre.value
      genre1 = genre1.split('/')[4]
      var genre2 = ''
      var genre3 = ''
      var genre4 = ''
      if (response.data.results.bindings.length >= 2) genre2 = response.data.results.bindings[1].genre.value
      genre2 = genre2.split('/')[4]
      if (response.data.results.bindings.length >= 3) genre3 = response.data.results.bindings[2].genre.value
      genre3 = genre3.split('/')[4]
      if (response.data.results.bindings.length >= 4) genre4 = response.data.results.bindings[3].genre.value
      genre4 = genre4.split('/')[4]
      // genre = genre.replace('_',' ')
      if(genre2 === genre1) genre2 = ''
      if((genre3 === genre2) || (genre3 === genre1)) genre3 = ''
      if((genre4 === genre3) || (genre4 === genre2) || (genre4 === genre1)) genre4 = ''
      this.setState({
        song: resource,
        abstract: abstract,
        artist: artist,
        album: album,
        date: date,
        genre1: genre1,
        genre2: genre2,
        genre3: genre3,
        genre4: genre4,
      })
      this.props.handleWiki(this.state.song)
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }

  update2(resource) {
    //update delle info usato se esiste solo la risorsa album
    var query = `SELECT DISTINCT ?abstract ?artist ?album ?date ?genre
                WHERE {
                  <` + resource + `> dbo:abstract ?abstract.

                  {<` + resource + `> dbo:musicalArtist ?artist.}
                  UNION
                  {<` + resource + `> dbo:artist ?artist.}
                  UNION
                  {<` + resource + `> dbo:musicalBand ?artist.}

                  <` + resource + `> dbp:thisAlbum ?album.

                  {<` + resource + `> dbo:releaseDate ?date.}
                  UNION
                  {<` + resource + `> dbp:released ?date.}

                  <` + resource + `> dbo:genre ?genre.
                  FILTER (langMatches(lang(?abstract),'en'))
                }`
    var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
    axios.get(url)
    .then(function (response) {
      // console.dir(response.data.results)
      var abstract = response.data.results.bindings[0].abstract.value
      var artist = response.data.results.bindings[0].artist.value
      artist = artist.split('/')[4]
      // artist = artist.replace('_',' ')
      var album = response.data.results.bindings[0].album.value
      var date = response.data.results.bindings[0].date.value
      var genre1 = response.data.results.bindings[0].genre.value
      genre1 = genre1.split('/')[4]
      var genre2 = ''
      var genre3 = ''
      var genre4 = ''
      if (response.data.results.bindings.length >= 2) genre2 = response.data.results.bindings[1].genre.value
      genre2 = genre2.split('/')[4]
      if (response.data.results.bindings.length >= 3) genre3 = response.data.results.bindings[2].genre.value
      genre3 = genre3.split('/')[4]
      if (response.data.results.bindings.length >= 4) genre4 = response.data.results.bindings[3].genre.value
      genre4 = genre4.split('/')[4]
      // genre = genre.replace('_',' ')
      if(genre2 === genre1) genre2 = ''
      if((genre3 === genre2) || (genre3 === genre1)) genre3 = ''
      if((genre4 === genre3) || (genre4 === genre2) || (genre4 === genre1)) genre4 = ''
      // genre = genre.replace('_',' ')
      //to do: piú generi insieme
      this.setState({
        abstract: abstract,
        artist: artist,
        album: album,
        date: date,
        genre1: genre1,
        genre2: genre2,
        genre3: genre3,
        genre4: genre4,
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }

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
        if(song[song.length-1]===" "){
          song = song.substr(0, song.length-1)
        }
        artist = info[0]
        this.setState({
          song: song,
          artist: artist
        })
        this.query2()
      }
      else {
        console.log('parse nullo, lavorare sui tag o titolo video')
        console.dir(this.state.tags)
        this.setState({
          abstract: '',
          song: '',
          artist: '',
          album: '',
          date: '',
          genre1: '',
          genre2: '',
          genre3: '',
          genre4: '',
          tags: null
        })
        this.handleResource('')
      }

      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
  }

  query1() { //problematica: alla fine non la utilizzo
    var song = this.state.song
    song = song.replace(/ /g,'_')
    console.log('q1:'+song)
    var query = `SELECT DISTINCT ?song   WHERE {
                  ?song rdf:type dbo:MusicalWork.
                  FILTER regex(str(?song), "` + song + `", "i").
                  FILTER NOT EXISTS {
                  ?song rdf:type dbo:Album
                  }
                  }`
    var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
    axios.get(url)
    .then(function (response) {
      console.log(response.data.results.bindings)
      if (response.data.results.bindings.length === 0) {
        //non esiste la risorsa dbpedia della canzone, passare alla ricerca artista e album
        this.query3()
      }
      if (response.data.results.bindings.length === 1) {
        //ho trovato la risorsa dbpedia della canzone
        //TO DO: é ancora possibile che la risorsa trovata sia una canzone di un altro artista con lo stesso titolo
        // console.log(response.data.results.bindings[0].song.value)
        this.update1(response.data.results.bindings[0].song.value)
      }
      if (response.data.results.bindings.length > 1) {
        //esistono piú canzoni che condividono il titolo, controllo quale fra queste ha come artista quello giusto
        this.query2()
      }

    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }

  query2() {
    var song = this.state.song
    song = song.replace(/ /g,'_')
    var artist = this.state.artist
    artist = artist.replace(/ /g,'_')
    console.log('q2:'+song+', '+artist)
    var query = `SELECT DISTINCT ?song  WHERE {
                {?song dbo:artist ?artist}
                UNION
                {?song dbo:musicalArtist ?artist}
                FILTER regex(str(?song), "` + song + `", "i")
                FILTER regex(str(?artist), "` + artist + `", "i")
                FILTER NOT EXISTS {
                ?song rdf:type dbo:Album
                }
                }`
    var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
    axios.get(url)
    .then(function (response) {
      // console.log(response.data.results.bindings)
      if(response.data.results.bindings.length !== 0){
        // console.dir(response)
        this.update1(response.data.results.bindings[0].song.value)
        this.handleResource(response.data.results.bindings[0].song.value)
      }
      else {
        this.query3()
      }
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }

  handleWiki(resource) {
    this.props.handleWiki(resource)
  }

  query3() {
    var song = this.state.song
    var artist = this.state.artist
    artist = artist.replace(/ /g,'_')
    console.log('q3:'+song+', '+artist)
    var query = `SELECT DISTINCT ?album
                WHERE {

                {?album dbo:artist <http://dbpedia.org/resource/` + artist + `>.}
                UNION
                {?album dbo:artist <http://dbpedia.org/resource/` + artist + `_(band)>.}
                UNION
                {?album dbo:artist <http://dbpedia.org/resource/` + artist + `_(singer)>.}
                ?album dbp:title ?song.
                FILTER regex(str(?song), "` + song + `", "i")

                FILTER NOT EXISTS {
                ?album dbp:type ?type.
                FILTER regex(str(?type), "greatest", "i")
                }
                FILTER NOT EXISTS {
                                ?album dbo:type ?type.
                FILTER regex(str(?type), "greatest", "i")
                }
                }`
    var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&format=json"
    axios.get(url)
    .then(function (response) {
      // console.dir(response.data.results.bindings)
      if(response.data.results.bindings.length !== 0){
        this.update2(response.data.results.bindings[0].album.value)
        this.handleResource(response.data.results.bindings[0].album.value)
      }
      else {
        console.log('controllare i tag')
        this.setState({
          abstract: '',
          song: song,
          artist: artist,
          album: '',
          date: '',
          genre1: '',
          genre2: '',
          genre3: '',
          genre4: '',
          tags: null
        })
        this.handleResource('')
      }
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Fade in={this.state.checked}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {this.props.title}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <InfoRenderer
              song={this.state.song}
              artist={this.state.artist}
              album={this.state.album}
              date={this.state.date}
              genre1={this.state.genre1}
              genre2={this.state.genre2}
              genre3={this.state.genre3}
              genre4={this.state.genre4}
              id={this.props.id}
              handleWiki={this.handleWiki}
              />
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
