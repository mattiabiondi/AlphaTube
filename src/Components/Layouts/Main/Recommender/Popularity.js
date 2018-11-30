import React, { Component } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

class Popularity extends Component {
  state = {
    global: false,
    relative: true,
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked })
  }

  render() {
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.global}
              onChange={this.handleChange('global')}
              value="global"
            />
          }
          label="Global"
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.relative}
              onChange={this.handleChange('relative')}
              value="relative"
            />
          }
          label="Relative"
        />
      </FormGroup>
    )
  }
}

export default Popularity
