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

export const removePost = post => {
  return async dispatch => {
    const removedPost = await postService.remove(post)
    dispatch({
      type: 'REMOVE_POST',
      data: removedPost
    })
  }
}

export default postReducer