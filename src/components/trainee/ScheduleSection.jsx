import React, { useEffect, useState } from "react";
import "./ScheduleSection.css";
import { getTraineeUpcomingSchedules } from "../../services/trainee/trainee";

export default function ScheduleSection() {
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [loading, setLoading] = useState(false);

  const formatTime = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatTimeRange = (start, end) => {
    const startStr = formatTime(start);
    const endStr = formatTime(end);
    if (startStr && endStr) return `${startStr} - ${endStr}`;
    return startStr || endStr || "";
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);

        const fromDate = selectedDate.toISOString();
        const toDate = new Date(
          selectedDate.getTime() + 24 * 60 * 60 * 1000
        ).toISOString();

        const res = await getTraineeUpcomingSchedules({
          fromDate,
          toDate,
          page: 1,
          limit: 10,
        });

        const raw = res?.data?.schedule || [];

        const mapped = raw.map((item) => {
          const start = item.startDate;
          const end = item.endDate;

          return {
            time: formatTimeRange(start, end),
            title: item.package?.name || "Session",
            instructor: item.expert?.name || "",
            role: "Expert",
            tag: "",
            date: start ? new Date(start) : null,
          };
        });

        setSessions(mapped);
      } catch (error) {
        console.error("Failed to load upcoming schedules", error);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [selectedDate]);

  const changeDay = (delta) => {
    setSelectedDate((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + delta);
      return next;
    });
  };

  const handlePrevDay = () => changeDay(-1);
  const handleNextDay = () => changeDay(1);

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const today = new Date();

  // Prefer the schedule's actual date (from first session),
  // fall back to the selectedDate if there are no sessions.
  const firstSessionDate = sessions[0]?.date;
  const labelDate = firstSessionDate || selectedDate;

  const isToday = isSameDay(labelDate, today);

  const headerLabel = isToday
    ? "Today"
    : labelDate.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

  return (
    <div className="schedule-card">
      <div className="schedule-header">
        <h2 className="schedule-title">My schedule</h2>

        <div className="schedule-controls">
          <button className="nav-btn" type="button" onClick={handlePrevDay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
            >
              <circle
                cx="15.8462"
                cy="15.8462"
                r="15.8462"
                transform="matrix(1 0 0 -1 0.44043 32.1326)"
                fill="white"
                stroke="#F5F5F5"
                strokeWidth="0.880346"
              />
              <g opacity="0.5">
                <path
                  d="M18.2676 20.0279L14.306 16.0664L18.2676 12.1048"
                  stroke="#775DA6"
                  strokeWidth="2.64104"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
          <span className="nav-text">{headerLabel}</span>
          <button className="nav-btn" type="button" onClick={handleNextDay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
            >
              <circle
                cx="15.8462"
                cy="15.8462"
                r="15.8462"
                transform="matrix(-1 0 0 1 32.1328 0.44017)"
                fill="white"
                stroke="#F5F5F5"
                strokeWidth="0.880346"
              />
              <path
                d="M14.3057 12.5448L18.2672 16.5064L14.3057 20.468"
                stroke="#775DA6"
                strokeWidth="2.64104"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="schedule-grid">
        {loading ? (
          <></>
        ) : (
          sessions.map((s, i) => (
            <div
              key={i}
              className={`session-card ${s.isPrimary ? "primary" : ""}`}
            >
              <div className="session-top">
                <span className="session-time">{s.time}</span>
                <button className="more-btn">
                  <svg
                    className="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="3"
                    height="19"
                    viewBox="0 0 3 19"
                    fill="none"
                  >
                    <path
                      d="M1.4221 2.84419C1.14083 2.84419 0.865886 2.76079 0.632023 2.60453C0.39816 2.44827 0.215886 2.22616 0.108251 1.96631C0.000616168 1.70646 -0.0275461 1.42052 0.0273258 1.14466C0.0821977 0.8688 0.21764 0.615407 0.416523 0.416523C0.615407 0.217639 0.8688 0.0821977 1.14466 0.0273258C1.42052 -0.0275461 1.70646 0.000616168 1.96631 0.108251C2.22616 0.215886 2.44827 0.39816 2.60453 0.632023C2.76079 0.865885 2.84419 1.14083 2.84419 1.4221C2.84419 1.79926 2.69437 2.16098 2.42767 2.42767C2.16098 2.69437 1.79926 2.84419 1.4221 2.84419Z"
                      fill="#252525"
                    />
                    <path
                      d="M1.4221 10.6659C1.14083 10.6659 0.865886 10.5825 0.632023 10.4262C0.39816 10.2699 0.215886 10.0478 0.108251 9.78798C0.000616168 9.52813 -0.0275461 9.24219 0.0273258 8.96633C0.0821977 8.69047 0.21764 8.43708 0.416523 8.23819C0.615407 8.03931 0.8688 7.90387 1.14466 7.849C1.42052 7.79412 1.70646 7.82229 1.96631 7.92992C2.22616 8.03756 2.44827 8.21983 2.60453 8.45369C2.76079 8.68756 2.84419 8.9625 2.84419 9.24377C2.84419 9.62093 2.69437 9.98265 2.42767 10.2493C2.16098 10.516 1.79926 10.6659 1.4221 10.6659Z"
                      fill="#252525"
                    />
                    <path
                      d="M1.4221 18.4873C1.14083 18.4873 0.865886 18.4039 0.632023 18.2476C0.39816 18.0914 0.215886 17.8693 0.108251 17.6094C0.000616168 17.3496 -0.0275461 17.0636 0.0273258 16.7878C0.0821977 16.5119 0.21764 16.2585 0.416523 16.0596C0.615407 15.8607 0.8688 15.7253 1.14466 15.6704C1.42052 15.6156 1.70646 15.6437 1.96631 15.7513C2.22616 15.859 2.44827 16.0413 2.60453 16.2751C2.76079 16.509 2.84419 16.7839 2.84419 17.0652C2.84419 17.4424 2.69437 17.8041 2.42767 18.0708C2.16098 18.3375 1.79926 18.4873 1.4221 18.4873Z"
                      fill="#252525"
                    />
                  </svg>
                </button>
              </div>

              <h3 className="session-title">{s.title}</h3>

              <div className="session-tag">{s.tag}</div>

              <div className="instructor-info">
                <div className="instructor-avatar"></div>
                <div>
                  <p className="instructor-name">{s.instructor}</p>
                  <p className="instructor-role">{s.role}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
