import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../types";
import coursesData from "../utils/courses.json";

// Initial state
const initialState: {
  currentCourse: Course | null;
  status: string;
  error: string | null;
} = {
  currentCourse: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to fetch the current course from JSON data
export const fetchCurrentCourse = createAsyncThunk<Course, number>(
  "currentCourse/fetchCurrentCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      // Simulating data fetch from the local JSON
      const course = coursesData.find((course) => course.id === courseId);
      if (!course) {
        throw new Error(`Course with ID ${courseId} not found`);
      }
      console.log(`Course with ID ${courseId} found`);

      return course;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create slice
const currentCourseSlice = createSlice({
  name: "currentCourse",
  initialState,
  reducers: {
    // Synchronous action to set the current course manually
    setCurrentCourse: (state, action: PayloadAction<Course | null>) => {
      state.currentCourse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrentCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentCourse = action.payload;
      })
      .addCase(fetchCurrentCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { setCurrentCourse } = currentCourseSlice.actions;
export default currentCourseSlice.reducer;
