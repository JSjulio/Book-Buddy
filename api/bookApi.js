
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";// Import createApi (function to create an API service) and fetchBaseQuery (a basic fetch wrapper)
// Import createApi (function to create an API service) and fetchBaseQuery (a basic fetch wrapper)
// from Redux Toolkit Query's React-specific entry points


export const mainApi = createApi({
    // Define an API using createApi
    reducerPath: "mainApi",

// bookApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define an API using createApi
export const mainApi = createApi({

    // Unique string used in constructing Redux action types, state selectors, and React hook names
    reducerPath: "mainApi", 


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

        //Get single book
        fetchBookById: builder.query({
            query: (bookId) => ({
                url: `books/${bookId}`,
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response, meta, arg) => response.book,
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
            transformResponse: (response, meta, arg) => response.reservation,
        }),

        //Checkout book by book id
        checkoutBook: builder.mutation({
            query: ({ bookId, available, token}) => ({
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

    // Define a base query function that all endpoints will use as the base of their request
    baseQuery: fetchBaseQuery({ 
        baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/",
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const state = getState();
            const token = state.login.token;
            if (token) {
              headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
          },
    }),

    endpoints: (builder) => ({ 
        
        register: builder.mutation({
            // Define the query for the mutation
            query: ({ email, password }) => ({
                url: 'users/register', // The URL for the registration endpoint
                method: 'POST', // Set the method to POST
                body: { 
                    email, 
                    password 
                }, // The registration data to be sent in the request body
            }),
        }),
       login: builder.mutation({   
            query: ({ email, password }) => ({
                url: 'users/login', // The URL for the registration endpoint
                method: 'POST', // Set the method to POST, which creates a new token
                // body = what is sent to server
                body: { 
                    email, 
                    password 
                },
            }),
        }),
        account: builder.query({   
            query: () => ({
                url: 'users/me', // The URL for the registration endpoint
               // By default, this is a GET request. GET requests don't need a body or specifying as a GET
            }),
        }),
    })
})

// Export the hook generated by RTK Query for the register mutation
export const { useRegisterMutation, useLoginMutation, useAccountQuery } = mainApi;


export const {
    useFetchBooksQuery, useRegisterMutation, useLoginMutation, useGetReservationsQuery, useCheckoutBookMutation, useReturnBookMutation, useFetchBookByIdQuery } = mainApi; 