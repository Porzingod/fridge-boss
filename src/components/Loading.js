import React from 'react'
import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => {
  return (
    <CircularProgress size={150} thickness={20} style={{padding:300}}/>
  )
}

export default Loading
