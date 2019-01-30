import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    backgroundColor: '#616161',
    marginBottom: theme.spacing.unit,
    height: 200
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  title: {
    fontSize: theme.typography.pxToRem(18),
  },
  description: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
})

class VideoRenderer extends Component {
  constructor(props){
      super(props)

      this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  handleVideoSelection(event) {
    this.props.handleVideoSelection(this.props.id)
  }

  render() {
    const { classes } = this.props

    return (
      <Card className={classes.card}>

        <Grid container
          spacing={8}
          direction="row">
          <Grid item xs={5} sm={5}>
            <CardActionArea onClick = {this.handleVideoSelection}>
              <CardMedia
                component="img"
                alt={this.props.title}
                className={classes.media}
                height="200"
                image={this.props.image}
                title={this.props.imageTitle}
              />
            </CardActionArea>
          </Grid>
          <Grid item xs={7} sm={7}>
            <CardContent>
              <Typography className={classes.title}>
                {this.props.title}
              </Typography>
              <Typography className={classes.description}>
                {this.props.description}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>

      </Card>
    )
  }
}

VideoRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(VideoRenderer)
