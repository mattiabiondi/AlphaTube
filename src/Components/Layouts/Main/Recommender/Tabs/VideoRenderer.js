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
    display: 'inline-block',
  },
  description2: {
    fontSize: theme.typography.pxToRem(15),
    color: '#FFFFFF',
    display: 'inline-block',
  },
})

class VideoRenderer extends Component {
  constructor(props){
      super(props)

      this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  handleVideoSelection(event) {
    this.props.handleVideoSelection(this.props.video)
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
                alt={this.props.video.title}
                className={classes.media}
                height="200"
                image={this.props.video.thumbnails.high.url}
                title={this.props.video.title}
              />
            </CardActionArea>
          </Grid>
          <Grid item xs={7} sm={7}>
            <CardContent>
              <Typography className={classes.title}>
                {this.props.video.title}
              </Typography>
              <Typography className={classes.description}>
                {"Genre: \u00A0 "}
              </Typography>
              <Typography className={classes.description2}>
                {this.props.video.category}
              </Typography>
              <br/>
              <Typography className={classes.description}>
                {"Suggestion reason: \u00A0 "}
              </Typography>
              <Typography className={classes.description2}>
                {this.props.suggestion}
              </Typography>
              <br/>
              <Typography className={classes.description}>
                {"Views: \u00A0 "}
              </Typography>
              <Typography className={classes.description2}>
                {this.props.views}
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
