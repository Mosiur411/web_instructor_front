import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001/event',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userInfo?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    // Create Event
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: '',
        method: 'POST',
        body: eventData,
      }),
      invalidatesTags: ['Event'],
    }),

    // // Get all Events
getEvents: builder.query({
  query: (params) => ({
    url: '',
    params,
  }),
  transformResponse: (response) => response.events,
  // eslint-disable-next-line no-unused-vars
  providesTags: (result = [], error, arg) =>
    result.length
      ? [
          ...result.map(({ _id }) => ({ type: 'Event', id: _id })),
          { type: 'Event', id: 'LIST' },
        ]
      : [{ type: 'Event', id: 'LIST' }],
}),



joinEvent: builder.mutation({
  query: (eventId) => ({
    url: `/${eventId}/join`, 
    method: 'POST',
  }),
  invalidatesTags: (result, error, id) => [{ type: 'Event', id }],
}),


getMyEvents: builder.query({
  query: () => '/my-events',
  providesTags: ['MyEvents'], 
}),



    updateEvent: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: 'PUT',  
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }],
    }),

    // // Delete Event by ID (optional)
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Event', id }],
    }),



  }),
});

// Export hooks for usage in functional components
export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useJoinEventMutation,
  useGetMyEventsQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
