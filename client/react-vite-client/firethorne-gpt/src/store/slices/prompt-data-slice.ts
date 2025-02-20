import { createSlice } from '@reduxjs/toolkit';

export interface PromptDataState {
  promptData: {
    role?: string;
    perspective?: string;
    goal?: string;
    additionalInformation?: string;
  } | null
}

const initialState: PromptDataState = {
  promptData: null,
};

const promptDataSlice = createSlice({
  name: 'promptData',
  initialState,
  reducers: {
    setPromptData: (state, action) => {
      const field = action.payload.field;
      const value = action.payload.value;

      state.promptData = {
        ...state.promptData,
        [field]: value
      };
    },
  },
});

export const { setPromptData } = promptDataSlice.actions;
export default promptDataSlice;