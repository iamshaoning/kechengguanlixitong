import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Organization, Grade } from '../../types';

interface OrganizationsState {
  organizations: Organization[];
  grades: Grade[];
  loading: boolean;
  error: string | null;
}

const initialState: OrganizationsState = {
  organizations: [],
  grades: [],
  loading: false,
  error: null,
};

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    setOrganizations: (state, action: PayloadAction<Organization[]>) => {
      state.organizations = action.payload;
    },
    addOrganization: (state, action: PayloadAction<Organization>) => {
      state.organizations.push(action.payload);
    },
    updateOrganization: (state, action: PayloadAction<Organization>) => {
      const index = state.organizations.findIndex(org => org.id === action.payload.id);
      if (index !== -1) {
        state.organizations[index] = action.payload;
      }
    },
    deleteOrganization: (state, action: PayloadAction<string>) => {
      state.organizations = state.organizations.filter(org => org.id !== action.payload);
      state.grades = state.grades.filter(grade => grade.organizationId !== action.payload);
    },
    setGrades: (state, action: PayloadAction<Grade[]>) => {
      state.grades = action.payload;
    },
    addGrade: (state, action: PayloadAction<Grade>) => {
      state.grades.push(action.payload);
    },
    updateGrade: (state, action: PayloadAction<Grade>) => {
      const index = state.grades.findIndex(grade => grade.id === action.payload.id);
      if (index !== -1) {
        state.grades[index] = action.payload;
      }
    },
    deleteGrade: (state, action: PayloadAction<string>) => {
      state.grades = state.grades.filter(grade => grade.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setOrganizations, addOrganization, updateOrganization, deleteOrganization, setGrades, addGrade, updateGrade, deleteGrade, setLoading, setError } = organizationsSlice.actions;
export default organizationsSlice.reducer;
