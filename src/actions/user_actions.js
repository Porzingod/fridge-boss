import { MY_API_URL } from '../constants'

export const renderLoginForm = () => {
  return (dispatch) => {
    dispatch({ type: "TOGGLE_LOGIN_FORM" })
  }
}

export const login = (body) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_PENDING" })
    return fetch(`${MY_API_URL}/sessions`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => dispatch({
          type: "LOGIN_FULFILLED",
          payload: json
        })
      )
      .catch(err => dispatch({
        type: "LOGIN_REJECTED",
        payload: err
      })
    )
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT_USER" })
    dispatch({ type: "CLEAR_RECIPES" })
    dispatch({ type: "CLEAR_INGREDIENTS" })
    dispatch({ type: "CLEAR_FILTERS" })
  }
}

export const renderRegisterForm = () => {
  return (dispatch) => {
    dispatch({ type: "TOGGLE_REGISTER_FORM" })
  }
}

export const register = (body) => {
  return (dispatch) => {
    dispatch({ type: "REGISTER_USER_PENDING" })
    return fetch(`${MY_API_URL}/users`, {
      method: "POST",
      body: JSON.stringify({user: body}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => dispatch({
        type: "REGISTER_USER_FULFILLED",
        payload: json
      })
    )
      .catch(err => dispatch({
        type: "REGISTER_USER_REJECTED",
        payload: err
      }))
  }
}
