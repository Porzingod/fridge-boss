const initialState = {
  location: "/",
}

export const historyReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case "ROUTER_PUSH":
      return {...state}
    case "ROUTER_REPLACE":
      return {...state}
    case "ROUTER_GO":
      return {...state}
    case "ROUTER_GO_BACK":
      return {...state}
    case "ROUTER_GO_FORWARD":
      return {...state}

    default:
      return state
  }
}
