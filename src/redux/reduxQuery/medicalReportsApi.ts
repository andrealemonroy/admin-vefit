import api from './api';

const medicalReportsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMedicalReports: build.query<any, string>({
      query: () => `medicalReports`,
      providesTags: [{ type: 'MedicalReports', id: 'LIST' }],
    }),
    deleteMedicalReport: build.mutation({
      query: (id) => ({
        url: `medicalReports/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: [{ type: 'MedicalReports', id: 'LIST' }],
    }),
    createMedicalReport: build.mutation({
      query: (user) => ({
        url: `medicalReports`,
        method: `POST`,
        body: user,
      }),
    }),
    updateMedicalReport: build.mutation({
      query: (user) => ({
        url: `medicalReports/${user?.id}`,
        method: `PUT`,
        body: user,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'MedicalReports', id },
      ],
    }),
    getMedicalReport: build.query({
      query: (id) => `medicalReports/${id}`,
    }),
  }),
});

export const {
  useGetMedicalReportsQuery,
  useDeleteMedicalReportMutation,
  useCreateMedicalReportMutation,
  useUpdateMedicalReportMutation,
  useGetMedicalReportQuery,
} = medicalReportsApi;
