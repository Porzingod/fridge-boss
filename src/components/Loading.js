import React from 'react'

import '../styles/Loading.css'

import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => {
  return (
    <CircularProgress className="Loading-animation" size={150} thickness={20}/>
  )
}

export default Loading
