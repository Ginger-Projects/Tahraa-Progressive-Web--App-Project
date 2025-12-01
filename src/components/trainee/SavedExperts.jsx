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
          <svg xmlns="http://www.w3.org/2000/svg" width="4" height="21" viewBox="0 0 4 21" fill="none">
  <path d="M1.61539 3.23077C1.29589 3.23077 0.983575 3.13603 0.717926 2.95853C0.452277 2.78103 0.245229 2.52874 0.122965 2.23357C0.000699916 1.93839 -0.0312901 1.61359 0.0310399 1.30024C0.0933699 0.986886 0.247221 0.699051 0.473136 0.473136C0.699052 0.24722 0.986886 0.0933699 1.30024 0.0310399C1.61359 -0.0312901 1.93839 0.000699916 2.23357 0.122965C2.52874 0.245229 2.78103 0.452277 2.95853 0.717926C3.13603 0.983574 3.23077 1.29589 3.23077 1.61539C3.23077 2.04381 3.06058 2.45469 2.75763 2.75764C2.45469 3.06058 2.04381 3.23077 1.61539 3.23077Z" fill="#252525"/>
  <path d="M1.61539 12.1154C1.29589 12.1154 0.983575 12.0207 0.717926 11.8432C0.452277 11.6657 0.245229 11.4134 0.122965 11.1182C0.000699916 10.823 -0.0312901 10.4982 0.0310399 10.1849C0.0933699 9.87153 0.247221 9.5837 0.473136 9.35778C0.699052 9.13186 0.986886 8.97801 1.30024 8.91568C1.61359 8.85335 1.93839 8.88534 2.23357 9.00761C2.52874 9.12987 2.78103 9.33692 2.95853 9.60257C3.13603 9.86822 3.23077 10.1805 3.23077 10.5C3.23077 10.9285 3.06058 11.3393 2.75763 11.6423C2.45469 11.9452 2.04381 12.1154 1.61539 12.1154Z" fill="#252525"/>
  <path d="M1.61539 21C1.29589 21 0.983575 20.9053 0.717926 20.7278C0.452277 20.5503 0.245229 20.298 0.122965 20.0028C0.000699916 19.7076 -0.0312901 19.3828 0.0310399 19.0695C0.0933699 18.7561 0.247221 18.4683 0.473136 18.2424C0.699052 18.0164 0.986886 17.8626 1.30024 17.8003C1.61359 17.7379 1.93839 17.7699 2.23357 17.8922C2.52874 18.0145 2.78103 18.2215 2.95853 18.4872C3.13603 18.7528 3.23077 19.0651 3.23077 19.3846C3.23077 19.813 3.06058 20.2239 2.75763 20.5269C2.45469 20.8298 2.04381 21 1.61539 21Z" fill="#252525"/>
</svg>
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
