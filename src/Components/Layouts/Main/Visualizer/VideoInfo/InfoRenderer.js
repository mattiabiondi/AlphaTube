import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

class InfoRenderer extends Component {
  render() {
    return (
      <List>
        <ListItem>
          <ListItemText
            primary = {this.props.song}
            secondary = 'Song'
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary = {this.props.artist}
            secondary = 'Artist'
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary = {this.props.album}
            secondary = 'Album'
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary = {this.props.year}
            secondary = 'Year'
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary = {this.props.genre}
            secondary = 'Genre'
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary = {this.props.id}
            secondary = 'YouTube ID'
          />
        </ListItem>
      </List>
    )
  }
}

export default InfoRenderer
