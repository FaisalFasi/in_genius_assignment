// coursesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Course } from "../types";
import coursesData from "../utils/courses.json";

// Define initial state
const initialState = {
  data: [] as Course[], // Array to store course data
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null as string | null, // Error message
};
// Fetch courses action (if needed, otherwise you can directly store the JSON)
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    console.log("Fetching courses...", coursesData);
    return coursesData; // Type casting JSON data
  }
);

// Create slice
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Handle 'pending' state
    builder.addCase(fetchCourses.pending, (state) => {
      state.status = "loading";
      state.error = null; // Clear any previous errors
    });
    // Handle 'fulfilled' state
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload; // Update with fetched data
    });

    // Handle 'rejected' state
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to fetch courses";
    });

    // builder.addCase(fetchCourses.fulfilled, (state, action) => {
    //   return action.payload;
    // });
  },
});

export default coursesSlice.reducer;
