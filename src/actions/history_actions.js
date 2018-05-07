export const startListener = (history, store) => {
  store.dispatch(locationChange({
    pathname: history.location.pathname,
    search: history.location.search,
    hash: history.location.hash
  }))

  history.listen((location) => {
    store.dispatch(locationChange({
      pathname:  location.pathname,
      search: location.search,
      hash: location.hash,
    }))
  })
}

export const locationChange = ({pathname, search, hash}) => {
  return (dispatch) => {
    dispatch({
      type: "ROUTER_LOCATION_CHANGE",
      payload: {
        pathname,
        search,
        hash,
      }
    })
  }
}

export const historyPush = href => {
  return (dispatch) => {
    dispatch({ type: "ROUTER_PUSH", payload: href })
  }
}

export const historyReplace = href => {
  return (dispatch) => {
    dispatch({ type: "ROUTER_REPLACE", payload: href })
  }
}

export const historyGo = href => {
  return (dispatch) => {
    dispatch({ type: "ROUTER_GO", payload: href })
  }
}

export const historyBack = href => {
  return (dispatch) => {
    dispatch({ type: "ROUTER_GO_BACK", payload: href })
  }
}

export const historyForward = href => {
  return (dispatch) => {
    dispatch({ type: "ROUTER_GO_FORWARD", payload: href })
  }
}
