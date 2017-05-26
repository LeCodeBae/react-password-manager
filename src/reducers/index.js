import * as actionTypes from '../actions/constants'

const reducer = (state=[], action) => {
  switch (action.type) {
    case actionTypes.FETCH_PASSWORD_SUCCESS:
      return action.datas
    case actionTypes.CREATE_PASSWORD_SUCCESS:
      return [...state, action.data]
    case actionTypes.DELETE_PASSWORD_SUCCESS:
      return [...state.filter(data => data.id !== action.data.id)]
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return [...state.filter(data => data.id !== action.data.id), action.data]
    default:
      return state
  }
}

export default reducer