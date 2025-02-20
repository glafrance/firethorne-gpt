import { createSlice } from '@reduxjs/toolkit';

export interface HelpPopupState {
  activePopup: string | null;
}

const initialState: HelpPopupState = {
  activePopup: null,
};

const helpPopupSlice = createSlice({
  name: 'helpPopup',
  initialState,
  reducers: {
    setActivePopup: (state, action) => {
      state.activePopup = action.payload;
    },
  },
});

export const { setActivePopup } = helpPopupSlice.actions;
export default helpPopupSlice;