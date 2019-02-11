import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FeedbackIcon from '@material-ui/icons/Feedback'

// Tasto Feedback per inviare mail ad amministratore di sistema

class Feedback extends React.Component {
  mailTo = () => {
    window.location.href = "mailto:andrea.alfiero2@studio.unibo.it;mattia.biondi3@studio.unibo.it;julien.gaglioti@studio.unibo.it"
  }

  render() {
    return (
      <div>
        <ListItem button onClick={this.mailTo}>
          <ListItemIcon>
            <FeedbackIcon />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
      </div>
    )
  }
}

export default Feedback
