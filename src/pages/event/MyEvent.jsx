import { useState } from "react";
import { useDeleteEventMutation, useGetMyEventsQuery, useUpdateEventMutation } from "../../redux/event/eventApi";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";



const MyEvent = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: events = [], isLoading, refetch } = useGetMyEventsQuery();
  const [deleteEvent] = useDeleteEventMutation();
  const [updateEvent] = useUpdateEventMutation();

  const handleDeleteConfirm = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteEvent(id).unwrap();
        refetch()
        Swal.fire({
          title: "Deleted!",
          text: "Event has been deleted.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.data?.message || "Something went wrong!",
        });
      }
    }
  };

  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async (updatedEvent) => {
    try {
      await updateEvent({
        id: updatedEvent._id,
        eventTitle: updatedEvent.eventTitle,
        posterName: updatedEvent.posterName,
        date: updatedEvent.date,
        time: updatedEvent.time,
        location: updatedEvent.location,
        description: updatedEvent.description,
      }).unwrap();
      refetch()
      Swal.fire({
        title: "Event Updated Success!",
        icon: "success",
        draggable: true,
      });
      setIsModalOpen(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.data.message}`,
      });
    }
  };

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto pt-40">
      {isLoading ? (
        <p className="text-center col-span-full text-gray-600">Loading events...</p>
      ) : events?.events?.length === 0 ? (
        <p className="text-center col-span-full text-gray-600">No events found.</p>
      ) : (
        events?.events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {event.eventTitle}
              </h2>

              <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                <FaUser className="text-gray-400" />
                <span className="font-medium text-gray-700">{event.posterName}</span>
              </p>

              <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                <FaCalendarAlt className="text-gray-400" />
                {new Date(event.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {event.time}
              </p>

              <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
                <FaMapMarkerAlt className="text-gray-400" />
                {event.location}
              </p>

              <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <p className="font-semibold text-gray-800">
                Attendees: {event.attendeeCount || 0}
              </p>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => handleUpdate(event)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  Update
                </button>

                <button
                  onClick={() => handleDeleteConfirm(event._id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>

            {isModalOpen && selectedEvent && (
              <div className="fixed inset-0 bg-gray-50 bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 lg:p-8 relative">
                  <button
                    className="absolute top-3 cursor-pointer right-3 text-gray-500 hover:text-gray-700 text-xl"
                    onClick={() => setIsModalOpen(false)}
                  >
                    ✕
                  </button>

                  <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Update Event</h2>
                    <p className="text-gray-500 mt-2 text-sm">Modify the event details below</p>
                  </div>

                  <form
                    className="space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateSubmit(selectedEvent); // You define this logic
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Event Title"
                      value={selectedEvent.eventTitle}
                      onChange={(e) =>
                        setSelectedEvent({ ...selectedEvent, eventTitle: e.target.value })
                      }
                      className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      type="text"
                      placeholder="Poster Name"
                      value={selectedEvent.posterName}
                      onChange={(e) =>
                        setSelectedEvent({ ...selectedEvent, posterName: e.target.value })
                      }
                      className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      type="date"
                      value={selectedEvent.date.split("T")[0]}
                      onChange={(e) =>
                        setSelectedEvent({ ...selectedEvent, date: e.target.value })
                      }
                      className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      type="time"
                      value={selectedEvent.time}
                      onChange={(e) =>
                        setSelectedEvent({ ...selectedEvent, time: e.target.value })
                      }
                      className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      type="text"
                      placeholder="Location"
                      value={selectedEvent.location}
                      onChange={(e) =>
                        setSelectedEvent({ ...selectedEvent, location: e.target.value })
                      }
                      className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <textarea
                      rows={3}
                      placeholder="Description"
                      value={selectedEvent.description}
                      onChange={(e) =>
                        setSelectedEvent({ ...selectedEvent, description: e.target.value })
                      }
                      className="w-full p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                      type="submit"
                      className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition"
                    >
                      Update Event
                    </button>
                  </form>
                </div>
              </div>
            )}


          </div>
        ))
      )}
    </div>

  );
};

export default MyEvent;
