import React from 'react'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MusicVideoIcon from '@material-ui/icons/MusicVideo'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import StartingList from './StartingList'

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  state = {
    open: false, // Lo stato del Dialog (aperto/chiuso)
  }

  handleClickOpen = () => {
    this.setState({ open: true }) // Quando si clicca sul button apre il dialog
  }

  handleClose = () => {
    this.setState({ open: false }) // Chiude il dialog
  }

  handleVideoSelection(video) {
    this.props.handleVideoSelection(video) // Passa il video alla classe sopra
    this.handleClose() // Chiude il dialog dopo aver selezionato il video
  }

  render() {
    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemIcon>
            <MusicVideoIcon />
          </ListItemIcon>
          <ListItemText primary="Demo" />
        </ListItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Starting list"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <StartingList handleVideoSelection = {this.handleVideoSelection} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default Demo
