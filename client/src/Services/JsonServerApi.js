import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// @ts-ignore
export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Management",
    "Performance",
    "Dashboard",
  ],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `general/users/${id}`,
      providesTags: ["User"],
    }),
    getProducts: builder.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: builder.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: builder.query({
      query: ({ search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: builder.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: builder.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: builder.query({
      query: () => "management/admins",
      providesTags: ["Management"],
    }),
    getUserPerformance: builder.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: builder.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});
export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = jsonServerApi;
