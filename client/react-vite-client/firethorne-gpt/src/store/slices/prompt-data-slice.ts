import { createSlice } from '@reduxjs/toolkit';

export interface Prompt {
  role?: string;
  perspective?: string;
  goal?: string;
  additionalInformation?: string;
};

export interface PromptDataState {
  data: Prompt | null
}

const initialState: PromptDataState = {
  data: null,
};

const promptDataSlice = createSlice({
  name: 'promptData',
  initialState,
  reducers: {
    setPromptData: (state, action) => {
      const field = action.payload.field;
      const value = action.payload.value;

      state.data = {
        ...state.data,
        [field]: value
      };
    },
    reset: (state) => {
      state.data = null;
    },
  },
});

export const { setPromptData, reset } = promptDataSlice.actions;
export default promptDataSlice.reducer;