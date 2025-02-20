import { configureStore } from '@reduxjs/toolkit';

import { conversationApi } from './conversation-api';
import helpPopupSlice from "./slices/help-popup-slice";
import promptDataSlice from "./slices/prompt-data-slice";

const store = configureStore({
  reducer: {
    'helpPopup': helpPopupSlice.reducer,
    'promptData': promptDataSlice.reducer,
    [conversationApi.reducerPath]: conversationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(conversationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
