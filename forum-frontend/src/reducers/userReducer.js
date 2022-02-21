import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const slice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    initializeWith(state, { payload }) {
      return payload
    },
    addNew(state, { payload }) {
      return state.concat(payload)
    },
    removeOne(state, { payload }) {
      return state.filter(u => u.id !== payload)
    },
    updateOne(state, { payload }) {
      return state.map(u => (u.id === payload.id ? payload : u))
    }
  }
})

export const initializeUsers = () => {
  return async (dispatch) => {
    userService.getAll().then((response) => {
      dispatch(initializeWith(response))
    })
  }
}

export const deleteUser = (id) => {
  return async (dispatch) => {
    userService.remove(id).then(() => {
      dispatch(removeOne(id))
    })
  }
}

export const updateUser = (id, data) => {
  return async (dispatch) => {
    userService.update(id, data).then((updatedUser) => {
      dispatch(updateOne(updatedUser))
    })
  }
}

export const createUser = (user) => {
  return async (dispatch) => {
    userService
      .create(user)
      .then((response) => {
        dispatch(addNew(response))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const { initializeWith, addNew, removeOne, updateOne } = slice.actions
export default slice.reducer