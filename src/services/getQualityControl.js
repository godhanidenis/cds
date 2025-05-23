import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosServices from 'utils/axios';

export const assignQualityControl = createAsyncThunk(
  'qualityControl/assignQualityControl',
  async ({ payload, onSuccess, dispatchNotification }, { rejectWithValue }) => {
    try {
      const response = await axiosServices.post(`/api/qc/`, payload);
      if (response.data) {
        dispatchNotification('Assign quality control successfully!!');
        onSuccess();
      }
      return response.data;
    } catch (error) {
      dispatchNotification('Fetching error with assign quality control!!', true);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllQualityControl = createAsyncThunk(
  'qualityControl/getAllQualityControl',
  async ({ id, dispatchNotification }, { rejectWithValue }) => {
    try {
      const response = await axiosServices.get(`/api/university-details/?assigned_to=${id}`);
      return response.data;
    } catch (error) {
      dispatchNotification('Failed to fetch quality control data!!', true);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSelectedQualityControl = createAsyncThunk(
  'qualityControl/getSelectedQualityControl',
  async ({ university_id, year_id, dispatchNotification }, { rejectWithValue }) => {
    try {
      console.log(' university_id, year_id,', university_id, year_id);
      // const response = await axiosServices.get(`/api/university-basic-detail/?university_id=${university_id}&year_id=${year_id}`);
      return {
        id: 1,
        institute_name: 'American University',
        academic_year: '2020-2021',
        address: 'Washington, D.C. 20016',
        phone_number: '202-885-1000',
        website: 'american.edu',
        admission_phone: '202-885-6000',
        admission_email: 'admissions@american.edu',
        institutional_control: ['Public'],
        institute_type: 'Coeducational college',
        academic_year_calendar: 'Semester',
        degrees_offered: [
          'Certificate',
          'Associate',
          "Bachelor's",
          "Postbachelor's certificate",
          "Master's",
          'Doctoral degree research/scholarship',
          'Doctoral degree – professional practice'
        ],
        total_ug: 7953,
        total_grad: 6048,
        total_students: 14001,
        enrolment_percentage: 84.8,
        waitlist_offered: false,
        hs_requirement: 'High school diploma is required and GED is accepted',
        general_clg_preparatory_requirement: 'Recommend',
        sat_or_act_considered: false,
        institution_placement_tests: ['AP', 'Institutional Exam'],
        ftfy_avg_hs_gpa: 3.79,
        transfer_admission_facility: true,
        transfers_enroll_terms: ['Fall', 'Winter', 'Spring', 'Summer'],
        min_hs_gpa_for_transfers: 2.0,
        min_college_gpa_for_transfers: 2.0,
        created_at: '2025-05-19T09:37:03.061255Z',
        updated_at: '2025-05-19T09:37:03.061262Z',
        university: 190,
        year: 7
      };
      // || response.data
    } catch (error) {
      dispatchNotification(error?.detail || 'Failed to fetch university basic detail!!', true);
      return rejectWithValue(error?.detail);
    }
  }
);
