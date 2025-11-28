import "./Header.css";
import { HiOutlineChat, HiOutlineBell } from "react-icons/hi";


export default function TraineeHeader() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Tahraa</h1>

      <div className="actions">
  <button className="circle-btn">
    <HiOutlineChat className="icon" />
  </button>

  <button className="circle-btn bell-btn">
    <HiOutlineBell className="icon" />
  </button>

  <div className="separator"></div>

  <button className="circle-btn profile-btn">
    <img
      src="/path/to/profile.jpg"
      alt="Profile"
      className="profile-icon"
    />
  </button>
</div>


      </div>
    </header>
  );
}
