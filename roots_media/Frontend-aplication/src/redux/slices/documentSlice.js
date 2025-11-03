import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadDocumentAPI } from "../../services/documentService";

// Async thunk for uploading document
export const uploadDocument = createAsyncThunk(
  "document/uploadDocument",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await uploadDocumentAPI(formData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to upload document."
      );
    }
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadDocument.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = documentSlice.actions;
export default documentSlice.reducer;
