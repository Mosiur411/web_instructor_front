import { apiSlice } from "../../apps/apiSlice";

export const eventApi = apiSlice.enhanceEndpoints({ addTagTypes: ['event'] }).injectEndpoints({

  endpoints: (builder) => ({
    // Create Event
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: 'event',
        method: 'POST',
        body: eventData,
      }),
      invalidatesTags: ['event'],
    }),

    // // Get all Events
    getEvents: builder.query({
      query: (params) => ({
        url: 'event',
        params,
      }),
      transformResponse: (response) => response.events,
      // eslint-disable-next-line no-unused-vars
      providesTags: (result = [], error, arg) =>
        result.length
          ? [
            ...result.map(({ _id }) => ({ type: 'event', id: _id })),
            { type: 'event', id: 'LIST' },
          ]
          : [{ type: 'event', id: 'LIST' }],
    }),



    joinEvent: builder.mutation({
      query: (eventId) => ({
        url: `event/${eventId}/join`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'event', id }],
    }),


    getMyEvents: builder.query({
      query: () => 'event/my-events',
      providesTags: ['event'],
    }),



    updateEvent: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `event/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'event', id }],
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `event/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'event', id }],
    }),



  }),




})




// Export hooks for usage in functional components
export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useJoinEventMutation,
  useGetMyEventsQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
