import { createSlice } from '@reduxjs/toolkit'
import threadService from '../services/threads'

const slice = createSlice({
  name: 'thread',
  initialState: [],
  reducers: {
    initializeWith(state, { payload }) {
      return payload
    },
    addNew(state, { payload }) {
      return state.concat(payload)
    },
    removeOne(state, { payload }) {
      return state.filter(t => t.id !== payload)
    },
    updateOne(state, { payload }) {
      return state.map(t => (t.id === payload.id ? payload : t))
    },
  },
})

export const initializeThreads = () => {
  return async (dispatch) => {
    threadService.getAll().then((response) => {
      dispatch(initializeWith(response))
    })
  }
}

export const deleteThread = (id) => {
  return async (dispatch) => {
    threadService.remove(id).then(() => {
      dispatch(removeOne(id))
    })
  }
}

export const createThread = (thread) => {
  return async (dispatch) => {
    threadService
      .create(thread)
      .then((response) => {
        dispatch(addNew(response))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const { initializeWith, addNew, removeOne } = slice.actions
export default slice.reducer