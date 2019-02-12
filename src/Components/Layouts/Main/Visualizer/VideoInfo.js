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
import getTitle from 'get-artist-title'
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
      // this.getArtistAndTitle(this.props.title)
      this.getTags(this.props.id)
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

  getTags(id) {
    var key=process.env.REACT_APP_YOUTUBE_API_KEY
    var url= "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + id + "&key=" + key + "&format=json"
    axios.get(url)
    .then(function (response) {
      this.setState({
        tags : response.data.items[0].snippet.tags
      })
      console.dir(this.state.tags)
      }.bind(this))
      .catch(function (error) {
        console.log('error')
      })
  }

  // getDBResource() {
  //   var tags = this.state.tags
  //   var resources = null
  //   for(var i=0; i<(tags.length); i++) {
  //     if ( resources == null) {
  //       tags[i]=tags[i].replace(/ /g,'_')
  //       // console.log("posizione "+i+": "+tags[i])
  //       var query= `SELECT DISTINCT ?s   WHERE {
  //
  //                   ?s rdf:type dbo:MusicalWork.
  //
  //                   FILTER regex(str(?s), "` + tags[i] + `", "i").
  //
  //                   }`
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

  // getArtistAndTitle(title) {
  //   let song=''
  //   let data = getTitle(title)
  //   if(data){
  //     if(data[0] != null) {
  //       song = data[1]
  //       song=song.split('(')[0]
  //       if(song[song.length-1]==" "){
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
  //
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
  //
  // getData(queryUrl) {
  //   var url= "http://dbpedia.org/sparql?query=" + encodeURIComponent(queryUrl) + "&format=json"
  //   axios.get(url)
  //   .then(function (response) {
  //     console.dir(response)
  //   }.bind(this))
  //   .catch(function (error) {
  //     console.log('error')
  //   })
  // }

  // function setContentBrano() {
  //     var artist = videoNamespace.getCurrentPlayerArtist();
  //     var title = videoNamespace.getCurrentPlayerSong();
  //     if (title && artist){
  //         var res1 = title.replace(/\s/g,"_");
  //         var res2 = title.replace(/\s/g,"_") + "_(song)" ;
  //         var res3 = title.replace(/\s/g,"_") + "_(" + artist.replace(/\s/g,"_") + "_song)";
  //
  //         $.get(buildQuery(res1,artist)).done((data)=>{
  //             if (data["results"]["bindings"].length){
  //                 //in getResults ritorna una coppia song,artist
  //                 fillWikiArea(getResultsFromQuery(data)[0],getResultsFromQuery(data)[1]);
  //             }
  //             else {
  //                 $.get(buildQuery(res2,artist)).done((data)=>{
  //                     if (data["results"]["bindings"].length){
  //                         fillWikiArea(getResultsFromQuery(data)[0],getResultsFromQuery(data)[1]);
  //                     }
  //                     else {
  //                         $.get(buildQuery(res3,artist)).done((data)=>{
  //                             if (data["results"]["bindings"].length){
  //                                 fillWikiArea(getResultsFromQuery(data)[0],getResultsFromQuery(data)[1]);
  //                             }
  //                             else {
  //                                 noContentFound();
  //                             }
  //                         }).fail(()=>{
  //                             noContentFound();
  //                         });
  //                     }
  //                 }).fail(()=>{
  //                     noContentFound();
  //                 });
  //             }
  //         }).fail(()=>{
  //             noContentFound();
  //         });
  //     }
  //     else {
  //         noContentFound();
  //     }
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
