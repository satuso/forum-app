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
    postService
      .create(post)
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

/*

import postService from '../services/posts'

export const postReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_POST':
    return action.data
  case 'NEW_POST':
    return [...state, action.data]
  case 'REMOVE_POST':
    return state.filter(id  => id !== action.payload)
  default: return state
  }
}

export const initializePosts = () => {
  return async dispatch => {
    const posts = await postService.getAll()
    dispatch({
      type: 'INIT_POST',
      data: posts,
    })
  }
}

export const createPost = post => {
  return async dispatch => {
    const newPost = await postService.create(post)
    dispatch({
      type: 'NEW_POST',
      data: newPost
    })
  }
}

export const deletePost = post => {
  return async dispatch => {
    const removedPost = await postService.remove(post)
    dispatch({
      type: 'REMOVE_POST',
      data: removedPost
    })
  }
}

export default postReducer*/