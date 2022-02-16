import threadService from '../services/threads'

export const threadReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_THREAD':
    return action.data
  case 'NEW_THREAD':
    return [...state, action.data]
  case 'REMOVE_THREAD':
    return state.filter(id  => id !== action.payload)
  default: return state
  }
}

export const initializeThreads = () => {
  return async dispatch => {
    const threads = await threadService.getAll()
    dispatch({
      type: 'INIT_THREAD',
      data: threads,
    })
  }
}

export const createThread = thread => {
  return async dispatch => {
    const newThread = await threadService.create(thread)
    dispatch({
      type: 'NEW_THREAD',
      data: newThread
    })
  }
}

export const removeThread = thread => {
  return async dispatch => {
    const removedThread = await threadService.remove(thread)
    dispatch({
      type: 'REMOVE_THREAD',
      data: removedThread
    })
  }
}

export default threadReducer