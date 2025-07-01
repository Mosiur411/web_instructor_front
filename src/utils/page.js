const pages = [
    {
      name: "Home",
      path: "/",
      access: "public",
      description: "Website home page",
    },
    {
      name: "Events",
      path: "/events",
      access: "public",
      description: "List of all events",
    },
    {
      name: "Add Event",
      path: "/events/add",
      access: "authenticated",
      description: "Form to add new event",
    },
    {
      name: "My Event",
      path: "/events/mine",
      access: "authenticated",
      description: "User's own events",
    }
  ];

  export default pages;
