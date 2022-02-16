import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import threadReducer, { initializeThreads } from './reducers/threadReducer'
import notificationReducer from './reducers/notificationReducer'
import threadService from './services/threads'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  threads: threadReducer,
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

export default store