const initialState = {
  //dynamically
  userId: 1,
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
