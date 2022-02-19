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
      return state.filter((b) => b.id !== payload)
    },
    update(state, { payload }) {
      return state.map((b) => (b.id === payload.id ? payload : b))
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

export const updatePost = (post) => {
  return async (dispatch) => {
    postService.update(post.id, post).then((updatedpost) => {
      dispatch(update(updatedpost))
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

const { initializeWith, addNew, removeOne, update } = slice.actions
export default slice.reducer