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
      checked: false
    }
    // this.getArtistAndTitle = this.getArtistAndTitle.bind(this)

  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState(
        {
          checked: true
        }
      )
    }

  }

  getArtistAndTitle(title){
    let song=''
    let data = getTitle(title)
    if(data){
      if(data[0] != null) {
        song = data[1]
        song=song.split('(')[0]
      }
      else {
        song=this.props.title
      }
    }
    return song
  }

  render() {
    const { classes } = this.props
    var song = this.getArtistAndTitle(this.props.title)
    return (
      <Fade in={this.state.checked}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {this.props.artist + " - " + this.props.title}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <InfoRenderer song={song} artist="" album="" year="" genre="" id={this.props.id}/>
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
