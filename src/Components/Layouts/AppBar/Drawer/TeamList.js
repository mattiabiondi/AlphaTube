import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { Mattia, Julien } from './Avatars'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

function FolderList(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Avatar>
            AA
          </Avatar>
          <ListItemText primary="Andrea Alfiero" secondary="andrea.alfiero2@studio.unibo.it" />
        </ListItem>
        <ListItem>
          <Mattia />
          <ListItemText primary="Mattia Biondi" secondary="mattia.biondi3@studio.unibo.it" />
        </ListItem>
        <ListItem>
          <Julien />
          <ListItemText primary="Julien Gaglioti" secondary="julien.gaglioti@studio.unibo.it" />
        </ListItem>
      </List>
    </div>
  )
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FolderList)
