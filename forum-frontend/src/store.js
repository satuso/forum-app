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

export default store