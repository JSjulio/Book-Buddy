import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";// Import createApi (function to create an API service) and fetchBaseQuery (a basic fetch wrapper)
// Import createApi (function to create an API service) and fetchBaseQuery (a basic fetch wrapper)
// from Redux Toolkit Query's React-specific entry points


export const mainApi = createApi({
    // Define an API using createApi
    reducerPath: "mainApi",
    // Unique string used in constructing Redux action types, state selectors, and React hook names
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/"
        // Define a base query function that all endpoints will use as the base of their request
        // The base URL for all requests
    }),


    endpoints: (builder) => ({
        fetchBooks: builder.query({
            query: () => 'books',
            transformResponse: (response) => response.books,
            // The part of the URL that comes after the baseUrl for this specific endpoint
            // Define an endpoint that fetches players
        }),
        
        account: builder.query({
            query: (token) => ({
              url: 'users/me',
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }),
          }),

        //Get single book
        fetchBookById: builder.query({
            query: (bookId) => ({
                url: `books/${bookId}`,
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response) => response.book,
        }),

        //Get reserved books
        getReservations: builder.query({
            query: (token) => ({
                url: 'reservations',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }),
            transformResponse: (response) => response.reservation,
        }),

        //Checkout book by book id
        checkoutBook: builder.mutation({
            query: ({ bookId, available, token }) => ({
                url: `books/${bookId}`,
                method: `PATCH`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    available,
                },
            }),
        }),

        //Return book by id
        returnBook: builder.mutation({
            query: ({ reservationId, token }) => ({
                url: `reservations/${reservationId}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        //Register new user
        register: builder.mutation({
            query: ({ email, password }) => ({
                url: 'users/register',
                method: 'POST',
                body: {
                    email,
                    password
                },
            }),
        }),

        //Login new user
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: 'users/login',
                method: 'POST',
                body: {
                    email,
                    password
                },
            }),
        }),
    })
});

export const {
    useFetchBooksQuery, useRegisterMutation, useLoginMutation, useGetReservationsQuery, useCheckoutBookMutation, useReturnBookMutation, useFetchBookByIdQuery, useAccountQuery } = mainApi; 