import React from 'react'
import Avatar from '@material-ui/core/Avatar'

// File che importa le nostre foto e le esporta sotto forma di Avatar

function Mattia(props) {
  return (
    <Avatar
      alt="Mattia Biondi"
      src="./mattia.png"
    />
  )
}

function Julien(props) {
  return (
    <Avatar
      alt="Julien Gaglioti"
      src="./julien.jpg"
    />
  )
}

export {
  Mattia,
  Julien
}
