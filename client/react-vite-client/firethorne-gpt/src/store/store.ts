import { configureStore } from '@reduxjs/toolkit';
import { conversationApi } from './conversationApi';

const store = configureStore({
  reducer: {
    [conversationApi.reducerPath]: conversationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(conversationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
