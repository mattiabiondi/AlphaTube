import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Search from './Tabs/SearchTab.js'
import Artist from './Tabs/ArtistTab.js'
import Band from './Tabs/BandTab.js'
import Genre from './Tabs/GenreTab.js'
import Related from './Tabs/RelatedTab.js'
import Popularity from './Tabs/PopularityTab.js'
import Fvitali from './Tabs/FvitaliTab.js'
import Recent from './Tabs/RecentTab.js'
import Random from './Tabs/RandomTab.js'
import SearchIcon from '@material-ui/icons/Search'
import PersonIcon from '@material-ui/icons/Person'
import GroupIcon from '@material-ui/icons/Group'
import AudiotrackIcon from '@material-ui/icons/Audiotrack'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'
import RestoreIcon from '@material-ui/icons/Restore'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import SchoolIcon from '@material-ui/icons/School'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import Fade from '@material-ui/core/Fade'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
})

class Recommender extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      checked: false
    }
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videos !== this.props.videos) {
      this.setState(
        {
          value: 0, // Dopo aver fatto la search reimposta "Search" come tab selezionata
        }
      )
    }
    if ((prevProps.videos !== this.props.videos) || (prevProps.video !== this.props.video)) {
      this.setState(
        {
          checked: true,
        }
      )
    }
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleVideoSelection(video, reason) {
    this.props.handleVideoSelection(video, reason)
    this.props.push(video)
  }

  render() {
    const { classes } = this.props
    if(this.props.videos) {
      return (
        <Fade in={this.state.checked}>
          <Paper className={classes.root}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                scrollButtons="auto"
                scrollable
              >
                <Tab icon={<SearchIcon />} label="Search" />
                <Tab icon={<PersonIcon />} label="Artist" />
                <Tab icon={<GroupIcon />} label="Band" />
                <Tab icon={<AudiotrackIcon />} label="Genre" />
                <Tab icon={<QueueMusicIcon />} label="Related" />
                <Tab icon={<WhatshotIcon />} label="Popularity" />
                <Tab icon={<SchoolIcon />} label="Fvitali" />
                <Tab icon={<RestoreIcon />} label="Recent" />
                <Tab icon={<ShuffleIcon />} label="Random" />
              </Tabs>
            {this.state.value === 0 && <TabContainer>
                                          <Search
                                            videos = {this.props.videos}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Search" />
                                       </TabContainer>}
            {this.state.value === 1 && <TabContainer>
                                          <Artist
                                            resource = {this.props.resource}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Artist" />
                                        </TabContainer>}
            {this.state.value === 2 && <TabContainer>
                                          <Band
                                            resource = {this.props.resource}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Band" />
                                        </TabContainer>}
            {this.state.value === 3 && <TabContainer>
                                          <Genre
                                            resource = {this.props.resource}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Genre" />
                                        </TabContainer>}
            {this.state.value === 4 && <TabContainer>
                                          <Related
                                            video = {this.props.video}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Related" />
                                       </TabContainer>}
            {this.state.value === 5 && <TabContainer>
                                          <Popularity
                                            video = {this.props.video}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Popularity" />
                                        </TabContainer>}
            {this.state.value === 6 && <TabContainer>
                                          <Fvitali
                                            video = {this.props.video}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "FVitali" />
                                       </TabContainer>}
            {this.state.value === 7 && <TabContainer>
                                          <Recent
                                            video = {this.props.video}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Recent" />
                                       </TabContainer>}
            {this.state.value === 8 && <TabContainer>
                                          <Random
                                            videos = {this.props.video}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Random" />
                                       </TabContainer>}
            </Paper>
          </Fade>
      )
    } else {
      return (
        <Fade in={this.state.checked}>
          <Paper className={classes.root}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                scrollButtons="auto"
                scrollable
              >
                <Tab icon={<PersonIcon />} label="Artist" />
                <Tab icon={<GroupIcon />} label="Band" />
                <Tab icon={<AudiotrackIcon />} label="Genre" />
                <Tab icon={<QueueMusicIcon />} label="Related" />
                <Tab icon={<WhatshotIcon />} label="Popularity" />
                <Tab icon={<SchoolIcon />} label="Fvitali" />
                <Tab icon={<RestoreIcon />} label="Recent" />
                <Tab icon={<ShuffleIcon />} label="Random" />
              </Tabs>
            {this.state.value === 0 && <TabContainer>
                                          <Artist
                                            resource = {this.props.resource}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Artist" />
                                        </TabContainer>}
            {this.state.value === 1 && <TabContainer>
                                          <Band
                                            resource = {this.props.resource}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Band" />
                                        </TabContainer>}
            {this.state.value === 2 && <TabContainer>
                                          <Genre
                                            resource = {this.props.resource}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Genre" />
                                        </TabContainer>}
            {this.state.value === 3 && <TabContainer>
                                          <Related
                                            video = {this.props.video}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Related" />
                                       </TabContainer>}
            {this.state.value === 4 && <TabContainer>
                                          <Popularity
                                            video = {this.props.video}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Popularity" />
                                        </TabContainer>}
            {this.state.value === 5 && <TabContainer>
                                          <Fvitali
                                            video = {this.props.video}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "FVitali" />
                                       </TabContainer>}
            {this.state.value === 6 && <TabContainer>
                                          <Recent
                                            video = {this.props.video}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Recent" />
                                       </TabContainer>}
            {this.state.value === 7 && <TabContainer>
                                          <Random
                                            videos = {this.props.video}
                                            handleVideoSelection = {this.handleVideoSelection}
                                            tabName = "Random" />
                                       </TabContainer>}
            </Paper>
          </Fade>
      )
    }
  }
}

Recommender.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Recommender)
