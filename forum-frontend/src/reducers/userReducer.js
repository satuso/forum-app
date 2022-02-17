import userService from '../services/users'

export const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USER':
    return action.data
  case 'NEW_USER':
    return [...state, action.data]
  case 'REMOVE_USER':
    return [...state, state.filter(id  => id !== action.payload)]
  default: return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USER',
      data: users,
    })
  }
}

export const createUser = user => {
  return async dispatch => {
    const newUser = await userService.create(user)
    dispatch({
      type: 'NEW_USER',
      data: newUser
    })
  }
}

export const removeUser = user => {
  return async dispatch => {
    const removedUser = await userService.remove(user)
    dispatch({
      type: 'REMOVE_USER',
      data: removedUser
    })
  }
}

export default userReducer