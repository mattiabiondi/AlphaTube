import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import LikeIcon from '@material-ui/icons/ThumbUp'

const styles = theme => ({
  card: {
    backgroundColor: '#616161',
    marginBottom: theme.spacing.unit * 2
  },
  likes: {
    display: 'inline-block',
  },
  actions: {
    margin: theme.spacing.unit
  },
})

class CommentRenderer extends Component {
  render() {
    const { classes } = this.props

    if(this.props.likes > 0) {
      return (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label = "Avatar"
                alt = "avatar"
                src = {this.props.avatar}
              />
            }
            title = {this.props.author}
            subheader = {this.props.time}
          />
          <CardContent>
            <Typography component="p">
              {this.props.text}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <Icon>
              <LikeIcon />
            </Icon>
            <Typography className={classes.likes}>
              {this.props.likes}
            </Typography>
          </CardActions>
        </Card>
      )
    }
    else {
      return (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label = "Avatar"
                alt = "avatar"
                src = {this.props.avatar}
              />
            }
            title = {this.props.author}
            subheader = {this.props.time}
          />
          <CardContent>
            <Typography component="p">
              {this.props.text}
            </Typography>
          </CardContent>
        </Card>
      )
    }

  }
}

CommentRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles) (CommentRenderer)
