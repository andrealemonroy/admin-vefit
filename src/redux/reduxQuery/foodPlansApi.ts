import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import api from './api';

const foodPlansApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFoodPlans: build.query({
      query: () => 'foodPlans',
      providesTags: [{ type: 'FoodPlans', id: 'LIST' }],
    }),
    getFoodPlan: build.query({
      query: (id) => `foodPlans/${id}`,
    }),
    createFoodPlan: build.mutation({
      query: (foodPlan) => ({
        url: 'foodPlans',
        method: 'POST',
        body: foodPlan,
      }),
    }),
    updateFoodPlan: build.mutation({
      query: (foodPlan) => ({
        url: `foodPlans/${foodPlan?.id}`,
        method: 'PUT',
        body: foodPlan,
      }),
    }),
    deleteFoodPlan: build.mutation({
      query: (id) => ({
        url: `foodPlans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'FoodPlans', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetFoodPlansQuery,
  useGetFoodPlanQuery,
  useCreateFoodPlanMutation,
  useUpdateFoodPlanMutation,
  useDeleteFoodPlanMutation,
} = foodPlansApi;
