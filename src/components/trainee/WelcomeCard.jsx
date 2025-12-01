// WelcomeCard.jsx
import { CheckCircle } from "lucide-react";
import "./WelcomeCard.css";
import Smile from "../../assets/images/profile.png";

export default function WelcomeCard() {
  return (
    <div className="welcome-card">
      <div className="welcome-content">
        <div className="welcome-image">
            <img src={Smile} alt="" />
        </div>

        <div className="welcome-text">
          <p className="welcome-hey">Hey 👋</p>

          <div className="welcome-badge">
            
            <span>Welcome back!</span>
          </div>

          <h2 className="welcome-name">Kate Bishop</h2>
        </div>
      </div>
    </div>
  );
}
