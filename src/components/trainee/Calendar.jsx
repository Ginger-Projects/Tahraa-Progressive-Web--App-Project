"use client";
import "./Calendar.css";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const HOURS = [];
const HOUR_VALUES = [];
for (let h = 7; h <= 20; h++) {
  const suffix = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  HOURS.push(`${displayHour} ${suffix}`);
  HOUR_VALUES.push(h);
}


function fetchEvents(mode, date) {
  const dateKey = date.toISOString().slice(0, 10); // YYYY-MM-DD
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mode === "daily") {
        resolve([
          { id: `d-${dateKey}-1`, date: dateKey, title: "Daily Yoga", start: 7, end: 8, color: "pink" },
          { id: `d-${dateKey}-2`, date: dateKey, title: "Standup Meeting", start: 9, end: 10, color: "yellow" },
        ]);
      }

      if (mode === "weekly") {
        const monday = new Date(date);
        const day = monday.getDay();
        monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1)); // move to Monday
        const mondayKey = monday.toISOString().slice(0, 10);

        resolve([
          { id: `w-${mondayKey}-1`, date: mondayKey, title: "Weekly Violin", start: 10, end: 11, color: "yellow" },
          {
            id: `w-${mondayKey}-2`,
            date: (() => { const d = new Date(monday); d.setDate(d.getDate() + 2); return d.toISOString().slice(0, 10); })(),
            title: "Group Dance",
            start: 8,
            end: 9,
            color: "pink",
          },
        ]);
      }

      if (mode === "monthly") {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // Example: events with time for particular dates
  const sampleDates = [
    { day: 3, title: "Yoga", start: 10, end: 11, color: "pink" },
    { day: 10, title: "Standup Meeting", start: 9, end: 10, color: "yellow" },
    { day: 23, title: "Workshop", start: 11, end: 12, color: "pink" },
  ];

  resolve(sampleDates.map((ev, i) => {
    const d = new Date(year, month, ev.day);
    return {
      id: `m-${d.toISOString().slice(0, 10)}-${i}`,
      date: d.toISOString().slice(0, 10),
      title: `${ev.title} ${ev.start}:${ev.start < 10 ? "0" : ""}00 - ${ev.end}:${ev.end < 10 ? "0" : ""}00`,
      start: ev.start,
      end: ev.end,
      color: ev.color,
    };
  }));
}


      resolve([]);
    }, 300);
  });
}

/* -------------------------
   Helpers
   ------------------------- */
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const isoDate = (d) => d.toISOString().slice(0, 10);

/* -------------------------
   Component
   ------------------------- */
export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("daily");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch events
  useEffect(() => {
    setLoading(true);
    fetchEvents(viewMode, currentDate)
      .then((data) => setEvents(data || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [viewMode, currentDate]);

  /* ---------- Month label ---------- */
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  /* ---------- Date arrays ---------- */
  const getDatesForDayRange = (range = 14) => {
    const dates = [];
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - Math.floor(range / 2));

    for (let i = 0; i < range; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const getDatesForWeek_MonToFri_InsideMonth = () => {
    const date = new Date(currentDate);
    const day = date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1));

    const dates = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      if (d.getMonth() === currentDate.getMonth()) dates.push(d);
    }
    return dates;
  };

  const getDatesForMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return Array.from({ length: daysInMonth(year, month) }, (_, i) => new Date(year, month, i + 1));
  };

  const dates = viewMode === "daily"
    ? getDatesForDayRange(18)
    : viewMode === "weekly"
      ? getDatesForWeek_MonToFri_InsideMonth()
      : getDatesForMonth();

  /* ---------- Navigation ---------- */
  const goToPrevMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() - 1;
    const day = currentDate.getDate();
    const maxDay = daysInMonth(year, month);
    setCurrentDate(new Date(year, month, Math.min(day, maxDay)));
  };

  const goToNextMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const maxDay = daysInMonth(year, month);
    setCurrentDate(new Date(year, month, Math.min(day, maxDay)));
  };

  /* ---------- Event helpers ---------- */
  const eventsForDate = (d) => events.filter((e) => e.date === isoDate(d));

  /* ---------- Render ---------- */
  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <div className="calendar-header-left">
          <button className="nav-btn" onClick={goToPrevMonth}><ChevronLeft size={20} /></button>
          <h2 className="calendar-month">{monthYear}</h2>
          <button className="nav-btn" onClick={goToNextMonth}><ChevronRight size={20} /></button>
        </div>
        <div className="view-mode-container">
          <div className="view-mode">
            {["daily", "weekly", "monthly"].map((m) => (
              <button
                key={m}
                className={`view-btn ${viewMode === m ? "active" : ""}`}
                onClick={() => setViewMode(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Date picker */}
     {/* Date picker */}
{viewMode !== "monthly" && (
  <div className="date-picker">
    {dates.map((d) => {
      const key = isoDate(d);
      const isSelected = isoDate(currentDate) === key;
      const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
      const day = d.getDate();
      return (
        <button
          key={key}
          className={`date-btn ${isSelected ? "selected" : ""}`}
          onClick={() => setCurrentDate(new Date(d))}
        >
          <div className="day">{day}</div>
          <div className="weekday">{weekday}</div>
        </button>
      );
    })}
  </div>
)}


      {/* Schedule / Calendar Grid */}
      {viewMode === "monthly" ? (
       <div className="month-view">
  {/* Weekday labels */}
  <div className="month-weekdays">
    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((wd) => (
      <div key={wd} className="month-weekday">{wd}</div>
    ))}
  </div>

  {/* Dates grid */}
  <div className="month-grid">
    {(() => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();

      const today = new Date(); // today's date

      // Calculate empty cells before first day (to align weekdays)
      const startDay = firstDayOfMonth.getDay(); // 0=Sun, 6=Sat
      const cells = [];

      // Empty cells for previous month
      for (let i = 0; i < startDay; i++) {
        cells.push(<div key={`empty-${i}`} className="month-cell empty"></div>);
      }

      // Fill current month days
      for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(year, month, d);
        const dayEvents = eventsForDate(dateObj);

        // Check if this date is today
        const isToday =
          dateObj.getFullYear() === today.getFullYear() &&
          dateObj.getMonth() === today.getMonth() &&
          dateObj.getDate() === today.getDate();

        cells.push(
  <div
    key={isoDate(dateObj)}
    className={`month-cell ${isToday ? "today" : ""} ${
      dayEvents.length > 0 ? "has-event" : ""
    }`}
    onClick={() => setCurrentDate(dateObj)}
  >
    <div className="month-date">{d}</div>

    {dayEvents.map((ev) => (
  <div key={ev.title} className="month-event">
    {ev.title}
  </div>
))}
  </div>
);

      }

      return cells;
    })()}
  </div>
</div>

      ) : (
        <div className="schedule">
          <div className="schedule-left-labels">
            {HOURS.map((h) => <div key={h} className="schedule-time">{h}</div>)}
          </div>
          <div className="schedule-main">
            {loading && <div className="loading">Loading events…</div>}
            {HOUR_VALUES.map((hour) => {
              const hourEvents = eventsForDate(currentDate).filter(ev => ev.start === hour);
              return (
                <div key={hour} className="schedule-row">
                  <div className="schedule-cell">
                    {hourEvents.map(ev => (
                      <div key={ev.id} className={`calendar-event event-1h color-${ev.color}`}>
                        <div className="event-title">{ev.title}</div>
                        <div className="event-meta">{ev.start}:00 — {ev.end}:00</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
