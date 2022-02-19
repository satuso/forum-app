import threadReducer from './reducers/threadReducer'
import postReducer from './reducers/postReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    threads: threadReducer,
    posts: postReducer,
    users: userReducer,
    notification: notificationReducer
  }
})
/*
threadService.getAll().then(thread =>
  store.dispatch(initializeThreads(thread))
)

postService.getAll().then(post =>
  store.dispatch(initializePosts(post))
)

userService.getAll().then(user =>
  store.dispatch(initializeUsers(user))
)
*/

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})


export default store