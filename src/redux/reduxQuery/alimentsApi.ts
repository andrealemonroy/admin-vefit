import api from './api';

const alimentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAliments: build.query<any, string>({
      query: () => `aliments`,
      providesTags: [{ type: 'Aliments', id: 'LIST' }],
    }),
    deleteAliment: build.mutation({
      query: (id) => ({
        url: `aliments/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: [{ type: 'Aliments', id: 'LIST' }],
    }),
    createAliment: build.mutation({
      query: (user) => ({
        url: `aliments`,
        method: `POST`,
        body: user,
      }),
    }),
    updateAliment: build.mutation({
      query: (user) => ({
        url: `aliments/${user?.id}`,
        method: `PUT`,
        body: user,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Aliments', id }],
    }),
    getAliment: build.query({
      query: (id) => `aliments/${id}`,
    }),
  }),
});

export const {
  useGetAlimentsQuery,
  useDeleteAlimentMutation,
  useCreateAlimentMutation,
  useUpdateAlimentMutation,
  useGetAlimentQuery,
} = alimentsApi;
