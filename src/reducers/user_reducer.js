const initialState = {
  userId: 0,
  username: null,
  view: null,
}

export const userReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case "TOGGLE_LOGIN_FORM":
      return {...state, view: null}
    case "LOGIN_FULFILLED":
      return {...state, userId: payload.id, username: payload.username, view: null}
    case "LOGIN_REJECTED":
      return {...state, errors: payload}

    case "LOGOUT_USER":
      return initialState

    case "TOGGLE_REGISTER_FORM":
      return {...state, view: "register"}
    case "REGISTER_USER_FULFILLED":
      return {...state, userId: payload.id, username: payload.username, view: null}
    case "REGISTER_USER_REJECTED":
      return {...state, errors: payload}

    default:
      return state
  }
}
