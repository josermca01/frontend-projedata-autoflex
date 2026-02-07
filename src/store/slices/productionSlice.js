import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productionAPI } from '../../services/api';

export const fetchProductionSuggestion = createAsyncThunk(
  'production/fetchProductionSuggestion',
  async () => {
    const response = await productionAPI.getSuggestion();
    return response.data;
  }
);

const productionSlice = createSlice({
  name: 'production',
  initialState: {
    suggestion: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductionSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductionSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestion = action.payload;
      })
      .addCase(fetchProductionSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productionSlice.reducer;
