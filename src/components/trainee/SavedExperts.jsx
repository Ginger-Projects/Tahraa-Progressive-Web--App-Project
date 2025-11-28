import { MoreVertical } from "lucide-react";
import "./SavedExperts.css";

export default function SavedExperts() {
  const savedExperts = [
    { name: "Bruce Banner", role: "Folk & Traditional Music" },
    { name: "Clint Barton", role: "Western Classical" },
    { name: "Wanda Maximoff", role: "Contemporary Dance" },
    { name: "Carol Danvers", role: "Yoga" },
    { name: "James Rhodes", role: "Yoga" },
    { name: "Scott Lang", role: "Singing" },
  ];

  return (
    <div className="saved-experts-card">
      <div className="saved-experts-header">
        <h3 className="saved-experts-title">Saved Experts</h3>
        <button className="more-btn">
          <MoreVertical className="icon" />
        </button>
      </div>

      <div className="saved-experts-grid">
        {savedExperts.map((expert, idx) => (
          <div key={idx} className="expert-item">
            <div className="expert-avatar saved"></div>
            <p className="expert-name">{expert.name}</p>
            <p className="expert-role">{expert.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
