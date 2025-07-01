import React, { useState, useMemo } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaPlusCircle,
  FaAlignLeft,
} from "react-icons/fa";

import {
  useGetEventsQuery,
  useJoinEventMutation,
} from "../../redux/event/eventApi";
import {
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  parseEventDate,
} from "../../utils/dateHelper";
import Swal from "sweetalert2";

export default function EventList() {
  const [filter, setFilter] = useState("all");
  const [searchPropertyOrEmployee, setSearchPropertyOrEmployee] = useState("");
  const [specificDate, setSpecificDate] = useState("");
  const [dateRange, setDateRange] = useState("");

  const [joinEvent] = useJoinEventMutation();

  const {
    data: events = [],
    isLoading,
    isError,
    error,
  } = useGetEventsQuery({
    search: searchPropertyOrEmployee,
    filterDate: specificDate,
    filterRange: dateRange,
  });

  const handleJoin = async (_id) => {
    try {
      await joinEvent(_id).unwrap();

      Swal.fire({
        title: "Event Join Success!",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.data.message}`,
      });
      // console.error("Join failed:", error);
    }
  };

  const filteredEvents = useMemo(() => {
    if (!events?.length) return [];

    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const todayEnd = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
      999
    );

    // date ranges same as before
    const currentWeekStart = getStartOfWeek(today);
    const currentWeekEnd = getEndOfWeek(today);

    const lastWeekEnd = new Date(currentWeekStart.getTime() - 1);
    const lastWeekStart = getStartOfWeek(lastWeekEnd);

    const currentMonthStart = getStartOfMonth(today);
    const currentMonthEnd = getEndOfMonth(today);

    const lastMonthDate = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const lastMonthStart = getStartOfMonth(lastMonthDate);
    const lastMonthEnd = getEndOfMonth(lastMonthDate);

    // Extra ranges for dateRange filter example
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    return events.filter((event) => {
      const eventDate = parseEventDate(event);
      if (!eventDate) return false;

      //   // Search by event title filter
      //   if (searchTitle && !event.eventTitle.toLowerCase().includes(searchTitle.toLowerCase())) {
      //     return false;
      //   }

      // New search filter by property or employee (assuming event.property or event.employee fields)
      if (searchPropertyOrEmployee) {
        const prop = event.eventTitle?.toLowerCase() || "";
        const emp = event.location?.toLowerCase() || "";
        if (
          !prop.includes(searchPropertyOrEmployee.toLowerCase()) &&
          !emp.includes(searchPropertyOrEmployee.toLowerCase())
        ) {
          return false;
        }
      }

      // Specific date filter (exact date match)
      if (specificDate) {
        const selectedDate = new Date(specificDate);
        // Check if eventDate is same day as selectedDate
        if (
          eventDate.getFullYear() !== selectedDate.getFullYear() ||
          eventDate.getMonth() !== selectedDate.getMonth() ||
          eventDate.getDate() !== selectedDate.getDate()
        ) {
          return false;
        }
      }

      // Date range filter for the new dropdown
      if (dateRange) {
        switch (dateRange) {
          case "last7days":
            if (eventDate < sevenDaysAgo || eventDate > todayEnd) return false;
            break;
          case "last30days":
            if (eventDate < thirtyDaysAgo || eventDate > todayEnd) return false;
            break;
          // add more ranges if needed
          default:
            break;
        }
      }

      // Original date filter dropdown
      if (filter !== "all") {
        switch (filter) {
          case "today":
            if (!(eventDate >= todayStart && eventDate <= todayEnd))
              return false;
            break;
          case "currentWeek":
            if (!(eventDate >= currentWeekStart && eventDate <= currentWeekEnd))
              return false;
            break;
          case "lastWeek":
            if (!(eventDate >= lastWeekStart && eventDate <= lastWeekEnd))
              return false;
            break;
          case "currentMonth":
            if (
              !(eventDate >= currentMonthStart && eventDate <= currentMonthEnd)
            )
              return false;
            break;
          case "lastMonth":
            if (!(eventDate >= lastMonthStart && eventDate <= lastMonthEnd))
              return false;
            break;
          default:
            break;
        }
      }

      return true;
    });
  }, [events, filter, searchPropertyOrEmployee, specificDate, dateRange]);

  if (isLoading) return <p className="text-center mt-10">Loading events...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Error: {error?.data?.message || error?.error}
      </p>
    );

  return (
    <section className="min-h-screen font-sans bg-gray-100 flex flex-col items-center justify-start  px-4 pt-32">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
        Upcoming Events
      </h1>

      {/* Search and Filter Controls */}
      <div className="w-full max-w-5xl mb-8 flex flex-col md:flex-row md:items-center md:space-x-3 space-y-4 md:space-y-0">
        {/* Search  */}
        <input
          type="text"
          placeholder="Search by Property or Employee"
          className="flex-grow p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchPropertyOrEmployee}
          onChange={(e) => setSearchPropertyOrEmployee(e.target.value)}
        />

        {/* Specific Date Picker */}
        <input
          type="date"
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={specificDate}
          onChange={(e) => setSpecificDate(e.target.value)}
        />

        {/* Date Range Select */}
        <select
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="">Select a date range</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
          {/* add more if needed */}
        </select>

        {/* Clear Filters Button */}
        <button
          className="px-4 py-3 border border-gray-400 rounded text-gray-700 hover:bg-gray-200"
          onClick={() => {
            setSearchPropertyOrEmployee("");
            setSpecificDate("");
            setDateRange("");
            setFilter("all");
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto pt-20 px-4">
        {filteredEvents?.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">
            No events found.
          </p>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300"
            >
              {/* Top Content */}
              <div>
                {/* Title */}
                <h2 className="text-xl font-bold text-blue-700 mb-3 tracking-wide">
                  {event.eventTitle}
                </h2>

                {/* Poster */}
                <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                  <FaUser className="text-gray-400" />
                  <span className="text-gray-700 font-medium">
                    {event.posterName}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                  <FaCalendarAlt className="text-gray-400" />
                  <span className="text-gray-700">
                    {new Date(event.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    at {event.time}
                  </span>
                </div>

                {/* Location */}
                <div className="text-sm text-gray-500 flex items-center gap-2 mb-3">
                  <FaMapMarkerAlt className="text-red-400" />
                  <span className="text-gray-700">{event.location}</span>
                </div>

                {/* Description */}
                <div className="text-sm text-gray-600 flex gap-2 mb-4 line-clamp-3">
                  <FaAlignLeft className="text-gray-400 mt-1" />
                  <p>{event.description}</p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between border-t pt-4 mt-auto">
                <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaUsers className="text-indigo-400" />
                  {event.attendeeCount || 0} Attending
                </div>

                <button
                  onClick={() => handleJoin(event?._id)}
                  className="flex cursor-pointer items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
                >
                  <FaPlusCircle />
                  Join
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </section>
  );
}
