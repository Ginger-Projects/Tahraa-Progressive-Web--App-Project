import TraineeHeader from "../../components/trainee/header";
import "./EditProfile.css";
import EditProfileForm from "../../components/trainee/Edit-Profile";

export default function EditProfile() {
  return (
   <div>
    <div className="edit-profile">

      {/* Full width header */}
      <TraineeHeader title="Edit Profile" />
      <EditProfileForm/>
      
    </div>
    <div className="edit-profile-footer">
        <p>
          Copyright © 2025 Tahma. All rights reserved. Developed by Ginger Technologies.
        </p>
      </div>
    </div>
  );
}
