import { configureStore } from '@reduxjs/toolkit';

import { conversationApi } from './conversation-api';
import helpPopupReducer from "./slices/help-popup-slice";
import promptDataReducer from "./slices/prompt-data-slice";

const store = configureStore({
  reducer: {
    'helpPopup': helpPopupReducer,
    'promptData': promptDataReducer,
    [conversationApi.reducerPath]: conversationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(conversationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
