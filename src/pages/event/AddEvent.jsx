import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCreateEventMutation } from '../../redux/event/eventApi';
import Swal from 'sweetalert2';

export default function AddEvent() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [createEvent, { isLoading, isError, error, isSuccess }] = useCreateEventMutation();

  const [formData, setFormData] = useState({
    eventTitle: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      alert("User not logged in");
      return;
    }

    const dataToSubmit = {
      ...formData,
      postedBy: userInfo._id,
      posterName: userInfo.name || userInfo.username || '',
    };
    // console.log(dataToSubmit)

    try {
      await createEvent(dataToSubmit).unwrap();
      
           Swal.fire({
  title: "Event Created Success!",
  icon: "success",
  draggable: true
});
      
 
      setFormData({
        eventTitle: '',
        date: '',
        time: '',
        location: '',
        description: '',
      });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Event Create Failed",
 
});
      // alert('Failed: ' + (err.data?.message || err.error));
    }
  };


  return (
    <section className="min-h-screen font-sans bg-gray-100 flex items-center justify-center">
      <div className="relative w-full h-full">
        <div className="absolute inset-0">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-full h-full"></div>
        </div>

        <div className="relative flex justify-center items-center min-h-screen px-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8 lg:p-12">
            <div className="mb-8 text-center">
              <img
                src="https://web.programming-hero.com/home/home2/icons/ph-logo.svg"
                alt="Logo"
                className="mx-auto w-40"
              />
            </div>

            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
              <p className="text-gray-500 mt-2">Fill out the form to add a new event</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="eventTitle"
                placeholder="Event Title"
                value={formData.eventTitle}
                onChange={handleChange}
                className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition"
              >
                {isLoading ? "Submitting..." : "Submit Event"}
              </button>
            </form>

            {isError && (
              <p className="text-red-600 mt-4 text-center">
                {error?.data?.message || "Something went wrong"}
              </p>
            )}

            {isSuccess && (
              <p className="text-green-600 mt-4 text-center">Event created successfully!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
