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
            onClick={() => { this.props.handleWiki(this.props.song)}}
            primary = {this.props.song}
            secondary = 'Song'
          />
        </ListItem>
        <ListItem>
          <ListItemText
            onClick={() => { this.props.handleWiki(this.props.artist)}}
            primary = {this.props.artist}
            secondary = 'Artist'
          />
        </ListItem>
        <ListItem>
          <ListItemText
            onClick={() => { this.props.handleWiki(this.props.album)}}
            primary = {this.props.album}
            secondary = 'Album'
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary = {this.props.date}
            secondary = 'Date'
          />
        </ListItem>
        <ListItem>
        <ListItemText
          secondary = 'Genres'
        />
          <List>
            <ListItem>
              <ListItemText
                onClick={() => { this.props.handleWiki(this.props.genre1)}}
                primary = {this.props.genre1}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                onClick={() => { this.props.handleWiki(this.props.genre2)}}
                primary = {this.props.genre2}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                onClick={() => { this.props.handleWiki(this.props.genre3)}}
                primary = {this.props.genre3}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                onClick={() => { this.props.handleWiki(this.props.genre4)}}
                primary = {this.props.genre4}
              />
            </ListItem>
          </List>
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
