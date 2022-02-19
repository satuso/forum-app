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
      return state.filter((b) => b.id !== payload)
    },
    update(state, { payload }) {
      return state.map((b) => (b.id === payload.id ? payload : b))
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

export const updateThread = (thread) => {
  return async (dispatch) => {
    threadService.update(thread.id, thread).then((updatedthread) => {
      dispatch(update(updatedthread))
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

const { initializeWith, addNew, removeOne, update } = slice.actions
export default slice.reducer