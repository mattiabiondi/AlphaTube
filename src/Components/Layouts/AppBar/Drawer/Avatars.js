import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
}

function Mattia(props) {
  const { classes } = props
  return (
    <div className={classes.row}>
      <Avatar
        alt="Mattia Biondi"
        src="./avatar.png"
      />
    </div>
  )
}

Mattia.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Mattia)
