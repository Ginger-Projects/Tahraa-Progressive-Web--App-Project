import { MoreVertical } from "lucide-react";
import "./MyExperts.css";

export default function MyExperts() {
  const experts = [
    { name: "Tony Stork", role: "Folk & Traditional Music" },
    { name: "Steve Rogers", role: "Western Classical" },
    { name: "Peter Parker", role: "Contemporary Dance" },
    { name: "Natasha Romanoff", role: "Yoga" },
  ];

  return (
    <div className="my-experts-card">
      <div className="my-experts-header">
        <h3 className="my-experts-title">My Experts</h3>
        <button className="more-btn">
          <MoreVertical className="icon" />
        </button>
      </div>

      <div className="my-experts-grid">
        {experts.map((expert, idx) => (
          <div key={idx} className="expert-item">
            <div className="expert-avatar"></div>
            <p className="expert-name">{expert.name}</p>
            <p className="expert-role">{expert.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
