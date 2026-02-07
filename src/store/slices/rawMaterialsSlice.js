import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rawMaterialsAPI } from '../../services/api';

export const fetchRawMaterials = createAsyncThunk(
  'rawMaterials/fetchRawMaterials',
  async () => {
    const response = await rawMaterialsAPI.getAll();
    return response.data;
  }
);

export const createRawMaterial = createAsyncThunk(
  'rawMaterials/createRawMaterial',
  async (rawMaterial) => {
    const response = await rawMaterialsAPI.create(rawMaterial);
    return response.data;
  }
);

export const updateRawMaterial = createAsyncThunk(
  'rawMaterials/updateRawMaterial',
  async ({ id, rawMaterial }) => {
    const response = await rawMaterialsAPI.update(id, rawMaterial);
    return response.data;
  }
);

export const deleteRawMaterial = createAsyncThunk(
  'rawMaterials/deleteRawMaterial',
  async (id) => {
    await rawMaterialsAPI.delete(id);
    return id;
  }
);

const rawMaterialsSlice = createSlice({
  name: 'rawMaterials',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRawMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createRawMaterial.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateRawMaterial.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteRawMaterial.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default rawMaterialsSlice.reducer;
