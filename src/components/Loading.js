import React from 'react'

import '../styles/Loading.css'

import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => {
  return (
    <div className="Loading-container">
      <div className="Loading-column-1"></div>
      <div className="Loading-column-2">
        <div className="Loading-row-1"></div>
        <CircularProgress className="Loading-row-2 Loading-animation" size={200} thickness={30}/>
        <div className="Loading-row-3"></div>
      </div>
      <div className="Loading-column-3"></div>
    </div>
  )
}

export default Loading
