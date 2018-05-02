import { MY_API_URL } from '../constants'

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
          type: "LOGIN_SUCCESS",
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

}
