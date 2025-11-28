import { ChevronLeft, ChevronRight } from "lucide-react";
import "./GroupCourse.css";

export default function CourseCard() {
  return (
    <div className="course-card">
      {/* Header */}
      <div className="course-header">
        <div className="course-tags">
          <span className="tag-accent">Group course</span>
          <span className="tag-muted">Beginners</span>
        </div>
        {/* <div className="arrow-group">
          <button className="arrow-btn">
            <ChevronLeft />
          </button>
          <button className="arrow-btn">
            <ChevronRight />
          </button>
        </div> */}
      </div>

      {/* Title and description */}
      <h3 className="course-title">Violin Class Made Easy</h3>
      <p className="course-desc">
        Violin Class — Learn the basics without the struggle. Play with confidence and impress everyone with your skill.
      </p>

      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-top">
          <span>20%</span>
          <span className="progress-max">100%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: "20%" }}></div>
        </div>
        <span className="progress-label">Total Activity</span>
      </div>

      {/* Stats */}
      <div className="course-stats">
        <div className="course-stat">
          <div className="course-stat-number stat-accent">2/5</div>
          <p className="course-stat-label">Completed</p>
        </div>
        <div className="course-stat">
          <div className="course-stat-number stat-primary">3</div>
          <p className="course-stat-label">To Be Completed</p>
        </div>
        <div className="course-stat">
          <div className="course-stat-number stat-warning">5</div>
          <p className="course-stat-label">Total Sessions</p>
        </div>
      </div>

      {/* Button */}
      <button className="course-button">Book Your Next Class</button>
    </div>
  );
}
