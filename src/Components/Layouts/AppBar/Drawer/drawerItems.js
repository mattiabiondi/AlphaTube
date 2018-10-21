import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MusicVideoIcon from '@material-ui/icons/MusicVideo'
import FeedbackIcon from '@material-ui/icons/Feedback'
import InfoIcon from '@material-ui/icons/Info'

export const bottomItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MusicVideoIcon />
      </ListItemIcon>
      <ListItemText primary="Demo" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FeedbackIcon />
      </ListItemIcon>
      <ListItemText primary="Feedback" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="Info" />
    </ListItem>
  </div>
)
