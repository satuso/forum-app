import { createSlice } from '@reduxjs/toolkit'
import postService from '../services/posts'

const slice = createSlice({
  name: 'post',
  initialState: [],
  reducers: {
    initializeWith(state, { payload }) {
      return payload
    },
    addNew(state, { payload }) {
      return state.concat(payload)
    },
    removeOne(state, { payload }) {
      return state.filter(p => p.id !== payload)
    },
    updateOne(state, { payload }) {
      return state.map(p => (p.id === payload.id ? payload : p))
    },
  },
})

export const initializePosts = () => {
  return async (dispatch) => {
    postService.getAll().then((response) => {
      dispatch(initializeWith(response))
    })
  }
}

export const deletePost = (id) => {
  return async (dispatch) => {
    postService.remove(id).then(() => {
      dispatch(removeOne(id))
    })
  }
}

export const createPost = (post) => {
  return async (dispatch) => {
    postService.create(post).then((response) => {
      dispatch(addNew(response))
    }).catch((error) => {
      console.log(error)
    })
  }
}

const { initializeWith, addNew, removeOne } = slice.actions
export default slice.reducer