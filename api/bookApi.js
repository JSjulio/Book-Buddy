import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";// Import createApi (function to create an API service) and fetchBaseQuery (a basic fetch wrapper)
// Import createApi (function to create an API service) and fetchBaseQuery (a basic fetch wrapper)
// from Redux Toolkit Query's React-specific entry points


export const bookApi = createApi({
    // Define an API using createApi
    reducerPath: "bookApi",
    // Unique string used in constructing Redux action types, state selectors, and React hook names

    baseQuery: fetchBaseQuery({
        baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/"
        // Define a base query function that all endpoints will use as the base of their request
        // The base URL for all requests
    }),

    endpoints: (builder) => ({
        fetchBooks: builder.query({
            query: () => 'books',
            transformResponse: (response, meta, arg) => response.books,
            // The part of the URL that comes after the baseUrl for this specific endpoint
            // Define an endpoint that fetches players
        }),
        userRegistrationMutation: builder.mutation({
            query: (userData) => ({
                url: 'user/registration',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const {
    useFetchBooksQuery,
    useUserRegistrationMutation,
} = bookApi;

