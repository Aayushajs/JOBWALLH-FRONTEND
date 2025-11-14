import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Job {
    _id?: string;
    title?: string;
    description?: string;
    requirements?: string[];
    salary?: number;
    experienceLevel?: number;
    location?: string;
    jobType?: string;
    position?: number;
    company?: any;
    created_by?: string;
    applications?: any[];
    createdAt?: string;
    updatedAt?: string;
    isPremium?: boolean;
}

interface JobState {
    allJobs: Job[];
    allAdminJobs: Job[];
    singleJob: Job | null;
    searchJobByText: string;
    allAppliedJobs: any[];
    searchedQuery: string;
}

const initialState: JobState = {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
};

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        setAllJobs: (state, action: PayloadAction<Job[]>) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action: PayloadAction<Job | null>) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action: PayloadAction<Job[]>) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action: PayloadAction<string>) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action: PayloadAction<any[]>) => {
            state.allAppliedJobs = action.payload;
        },
        updateApplicationStatus: (state, action: PayloadAction<{ applicationId: string; status: string }>) => {
            const { applicationId, status } = action.payload;
            const index = state.allAppliedJobs.findIndex(app => app._id === applicationId);
            if (index !== -1) {
                state.allAppliedJobs[index].status = status;
            }
        },
        setSearchedQuery: (state, action: PayloadAction<string>) => {
            state.searchedQuery = action.payload;
        }
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    updateApplicationStatus,
    setSearchedQuery
} = jobSlice.actions;
export default jobSlice.reducer;
