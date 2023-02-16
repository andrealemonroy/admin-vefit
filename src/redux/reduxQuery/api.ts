import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 10,
  endpoints: () => ({
  }),
});

export default api.enhanceEndpoints({
  addTagTypes: ['Users', 'Aliments', 'MedicalReports', 'FoodPlans'],
});