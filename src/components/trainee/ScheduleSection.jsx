import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import "./ScheduleSection.css"; // Import your CSS

export default function ScheduleSection() {
  const sessions = [
    {
      time: "10:30-12:00",
      title: "Violin class for beginners",
      instructor: "Gunner Torres",
      role: "Expert",
      tag: "Beginners",
    },
    {
      time: "13:00-14:00",
      title: "Chess Made Easy – Master the Game",
      instructor: "Stefan Ortiz",
      role: "Expert",
      tag: "Advanced",
      isPrimary: true,
    },
    {
      time: "16:00-17:00",
      title: "Vocal training for beginners",
      instructor: "Christianna Lowery",
      role: "Expert",
      tag: "Beginners",
    },
  ];

  return (
   <div className="schedule-card">
  <div className="schedule-header">
    <h2 className="schedule-title">My schedule</h2>

    <div className="schedule-controls">
      <button className="nav-btn"><ChevronLeft /></button>
      <span className="nav-text">Today</span>
      <button className="nav-btn"><ChevronRight /></button>
    </div>
  </div>

  <div className="schedule-grid">
    {sessions.map((s, i) => (
      <div key={i} className={`session-card ${s.isPrimary ? "primary" : ""}`}>
        <div className="session-top">
          <span className="session-time">{s.time}</span>
          <button className="more-btn"><MoreVertical /></button>
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
    ))}
  </div>
</div>

  );
}
