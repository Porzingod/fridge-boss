const initialState = {
  loggedIn: false,
  user_id: null,
  view: null,
}

export const userReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case "REMEMBER_USER":
      return {...state, loggedIn: true, user_id: payload}

    case "TOGGLE_LOGIN_FORM":
      return {...state, view: null}
    case "LOGIN_FULFILLED":
      return {...state, loggedIn: true, user_id: payload.id, view: null}
    case "LOGIN_REJECTED":
      return {...state, errors: payload}

    case "LOGOUT_USER":
      return initialState

    case "TOGGLE_REGISTER_FORM":
      return {...state, view: "register"}
    case "REGISTER_USER_FULFILLED":
      return {...state, loggedIn: true, user_id: payload.id, view: null}
    case "REGISTER_USER_REJECTED":
      return {...state, errors: payload}

    default:
      return state
  }
}
