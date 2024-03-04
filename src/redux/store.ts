import {configureStore} from '@reduxjs/toolkit'
import {clientsSlice,modalSlice,providersSlice} from './slices'


export const store = configureStore({
  reducer: {
    modal: modalSlice,
    providers: providersSlice,
    clients: clientsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch