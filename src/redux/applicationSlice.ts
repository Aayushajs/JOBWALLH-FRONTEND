import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicantUser {
    _id?: string;
    fullname?: string;
    email?: string;
    phoneNumber?: number;
    profile?: {
        resume?: string;
        resumeOriginalName?: string;
        profilePhoto?: string;
        skills?: string[];
    };
    createdAt?: string;
}

interface Application {
    _id?: string;
    job?: any;
    applicant?: ApplicantUser;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface Company {
    _id?: string;
    name?: string;
    logo?: string;
}

interface ApplicationsData {
    _id?: string;
    title?: string;
    description?: string;
    requirements?: string[];
    salary?: number;
    experienceLevel?: number;
    location?: string;
    jobType?: string;
    position?: number;
    company?: Company;
    created_by?: string;
    applications?: Application[];
    createdAt?: string;
    updatedAt?: string;
}

interface ApplicationState {
    applicants: ApplicationsData | null;
}

const initialState: ApplicationState = {
    applicants: null,
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setAllApplicants: (state, action: PayloadAction<ApplicationsData | null>) => {
            state.applicants = action.payload;
        },
        updateApplicantStatus: (state, action: PayloadAction<{ applicationId: string; status: string }>) => {
            const { applicationId, status } = action.payload;
            if (state.applicants?.applications) {
                const index = state.applicants.applications.findIndex(app => app._id === applicationId);
                if (index !== -1) {
                    state.applicants.applications[index].status = status;
                }
            }
        }
    }
});

export const { setAllApplicants, updateApplicantStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
