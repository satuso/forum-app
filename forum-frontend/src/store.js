import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import threadReducer, { initializeThreads } from './reducers/threadReducer'
import postReducer, { initializePosts } from './reducers/postReducer'
import userReducer, { initializeUsers } from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import threadService from './services/threads'
import postService from './services/posts'
import userService from './services/users'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  threads: threadReducer,
  posts: postReducer,
  users: userReducer,
  notification: notificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

threadService.getAll().then(thread =>
  store.dispatch(initializeThreads(thread))
)

postService.getAll().then(post =>
  store.dispatch(initializePosts(post))
)

userService.getAll().then(user =>
  store.dispatch(initializeUsers(user))
)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})


export default store