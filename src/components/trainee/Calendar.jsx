"use client";
import "./Calendar.css";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../api/axios";


const HOURS = [];
const HOUR_VALUES = [];
for (let h = 7; h <= 22; h++) {
  const suffix = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  HOURS.push(`${displayHour} ${suffix}`);
  HOUR_VALUES.push(h);
}

/* -------------------------
   Helpers
   ------------------------- */
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
// Local-date key in YYYY-MM-DD (avoids timezone offset issues from toISOString)
const isoDate = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const mapSessionsToEvents = (sessions, fallbackDate) =>
  (sessions || []).map((s, idx) => {
    // API fields: start, end, title, status
    const rawStart = s.start || s.startTime || s.startDate || s.date || null;
    const startDateObj = rawStart ? new Date(rawStart) : new Date(fallbackDate);
    const startHour = startDateObj.getHours();

    const rawEnd = s.end || s.endTime || s.endDate || null;
    const endDateObj = rawEnd
      ? new Date(rawEnd)
      : new Date(startDateObj.getTime() + 60 * 60 * 1000);
    const endHour = endDateObj.getHours();

    return {
      id: s._id || s.id || `session-${idx}`,
      date: isoDate(startDateObj),
      title: s.title || "Session",
      status: s.status || "",
      start: startHour,
      end: Math.max(startHour + 1, endHour),
      startIso: startDateObj.toISOString(),
      endIso: endDateObj.toISOString(),
      color: "pink",
    };
  });


export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("daily");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch events
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (viewMode === "daily") {
          const date = new Date(currentDate);
          const year = date.getFullYear();
          const month = date.getMonth();
          const day = date.getDate();

          // [selected day 00:00:00Z, next day 00:00:00Z)
          const startUtc = new Date(Date.UTC(year, month, day, 0, 0, 0));
          const endUtc = new Date(startUtc);
          endUtc.setUTCDate(endUtc.getUTCDate() + 1);

          const startIso = startUtc.toISOString();
          const endIso = endUtc.toISOString();

          const res = await api.get(
            `/api/trainee/calendar/sessions?startDate=${encodeURIComponent(
              startIso
            )}&endDate=${encodeURIComponent(endIso)}`
          );
          const sessions = res?.data?.data?.sessions || [];
          const mapped = mapSessionsToEvents(sessions, currentDate);
          setEvents(mapped);
        } else if (viewMode === "weekly") {
          const date = new Date(currentDate);
          const day = date.getDay();
          const mondayLocal = new Date(date);
          mondayLocal.setDate(date.getDate() - (day === 0 ? 6 : day - 1));

          const year = mondayLocal.getFullYear();
          const month = mondayLocal.getMonth();
          const dayOfMonth = mondayLocal.getDate();

          // [Monday 00:00:00Z, next Monday 00:00:00Z)
          const weekStartUtc = new Date(
            Date.UTC(year, month, dayOfMonth, 0, 0, 0)
          );
          const weekEndUtc = new Date(weekStartUtc);
          weekEndUtc.setUTCDate(weekEndUtc.getUTCDate() + 7);

          const startIso = weekStartUtc.toISOString();
          const endIso = weekEndUtc.toISOString();

          const res = await api.get(
            `/api/trainee/calendar/sessions?startDate=${encodeURIComponent(
              startIso
            )}&endDate=${encodeURIComponent(endIso)}`
          );
          const sessions = res?.data?.data?.sessions || [];
          const mapped = mapSessionsToEvents(sessions, currentDate);
          setEvents(mapped);
        } else if (viewMode === "monthly") {
          const date = new Date(currentDate);
          const year = date.getFullYear();
          const month = date.getMonth();

          // [first of month 00:00:00Z, first of next month 00:00:00Z)
          const monthStartUtc = new Date(Date.UTC(year, month, 1, 0, 0, 0));
          const monthEndUtc = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0));

          const startIso = monthStartUtc.toISOString();
          const endIso = monthEndUtc.toISOString();

          const res = await api.get(
            `/api/trainee/calendar/sessions?startDate=${encodeURIComponent(
              startIso
            )}&endDate=${encodeURIComponent(endIso)}`
          );
          const sessions = res?.data?.data?.sessions || [];
          const mapped = mapSessionsToEvents(sessions, currentDate);
          setEvents(mapped);
        }
      } catch (error) {
        console.error("Failed to load calendar sessions", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [viewMode, currentDate]);

  /* ---------- Month label ---------- */
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  /* ---------- Date arrays ---------- */
  // Daily strip: show only dates from the current month, centered on currentDate.
  // Example: if current day is 14, show 7–21. Near month edges, clamp to [1, lastDay].
  const getDatesForDayRangeInMonth = (range = 15) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = daysInMonth(year, month);

    const half = Math.floor(range / 2);
    let start = currentDate.getDate() - half;
    let end = currentDate.getDate() + half;

    // Clamp to month
    if (start < 1) {
      end += 1 - start; // shift window forward
      start = 1;
    }
    if (end > lastDay) {
      start -= end - lastDay; // shift window back
      end = lastDay;
      if (start < 1) start = 1;
    }

    const dates = [];
    for (let day = start; day <= end; day++) {
      dates.push(new Date(year, month, day));
    }
    return dates;
  };

  const getDatesForWeek_MonToFri_InsideMonth = () => {
    const date = new Date(currentDate);
    const day = date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1));

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const getDatesForMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return Array.from({ length: daysInMonth(year, month) }, (_, i) => new Date(year, month, i + 1));
  };

  const dates = viewMode === "daily"
    ? getDatesForDayRangeInMonth(15)
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
          <button className="nav-btn" onClick={goToPrevMonth}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M14.2638 3.5661L7.13159 10.6983L14.2638 17.8305" fill="#775DA6"/>
</svg></button>
          <h2 className="calendar-month">{monthYear}</h2>
          <button className="nav-btn" onClick={goToNextMonth}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M7.13281 3.5661L14.265 10.6983L7.13281 17.8305" fill="#775DA6"/>
</svg></button>
        </div>
        <div className="view-mode-container">
          <div className="view-mode">
            {["daily", "weekly", "monthly"].map((m) => {
              const label =
                m === "daily"
                  ? "Today"
                  : m.charAt(0).toUpperCase() + m.slice(1);
              return (
                <button
                  key={m}
                  className={`view-btn ${viewMode === m ? "active" : ""}`}
                  onClick={() => {
                    if (m === "daily") {
                      // Reset to real today when switching to Today view
                      setCurrentDate(new Date());
                    }
                    setViewMode(m);
                  }}
                >
                  {label}
                </button>
              );
            })}
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

        let cellStatusClass = "";
        if (dayEvents.length > 0 && dayEvents[0].status) {
          cellStatusClass = `status-${dayEvents[0].status.toLowerCase()}`;
        }

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
    } ${cellStatusClass}`}
    onClick={() => setCurrentDate(dateObj)}
  >
    <div className="month-date">{d}</div>

    {dayEvents.map((ev) => {
      const statusClass = ev.status
        ? `status-${ev.status.toLowerCase()}`
        : "";

      const startLabel = ev.startIso
        ? new Date(ev.startIso).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : ev.start != null
        ? `${ev.start}:00`
        : "";

      const endLabel = ev.endIso
        ? new Date(ev.endIso).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : ev.end != null
        ? `${ev.end}:00`
        : "";

      const statusText = ev.status || "";

      return (
        <div
          key={ev.id || ev.title}
          className={`month-event ${statusClass}`}
        >
          <div>{ev.title}</div>
          {(startLabel || endLabel || statusText) && (
            <div className="month-event-time-status">
              {startLabel && endLabel && (
                <span>{`${startLabel} — ${endLabel}`}</span>
              )}
              {statusText && (
                <span className="month-event-status-text">
                  {startLabel && endLabel ? ` · ${statusText}` : statusText}
                </span>
              )}
            </div>
          )}
        </div>
      );
    })}
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
                    {hourEvents.map(ev => {
                      const statusClass = ev.status
                        ? `status-${ev.status.toLowerCase()}`
                        : "";
                      const startLabel = ev.startIso
                        ? new Date(ev.startIso).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : `${ev.start}:00`;

                      const endLabel = ev.endIso
                        ? new Date(ev.endIso).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : `${ev.end}:00`;

                      return (
                        <div
                          key={ev.id}
                          className={`calendar-event event-1h color-${ev.color} ${statusClass}`}
                        >
                          <div className="event-title-row">
                            <span className="event-title">{ev.title}</span>
                            {ev.status && (
                              <span
                                className={`event-status status-${ev.status.toLowerCase()}`}
                              >
                                {ev.status}
                              </span>
                            )}
                          </div>
                          <div className="event-meta">
                            {startLabel} — {endLabel}
                          </div>
                        </div>
                      );
                    })}
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
