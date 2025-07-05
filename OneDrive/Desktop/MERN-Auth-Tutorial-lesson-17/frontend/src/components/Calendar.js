
  


import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import Navbar from "./Navbar";
import "../index.css"; // Ensure proper styles

const CalendarComponent = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [emailEvents, setEmailEvents] = useState([]);
  const calendarRef = useRef(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/fetch-emails");

        const formattedEvents = response.data.map((email) => {
          const eventDate = new Date(email.DATE).toISOString().split("T")[0];
          return { title: email.SUBJECT, date: eventDate,messageId: email.messageId };
        });

        setEmailEvents(formattedEvents);
        console.log("Fetched Events:", formattedEvents);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll(".fc-day").forEach((cell) => {
        const cellDate = cell.getAttribute("data-date");
        if (emailEvents.some((event) => event.date === cellDate)) {
          cell.classList.add("highlight-event"); // Custom class for event dates
        } else {
          cell.classList.remove("highlight-event");
        }
      });
    }, 500); // Give time for calendar rendering
  }, [emailEvents, selectedMonth]);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);

    const eventsOnDate = emailEvents.filter((e) => e.date === info.dateStr);
    setSelectedEvents(eventsOnDate.length > 0 ? eventsOnDate : [{ title: "No event" }]);
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);

    const todayEvents = emailEvents.filter((event) => event.date === today);
    setSelectedEvents(todayEvents.length > 0 ? todayEvents : [{ title: "No event today" }]);
  }, [emailEvents]);

  const handleMonthChange = (index) => {
    setSelectedMonth(index);
    if (calendarRef.current) {
      const year = new Date().getFullYear();
      const newDate = `${year}-${(index + 1).toString().padStart(2, "0")}-01`;
      calendarRef.current.getApi().gotoDate(newDate);
    }
  };

  // Function to open Gmail with the subject search
  const openGmailWithSubject = (messageId) => {
    if (!messageId) return; //  Prevent undefined errors
    const gmailSearchUrl = `https://mail.google.com/mail/u/0/#inbox/${messageId}`;
    window.open(gmailSearchUrl, "_blank");
  };
  return (
    <>
      <Navbar />
      <div className="calendar-container">
        {/* Sidebar for selecting months */}
        <div className="sidebar">
          <h2>{new Date().getFullYear()}</h2>
          <ul>
            {months.map((month, index) => (
              <li
                key={index}
                className={selectedMonth === index ? "active" : ""}
                onClick={() => handleMonthChange(index)}
              >
                {month}
              </li>
            ))}
          </ul>
        </div>

        {/* Calendar Panel */}
        <div className="calendar-panel">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            initialDate={`${new Date().getFullYear()}-${(selectedMonth + 1)
              .toString()
              .padStart(2, "0")}-01`}
            events={emailEvents}
            dateClick={handleDateClick}
            headerToolbar={false}
            fixedWeekCount={false}
            showNonCurrentDates={false}
            eventContent={() => null} // Hide event text, highlight only
          />
        </div>

        {/* Sidebar for displaying event details */}
        <div className="event-sidebar">
          <h2>{selectedDate ? selectedDate : "Today's Events"}</h2>
          {selectedEvents.length > 0 ? (
            <ul>
              {selectedEvents.map((event, index) => (
                <li
                  key={index}
                  onClick={() => openGmailWithSubject(event.messageId)}
                  style={{ cursor: "pointer" }} // No underline, no color change
                >
                  {event.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>No events today.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarComponent;
