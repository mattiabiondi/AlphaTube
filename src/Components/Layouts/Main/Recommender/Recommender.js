import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Search from './Tabs/SearchTab.js'
import Popularity from './Tabs/PopularityTab.js'
import Related from './Tabs/RelatedTab.js'
import Fvitali from './Tabs/FvitaliTab.js'
import Random from './Tabs/RandomTab.js'
import SearchIcon from '@material-ui/icons/Search'
import AlbumIcon from '@material-ui/icons/Album'
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
          checked: true
        }
      )
   }
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleVideoSelection(video) {
    this.props.handleVideoSelection(video)
  }

  render() {
    const { classes } = this.props

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
              <Tab icon={<AlbumIcon />} label="Album" />
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
                                          handleVideoSelection = {this.handleVideoSelection}/>
                                     </TabContainer>}
          {this.state.value === 1 && <TabContainer>Item Two</TabContainer>}
          {this.state.value === 2 && <TabContainer></TabContainer>}
          {this.state.value === 3 && <TabContainer>Item Four</TabContainer>}
          {this.state.value === 4 && <TabContainer>Item Five</TabContainer>}
          {this.state.value === 5 && <TabContainer>
                                        <Related
                                          video = {this.props.video}
                                          handleVideoSelection = {this.handleVideoSelection}/>
                                     </TabContainer>}
          {this.state.value === 6 && <TabContainer><Popularity /></TabContainer>}
          {this.state.value === 7 && <TabContainer>
                                        <Fvitali
                                          video = {this.props.video}
                                          handleVideoSelection = {this.handleVideoSelection}/>
                                     </TabContainer>}
          {this.state.value === 8 && <TabContainer>Item Nine</TabContainer>}
          {this.state.value === 9 && <TabContainer>
                                        <Random
                                          videos = {this.props.videos}
                                          handleVideoSelection = {this.handleVideoSelection}/>
                                     </TabContainer>}
          </Paper>
        </Fade>
    )
  }
}

Recommender.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Recommender)
