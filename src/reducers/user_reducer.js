const initialState = {
  //dynamically
  userId: 0,
  username: null
}

export const userReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case "LOGIN_SUCCESS":
      return {...state, userId: payload.id, username: payload.username}
    default:
      return state
  }
}
