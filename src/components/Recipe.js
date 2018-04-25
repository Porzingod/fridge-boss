import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchRecipeImage } from '../actions/recipes_actions'

import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridTile: {
    margin: 10
  }
};

class Recipe extends React.Component {
  componentDidMount() {

  }

  render() {
    const {recipe} = this.props
    const {recipeName, imageUrlsBySize} = recipe
    return(
      <GridTile style={style.gridTile} title={recipeName}
        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        actionIcon={<IconButton><ActionInfoOutline color="white" onClick={this.props.viewDetails}/></IconButton>}
      >
        <img src={imageUrlsBySize["90"]} />
      </GridTile>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchRecipeImage: fetchRecipeImage
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Recipe)
