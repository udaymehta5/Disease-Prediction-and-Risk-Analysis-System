import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentResult: null,   // Standard result: { predictions: [], risk: {}, disclaimer: "" }
  source: null,          // 'upload' | 'chat' | 'mcq'
  inputSummary: null,    // e.g. "File: blood_test.pdf" or "MCQ Assessment"
  resultId: null,
  loading: false,
  error: null
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setResult: (state, action) => {
      // payload: { result, source, inputSummary, id }
      state.currentResult = action.payload.result;
      state.source = action.payload.source;
      state.inputSummary = action.payload.inputSummary;
      state.resultId = action.payload.id || null;
      state.loading = false;
      state.error = null;
    },
    setResultLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResultError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearResult: (state) => {
      state.currentResult = null;
      state.source = null;
      state.inputSummary = null;
      state.resultId = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { setResult, setResultLoading, setResultError, clearResult } = resultSlice.actions;
export default resultSlice.reducer;
